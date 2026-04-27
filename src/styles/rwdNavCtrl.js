const navLinks = document.querySelectorAll(".nav-link");
const rwdNav = document.querySelector("#rwdNav");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    rwdNav.checked = false;
  });
});
