let usuario = "12345";

if(Number.isNaN(Number(usuario)))
{
    throw new Error("El usuario debe ser numerico")
}

console.log(usuario);