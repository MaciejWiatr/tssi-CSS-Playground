import "./main.scss";
import "./vendor/jscolor";
import "./vendor/aos";

(function importAll(r) {
  return r.keys().map(r);
})(require.context("./images", false, /\.(png|jpe?g|svg|ico)$/));

// Prevent every form from reloading page

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

// Text form handling
const textPrev = document.querySelector(".playground__card__preview_text");
const textForm = document.querySelector("#textForm");
const textStyleSelector = textForm.elements.style;
const textColorInput = document.querySelector(".jscolor");
const textDecorSelector = textForm.elements.decoration;

textDecorSelector.addEventListener("change", (e) => {
  const decor = e.target.value;
  textPrev.style.textDecoration = decor;
});

textStyleSelector.addEventListener("change", (e) => {
  const style = e.target.value;
  if (style === "bold") {
    textPrev.style.fontWeight = style;
  } else {
    textPrev.style.fontWeight = "Initial";
    textPrev.style.fontStyle = style;
  }
});

textColorInput.addEventListener("change", (e) => {
  textPrev.style.color = `#${e.target.value}`;
});

//Margin form handling

const boxEl = document.querySelector(".box");
const marginForm = document.querySelector("#marginForm");
const horizSlider = marginForm.elements.horizInput;
const vertiSlider = marginForm.elements.vertiInput;

horizSlider.addEventListener("input", (e) => {
  boxEl.style.marginLeft = `${e.target.value}px`;
});
vertiSlider.addEventListener("input", (e) => {
  boxEl.style.marginBottom = `${e.target.value}px`;
});

//Background form handling

const bgEl = document.querySelector(".playground__card__preview_image");
const bgForm = document.querySelector("#bg__form");
const positionInput = bgForm.elements.position;
const widthInput = bgForm.elements.width;
const heightInput = bgForm.elements.height;
const repeatInput = bgForm.elements.repeat;
const attachInput = bgForm.elements.attachment;

const sizeValid = () => {
  const width = widthInput.value;
  const height = heightInput.value;
  const areNotNull = width && height;
  const areNotZero = width != 0 && height != 0;
  if (areNotNull && areNotZero) {
    return true;
  } else {
    return false;
  }
};

const setBgSize = () => {
  if (sizeValid()) {
    const size = `${widthInput.value}px ${heightInput.value}px`;
    bgEl.style.backgroundSize = size;
  } else {
    bgEl.style.backgroundSize = "auto auto";
  }
};

positionInput.addEventListener("change", (e) => {
  bgEl.style.backgroundPosition = e.target.value;
});

widthInput.addEventListener("input", (e) => {
  setBgSize();
});
heightInput.addEventListener("input", (e) => {
  setBgSize();
});

repeatInput.addEventListener("change", (e) => {
  bgEl.style.backgroundRepeat = e.target.value;
});

attachInput.addEventListener("change", (e) => {
  bgEl.style.backgroundAttachment = e.target.value;
});

// Handle shadow

const shadowBox = document.querySelector(".shadowBox");
const shadowForm = document.querySelector("#shadowForm");
const horizLenSlider = shadowForm.elements.horizLen;
const vertiLenSlider = shadowForm.elements.vertiLen;
const blurRadiusSlider = shadowForm.elements.blurRad;
const spreadRadiusSlider = shadowForm.elements.spreadRad;
const opacitySlider = shadowForm.elements.opacity;

const shadowSliders = new Array(
  horizLenSlider,
  vertiLenSlider,
  blurRadiusSlider,
  spreadRadiusSlider,
  opacitySlider
);

const renderShadow = () => {
  const opacity = opacitySlider.value / 100;
  const shadow = `${horizLenSlider.value}px ${vertiLenSlider.value}px ${blurRadiusSlider.value}px ${spreadRadiusSlider.value}px rgba(0,0,0,${opacity})`;
  shadowBox.textContent = shadow;
  shadowBox.style.boxShadow = shadow;
};

shadowSliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    renderShadow();
  });
});

// Scroll thingie

document.querySelector(".scrollup__button").addEventListener("click", (e) => {
  window.scroll(0, 0);
});

window.addEventListener("scroll", (e) => {
  const firstCard = document.querySelector(".playground__card");
  if (window.pageYOffset > 100) {
    firstCard.style.transition = "margin-top .5s ease";
    firstCard.style.marginTop = "-20vh";
  } else {
    firstCard.style.marginTop = "-10vh";
  }
});
