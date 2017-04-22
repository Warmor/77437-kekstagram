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

var makeGalleryPicture = function (photo, template, i) {
  var _photoElement = template.cloneNode(true);
  _photoElement.querySelector('img').src = photo.url;
  _photoElement.querySelector('.picture-likes').textContent = photo.likes;
  _photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
  _photoElement.querySelector('.picture').setAttribute('data-number', i);
  return _photoElement;
};

var makeFragment = function (photos, template) {
  var _fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    _fragment.appendChild(makeGalleryPicture(photos[i], template, i));
  }
  return _fragment;
};

var fillGallery = function (photos) {
  var _template = document.querySelector('#picture-template').content;
  var _fragment = makeFragment(photos, _template);
  document.querySelector('.pictures').appendChild(_fragment);
};

var makeMainPicture = function (photos, number) {
  var _galleryOverlay = document.querySelector('.gallery-overlay');
  _galleryOverlay.querySelector('img').src = photos[number].url;
  _galleryOverlay.querySelector('.likes-count').textContent = photos[number].likes;
  _galleryOverlay.querySelector('.comments-count').textContent = photos[number].comments.length;
};

fillGallery(photosArray);

// Показ/скрытие картинки в галерее

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var picturesContainer = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var isKeyPressed = function (evt, code) {
  return evt.keyCode === code;
};

var onKeyPressed = function (evt, code, callback) {
  if (isKeyPressed(evt, code)) {
    callback();
  }
};

var openGallery = function (number) {
  makeMainPicture(photosArray, number);
  document.addEventListener('keydown', onEscPressGalleryOverlay);
  galleryOverlay.classList.remove('invisible');
};

var closeGallery = function (evt) {
  document.removeEventListener('keydown', onEscPressGalleryOverlay);
  galleryOverlay.classList.add('invisible');
};

var onEscPressGalleryOverlay = function (evt) {
  onKeyPressed(evt, ESC_KEY_CODE, closeGallery);
};
var onClickGalleryOverlayClose = function () {
  closeGallery();
};
var onKeydownGalleryOverlayClose = function (evt) {
  onKeyPressed(evt, ENTER_KEY_CODE, closeGallery);
};

var onClickPicturesContainer = function (evt) {
  evt.preventDefault();
  var target = event.target;
  var picture = target.closest('.picture');
  if (!picture) {
    return;
  }
  var number = picture.getAttribute('data-number');
  openGallery(number);
};
picturesContainer.addEventListener('click', onClickPicturesContainer);
galleryOverlayClose.addEventListener('click', onClickGalleryOverlayClose);
galleryOverlayClose.addEventListener('keydown', onKeydownGalleryOverlayClose);

// Показ/скрытие формы кадрирования

var uploadForm = document.querySelector('#upload-select-image');
var uploadFormFile = uploadForm.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadOverlayForm = document.querySelector('#upload-filter');
var uploadOverlayDescription = uploadOverlay.querySelector('.upload-form-description');

var onEscPressUploadOverlay = function (evt) {
  onKeyPressed(evt, ESC_KEY_CODE, closeUploadOverlay);
};
var openUploadOverlay = function () {
  uploadForm.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onEscPressUploadOverlay);
};

var closeUploadOverlay = function () {
  uploadForm.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onEscPressUploadOverlay);
};

var onChangeUploadFile = function () {
  openUploadOverlay();
};

var isValidate = function () {
  if (uploadOverlayDescription.value.length < 30 || uploadOverlayDescription.value.length > 100) {
    return false;
  }
  return true;
};

var markInvalidField = function (element) {
  element.style.outline = '2px solid red';
};

var setDefaultValue = function (argument) {
  uploadOverlayDescription.style.outline = '';
  imagePreview.style.transform = '';
  uploadOverlayDescription.value = '';
  filterControls.querySelector('#upload-filter-none').checked = true;
  addFilter('filter-none');
};

uploadFormFile.addEventListener('change', onChangeUploadFile);

uploadOverlayForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (isValidate()) {
    setDefaultValue();
    closeUploadOverlay();
  } else {
    markInvalidField(uploadOverlayDescription);
  }
});

uploadOverlayForm.addEventListener('reset', function () {
  closeUploadOverlay();
});

uploadOverlayDescription.addEventListener('keydown', function (evt) {
  if (isKeyPressed(evt, ESC_KEY_CODE)) {
    evt.stopPropagation();
  }
});
closeUploadOverlay();

// Применение фильтра к изображению

var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
var imagePreview = uploadOverlay.querySelector('.filter-image-preview');

var currentFilter;

var addFilter = function (filter) {
  imagePreview.classList.remove(currentFilter);
  if (filter !== 'none') {
    imagePreview.classList.add(filter);
    currentFilter = filter;
  }
};

filterControls.addEventListener('click', function (evt) {
  if (evt.target.nodeName.toLowerCase() === 'input') {
    addFilter('filter-' + evt.target.value);
  }
});

// Изменение масштаба изображения

var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');

var getCorrectSize = function (value) {
  if (value > 100) {
    return 100;
  } else if (value < 25) {
    return 25;
  } else {
    return value;
  }
};

var resizeImage = function (evt) {
  var resizeValue = parseInt(resizeControlsValue.value, 10);
  if (evt.target === resizeControlsInc) {
    resizeValue += 25;
  } else if (evt.target === resizeControlsDec) {
    resizeValue -= 25;
  }
  resizeValue = getCorrectSize(resizeValue);
  resizeControlsValue.value = resizeValue + '%';
  imagePreview.style.transform = ['scale(', resizeValue / 100, ')'].join('');
};

resizeControls.addEventListener('click', function (evt) {
  if (evt.target.nodeName.toLowerCase() === 'button') {
    resizeImage(evt);
  }
});

