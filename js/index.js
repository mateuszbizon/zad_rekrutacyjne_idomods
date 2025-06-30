const burgerMenuBtn = document.querySelector("#burger-menu-btn")
const burgerMenuCloseBtn = document.querySelector("#burger-menu-close-btn")
const burgerMenu = document.querySelector(".nav__burger-menu")
const burgerMenuOverlay = document.querySelector(".nav__burger-menu-overlay")
const burgerMenuLinksContainer = document.querySelector(".nav__links-list--mobile")
const burgerMenuLinks = burgerMenuLinksContainer.querySelectorAll(".nav__links-list-item")

function closeBurgerMenu() {
    burgerMenu.classList.remove("open")
    burgerMenuOverlay.classList.remove("open")
}

function closeBurgerMenuWithLink() {
    burgerMenuLinks.forEach(item => {
        item.addEventListener("click", () => {
            closeBurgerMenu()
        })
    })
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

closeBurgerMenuWithLink()