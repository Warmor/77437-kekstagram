'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var photosSettings = {
  'num': 25,
  'minLikes': 15,
  'maxLikes': 200
};

var getRandomNumberFromRange = function (start, end) {
  return Math.floor(Math.random() * end) + start;
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getPhotosUrlArray = function (num) {
  var urlArray = [];
  for (var i = 0; i < num; i++) {
    urlArray.push('photos/' + (i + 1) + '.jpg');
  }
  return urlArray;
};

var getCommentsArray = function (comments) {
  var _commentsArray = [];
  var _comment1 = getRandomArrayElement(comments);
  var _comment2 = getRandomArrayElement(comments);
  if (Math.random() > 0.5) {
    if (_comment1 === _comment2) {
      _commentsArray.push(_comment1);
    } else {
      _commentsArray.push(_comment1, _comment2);
    }
  } else {
    _commentsArray.push(_comment1);
  }
  return _commentsArray;
};

var generatePhotoObjects = function (settings) {
  var _photosArray = [];
  var _urlArray = getPhotosUrlArray(settings.num);
  for (var i = 0; i < settings.num; i++) {
    _photosArray.push({
      'url': _urlArray[i],
      'likes': getRandomNumberFromRange(settings.minLikes, settings.maxLikes),
      'comments': getCommentsArray(COMMENTS)
    });
  }
  return _photosArray;
};

var photosArray = generatePhotoObjects(photosSettings);

var makeGalleryPicture = function (photo, template) {
  var _photoElement = template.cloneNode(true);
  _photoElement.querySelector('img').src = photo.url;
  _photoElement.querySelector('.picture-likes').textContent = photo.likes;
  _photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
  return _photoElement;
};

var makeFragment = function (photos, template) {
  var _fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    _fragment.appendChild(makeGalleryPicture(photos[i], template));
  }
  return _fragment;
};

var fillGallery = function (photos) {
  var _template = document.querySelector('#picture-template').content;
  var _fragment = makeFragment(photos, _template);
  document.querySelector('.pictures').appendChild(_fragment);
};

var makeMainPicture = function (photos) {
  var _galleryOverlay = document.querySelector('.gallery-overlay');
  _galleryOverlay.querySelector('img').src = photos[0].url;
  _galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes;
  _galleryOverlay.querySelector('.comments-count').textContent = photos[0].comments.length;
  _galleryOverlay.classList.remove('invisible');
};

fillGallery(photosArray);
makeMainPicture(photosArray);
document.querySelector('.upload-overlay').classList.add('invisible');
