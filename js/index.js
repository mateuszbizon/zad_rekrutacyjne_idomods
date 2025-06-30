const burgerMenuBtn = document.querySelector("#burger-menu-btn")
const burgerMenuCloseBtn = document.querySelector("#burger-menu-close-btn")
const burgerMenu = document.querySelector(".nav__burger-menu")
const burgerMenuOverlay = document.querySelector(".nav__burger-menu-overlay")

function closeBurgerMenu() {
    burgerMenu.classList.remove("open")
    burgerMenuOverlay.classList.remove("open")
}

burgerMenuBtn.addEventListener("click", () => {
    burgerMenu.classList.add("open")
    burgerMenuOverlay.classList.add("open")
})

burgerMenuCloseBtn.addEventListener("click", () => {
   closeBurgerMenu()
})

burgerMenuOverlay.addEventListener("click", () => {
    closeBurgerMenu()
})