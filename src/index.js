import "slick-carousel";
import $ from "jquery";
import Duration from "duration-js";

import { Page, getSmiles } from "./api/haveANiceDayApiClient";

window.onload = () => {
  const carousel = $(".slick-slider");
  initializeCarousel(carousel).then(() => {
    const smiles = [1, 2, 3, 4, 5, 6, 7];
    setTimeout(showSmiles(carousel, smiles), 1000);
  });
};

function initializeCarousel(carousel) {
  return new Promise(resolve => {
    carousel.on("init", () => {
      resolve();
    });
    carousel.slick({
      autoplay: true,
      autoplaySpeed: 1 * Duration.hour,
      arrows: false
    });
  });
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
