const phantomcss = require("phantomcss");
const xhr = require("phantomxhr");
casper.options.viewportSize = { width: 1440, height: 900 };
phantomcss.init({
  rebase: casper.cli.get("rebase")
});

casper.test.begin("Index shows the placeholder by default", function(test) {
  casper.start("./dist/index.html").then(function() {
    phantomcss.screenshot(
      "body",
      "shows_the_placeholder_when_the_page_is_loaded"
    );
  });
  casper.then(function() {
    phantomcss.compareSession();
  });

  casper.run(function() {
    test.done();
  });
});

//empty array

casper.test.begin(
  "Index shows the first smile even if there is just one",
  function(test) {
    casper
      .on("page.initialized", function() {
        xhr.init(casper.page, {
          libraryRoot: "./node_modules/phantomxhr/"
        });

        xhr.fake({
          url: "/api/smiles?page=1&pageSize=10",
          responseBody: {
            data: [
              {
                id: 1,
                title: "Title 1",
                message: "Message 1",
                photoUrl: "https://pbs.twimg.com/media/DQigXn8X0AAFQ6i.jpg"
              },
              {
                id: 2,
                title: "Title"
              }
            ],
            totalCount: 10,
            page: 1,
            pageSize: 25
          }
        });
      })
      .start("./dist/index.html")
      .waitForSelector(".smile", function() {
        phantomcss.screenshot(
          "body",
          2000,
          "",
          "shows_the_placeholder_when_the_page_is_loaded"
        );
      });
    casper.then(function() {
      phantomcss.compareSession();
    });

    casper.run(function() {
      test.done();
    });
  }
);

// more images
