'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFormFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadOverlayForm = document.querySelector('#upload-filter');
  var uploadOverlayDescription = uploadOverlay.querySelector('.upload-form-description');
  var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
  var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');

  var currentFilter;

  window.utils.showElement(uploadForm);
  window.utils.hideElement(uploadOverlay);

  var onEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    window.utils.showElement(uploadOverlay);
    window.utils.hideElement(uploadForm);
    document.addEventListener('keydown', onEscPress);
  };

  var closeUploadOverlay = function () {
    uploadForm.classList.remove('invisible');
    uploadOverlay.classList.add('invisible');
    setDefaultValue();
    document.removeEventListener('keydown', onEscPress);
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

  var setDefaultValue = function (argument) {
    uploadOverlayDescription.style.outline = '';
    imagePreview.style.transform = '';
    uploadOverlayDescription.value = '';
    filterControls.querySelector('#upload-filter-none').checked = true;
    addFilter('filter-none');
  };

  var markInvalidField = function (element) {
    element.style.outline = '2px solid red';
  };

  var addFilter = function (filter) {
    imagePreview.classList.remove(currentFilter);
    if (filter !== 'none') {
      imagePreview.classList.add(filter);
      currentFilter = filter;
    }
  };

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

  uploadFormFile.addEventListener('change', onChangeUploadFile);

  uploadOverlayForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (isValidate()) {
      closeUploadOverlay();
    } else {
      markInvalidField(uploadOverlayDescription);
    }
  });

  uploadOverlayForm.addEventListener('reset', function () {
    closeUploadOverlay();
  });

  uploadOverlayDescription.addEventListener('keydown', function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.stopPropagation();
    }
  });

  filterControls.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      addFilter('filter-' + evt.target.value);
    }
  });

  resizeControls.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'button') {
      resizeImage(evt);
    }
  });

})();
