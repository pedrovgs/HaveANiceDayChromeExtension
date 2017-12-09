export function onImageLoaded(url, callback) {
  const img = new Image();
  img.onload = function() {
    callback();
  };
  img.src = url;
}
