async function nuevaContraseña() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("newPassword").value;

    let datos = {}

    datos.nombre = "";
    datos.apellido = "";
    datos.email = email;
    datos.password = password;
    datos.admin = "";

    if(email != '' && password != '') {
        const response = await fetch('api/usuarioPut', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(datos)
        });
        window.location.href = "login.html";
    }else {
        alert("Faltan datos a ingresar.")
    }
}