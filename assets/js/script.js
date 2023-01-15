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
