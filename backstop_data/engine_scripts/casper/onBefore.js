module.exports = function(casper, scenario, vp) {
  casper.echo("onBefore.js loaded", "INFO");
  casper.options.pageSettings.javascriptEnabled = true;
  casper.options.pageSettings.loadImages = true;
  casper.options.pageSettings.loadPlugins = true;
  casper.options.pageSettings.localToRemoteUrlAccessEnabled = true;
  casper.logLevel = "debug";
  casper.on("resource.requested", function(resource) {
    casper.echo("Resource requested: " + resource.url, "INFO");
  });

  casper.on("resource.error", function(resourceError) {
    casper.echo(
      "Resource error: " +
        "Error code: " +
        resourceError.errorCode +
        " ErrorString: " +
        resourceError.errorString +
        " url: " +
        resourceError.url +
        " id: " +
        resourceError.id,
      "ERROR"
    );
  });
  casper.on("page.error", function(error) {
    casper.echo("Page error: " + error, "ERROR");
  });
  casper.on("casper.page.onResourceTimeout", function(error) {
    casper.echo("Resource timeout: " + error, "ERROR");
  });
  casper.on("resource.received", function(resource) {
    casper.echo(
      "Resource received: " + resource.url + " with status " + resource.status,
      "INFO"
    );
  });

  casper.on("remote.message", function(msg) {
    casper.echo("Remote message caught: " + msg, "INFO");
  });
  casper.on("page.error", function(msg, trace) {
    casper.echo("====> Error: " + msg + " - " + trace, "ERROR");
  });
  casper.echo("Casperjs options: ", "INFO");
  casper.echo(casper.options);
};
