const advToggle = document.getElementsByClassName("bx-chevron-down")[0]
const advDisplay = document.getElementsByClassName("recipe-adv-display")[0]

advToggle.addEventListener("click", () => { // When advanced toggle icon is clicked, add "active" class to advanced display to reveal it and replace down arrow icon with up arrow.
    advDisplay.classList.toggle("active")
    advToggle.classList.toggle("bx-chevron-up")
})