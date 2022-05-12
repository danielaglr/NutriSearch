const navToggle = document.getElementsByClassName("bx-menu")[0]
const navLinks = document.getElementsByClassName("nav-link-mobile-c")[0]

navToggle.addEventListener("click", () => { // When navigation menu icon is clicked, add "active" class to nav links to display them and change the nav menu icon to x icon.
    navLinks.classList.toggle("active")
    navToggle.classList.toggle("bx-x")
})