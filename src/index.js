import "slick-carousel";
import $ from "jquery";
import Duration from "duration-js";
import { GetSmiles } from "./domain/useCases";

const getSmiles = new GetSmiles();

function showPlaceholder(carousel, placeholder) {
  hide(carousel);
  resetCarousel(carousel);
  show(placeholder);
}

function showSmilesSlider(carousel, placeholder, getSmilesResult) {
  hide(placeholder);
  show(carousel);
  showSmiles(carousel, getSmilesResult.right());
}

window.onload = () => {
  const carousel = $(".slick-slider");
  const placeholder = $(".placeholder");
  const carouselPromise = initializeCarousel(carousel);
  const smilesPromise = loadSmiles();
  Promise.all([carouselPromise, smilesPromise]).then(results => {
    const getSmilesResult = results[1];
    if (getSmilesResult.isRight()) {
      const smiles = getSmilesResult.right();
      if (smiles.length > 0) {
        showSmilesSlider(carousel, placeholder, getSmilesResult);
      } else {
        showPlaceholder(carousel, placeholder);
      }
    } else {
      showPlaceholder(carousel, placeholder);
    }
  });
};

function initializeCarousel(carousel) {
  return new Promise(resolve => {
    carousel.on("init", () => {
      resolve();
    });
    carousel.slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1 * Duration.minute,
      arrows: false
    });
  });
}

function loadSmiles() {
  return getSmiles.execute();
}

function showSmiles(carousel, smiles) {
  resetCarousel(carousel);
  smiles.forEach(smile => {
    showSmile(carousel, smile);
  });
}

function resetCarousel(carousel) {
  while (document.querySelectorAll(".slick-slide").length > 0) {
    carousel.slick("slickRemove", 0);
  }
}

function showSmile(carousel, smile) {
  const title = smile.toString();
  const photo = "https://nerdist.com/wp-content/uploads/2017/03/PnM2iU.jpg";
  carousel.slick(
    "slickAdd",
    `<img class='smile' src='${photo}' alt='${title}'/>`
  );
}

function show(element) {
  element.fadeIn();
}

function hide(element) {
  element.fadeOut();
}
