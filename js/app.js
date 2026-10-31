const mensaje = document.querySelector("#mensaje");

const nombre = document.querySelector("#nombre");
const domicilio = document.querySelector("#domicilio");
const correo = document.querySelector("#correo");
const idEmp = document.querySelector("#idEmp");

const botin = document.querySelector("#enviar");
const formulario = document.querySelector("#formulario");

let usuarios = [];

mensaje.style.color = "black";

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    registrar();
});

function cambiarMensaje(texto)
{
    console.log(mensaje)
    if(mensaje)
    {    
        mensaje.textContent = texto;
    }
}


function registrar()
{
    var name = nombre.value.trim();
    var dom = domicilio.value.trim();
    var corr = correo.value.trim();
    var id = idEmp.value.trim();
    
    usuarios.push({
        name,
        dom,
        corr,
        id
    });

    localStorage.setItem("Usuarios BD", JSON.stringify(usuarios));

    cambiarMensaje("Registrado correctamente");
}