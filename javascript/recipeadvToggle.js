const advToggle = document.getElementsByClassName("bx-chevron-down")[0]
const advDisplay = document.getElementsByClassName("recipe-adv-display")[0]

advToggle.addEventListener("click", () => {
    advDisplay.classList.toggle("active")
    advToggle.classList.toggle("bx-chevron-up")
})