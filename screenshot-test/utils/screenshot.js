const phantomcss = require("phantomcss");
casper.options.viewportSize = { width: 1440, height: 900 };
phantomcss.init({
  rebase: casper.cli.get("rebase")
});

function take(name, delay) {
  if (!delay) {
    delay = 0;
  }
  phantomcss.screenshot("body", delay, "", name);
}

function compare() {
  phantomcss.compareSession();
}

function runScreenshotTests(test) {
  casper.then(function() {
    compare();
  });

  casper.run(function() {
    test.done();
  });
}

module.exports = {
  take: take,
  compare: compare,
  runScreenshotTests: runScreenshotTests
};
