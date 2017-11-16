import "slick-carousel";
import $ from "jquery";
import Duration from "duration-js";

import { Page, getSmiles } from "./api/haveANiceDayApiClient";

window.onload = () => {
  const carousel = $(".slick-slider");
  const carouselPromise = initializeCarousel(carousel);
  const smilesPromise = loadSmiles();
  Promise.all([carouselPromise, smilesPromise]).then(results => {
    const smiles = results[1]; //TODO: Model this better
    showSmiles(carousel, smiles);
  });
};

function initializeCarousel(carousel) {
  return new Promise(resolve => {
    carousel.on("init", () => {
      resolve();
    });
    carousel.slick({
      autoplay: true,
      autoplaySpeed: 1 * Duration.minute,
      arrows: false
    });
  });
}

function loadSmiles() {
  const page = new Page(1, 10);
  return getSmiles(page);
}

function showSmiles(carousel, smiles) {
  smiles.forEach(smile => {
    showSmile(carousel, smile);
  });
}

function showSmile(carousel, smile) {
  const title = smile.toString();
  const photo = "https://nerdist.com/wp-content/uploads/2017/03/PnM2iU.jpg";
  carousel.slick(
    "slickAdd",
    `<img class='smile' src='${photo}' alt='${title}'/>`
  );
}
