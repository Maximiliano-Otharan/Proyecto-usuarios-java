// Call the dataTables jQuery plugin
$(document).ready(function() {
//on ready
});

localStorage.email == null
localStorage.token == null

async function registarUsuario() {

    let datos = {};
    datos.nombre = document.getElementById("exampleFirstName").value;
    datos.apellido = document.getElementById("exampleLastName").value;
    datos.email = document.getElementById("exampleInputEmail").value;
    datos.password = document.getElementById("exampleInputPassword").value;
    datos.admin = 0;

    let repeatPassword = document.getElementById("exampleRepeatPassword").value;

    if(repeatPassword != datos.password){
        alert("La contraseña repetida es incorrecta");
    }else {
        try {
            const response = await fetch('api/usuariosGet', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

        window.location.href = "login.html";

        }catch(error){
            console.log(error)
        }
    }
}