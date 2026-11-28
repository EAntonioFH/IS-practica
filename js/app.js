const mensaje = document.querySelector("#mensaje");

const nombre = document.querySelector("#nombre");
const domicilio = document.querySelector("#domicilio");
const correo = document.querySelector("#correo");
const idEmp = document.querySelector("#idEmp");

const botin = document.querySelector("#enviar");
const formulario = document.querySelector("#formulario");

const usuario = document.querySelector("#usuario");
const password = document.querySelector("#password");

const apellidoP = document.querySelector("#apPaterno");
const apellidoM = document.querySelector("#apMaterno");

let usuarios = [];

mensaje.style.color = "black";

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    registrar();
});

function cambiarMensaje(texto) {
    if (mensaje) {
        mensaje.textContent = texto;
    }
}

async function registrar() {
    try {
        var name = nombre.value.trim();
        var dom = domicilio.value.trim();
        var corr = correo.value.trim();
        var id = idEmp.value.trim();
        var lastName = apellidoP.value.trim();
        var secondLastName = apellidoM.value.trim();
        var user = usuario.value.trim();
        var passwd = password.value.trim();

        let usuarios = JSON.parse(localStorage.getItem("usuariosBD")) || [];
        usuarios.push({
            name,
            dom,
            corr,
            id
        });

        const ip = await obtenerIP();
        localStorage.setItem("usuariosBD", JSON.stringify(usuarios));

        const { error } = await db
            .from("tbl_usuarios")
            .insert({
                nombre: name,
                apellido_paterno: lastName,
                apellido_materno: secondLastName,
                usuario: user,
                password: passwd,
                ip_registro: ip
            });

        if (error) throw error;
        cambiarMensaje("Registrado correctamente");
    } catch (error) {
        cambiarMensaje("Ha ocurrido un error: " + error.message);
    }
}

async function obtenerIP() {
    const respuesta = await fetch("https://api.ipify.org?format=json");
    const datos = await respuesta.json();
    return datos.ip;
}