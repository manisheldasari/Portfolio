"use strict";

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navPill = document.querySelector(".nav-pill");
const primaryLinks = document.querySelector("#primary-links");

if (menuToggle && navPill && primaryLinks) {
  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".sr-only").textContent = isOpen ? "Close navigation" : "Open navigation";
    navPill.classList.toggle("is-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  primaryLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !navPill.contains(event.target)) setMenuOpen(false);
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const revealTargets = document.querySelectorAll(
  ".section-kicker, .about-grid, .proof-row, .expertise-card, .work-card, .process-list li, .timeline-item, .tool-grid li, .resume-content, .contact-main"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
