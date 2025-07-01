export function fetchAllProducts() {
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

    fetchProducts()
}