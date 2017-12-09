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

casper.test.begin(
  "Index shows the placeholder if there are no smiles",
  function(test) {
    casper
      .on("page.initialized", function() {
        xhr.init(casper.page, {
          libraryRoot: "./node_modules/phantomxhr/"
        });

        xhr.fake({
          url: "/api/smiles?page=1&pageSize=10",
          responseBody: {
            totalCount: 0,
            page: 1,
            pageSize: 10
          }
        });
      })
      .start("./dist/index.html")
      .wait(2000)
      .then(function() {
        phantomcss.screenshot(
          "body",
          2000,
          "",
          "shows_the_placeholder_if_there_are_no_smiles"
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
              }
            ],
            totalCount: 1,
            page: 1,
            pageSize: 10
          }
        });
      })
      .start("./dist/index.html")
      .waitForSelector(".smile", function() {
        phantomcss.screenshot(
          "body",
          2000,
          "",
          "shows_the_first_smile_if_there_is_just_one_smile"
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

casper.test.begin(
  "Index shows the first smile with photo even if there are more",
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
                title: "Title"
              },
              {
                id: 2,
                title: "Title 1",
                message: "Message 1",
                photoUrl: "https://pbs.twimg.com/media/DM6hS2tW0AMDSto.jpg"
              }
            ],
            totalCount: 10,
            page: 1,
            pageSize: 10
          }
        });
      })
      .start("./dist/index.html")
      .waitForSelector(".smile", function() {
        phantomcss.screenshot(
          "body",
          2000,
          "",
          "shows_the_first_smile_with_image"
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

casper.test.begin(
  "Index shows the placeholder if the service is down",
  function(test) {
    casper
      .on("page.initialized", function() {
        xhr.init(casper.page, {
          libraryRoot: "./node_modules/phantomxhr/"
        });

        xhr.fake({
          url: "/api/smiles?page=1&pageSize=10",
          status: 404
        });
      })
      .start("./dist/index.html")
      .wait(2000)
      .then(function() {
        phantomcss.screenshot(
          "body",
          2000,
          "",
          "shows_the_placeholder_if_the_service_is_down"
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

casper.test.begin(
  "Index shows the placeholder if the service is failing",
  function(test) {
    casper
      .on("page.initialized", function() {
        xhr.init(casper.page, {
          libraryRoot: "./node_modules/phantomxhr/"
        });

        xhr.fake({
          url: "/api/smiles?page=1&pageSize=10",
          status: 500
        });
      })
      .start("./dist/index.html")
      .wait(2000)
      .then(function() {
        phantomcss.screenshot(
          "body",
          2000,
          "",
          "shows_the_placeholder_if_the_service_is_failing"
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
