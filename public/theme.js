(function () {
  try {
    const root = document.documentElement;
    const theme = localStorage.getItem("theme");

    root.classList.remove("dark", "light");

    if (theme === "dark" || theme === "light") {
      root.classList.add(theme);
    } else {
      root.classList.add("dark");
    }
  } catch (e) {}
})();
