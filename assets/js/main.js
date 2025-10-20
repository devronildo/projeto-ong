// Atualiza o ano do rodapé automaticamente
document.querySelectorAll("#year, #year2").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Controle do menu hambúrguer
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");
  });
}


 