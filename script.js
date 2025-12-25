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

    if (!content || !button) return;

    if (content.scrollHeight > maxHeight) {
        content.classList.add("collapsible");
        /*content.style.maxHeight = maxHeight + "px";*/

        button.style.display = "inline-block";
        button.textContent = "Read more";
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


/*
const header = document.querySelector(".hero");
let isCompact = false;

window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (!isCompact && y > 120) {
        header.classList.add("compact");
        isCompact = true;
    }
    else if (isCompact && y < 40) {
        header.classList.remove("compact");
        isCompact = false;
    }
});
*/

const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");
const heroContent = document.querySelector(".hero-content");
const heropanel = document.querySelector(".hero-panel")
const herotitle = document.querySelector(".hero-title")

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroHeight = window.innerHeight;

  // progress from 0 → 1
  let progress = scrollY / heroHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  /* 1. Fade background */
  heroBg.style.opacity = 1 - progress;

  /* 2. Move background up */
  const heroContentHeight = herotitle.offsetHeight * 3;
  const minY = -(heroHeight - heroContentHeight);

  const translateY = Math.max(
    minY - 30,
    -progress * 900
  );

  heropanel.style.transform = `translateY(${translateY}px)`;
  heroBg.style.transform = `translateY(${translateY}px)`;


  /* 3. Shrink spacing */
  heroContent.style.gap = `${2 - progress * 1.5}rem`;

  /* 4. Scale text slightly */
  heroContent.style.transform = `translateY(${-progress * 30}px) scale(${1 - progress * 0.1})`; 

  /* 5. Shadow */
  hero.style.setProperty("--shadow-opacity", progress);
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

