// Collapse navbar if user either clicks link or clicks outside navbar
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

// Change button look when collapsed and not
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
          node.textContent = " Read less";
        }
      });
    });
    collapseEl.addEventListener("hide.bs.collapse", () => {
      chevron.classList.remove("bi-chevron-down");
      chevron.classList.add("bi-chevron-right");
      btn.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = " Read more";
        }
      });
    });
  });

// Scroll down when collapsed text is opened
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

// Custom smooth scroll function
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

// Form validation
// (function () {
//   "use strict";

//   var forms = document.querySelectorAll(
//     ".needs-validation"
//   );

//   Array.prototype.slice
//     .call(forms)
//     .forEach(function (form) {
//       form.addEventListener(
//         "submit",
//         function (event) {
//           if (!form.checkValidity()) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add("was-validated");
//         },
//         false
//       );
//     });
// })();

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

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.forms.emailForm;
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     const errors = [];
//     const get = (name) => form[name]?.value.trim();

//     if (!get("firstName"))
//       errors.push("First name is required.");
//     if (!get("lastName"))
//       errors.push("Last name is required.");
//     const email = get("email");
//     if (!email) {
//       errors.push("Email is required.");
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       errors.push("Email is not valid.");
//     }
//     if (!get("message"))
//       errors.push("Message is required.");

//     if (errors.length) {
//       e.preventDefault();
//       alert(errors.join("\n"));
//       form.classList.add("was-validated");
//     }
//   });
// });
