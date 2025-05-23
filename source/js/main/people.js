"use strict";
(function () {
  const slider = document.querySelector(".js-people-slider-concert-container");
  if (!slider) {
    return;
  }
  const vw = window.innerWidth;
  const wrapper = slider.querySelector(".swiper-wrapper");

  if (wrapper.childNodes.length > 3 && vw > 1024) {
    new Swiper(`.js-people-slider-concert`, {
      // Optional parameters
      slidesPerView: 3,
      spaceBetween: 58,
      initialSlide: 0,
      draggable: false,
      pagination: false,
      loop: false,
      navigation: {
        nextEl: ".js-people-next-concert",
        prevEl: ".js-people-prev-concert",
      },
    });
  } else {
    slider.classList.add("disabled");
  }
})();
