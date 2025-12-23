const yearSpan = document.getElementById("anio");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear

function loadText(filePath, containerId, callback) {
    const container = document.getElementById(containerId);
    container.innerHTML = "<p>Cargando...</p>"

    fetch(filePath)
    .then(response => response.text())
    .then(text => {
        const container = document.getElementById(containerId);
        const paragraphs = text
            .trim()
            .split(/\n\s*\n/);
        container.innerHTML = paragraphs
            .map(p =>`<p>${p}</p>` )
            .join("");

        if (callback) callback();
    })
    .catch(error => {
        container.innerHTML = "<p>Error loading content.</p>";
        console.error('Error loading ${filePath}:', error);
    }
    );
}


function setupToggleIfNeeded(contentId, buttonId, maxHeight = 200) {
    const content = document.getElementById(contentId);
    const button = document.getElementById(buttonId);

    if (content.scrollHeight > maxHeight) {
        content.classList.add("expanded");
        content.dataset.maxHeight = maxHeight; // Store for reference
        button.style.display = "inline-block";
    } else {
        button.style.display = "none";
    }
}


loadText("txt/about_me.txt", "text-about_me");


loadText("txt/profesional.txt", "text-profesional", () => {
    setupToggleIfNeeded("text-profesional", "toggle-profesional", 200)
});


loadText("txt/academy.txt", "text-academy");


const button = document.getElementById("toggle-profesional");
const content = document.getElementById("text-profesional");

if (button && content) {
button.addEventListener("click", () => {
  const expanded = content.classList.toggle("expanded");
  button.textContent = expanded ? "Read less" : "Read more";
});}


const header = document.querySelector(".hero");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("compact");
    } else {
        header.classList.remove("compact");
    }
});

/*
fetch("./txt/about_me.txt")
    .then(response => response.text())
    .then(text => {
        const container = document.getElementById("text-about_me");
        
        const paragraphs = text
            .trim()
            .split(/\n\s*\n/);

        container.innerHTML = paragraphs
            .map(p =>`<p>${p}</p>` )
            .join("");
    });
*/
/*
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

 cargarTexto("./txt/about_me.txt", "text-about_me");
 
 cargarTexto("./txt/profesional.txt", "text-profesional");
 cargarTexto("./txt/academy.txt", "text-academy");
 */

