export function initProducts() {
	const productsContainer = document.querySelector(".products__items");
	const productModal = document.querySelector(".product-modal");
	const productModalIdText = document.querySelector("#product-modal-id-text");
	const productModalClose = document.querySelector(".product-modal__close");
	const productModalImg = document.querySelector(".product-modal__img");

	const pageSizeBoxBtn = document.querySelector(".page-size-box__btn");
	const pageSizeBoxNumberValue = document.querySelector(".page-size-box__number");
	const pageSizeBoxList = document.querySelector(".page-size-box__list");

	const loadMoreProductsContainer = document.querySelector("#load-more-products");

	let pageSize = 14;
	let pageNumber = 1;
	let isFetching = false;
	const apiUrl = "https://brandstestowy.smallhost.pl/api/random";

	async function fetchProducts(pageSize, pageNumberProp) {
		isFetching = true;

		const response = await fetch(
			`${apiUrl}?pageSize=${pageSize}&pageNumber=${pageNumberProp}`
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

	function generatePageSizeBoxValues() {
		const pageSizes = [pageSize, 24, 36];

		pageSizeBoxNumberValue.textContent = pageSize;

		pageSizes.forEach(item => {
			const pageSizeBoxListItem = document.createElement("li");

			pageSizeBoxListItem.classList.add("page-size-box__list-item");
			pageSizeBoxListItem.textContent = item;
			pageSizeBoxListItem.addEventListener("click", (e) => {
				pageSize = e.target.textContent;
				pageSizeBoxNumberValue.textContent = e.target.textContent;
				pageSizeBoxList.classList.remove("open");
			});

			pageSizeBoxList.appendChild(pageSizeBoxListItem);
		});
	}

	function isScrolledIntoView(el) {
		const rect = el.getBoundingClientRect();
		const elemTop = rect.top;
		const elemBottom = rect.bottom;

		const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

		return isVisible;
	}

	function checkToLoadMoreProducts() {
		const isLoadMoreVisible = isScrolledIntoView(loadMoreProductsContainer);

		if (isLoadMoreVisible && !isFetching) {
			pageNumber++;

			fetchProducts(pageSize, pageNumber);
		}
	}

	productModalClose.addEventListener("click", () => {
		productModal.close();
	});

	pageSizeBoxBtn.addEventListener("click", () => {
		pageSizeBoxList.classList.toggle("open");
	});

	window.addEventListener("scroll", () => {
		checkToLoadMoreProducts();
	});

	generatePageSizeBoxValues();
	fetchProducts(pageSize, pageNumber);
}
