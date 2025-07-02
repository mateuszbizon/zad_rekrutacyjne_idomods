const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 24,
    slidesPerView: "auto",
})

const swiperNextBtn = document.querySelector(".swiper-next-btn")

swiperNextBtn.addEventListener("click", () => {
    swiper.slideNext()
})