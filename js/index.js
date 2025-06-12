// COLOR THEME TOGGLER
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("colorModeToggle");
  if (!toggle) return;

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedTheme = localStorage.getItem("theme");
  let darkMode =
    savedTheme === "dark" || (!savedTheme && prefersDark);

  function setTheme(dark) {
    document.body.classList.toggle("dark-mode", dark);
    toggle.innerHTML = dark
      ? '<i class="bi bi-sun"></i> Light Mode'
      : '<i class="bi bi-moon"></i> Dark Mode';
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  setTheme(darkMode);

  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    darkMode = !darkMode;
    setTheme(darkMode);
  });
});

// NAVBAR COLLAPSE
document.addEventListener("click", function (event) {
  const navbarToggler = document.querySelector(
    ".navbar-toggler"
  );
  const navbarCollapse = document.getElementById(
    "navbarNavAltMarkup"
  );

  if (
    navbarCollapse.classList.contains("show") &&
    !navbarCollapse.contains(event.target) &&
    !navbarToggler.contains(event.target)
  ) {
    navbarToggler.click();
  }

  if (
    navbarCollapse.classList.contains("show") &&
    event.target.classList.contains("nav-link")
  ) {
    navbarToggler.click();
  }
});

// HOVER EFFECT ON POLAROID
document
  .querySelectorAll(".polaroid")
  .forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.classList.add("polaroid-hover");
    });
    card.addEventListener("mouseleave", function () {
      card.classList.remove("polaroid-hover");
    });
  });

// CHANGE COLLAPSE BUTTON LOOK
document
  .querySelectorAll('#projects [data-bs-toggle="collapse"]')
  .forEach((btn) => {
    const chevron = btn.querySelector(".bi");
    const targetId = btn.getAttribute("data-bs-target");
    if (!chevron || !targetId) return;
    const collapseEl = document.querySelector(targetId);

    collapseEl.addEventListener("show.bs.collapse", () => {
      chevron.classList.remove("bi-chevron-right");
      chevron.classList.add("bi-chevron-down");
      btn.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = " Less";
        }
      });
    });
    collapseEl.addEventListener("hide.bs.collapse", () => {
      chevron.classList.remove("bi-chevron-down");
      chevron.classList.add("bi-chevron-right");
      btn.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = " More";
        }
      });
    });
  });

// SCROLL TO UNCOLLAPSED TEXT
document
  .querySelectorAll('#projects [data-bs-toggle="collapse"]')
  .forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = btn.getAttribute("data-bs-target");
      if (!targetId) return;
      const el = document.querySelector(targetId);
      if (!el) return;
      el.addEventListener(
        "shown.bs.collapse",
        function handler() {
          const rect = el.getBoundingClientRect();
          const targetY =
            window.scrollY +
            rect.top -
            (window.innerHeight * 3) / 4 +
            rect.height / 2;
          smoothScrollTo(targetY, 900);
          el.removeEventListener(
            "shown.bs.collapse",
            handler
          );
        }
      );
    });
  });

// SMOOTH SCROLL
function smoothScrollTo(target, duration) {
  const start = window.scrollY;
  const change = target - start;
  const startTime = performance.now();
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, start + change * ease);
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}

// FORM VALIDATION
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(
    ".needs-validation"
  );
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
});

// SCROLL TO TOP
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById(
    "scroll-to-top-btn"
  );
  const offsetFromBottom = 200;

  function updateButtonPosition() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const distanceFromBottom =
      docHeight - (scrollY + windowHeight);

    if (scrollY > 100) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }

    if (distanceFromBottom < offsetFromBottom) {
      scrollBtn.style.bottom = `${
        offsetFromBottom - distanceFromBottom + 32
      }px`;
    } else {
      scrollBtn.style.bottom = "2rem";
    }
  }

  window.addEventListener("scroll", updateButtonPosition);
  window.addEventListener("resize", updateButtonPosition);

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
