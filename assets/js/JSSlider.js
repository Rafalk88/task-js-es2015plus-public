export class JSSlider {
  constructor(DOMelement = ".gallery__item") {
    this.imagesSelector = DOMelement;
    this.sliderRootElementSelector = ".js-slider";
    this.imagesList = document.querySelectorAll(this.imagesSelector);
    this.sliderRootElement = document.querySelector(
      this.sliderRootElementSelector
    );
  }

  run = () => {
    this.initEvents();
    this.initCustomEvents();
  };

  initEvents = () => {
    this.imagesList.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.fireCustomEvent(e.currentTarget, "js-slider-img-click");
      });
    });

    // todo:
    // utwórz event o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = this.sliderRootElement.querySelector(
      ".js-slider__nav--next"
    );
    if (navNext) {
      navNext.addEventListener("click", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-img-next");
      });
    }

    // todo:
    // utwórz event o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = this.sliderRootElement.querySelector(
      ".js-slider__nav--prev"
    );
    if (navPrev) {
      navPrev.addEventListener("click", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-img-prev");
      });
    }

    // todo:
    // utwórz event o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = this.sliderRootElement.querySelector(".js-slider__zoom");
    if (zoom) {
      zoom.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          this.fireCustomEvent(this.sliderRootElement, "js-slider-close");
        }
      });
    }
  };

  fireCustomEvent = (element, name) => {
    const event = new CustomEvent(name, {
      bubbles: true,
    });

    element.dispatchEvent(event);
  };

  initCustomEvents = () => {
    this.imagesList.forEach((img) => {
      img.addEventListener("js-slider-img-click", (event) => {
        this.onImageClick(event, this.sliderRootElement, this.imagesSelector);
      });
    });

    this.sliderRootElement.addEventListener(
      "js-slider-img-next",
      this.onImageNext
    );
    this.sliderRootElement.addEventListener(
      "js-slider-img-prev",
      this.onImagePrev
    );
    this.sliderRootElement.addEventListener("js-slider-close", this.onClose);
  };

  onImageClick = (event) => {
    // todo:
    // 1. dodać klasę [js-slider--active], aby pokazać całą sekcję
    // 2. wyszukać ściężkę do klikniętego elementu i wstawić do [.js-slider__image]
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
    // 4. wyszukać wszystkie zdjęcia należące do danej grupy
    // 5. utworzyć na podsawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
    this.sliderRootElement.classList.add("js-slider--active");

    const src = event.currentTarget.querySelector("img").src;
    this.sliderRootElement.querySelector(".js-slider__image").src = src;

    const groupName = event.currentTarget.dataset.sliderGroupName;
    const thumbsList = document.querySelectorAll(
      this.imagesSelector + "[data-slider-group-name=" + groupName + "]"
    );
    const prototype = document.querySelector(
      ".js-slider__thumbs-item--prototype"
    );
    thumbsList.forEach((item) => {
      const thumbElement = prototype.cloneNode(true);
      thumbElement.classList.remove("js-slider__thumbs-item--prototype");
      const thumbImg = thumbElement.querySelector("img");
      thumbImg.src = item.querySelector("img").src;
      if (thumbImg.src === src) {
        thumbImg.classList.add("js-slider__thumbs-image--current");
      }

      document.querySelector(".js-slider__thumbs").appendChild(thumbElement);
    });
  };

  onImageNext = (event) => {
    // console.log(this, "onImageNext");
    // [this] wskazuje na element [.js-slider]

    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM
    // 3. sprawdzić czy ten element istnieje
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut src dla [.js-slider__image]
    const currentClassName = "js-slider__thumbs-image--current";
    const current = this.sliderRootElement.querySelector(
      "." + currentClassName
    );

    const parentCurrent = current.parentElement;
    const nextElement = parentCurrent.nextElementSibling;
    if (
      nextElement &&
      !nextElement.className.includes("js-slider__thumbs-item--prototype")
    ) {
      const img = nextElement.querySelector("img");
      img.classList.add(currentClassName);

      this.sliderRootElement.querySelector(".js-slider__image").src = img.src;
      current.classList.remove(currentClassName);
    }
  };

  onImagePrev = (event) => {
    console.log(this, "onImagePrev");
    // [this] wskazuje na element [.js-slider]

    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut src dla [.js-slider__image]
    const currentClassName = "js-slider__thumbs-image--current";
    const current = this.sliderRootElement.querySelector(
      "." + currentClassName
    );

    const parentCurrent = current.parentElement;
    const prevElement = parentCurrent.previousElementSibling;
    if (
      prevElement &&
      !prevElement.className.includes("js-slider__thumbs-item--prototype")
    ) {
      const img = prevElement.querySelector("img");
      img.classList.add(currentClassName);

      this.sliderRootElement.querySelector(".js-slider__image").src = img.src;
      current.classList.remove(currentClassName);
    }
  };
}

export default JSSlider;
