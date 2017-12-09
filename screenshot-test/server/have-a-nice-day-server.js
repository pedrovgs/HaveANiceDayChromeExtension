const xhr = require("phantomxhr");

const smilesEndpoint = "/api/smiles?page=1&pageSize=10";

function givenThereAreNoSmiles() {
  stub(function() {
    xhr.fake({
      url: "/api/smiles?page=1&pageSize=10",
      responseBody: {
        totalCount: 0,
        page: 1,
        pageSize: 10
      }
    });
  });
}

function givenTheSmilesEndpointReturns(status) {
  stub(function() {
    xhr.fake({
      url: smilesEndpoint,
      status: status
    });
  });
}

function givenThereIsJustOneSmile() {
  stub(function() {
    xhr.fake({
      url: smilesEndpoint,
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
  });
}

function givenThereIsMoreThanOneSmile() {
  stub(function() {
    xhr.fake({
      url: "/api/smiles?page=1&pageSize=10",
      responseBody: {
        data: [
          {
            id: 1,
            title: "Title 0"
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
  });
}

function stub(configureStub) {
  casper.on("page.initialized", function() {
    xhr.init(casper.page, {
      libraryRoot: "./node_modules/phantomxhr/"
    });
    configureStub();
  });
}

module.exports = {
  givenThereAreNoSmiles: givenThereAreNoSmiles,
  givenTheSmilesEndpointReturns: givenTheSmilesEndpointReturns,
  givenThereIsJustOneSmile: givenThereIsJustOneSmile,
  givenThereIsMoreThanOneSmile: givenThereIsMoreThanOneSmile
};
