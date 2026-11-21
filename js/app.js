const mensaje    = document.querySelector("#mensaje");
const nombre     = document.querySelector("#nombre");
const domicilio  = document.querySelector("#domicilio");
const correo     = document.querySelector("#correo");
const idEmp      = document.querySelector("#idEmp");
const apPaterno  = document.querySelector("#apPaterno");
const apMaterno  = document.querySelector("#apMaterno");
const usuario    = document.querySelector("#usuario");
const password   = document.querySelector("#password");
const formulario = document.querySelector("#formulario");

let usuarios = JSON.parse(localStorage.getItem("usuariosBD")) || [];

if (mensaje) mensaje.style.color = "black";

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    registrar();
});

function cambiarMensaje(texto, color = "black") {
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
    }
}

async function registrar() {
    try {
        const name  = nombre.value.trim();
        const apPat = apPaterno.value.trim();
        const apMat = apMaterno.value.trim();
        const user  = usuario.value.trim();
        const pass  = password.value.trim();

        const ip = await obtenerIP();
        console.log("Intentando insertar:", { name, apPat, apMat, user, ip });

        const { data, error } = await db
            .from("tbl_usuarios")
            .insert({
                nombre:           name,
                apellido_paterno: apPat,
                apellido_materno: apMat,
                usuario:          user,
                password:         pass,
                ip_registro:      ip
            })
            .select();

        console.log("Respuesta Supabase → data:", data, "error:", error);

        if (error) throw error;

        cambiarMensaje("Registrado correctamente", "green"  );
        formulario.reset();

    } catch (error) {
        console.error("Error completo:", error);
        cambiarMensaje(
            "Error: " + (error.message || JSON.stringify(error)),
            "red"
        );
    }
}

async function obtenerIP() {
    try {
        const respuesta = await fetch("https://api.ipify.org?format=json");
        const datos = await respuesta.json();
        return datos.ip;
    } catch {
        return null;
    }
}