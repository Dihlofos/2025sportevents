"use strict";
(function () {
  let upButton = document.querySelector(".up");

  if (upButton) {
    window.onscroll = function () {
      if (window.pageYOffset > 260) {
        upButton.classList.add("up--shown");
      } else {
        upButton.classList.remove("up--shown");
      }
    };
  }
})();

"use strict";
(function () {
  const key = "maraphon-cookie-modal-shown";
  let modal = document.querySelector(".js-cookie");
  if (!modal) {
    return;
  }

  let closeButton = modal.querySelector(".js-cookie-close");

  if (!window.localStorage.getItem(key)) {
    modal.classList.remove("hidden");
  }

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.localStorage.setItem(key, true);
  });
})();

"use strict";
(function () {
  const dropdowns = document.querySelectorAll(".js-dropdown");

  if (!dropdowns.length) return;

  document.addEventListener("click", (el) => {
    const clicked = el
      .composedPath()
      .find((value) => value?.classList?.contains("js-dropdown-trigger"));

    if (!clicked) {
      clear();
    }
  });

  if (!dropdowns.length) {
    return;
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".js-dropdown-trigger");

    trigger.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  });

  function clear() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
  }
})();

"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;
      const content = target.nextElementSibling;
      if (!content) return;
      target.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
})();

"use strict";
(async function () {
  const locations = [
    {
      name: "Пушкинская площадь",
      index: 1,
      coords: [37.605822, 55.765412],
    },
    {
      name: "Тверская, площадь «Известия»",
      index: 2,
      coords: [37.604014, 55.765779],
    },
    {
      name: "ТРЕТЬЯКОВСКАЯ (КЛИМЕНТОВСКИЙ ПЕР.)",
      index: 3,
      coords: [37.625856, 55.740876],
    },
    {
      name: "Камергерский переулок",
      index: 4,
      coords: [37.612348, 55.759386],
    },
    {
      name: "Пятницкая улица",
      index: 5,
      coords: [37.628625, 55.740263],
    },
    {
      name: "Мясницкая ул. Площадь et cetera",
      index: 6,
      coords: [37.635664, 55.765053],
    },
    {
      name: "Никольская улица",
      index: 7,
      coords: [37.623631, 55.7579],
    },
    {
      name: "Шахматы",
      index: 8,
      coords: [37.619933, 55.758193],
    },
    {
      name: "Большая никитинская, площадь тасс",
      index: 9,
      coords: [37.599498, 55.757587],
    },
    {
      name: "Кудринская площадь",
      index: 10,
      coords: [37.582924, 55.758762],
    },
    {
      name: "ПАРК ГОРЬКОГО",
      index: 11,
      coords: [37.601848, 55.730188],
    },
    {
      name: "Малй николпесковский переулок",
      index: 12,
      coords: [37.592446, 55.75053],
    },
    {
      name: "Большой николпесковский переулок",
      index: 13,
      coords: [37.590362, 55.750651],
    },
    {
      name: "Третьяковская",
      index: 14,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.6251895, 55.740825],
    },
    {
      name: "Баррикадная",
      index: 15,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.582017, 55.760104],
    },
    {
      name: "Метро «Улица 1905 года»",
      index: 16,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.561509, 55.765281],
    },
    {
      name: "Старая Басманная",
      index: 17,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.657637, 55.763984],
    },
    {
      name: "ТЦ «Атриум»",
      index: 18,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.659173, 55.757339],
    },
    {
      name: "Лаврушинский переулок",
      index: 19,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.621444, 55.741693],
    },
    {
      name: "Добрынинская",
      index: 20,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.622745, 55.728995],
    },
  ];
  // locations-dropdown constants
  const dropdownContainer = document.querySelector(".js-locations-dropdown");
  const activeString = "is-active";
  if (!dropdownContainer) return;

  const content = dropdownContainer.querySelector(
    ".js-locations-dropdown-content"
  );
  const items = dropdownContainer.querySelectorAll(
    ".js-locations-dropdown-item"
  );
  const trigger = dropdownContainer.querySelector(
    ".js-locations-dropdown-trigger"
  );
  const triggerSport = dropdownContainer.querySelector(
    ".js-locations-dropdown-trigger-sport"
  );
  const triggerName = dropdownContainer.querySelector(
    ".js-locations-dropdown-trigger-name"
  );

  //content constants
  const contentContainer = document.querySelector(
    ".js-content-night-container"
  );
  if (!contentContainer) return;
  const contentsEls = contentContainer.querySelectorAll(".js-content");
  const contentLeftArrow = contentContainer.querySelector(
    ".js-content-arrow-left"
  );
  const contentRightArrow = contentContainer.querySelector(
    ".js-content-arrow-right"
  );

  //map constants
  const legend = document.querySelector(".js-legend");
  if (!legend) return;

  const legendItems = legend.querySelectorAll(".js-legend-item");
  const legendLinks = legend.querySelectorAll(".js-legend-link");

  const mapInstance = await initMap();

  trigger.addEventListener("click", () => {
    trigger.classList.toggle(activeString);
    content.classList.toggle(activeString);
  });

  contentLeftArrow.addEventListener("click", () => {
    const triggerIndex = Number(trigger.dataset.thumbIndex);
    if (triggerIndex === 1) return;
    setActiveLocation(triggerIndex - 1);
  });

  contentRightArrow.addEventListener("click", () => {
    const triggerIndex = Number(trigger.dataset.thumbIndex);
    if (triggerIndex === contentsEls.length) return;
    setActiveLocation(triggerIndex + 1);
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      setActiveLocation(Number(item.dataset.thumbIndex));
    });
  });

  legendItems.forEach((item) => {
    item.addEventListener("click", () => {
      setActiveLegend(Number(item.dataset.thumbIndex));
    });
  });

  legendLinks.forEach((item) => {
    item.addEventListener("click", () => {
      const itemIndex = Number(item.dataset.thumbIndex);
      setActiveLocation(itemIndex);
    });
  });

  document.addEventListener("click", (el) => {
    const clicked = el
      .composedPath()
      .find((value) =>
        value?.classList?.contains("js-locations-dropdown-trigger")
      );

    if (!clicked) {
      clear();
    }
  });

  function clear() {
    content.classList.remove(activeString);
    trigger.classList.remove(activeString);
  }

  function clearItems() {
    items.forEach((item) => {
      item.classList.remove(activeString);
    });
  }

  function setActiveLegend(index) {
    clearLegendItems();
    const legendItem = Array.from(legendItems).find(
      (item) => Number(item.dataset.thumbIndex) === index
    );
    const markers = document.querySelectorAll(".js-marker");

    const selectedMarker = Array.from(markers).find(
      (marker) => Number(marker.dataset.thumbIndex) === index
    );

    clearMarkers();
    selectedMarker.classList.add("is-active");
    legendItem.classList.add(activeString);
    const selectedLocation = locations.find(
      (location) => location.index === index
    );

    mapInstance.setLocation({
      center: selectedLocation.coords,
      zoom: 17,
      duration: 200, // Animation of moving map will take 200 milliseconds
      easing: "ease-in-out", // Animation easing function
    });
  }

  function clearLegendItems() {
    legendItems.forEach((item) => {
      item.classList.remove(activeString);
    });
  }

  function clearContents() {
    contentsEls.forEach((item) => {
      item.classList.remove(activeString);
    });
  }

  function setActiveLocation(index) {
    const item = Array.from(items).find(
      (item) => Number(item.dataset.thumbIndex) === index
    );

    if (!item) {
      return;
    }

    clearItems();
    clearContents();
    // set active index - it needs for arrows
    trigger.dataset.thumbIndex = index;

    console.log("index", items, index);

    const contentItem = Array.from(contentsEls).find(
      (item) => Number(item.dataset.contentIndex) === index
    );

    const name = item.querySelector(
      ".js-locations-dropdown-item-name"
    ).textContent;
    const sport = item.querySelector(
      ".js-locations-dropdown-item-sport"
    ).textContent;

    triggerName.textContent = name;
    triggerSport.textContent = sport;

    item.classList.add(activeString);
    contentItem.classList.add(activeString);

    reinitSlider(document.querySelector(`[data-content-index="${index}"]`));
  }

  function reinitSlider(container) {
    const cont = container.querySelector(".js-people-slider-container");
    const slider = container.querySelector(".js-people-slider");

    const partnerSlider = container.querySelector(".js-partner-slider");

    const wrapper = slider?.querySelector(".swiper-wrapper");
    const partnersWrapper = partnerSlider?.querySelector(".swiper-wrapper");
    const vw = window.innerWidth;

    if (wrapper) {
      const id = slider.id;

      if (wrapper.childNodes.length > 3 && vw > 1024) {
        setTimeout(() => {
          new Swiper(`#${id}`, {
            // Optional parameters
            slidesPerView: 3,
            spaceBetween: 30,
            initialSlide: 0,
            draggable: false,
            pagination: false,
            loop: false,

            navigation: {
              nextEl: ".js-people-next-extreme",
              prevEl: ".js-people-prev-extreme",
            },
          });
        }, 300);
      } else {
        cont.classList.add("disabled");
      }
      return;
    }

    if (partnersWrapper) {
      if (partnersWrapper?.childNodes.length > 3 && vw >= 1024) {
        setTimeout(() => {
          new Swiper(`.js-partner-slider`, {
            // Optional parameters
            slidesPerView: "auto",
            spaceBetween: 30,
            initialSlide: 0,
            draggable: false,
            pagination: false,
            loop: false,
            navigation: {
              nextEl: ".js-people-next-concert",
              prevEl: ".js-people-prev-concert",
            },
          });
        }, 300);
      } else {
        cont.classList.add("disabled");
      }
    }
  }

  async function initMap() {
    const vw = window.innerWidth;
    await ymaps3.ready;

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapMarker,
      YMapDefaultFeaturesLayer,
    } = ymaps3;

    const map = new YMap(
      document.querySelector(".js-map"),
      {
        location: {
          center: [37.618435, 55.74713],
          zoom: vw > 767 ? 13 : 12,
        },
      },
      [
        // Add a map scheme layer
        new YMapDefaultSchemeLayer({}),
        // Add a layer of geo objects to display the markers
        new YMapDefaultFeaturesLayer({}),
      ]
    );

    locations.forEach((location) => {
      const markerElement = document.createElement("div");
      markerElement.className = "map-night__marker js-marker";
      markerElement.innerText = location.index;
      markerElement.dataset.thumbIndex = location.index;

      const marker = new YMapMarker(
        {
          coordinates: location.coords,
          draggable: false,
          mapFollowsOnDrag: false,
        },
        markerElement
      );

      map.addChild(marker);

      markerElement.addEventListener("click", () => {
        const legendItem = Array.from(legendItems).find(
          (item) => Number(item.dataset.thumbIndex) === Number(location.index)
        );
        setActiveLegend(Number(location.index));
        legend.scrollTop = findPosition(legendItem) - findPosition(legend);

        clearMarkers();

        markerElement.classList.add("is-active");

        map.setLocation({
          center: location.coords,
          zoom: 17,
          duration: 200, // Animation of moving map will take 200 milliseconds
          easing: "ease-in-out", // Animation easing function
        });
      });
    });

    return map;
  }

  function findPosition(obj) {
    let currenttop = 0;
    if (obj.offsetParent) {
      do {
        currenttop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return currenttop;
    }
  }

  function clearMarkers() {
    const markers = document.querySelectorAll(".js-marker");
    Array.from(markers).forEach((marker) => {
      marker.classList.remove("is-active");
    });
  }
})();

"use strict";
(function () {
  const contentsEls = document.querySelectorAll(".js-content");
  const thumbs = document.querySelectorAll(".js-thumb");

  const slider = document.querySelector(".js-slider");

  if (!slider) {
    return;
  }

  const swiperSlider = new Swiper(".js-slider", {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 39,
    initialSlide: 0,
    speed: 0,
    draggable: false,
    pagination: false,
    loop: false,
    allowTouchMove: false,
    slideToClickedSlide: false,
    on: {
      slideChange: function (e) {
        const vw = window.innerWidth;

        if (vw > 743) {
          return;
        }

        const currentSlide = e.slides[e.realIndex];

        if (!currentSlide) return;

        const locationNumber = currentSlide.dataset.thumbIndex;

        toggleContent(locationNumber);
      },
    },

    navigation: {
      nextEl: ".swiper__next",
      prevEl: ".swiper__prev",
    },
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 12,
        draggable: true,
        allowTouchMove: true,
        centeredSlides: true,
        loop: true,
      },

      744: {
        slidesPerView: "auto",
        spaceBetween: 15,
        draggable: true,
        allowTouchMove: true,
        speed: 300,
      },

      1025: {
        slidesPerView: "auto",
        spaceBetween: 39,
      },
    },
  });

  const map = document.querySelector(".js-map");
  const mapScroller = document.querySelector(".js-map-scroll");
  const mapModal = document.querySelector(".js-map-modal");
  const modalText = mapModal.querySelector(".js-map-modal-text");
  const modalGoTo = mapModal.querySelector(".js-map-modal-goto");
  const modalClose = mapModal.querySelector(".js-map-modal-close");
  const bullitItems = document.querySelectorAll(".js-bullit");

  const figures = map.querySelectorAll(".figure");

  const locations = {
    1: "МОТОФРИСТАЙЛ + БАГГИ",
    2: "скейт-парк",
    3: "воркаут",
    4: "паркур",
    5: "настольный теннис",
    6: "шахматы",
    7: "фан-встречи",
    8: "стронгмен",
    9: "стрельба из лука",
    10: "детская зона",
    11: "брейк-данс",
    12: "стантрайдиниг",
    13: "сайклинг",
    14: "беговелы",
    15: "фк спартак",
    16: "фк динамо",
    17: "фк локомотив",
    18: "фк цска",
    19: "Бокс",
    20: "полоса препятствий",
    21: "информационная стойка",
    22: "Живые шахматы",
    23: "Аквагрим/Авиамоделирование",
    24: "концерт",
    25: "Битбокс",
    26: "Лазертаг",
    27: "Мастер‑класс по Гимнастике",
    28: "Этноспорт",
    29: "Зеленый марофон",
    30: "Кубик рубика",
  };

  console.log(getURls());

  // Функция для генерации
  function getURls() {
    Object.entries(locations).forEach(([index, value]) => {
      console.log(
        value,
        `https://day.sport.moscow/?locationId=${index}#locations`
      );
    });
  }

  // 32 убрать, когда заработает.
  const numbersWithoutAction = ["21"];

  const concertNumber = "24";
  const childZone = ["23", "27"]; // TODO Поменять, когда нумерацию заменят!

  const partnersLinks = {};
  const vw = window.innerWidth;
  // ACTIONS

  setTimeout(() => {
    mapScroller?.scroll({ left: 275 });
  }, 500);

  figures.forEach((figure) => {
    figure.addEventListener("click", () => {
      // все классы фигур идут вид "figure /*номер*/" поэтому смело берем [1]
      onFigureClick(figure);
    });
  });

  modalGoTo.addEventListener("click", () => {
    const locationNumber = modalGoTo.dataset.locationNumber;
    onGoToLocation(locationNumber);
    closeModal();
  });

  modalClose.addEventListener("click", () => {
    closeModal();
  });

  thumbs.forEach((item) => {
    const thumbIndex = item.dataset.thumbIndex;
    item.addEventListener("click", () => {
      toggleContent(thumbIndex);
    });
  });

  init();

  // FUNCTIONS

  function init() {
    const locationNumber = findGetParameter("locationId");
    const artObjectLinks = document.querySelectorAll(".js-art-object-link");
    if (locationNumber) {
      setTimeout(() => {
        onGoToLocation(locationNumber);
      }, 0);
    }

    // Собираем легенду.
    fillLegendList();
    artObjectLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const figure = document.getElementById(`figure ${artObject}`);
        onFigureClick(figure);
      });
    });
    setTimeout(() => {
      reinitSlider(document.querySelector(`[data-content-index="1"]`));
    }, 300);

    bullitItems.forEach((item) => {
      item.addEventListener("click", (el) => {
        onGoToLocation(el.currentTarget.dataset.locationId);
      });
    });
  }

  function onFigureClick(figure) {
    modalGoTo.classList.remove("is-hidden");
    let locationNumber = figure.classList[1].split("_")[1];
    const mapOffset =
      document.getElementById("map-title").getBoundingClientRect().top +
      document.documentElement.scrollTop;

    const legendItem = document.querySelector(
      `.js-legend-item[data-legend-item-id="${locationNumber}"]`
    );

    if (locationNumber === concertNumber) {
      modalGoTo.href = "#concert";
    } else if (Object.keys(partnersLinks).includes(locationNumber)) {
      modalGoTo.target = "_blank";
      modalGoTo.href = partnersLinks[locationNumber];
    } else {
      modalGoTo.href = "#locations-slider";
    }

    if (numbersWithoutAction.includes(locationNumber)) {
      modalGoTo.classList.add("is-hidden");
    }

    window.scroll.animateScroll(mapOffset);

    if (figure.classList.contains("is-active")) {
      resetFigures();
      resetLegends();
      closeModal(locationNumber);
    } else {
      resetFigures();
      resetLegends();
      figure.classList.add("is-active");
      openModal(locationNumber);
      legendItem.classList.add("is-active");
    }
  }

  function resetFigures() {
    figures.forEach((figure) => {
      figure.classList.remove("is-active");
    });
  }

  function resetLegends() {
    const legends = document.querySelectorAll(".js-legend-item");
    legends.forEach((legend) => {
      legend.classList.remove("is-active");
    });
  }

  function openModal(locationNumber) {
    if (!locations[locationNumber]) return;

    modalText.textContent = locations[locationNumber];

    let targetNumber = locationNumber;

    if (childZone.includes(locationNumber)) {
      targetNumber = 10;
    }

    modalGoTo.dataset.locationNumber = targetNumber;

    mapModal.classList.add("is-active");
  }

  function closeModal() {
    mapModal.classList.remove("is-active");
    setTimeout(() => {
      modalText.textContent = "";
      modalGoTo.dataset.locationNumber = "";
    }, 300);
    resetFigures();
    resetLegends();
  }

  function onGoToLocation(locationNumber) {
    let number = locationNumber;
    if (numbersWithoutAction.includes(number)) {
      return;
    }

    if (number === concertNumber) return;

    toggleContent(number);

    closeModal();

    swiperSlider.slideTo(getSlideIndex(number));
    // добавить скролл
  }

  function getSlideIndex(locationNumber) {
    const element = document.querySelector(
      `.js-thumb[data-thumb-index="${locationNumber}"]`
    );
    const elIndex = Array.from(element.parentNode.children).indexOf(element);
    return Number(elIndex);
  }

  function toggleContent(locationNumber) {
    const thumbs = document.querySelectorAll(".js-thumb");
    reinitSlider(
      document.querySelector(`[data-content-index="${locationNumber}"]`)
    );

    thumbs.forEach((item) => {
      item.classList.remove("is-active");
    });

    contentsEls.forEach((item) => {
      const contentIndex = item.dataset.contentIndex;
      if (Number(contentIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });

    thumbs.forEach((item) => {
      const thumbIndex = item.dataset.thumbIndex;

      if (Number(thumbIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });
  }

  function findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }

  function fillLegendList() {
    const container = document.querySelector(".js-legend-list");
    const wrapper = document.querySelector(".js-legend-wrapper");
    const button = document.querySelector(".js-legend-more-button");

    const locationsArray = Object.entries(locations);

    locationsArray.forEach(([index, value]) => {
      const figure = document.querySelector(`.figure_${index}`);
      // не показываем локации, которых нет на карте.
      if (!figure) return;

      const itemLi = document.createElement("li");
      const itemSpan = document.createElement("span");
      const itemP = document.createElement("p");

      itemLi.classList.add("map__list-item");
      itemLi.classList.add("js-legend-item");
      itemLi.dataset["legendItemId"] = index;

      itemLi.addEventListener("click", function () {
        onFigureClick(figure);
      });

      itemSpan.textContent = `${index}.`;
      itemP.textContent = value;
      itemLi.append(itemSpan);
      itemLi.append(itemP);
      container.append(itemLi);
    });

    button.addEventListener("click", function () {
      wrapper.classList.remove("more-hide");
    });
  }

  function reinitSlider(container) {
    const cont = container.querySelector(".js-people-slider-container");
    const slider = container.querySelector(".js-people-slider");

    const partnerSlider = container.querySelector(".js-partner-slider");

    const wrapper = slider?.querySelector(".swiper-wrapper");
    const partnersWrapper = partnerSlider?.querySelector(".swiper-wrapper");

    if (wrapper) {
      const id = slider.id;

      if (wrapper.childNodes.length > 3 && vw > 1024) {
        setTimeout(() => {
          new Swiper(`#${id}`, {
            // Optional parameters
            slidesPerView: 3,
            spaceBetween: 30,
            initialSlide: 0,
            draggable: false,
            pagination: false,
            loop: false,

            navigation: {
              nextEl: ".js-people-next-extreme",
              prevEl: ".js-people-prev-extreme",
            },
          });
        }, 300);
      } else {
        cont.classList.add("disabled");
      }
      return;
    }

    if (partnersWrapper) {
      if (partnersWrapper?.childNodes.length > 3 && vw >= 1024) {
        setTimeout(() => {
          new Swiper(`.js-partner-slider`, {
            // Optional parameters
            slidesPerView: "auto",
            spaceBetween: 30,
            initialSlide: 0,
            draggable: false,
            pagination: false,
            loop: false,
            navigation: {
              nextEl: ".js-people-next-concert",
              prevEl: ".js-people-prev-concert",
            },
          });
        }, 300);
      } else {
        cont.classList.add("disabled");
      }
    }
  }
})();

"use strict";
(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = nav.querySelector('.js-nav-toggler');
  const closeButton = nav.querySelector('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
  })

  closeButton.addEventListener('click', () => {
    closeNav();
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    })
  })


  function closeNav() {
    nav.classList.remove('is-active');
  }


})();

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

"use strict";
(function () {
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
  });
})();
