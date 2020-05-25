import "./main.scss"; // main styles
import "./vendor/jscolor"; // color picker
import "./vendor/aos"; // animations on scroll

// Import all images

(function importAll(r) {
  return r.keys().map(r);
})(require.context("./images", false, /\.(png|jpe?g|svg|ico)$/));

// Prevent every form from reloading page

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

//////////////////////
//Text form handling//
//////////////////////

// Selectors

const textPrev = document.querySelector(".playground__card__preview_text");
const textForm = document.querySelector("#textForm");
const textStyleSelector = textForm.elements.style;
const textColorInput = document.querySelector(".jscolor");
const textDecorSelector = textForm.elements.decoration;

// Listen for changes and update properties

textDecorSelector.addEventListener("change", (e) => {
  const decor = e.target.value;
  textPrev.style.textDecoration = decor;
});

textStyleSelector.addEventListener("change", (e) => {
  const style = e.target.value;
  textPrev.style.fontWeight = "Initial"; // Clear font weight
  textPrev.style.fontStyle = "Initial"; // Clear font style
  if (style === "bold") {
    textPrev.style.fontWeight = style;
  } else {
    textPrev.style.fontStyle = style;
  }
});

textColorInput.addEventListener("change", (e) => {
  textPrev.style.color = `#${e.target.value}`;
});

////////////////////////
//Margin form handling//
////////////////////////

// Selectors

const boxEl = document.querySelector(".box");
const marginForm = document.querySelector("#marginForm");
const horizSlider = marginForm.elements.horizInput;
const vertiSlider = marginForm.elements.vertiInput;

// Listen for input and adjust box margin

horizSlider.addEventListener("input", (e) => {
  boxEl.style.marginLeft = `${e.target.value}px`;
});
vertiSlider.addEventListener("input", (e) => {
  boxEl.style.marginBottom = `${e.target.value}px`;
});

///////////////////////
//Background handling//
///////////////////////

// Selectors

const bgEl = document.querySelector(".playground__card__preview_image");
const bgForm = document.querySelector("#bg__form");
const positionInput = bgForm.elements.position;
const widthInput = bgForm.elements.width;
const heightInput = bgForm.elements.height;
const repeatInput = bgForm.elements.repeat;
const attachInput = bgForm.elements.attachment;

// Validate inputs

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

// Chceck if size given is valid and resize image

const setBgSize = () => {
  if (sizeValid()) {
    const size = `${widthInput.value}px ${heightInput.value}px`;
    bgEl.style.backgroundSize = size;
  } else {
    bgEl.style.backgroundSize = "auto auto";
  }
};

// Set bg size on input change

widthInput.addEventListener("input", (e) => {
  setBgSize();
});
heightInput.addEventListener("input", (e) => {
  setBgSize();
});

// Change bg position on option change

positionInput.addEventListener("change", (e) => {
  bgEl.style.backgroundPosition = e.target.value;
});

// Change bg repeat on option change

repeatInput.addEventListener("change", (e) => {
  bgEl.style.backgroundRepeat = e.target.value;
});

// Change bg attachment on option change

attachInput.addEventListener("change", (e) => {
  bgEl.style.backgroundAttachment = e.target.value;
});

//////////////////
// Handle shadow//
//////////////////

// Selectors

const shadowBox = document.querySelector(".shadowBox");
const shadowForm = document.querySelector("#shadowForm");
const horizLenSlider = shadowForm.elements.horizLen;
const vertiLenSlider = shadowForm.elements.vertiLen;
const blurRadiusSlider = shadowForm.elements.blurRad;
const spreadRadiusSlider = shadowForm.elements.spreadRad;
const opacitySlider = shadowForm.elements.opacity;

// Create array from all range inpurs

const shadowSliders = new Array(
  horizLenSlider,
  vertiLenSlider,
  blurRadiusSlider,
  spreadRadiusSlider,
  opacitySlider
);

// Create shadow string and attaach it to shadowBox

const renderShadow = () => {
  const opacity = opacitySlider.value / 100;
  const shadow = `${horizLenSlider.value}px ${vertiLenSlider.value}px ${blurRadiusSlider.value}px ${spreadRadiusSlider.value}px rgba(0,0,0,${opacity})`;
  shadowBox.textContent = shadow;
  shadowBox.style.boxShadow = shadow;
};

// Listen for form inputs and re-render shadow

shadowSliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    renderShadow();
  });
});

// Scroll button

document.querySelector(".scrollup__button").addEventListener("click", (e) => {
  window.scroll(0, 0);
});

// Scroll card margin handler

window.addEventListener("scroll", (e) => {
  const firstCard = document.querySelector(".playground__card");
  if (window.pageYOffset > 100) {
    firstCard.style.transition = "margin-top .5s ease";
    firstCard.style.marginTop = "-20vh";
  } else {
    firstCard.style.marginTop = "-10vh";
  }
});
