const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

menuButton?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id], footer[id]")];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
);

sections.forEach((section) => observer.observe(section));
