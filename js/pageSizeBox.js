import { pageConfig } from "./getAllProducts.js";

const pageSizeBoxBtn = document.querySelector(".page-size-box__btn");
const pageSizeBoxNumberValue = document.querySelector(".page-size-box__number");
const pageSizeBoxList = document.querySelector(".page-size-box__list");

function generatePageSizeBoxValues() {
    const pageSizes = [pageConfig.pageSize, 24, 36];

    pageSizeBoxNumberValue.textContent = pageConfig.pageSize;

    pageSizes.forEach(item => {
        const pageSizeBoxListItem = document.createElement("li");

        pageSizeBoxListItem.classList.add("page-size-box__list-item");
        pageSizeBoxListItem.textContent = item;
        pageSizeBoxListItem.addEventListener("click", (e) => {
            pageConfig.pageSize = e.target.textContent;
            pageSizeBoxNumberValue.textContent = e.target.textContent;
            pageSizeBoxList.classList.remove("open");
        });

        pageSizeBoxList.appendChild(pageSizeBoxListItem);
    });
}

pageSizeBoxBtn.addEventListener("click", () => {
    pageSizeBoxList.classList.toggle("open");
});

generatePageSizeBoxValues();