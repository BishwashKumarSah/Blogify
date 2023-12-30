document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const searchClose = document.getElementById("searchClose");
  searchBtn.addEventListener("click", () => {
    searchBar.style.visibility = "visible";
    searchBar.classList.add("open");
    this.setAttribute("aria-expanded", "true");
    searchInput.focus();
  });
  searchClose.addEventListener("click", () => {
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove("open");
    this.setAttribute("aria-expanded", "false");
  });
});
