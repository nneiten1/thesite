const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

const setMenuState = (isOpen) => {
  header.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  setMenuState(!header.classList.contains("is-open"));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    setMenuState(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    setMenuState(false);
  }
});
