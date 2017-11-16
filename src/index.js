import "slick-carousel";
import $ from "jquery";
import Duration from "duration-js";
import { GetSmiles } from "./domain/useCases";

const getSmiles = new GetSmiles();

window.onload = () => {
  const carousel = $(".slick-slider");
  const carouselPromise = initializeCarousel(carousel);
  const smilesPromise = loadSmiles();
  Promise.all([carouselPromise, smilesPromise]).then(results => {
    //TODO: Check left or right here bro.
    const getSmilesResult = results[1];
    showSmiles(carousel, getSmilesResult);
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
  return getSmiles.execute();
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
