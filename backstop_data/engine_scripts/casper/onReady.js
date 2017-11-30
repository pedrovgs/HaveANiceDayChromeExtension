module.exports = function(casper, scenario, vp) {
  casper.echo("onReady.js loaded", "INFO");
  casper.page.onError = function(msg, trace) {
    console.echo("Page error: " + msg, "ERROR");
    trace.forEach(function(item) {
      console.log("  ", item.file, ":", item.line);
    });
  };
  casper.page.onLoadFinished = function(status) {
    casper.echo("Load finished: " + status, "INFO");
  };
  casper.page.onConsoleMessage = function(msg) {
    casper.echo("Console message: " + msg, "INFO");
  };
};
