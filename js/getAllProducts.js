import { isScrolledIntoView } from "./utils.js";

const productsContainer = document.querySelector(".products__items");
const productModal = document.querySelector(".product-modal");
const productModalIdText = document.querySelector("#product-modal-id-text");
const productModalClose = document.querySelector(".product-modal__close");
const productModalImg = document.querySelector(".product-modal__img");

const loadMoreProductsContainer = document.querySelector("#load-more-products");

export const pageConfig = {
    pageSize: 14,
    pageNumber: 1
}
let isFetching = false;
const apiUrl = "https://brandstestowy.smallhost.pl/api/random";

async function fetchProducts(pageSize, pageNumber) {
    isFetching = true;

    const response = await fetch(
        `${apiUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    const productsData = await response.json();

    fillProducts(productsData.data);

    isFetching = false;
}

function fillProducts(products) {
    products.forEach(product => {
        const productIdTextValue = product.id < 10 ? `ID: 0${product.id}` : `ID: ${product.id}`;

        const productItem = document.createElement("div");
        productItem.classList.add("products__single-item");
        productItem.setAttribute("onclick", `openModal("${productIdTextValue}", "${product.image}")`);

        const productImg = document.createElement("img");
        productImg.classList.add("products__single-item-img");
        productImg.setAttribute("src", `${product.image}`);

        const productIdText = document.createElement("span");
        productIdText.classList.add("body-text");
        productIdText.classList.add("products__info");
        productIdText.textContent = productIdTextValue;

        productItem.appendChild(productIdText);
        productItem.appendChild(productImg);
        productsContainer.appendChild(productItem);
    });
}

window.openModal = function (idText, image) {
    productModal.showModal();
    productModalIdText.textContent = idText;
    productModalImg.src = `${image}`;
};

function checkToLoadMoreProducts() {
    const isLoadMoreVisible = isScrolledIntoView(loadMoreProductsContainer);

    if (isLoadMoreVisible && !isFetching) {
        pageConfig.pageNumber++;

        fetchProducts(pageConfig.pageSize, pageConfig.pageNumber);
    }
}

productModalClose.addEventListener("click", () => {
    productModal.close();
});

window.addEventListener("scroll", () => {
    checkToLoadMoreProducts();
});

fetchProducts(pageConfig.pageSize, pageConfig.pageNumber);