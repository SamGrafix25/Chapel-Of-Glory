/* ============================================================
   CHAPEL OF GLORY — Main JavaScript
   ============================================================ */

/* ── Navbar scroll state ── */
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
}

/* ── Active nav link ── */
(function markActive() {
  const links = document.querySelectorAll(".nav-links a, .mobile-nav a");
  const current = location.pathname.split("/").pop() || "index.html";
  links.forEach((a) => {
    const href = a.getAttribute("href").split("/").pop();
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
})();

/* ── Hamburger / mobile nav ── */
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* ── Scroll reveal ── */
(function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  els.forEach((el) => io.observe(el));
})();

/* ── Animate stat counters ── */
(function initCounters() {
  const stats = document.querySelectorAll(".stat-number[data-target]");
  if (!stats.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        const start = performance.now();
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  stats.forEach((s) => io.observe(s));
})();
