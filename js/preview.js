'use strict';

window.preview = function () {

  var makeMainPicture = function (photos, number) {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    galleryOverlay.querySelector('img').src = photos[number].url;
    galleryOverlay.querySelector('.likes-count').textContent = photos[number].likes;
    galleryOverlay.querySelector('.comments-count').textContent = photos[number].comments.length;
  };

  return {
    makeMainPicture: makeMainPicture
  };
}();

