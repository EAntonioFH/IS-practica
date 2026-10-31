const formulario = document.getElementById("formLogin");

const usuario = document.getElementById("usuario");

const password = document.getElementById("contra");

const mensaje = document.getElementById("mensaje");


formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    try {

        let usuarioNumero = Number(usuario.value);

        if (Number.isNaN(usuarioNumero)) {

            throw new Error("El usuario debe ser numérico");

        }

        mensaje.textContent = "Usuario válido. Continuando...";

    } catch (error) {

        mensaje.textContent = error.message;

    }

});

function tarea(nombre, tiempo){
    return new Promise(resolve => {
        console.log("La tarea "+ nombre + " inició");
        setTimeout(()=>{
            console.log("La tarea "+nombre+" se terminó");
            resolve();
        }, tiempo)
    });
}

async function ejecutarSecuencial() {
    console.log("Se están ejecutando tareas secuenciales");
    const inicio = performance.now();

    await tarea("Consultando datos del perfil",2000);
    await tarea("Cargando foto de perfil",3000);

    const tiempo = ((performance.now() - inicio) / 1000).toFixed(2);
    console.log("La ejecución se realizó en "+ tiempo + " segundos");
}

async function ejecutarConcurrente(){
    console.log("Se están ejecutando tareas concurrentes");
    const inicio = performance.now();

    await Promise.all([
        tarea("Consultando datos del perfil",2000),
        tarea("Cargando foto de perfil",3000)
    ]    
    );
    const tiempo = ((performance.now() - inicio) / 1000).toFixed(2);
    console.log("La ejecución se realizó en "+ tiempo + " segundos");
}

ejecutarSecuencial();
ejecutarConcurrente();
document.getElementById("btnDatos").addEventListener("click", () => {
    ejecutarConcurrente();
});

document.getElementById("btnImagen").addEventListener("click", () => {
    ejecutarSecuencial();
});