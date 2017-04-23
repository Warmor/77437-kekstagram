'use strict';

window.picture = function () {

  var makeGalleryPicture = function (photo, template, i) {
    var photoElement = template.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture').setAttribute('data-number', i);
    return photoElement;
  };

  var makeFragment = function (photos, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(makeGalleryPicture(photos[i], template, i));
    }
    return fragment;
  };

  var fillGallery = function (photos, wrap) {
    var template = document.querySelector('#picture-template').content;
    var fragment = makeFragment(photos, template);
    wrap.appendChild(fragment);
  };

  return {
    fillGallery: fillGallery
  };
}();
