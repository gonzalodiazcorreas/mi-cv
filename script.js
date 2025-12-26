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
    minY - 36,
    -progress * 900
  );

  heropanel.style.transform = `translateY(${translateY}px)`;
  heroBg.style.transform = `translateY(${translateY}px)`;


  /* 3. Shrink spacing */
  heroContent.style.gap = `${1 - progress * 1.5}rem`;

  /* 4. Scale text slightly */
//   heroContent.style.transform = `translateY(${-progress * 30}px) scale(${1 - progress * 0.1})`; 
  heroContent.style.transform = `scale(${1 - progress * 0.1})`; 


  /* 5. Shadow */
  hero.style.setProperty("--shadow-opacity", progress);

  /* 6. Scroll-down button fade */
  scrollDownBtn.style.opacity = 1 - progress;
  scrollDownBtn.style.pointerEvents = progress > 0.8 ? "none" : "auto";

  /* 7. Let content below be selectable */
  if (progress >= 0.1) {
    hero.style.pointerEvents = "none";
  } else {
    hero.style.pointerEvents = "auto";
  }

});

const scrollDownBtn = document.querySelector(".scroll-down");

scrollDownBtn.addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
});
