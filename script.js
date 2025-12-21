 document.getElementById("anio").textContent = new Date().getFullYear();


 function cargarTexto(rutaTxt, idElemento) {
    fetch(rutaTxt)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar " + rutaTxt);
            }
            return response.text();
        })
        .then(texto => {
            const elemento = document.getElementById(idElemento);
            if (elemento) {
                elemento.textContent = texto;
            }
        })
        .catch(error => {
            console.error(error);
        });
 }

 cargarTexto("txt/_about_me.txt", "text-about_me");
 
 cargarTexto("txt/_profesional.txt", "text-profesional");
 cargarTexto("txt/_academy.txt", "text-academy");

