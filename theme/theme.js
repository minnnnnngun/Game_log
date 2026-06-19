const THEME_STORAGE_KEY = "gameLogTheme";

function applyTheme(theme) {
  document.body.classList.toggle("light-mode", theme === "light");
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.textContent = theme === "light" ? "☀" : "☾";
    button.setAttribute("aria-label", theme === "light" ? "다크 모드로 변경" : "화이트 모드로 변경");
    button.title = theme === "light" ? "다크 모드" : "화이트 모드";
  });
}

function getSavedTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || "dark";
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getSavedTheme());

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  });
});
