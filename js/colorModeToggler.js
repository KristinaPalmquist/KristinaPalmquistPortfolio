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
