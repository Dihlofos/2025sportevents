"use strict";
(async function () {
  const locations = [
    {
      name: "Пушкинская площадь",
      index: 1,
      coords: [37.605822, 55.765412],
    },
    {
      name: "Тверская улица, площадь известия",
      index: 2,
      coords: [37.604211, 55.765809],
    },
    {
      name: "Мясницкая ул. Площадь et cetera",
      index: 3,
      coords: [37.635664, 55.765053],
    },
    {
      name: "Никольская улица",
      index: 4,
      coords: [37.623631, 55.7579],
    },
    {
      name: "Камергерский переулок",
      index: 5,
      coords: [37.612332, 55.759486],
    },
    {
      name: "Кудринская площадь",
      index: 6,
      coords: [37.582924, 55.758762],
    },
    {
      name: "Ильинский сквер",
      index: 7,
      coords: [37.633897, 55.754608],
    },
    {
      name: "ПАРК ГОРЬКОГО",
      index: 8,
      coords: [37.601848, 55.730188],
    },
    {
      name: "Малй николпесковский переулок",
      index: 9,
      coords: [37.592446, 55.75053],
    },
    {
      name: "Большой николпесковский переулок",
      index: 10,
      coords: [37.590362, 55.750651],
    },
    {
      name: "Новопушкинский сквер",
      index: 11,
      coords: [37.603882, 55.764438],
    },
    {
      name: "Третьяковская",
      index: 12,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.6251895, 55.740825],
    },
    {
      name: "Баррикадная",
      index: 13,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.582017, 55.760104],
    },
    {
      name: "Три вокзала. Депо",
      index: 14,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.663324, 55.77271],
    },
    {
      name: "Метро «Улица 1905 года»",
      index: 15,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.561509, 55.765281],
    },
    {
      name: "Старая Басманная",
      index: 16,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.657637, 55.763984],
    },
    {
      name: "ТЦ «Атриум»",
      index: 17,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.659173, 55.757339],
    },
    {
      name: "Лаврушинский переулок",
      index: 18,
      externalLink: "https://outdoor.sport.moscow/",
      coords: [37.621444, 55.741693],
    },
    {
      name: "Добрынинская",
      index: 19,
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
