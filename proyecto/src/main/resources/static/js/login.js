// Call the dataTables jQuery plugin
$(document).ready(function() {
//on ready
});

localStorage.token = 'null';
localStorage.email = 'null';
localStorage.admin = 'null';

async function iniciarSesion() {

    let datos = {};
    datos.email = document.getElementById("exampleInputEmail").value;
    datos.password = document.getElementById("exampleInputPassword").value;

    try {
        const response = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        const res = await response.text();

        if(res != "Error 401") {
        localStorage.token = res;
        localStorage.email = datos.email;

        const response = await fetch('api/usuariosGet', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
            });
            const usuarios = await response.json();

            let admin = null;

            for(let u of usuarios) {
                if(localStorage.email == u.email) {
                    localStorage.admin = u.admin;
                    localStorage.id = u.id;
                }
            }

        window.location.href = "usuarios.html";
        }else {
            alert("Las credenciales son incorrectas. Por favor intente nuevamente");
        }

    }catch(error){
        console.log(error)
    }
}
