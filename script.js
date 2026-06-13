const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(
  ".navbar-nav .nav-link:not(.nav-contact)",
);
const revealSelectors = [
  ".section-title",
  ".section-subtitle",
  ".about-card",
  ".skill-item",
  ".project-card",
].join(", ");
const animatedItems = document.querySelectorAll(revealSelectors);
let ticking = false;

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (
      window.bootstrap &&
      navbarCollapse &&
      navbarCollapse.classList.contains("show")
    ) {
      new window.bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

function updateActiveNav() {
  let current = "";
  const navbar = document.querySelector(".custom-navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 74;
  const offset = navbarHeight + 60;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      window.pageYOffset + offset >= sectionTop &&
      window.pageYOffset + offset < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    const href = item.getAttribute("href");

    item.classList.remove("active");

    if (href && href.slice(1) === current) {
      item.classList.add("active");
    }
  });
}

function showRevealItem(item) {
  item.classList.add("is-visible");
}

function setupRevealAnimation() {
  animatedItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 0.08}s`;
  });

  if (!("IntersectionObserver" in window)) {
    animatedItems.forEach(showRevealItem);
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showRevealItem(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  animatedItems.forEach((item) => revealObserver.observe(item));
}

window.addEventListener(
  "scroll",
  () => {
    if (ticking) {
      return;
    }

    window.requestAnimationFrame(() => {
      updateActiveNav();
      ticking = false;
    });

    ticking = true;
  },
  { passive: true },
);
updateActiveNav();
setupRevealAnimation();
