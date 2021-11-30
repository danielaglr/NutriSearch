const navToggle = document.getElementsByClassName("bx-menu")[0]
const navLinks = document.getElementsByClassName("nav-link-mobile-c")[0]

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    navToggle.classList.toggle("bx-x")
})