const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

const setMenuState = (isOpen) => {
  if (!header || !menuToggle) return;
  header.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    setMenuState(!header.classList.contains("is-open"));
  });
}

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

const contactForm = document.querySelector("[data-contact-form]");
const terminalButton = document.querySelector(".terminal-button");

if (contactForm && terminalButton) {
  const terminalButtonText = terminalButton.querySelector("span:last-child");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Nitebyte Systems inquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n")
    );

    terminalButton.classList.add("is-running");
    terminalButtonText.textContent = "opening mail client...";

    window.setTimeout(() => {
      terminalButton.classList.remove("is-running");
      window.location.href = `mailto:nickneitenbach@outlook.com?subject=${subject}&body=${body}`;
      terminalButtonText.textContent = "./send-inquiry";
    }, 650);
  });
}
