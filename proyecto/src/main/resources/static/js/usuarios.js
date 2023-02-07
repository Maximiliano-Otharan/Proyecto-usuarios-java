// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#usuarios').DataTable();
    if(verificadoSesion() == true) {
        cargarUsuarios();
        actualizarUser();
    }else {
        window.location.href = "login.html";
    }

});

let tbodyUsers = document.querySelector('#tableUser');

function verificadoSesion() {
    if(localStorage.email === 'null'  && localStorage.token === 'null') {
        return false
    }
    return true;
}

function actualizarUser() {
    document.getElementById("txt-email-usuario").innerHTML = localStorage.email;
}

function cerrarSesion() {
    localStorage.token = 'null';
    localStorage.email = 'null';
    localStorage.admin = 'null';
}

async function cargarUsuarios() {
    try {
        const response = await fetch('api/usuariosGet', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
        });
        const usuarios = await response.json();

        let headerTable = document.getElementById("tableHeadUser")

        headerTable.innerHtml = ""

        headerTable.innerHTML = "<th>Id</th> <th>Nombre y Apellido</th> <th>Acciones</th>";

        let listHtml = '';

        for(let u of usuarios) {

            let btnDelete

            if(localStorage.admin == 1) {
                btnDelete = '<a href="#" onclick="deleteUsuario(' + u.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            }else {
                btnDelete = ' - ';
            }

            let telefonoTexto = u.telefono == null ? '-' : u.telefono;

            let usuarioHTML = '<tr><td>'+ u.id +'</td><td onclick="verMasUser('+ u.id +')">'+ u.nombre +' '+ u.apellido +'</td>' + '<td>'+ btnDelete +'</td></tr>';
            listHtml += usuarioHTML;
        }

        tbodyUsers.innerHTML = listHtml;

    }catch(error){
        console.log(error)
    }
}

async function deleteUsuario(id) {
    let opcion = null;

    if(id == localStorage.id) {
        opcion = confirm("Deseas eliminar tu cuenta?");
        if(opcion == true) {
            const response = await fetch('api/usuariosDelete/'+ id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
            });

                    window.location.href = "login.html";
        }
    }else {
                 const response = await fetch('api/usuariosDelete/'+ id, {
                     method: 'DELETE',
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                         'Authorization': localStorage.token
                     },
                 });

                         location.reload();
             }

}

async function verMasUser(id) {
    const response = await fetch('api/usuarios/'+ id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
            });
            const usuario = await response.json();

            let headerTable = document.getElementById("tableHeadUser")

            headerTable.innerHtml = ""

            headerTable.innerHTML = "<th>Id</th> <th>Nombre y Apellido</th> <th>Email</th> <th>Telefono</th> <th>Acciones</th>";

            tbodyUsers.innerHTML = "";

            listHtml = "";

            let btnDelete

            if(localStorage.admin == 1) {
                btnDelete = '<a href="#" onclick="deleteUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            }else {
                btnDelete = ' - ';
            }

            let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;

            let usuarioHTML = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido +'</td>' + '<td>' + usuario.email + '</td>' + '<td>'+ telefonoTexto + '</td>' + '<td>' + btnDelete + ' <a onclick="cargarUsuarios()" href="#"> Volver</a>' + '</td></tr>';
            listHtml = usuarioHTML;

            tbodyUsers.innerHTML = listHtml;
}


