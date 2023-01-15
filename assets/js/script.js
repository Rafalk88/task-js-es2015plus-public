import JSSlider from "./JSSlider";

import "./../css/style.css";

const init = () => {
  const imagesList = document.querySelectorAll(".gallery__item");
  imagesList.forEach((img) => {
    img.dataset.sliderGroupName = Math.random() > 0.5 ? "nice" : "good";
  }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

  const jsSlider = new JSSlider(".gallery__item");
  jsSlider.run();
};

document.addEventListener("DOMContentLoaded", init);

const onImagePrev = (event) => {
  console.log(this, "onImagePrev");
  // [this] wskazuje na element [.js-slider]

  // todo:
  // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
  // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM
  // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
  // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
  // 5. podmienić atrybut src dla [.js-slider__image]
  const currentClassName = "js-slider__thumbs-image--current";
  const current = this.querySelector("." + currentClassName);

  const parentCurrent = current.parentElement;
  const prevElement = parentCurrent.previousElementSibling;
  if (
    prevElement &&
    !prevElement.className.includes("js-slider__thumbs-item--prototype")
  ) {
    const img = prevElement.querySelector("img");
    img.classList.add(currentClassName);

    this.querySelector(".js-slider__image").src = img.src;
    current.classList.remove(currentClassName);
  }
};

const onClose = (event) => {
  // todo:
  // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
  // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]

  event.currentTarget.classList.remove("js-slider--active");
  const thumbsList = this.querySelectorAll(
    ".js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)"
  );
  thumbsList.forEach((item) => item.parentElement.removeChild(item));
};
