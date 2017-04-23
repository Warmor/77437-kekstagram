'use strict';

window.utils = function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var isKeyPressed = function (evt, code) {
    return evt.keyCode === code;
  };

  return {
    isEscPressed: function (evt) {
      return isKeyPressed(evt, ESC_KEY_CODE);
    },
    isEnterPressed: function (evt) {
      return isKeyPressed(evt, ENTER_KEY_CODE);
    },
    getRandomNumberFromRange: function (start, end) {
      return Math.floor(Math.random() * end) + start;
    },
    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    showElement: function (element) {
      element.classList.remove('invisible');
    },
    hideElement: function (element) {
      element.classList.add('invisible');
    },
    addInvalidOutline: function (element) {
      element.style.outline = '2px solid #f00';
    },
    removeInvalidOutline: function (element) {
      element.style.outline = '';
    }
  };
}();
