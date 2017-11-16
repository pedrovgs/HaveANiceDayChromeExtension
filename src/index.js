import "slick-carousel";
import $ from "jquery";
import { Page, getSmiles } from "./api/haveANiceDayApiClient";

const serializer = new XMLSerializer(typeof XmlElement);

window.onload = () => {
  const carousel = initializeCarousel();
  const page = new Page(1, 10);
  getSmiles(page).then(page => {
    console.log(`Get smiles result: ${JSON.stringify(page)}`);
  });
  const smiles = [1, 2, 3, 4, 5, 6, 7];
  showSmiles(carousel, smiles);
};

function initializeCarousel() {
  $(".slick-slider").slick({
    draggable: false,
    arrows: false
  });
  return document.getElementsByClassName("slick-slider")[0];
}

function showSmiles(carousel, smiles) {
  smiles.forEach(smile => {
    showSmile(carousel, smile);
  });
}

function showSmile(carousel, smile) {
  const title = smile.toString();
  const photo = "https://nerdist.com/wp-content/uploads/2017/03/PnM2iU.jpg";
  $(".slick-slider").slick(
    "slickAdd",
    `<img class='smile' src='${photo}' alt='${title}'/>`
  );
}
