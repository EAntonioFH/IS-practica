const formulario = document.querySelector("#form-id");
const usuario = document.querySelector("#usuario");
const password = document.querySelector("#password");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("no");
    try
    {
        let usuarioNum = Number(usuario.value);

        if(Number.isNaN(usuarioNum))
        {
            throw new Error("El usuario debe ser numerico")
        }

        mensaje.textContent = "El usuario es valido";
    }
    catch(error)
    {
        mensaje.textContent = "El usuario NO es valido";
    }

});

function tarea(nombre, tiempo)
{
    return new Promise(resolve => {
        console.log("La tarea " + nombre + " inició");

        setTimeout(()=>{
                console.log("La tarea " + nombre + " se terminó");
                resolve();
            }, tiempo)
    });
}

async function ejecutarSecuencia()
{
    console.log("Se ejecutando tareas secuenciales");
    const inicio = performance.now();
    
    await tarea("Consultando", 2000);
    await tarea("Cargando", 3000);
    
    const tiempo = ( (performance.now() - inicio) / 1000).toFixed(2);
    
    console.log("La ejecución de realizó en " + tiempo + " segundos");
}

async function ejecutarConcurrente() {
    console.log("Se ejecutando tareas concurrentes");
    const inicio = performance.now();

    await Promise.all(
        [
        tarea("Consultando", 2000),
        tarea("Cargando", 3000)
        ]
    );

    const tiempo = ( (performance.now() - inicio) / 1000).toFixed(2);
    
    console.log("La ejecución de realizó en " + tiempo + " segundos");
}

ejecutarSecuencia();
ejecutarConcurrente();