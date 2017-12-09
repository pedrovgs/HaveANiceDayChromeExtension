const screenshot = require("utils/screenshot");
const server = require("server/have-a-nice-day-server");

const indexPath = "./dist/index.html";
const loadCarouselDelay = 2000;

casper.test.begin("Index shows the placeholder by default", function(test) {
  casper.start(indexPath).then(function() {
    screenshot.take("shows_the_placeholder_when_the_page_is_loaded");
  });
  screenshot.runScreenshotTests(test);
});

casper.test.begin(
  "Index shows the placeholder if there are no smiles",
  function(test) {
    server.givenThereAreNoSmiles();
    casper.start(indexPath).then(function() {
      screenshot.take(
        "shows_the_placeholder_if_there_are_no_smiles",
        loadCarouselDelay
      );
    });
    screenshot.runScreenshotTests(test);
  }
);

casper.test.begin(
  "Index shows the placeholder if the service is down",
  function(test) {
    server.givenTheSmilesEndpointReturns(404);
    casper.start(indexPath).then(function() {
      screenshot.take(
        "shows_the_placeholder_if_the_service_is_down",
        loadCarouselDelay
      );
    });
    screenshot.runScreenshotTests(test);
  }
);

casper.test.begin("Index shows the placeholder if the service fails", function(
  test
) {
  server.givenTheSmilesEndpointReturns(500);
  casper.start(indexPath).then(function() {
    screenshot.take(
      "shows_the_placeholder_if_the_service_fails",
      loadCarouselDelay
    );
  });
  screenshot.runScreenshotTests(test);
});

casper.test.begin("Index shows the smile if there is just one", function(test) {
  server.givenThereIsJustOneSmile();
  casper.start(indexPath).waitForSelector(".smile", function() {
    screenshot.take("shows_the_smile_if_there_is_just_one", loadCarouselDelay);
  });
  screenshot.runScreenshotTests(test);
});

casper.test.begin(
  "Index shows the first smile with picture if there is more than one",
  function(test) {
    server.givenThereIsMoreThanOneSmile();
    casper.start(indexPath).waitForSelector(".smile", function() {
      screenshot.take(
        "shows_the_first_smile_with_picture_if_there_is_more_than_one",
        loadCarouselDelay
      );
    });
    screenshot.runScreenshotTests(test);
  }
);
