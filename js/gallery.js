'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var photosArray = window.data.photosObject;

  var openGallery = function (number) {
    window.preview.makeMainPicture(photosArray, number);
    document.addEventListener('keydown', onEscPressGalleryOverlay);
    window.utils.showElement(galleryOverlay);
  };

  var closeGallery = function (evt) {
    document.removeEventListener('keydown', onEscPressGalleryOverlay);
    window.utils.hideElement(galleryOverlay);
  };

  var onEscPressGalleryOverlay = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      closeGallery();
    }
  };

  var onClickGalleryOverlayClose = function () {
    closeGallery();
  };

  var onKeydownGalleryOverlayClose = function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      closeGallery();
    }
  };

  var onClickPicturesContainer = function (evt) {
    evt.preventDefault();
    var target = event.target;
    var picture = target.closest('.picture');
    if (!picture) {
      return;
    }
    var number = window.picture.getAttribute('data-number');
    openGallery(number);
  };

  picturesContainer.addEventListener('click', onClickPicturesContainer);
  galleryOverlayClose.addEventListener('click', onClickGalleryOverlayClose);
  galleryOverlayClose.addEventListener('keydown', onKeydownGalleryOverlayClose);
  window.picture.fillGallery(window.data.photosObject, picturesContainer);

})();
