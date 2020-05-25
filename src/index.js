import "./main.scss";
import "./vendor/jscolor";
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
