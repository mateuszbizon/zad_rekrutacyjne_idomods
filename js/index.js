const burgerMenuBtn = document.querySelector("#burger-menu-btn")
const burgerMenuCloseBtn = document.querySelector("#burger-menu-close-btn")
const burgerMenu = document.querySelector(".nav__burger-menu")
const burgerMenuOverlay = document.querySelector(".nav__burger-menu-overlay")
const burgerMenuLinksContainer = document.querySelector(".nav__links-list--mobile")
const burgerMenuLinks = burgerMenuLinksContainer.querySelectorAll(".nav__links-list-item")

const productsContainer = document.querySelector(".products__items")

const defaultProductsSizePerPage = 14
const apiUrl = "https://brandstestowy.smallhost.pl/api/random"

async function fetchProducts(pageSize = defaultProductsSizePerPage) {
    const response = await fetch(`${apiUrl}?pageSize=${pageSize}`)
    const productsData = await response.json()

    fillProducts(productsData.data)
}

function fillProducts(products) {
    productsContainer.textContent = ""

    products.forEach(product => {
        const productItem = document.createElement("div")
        productItem.classList.add("products__single-item")

        const productImg = document.createElement("img")
        productImg.classList.add("products__single-item-img")
        productImg.setAttribute("src", `${product.image}`)

        const productIdText = document.createElement("span")
        productIdText.classList.add("body-text")
        productIdText.classList.add("products__info")
        productIdText.textContent = product.id < 10 ? `ID: 0${product.id}` : `ID: ${product.id}`

        productItem.appendChild(productIdText)
        productItem.appendChild(productImg)
        productsContainer.appendChild(productItem)
    })
}

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
fetchProducts()