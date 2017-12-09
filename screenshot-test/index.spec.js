const xhr = require("phantomxhr");

describe("Index", function() {
  before(function() {
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
                photoUrl: "https://randomuser.me/api/portraits/women/2.jpg"
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
      .start("./dist/index.html");
  });

  it("should return the placeholder by default before loading the smiles", function() {
    casper.then(function() {
      casper.capture("screenshots/index_placeholder.png");
    });
  });

  it("should leave the placeholder as is if there are no smiles", function() {
    casper
      .waitForSelector(".smile")
      .wait(2000)
      .then(function() {
        casper.capture("screenshots/index_after_loading_just_one_smile.png");
      });
  });
});
