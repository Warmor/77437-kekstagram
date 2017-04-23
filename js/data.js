'use strict';

window.data = (function () {
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

  var getPhotosUrlArray = function (num) {
    var urlArray = [];
    for (var i = 0; i < num; i++) {
      urlArray.push('photos/' + (i + 1) + '.jpg');
    }
    return urlArray;
  };
  
  var getCommentsArray = function (comments) {
    var commentsArray = [];
    var comment1 = utils.getRandomArrayElement(comments);
    var comment2 = utils.getRandomArrayElement(comments);
    if (Math.random() > 0.5) {
      if (comment1 === comment2) {
        commentsArray.push(comment1);
      } else {
        commentsArray.push(comment1, comment2);
      }
    } else {
      commentsArray.push(comment1);
    }
    return commentsArray;
  };
  
  var generatePhotoObjects = function (settings) {
    var photosArray = [];
    var urlArray = getPhotosUrlArray(settings.num);
    for (var i = 0; i < settings.num; i++) {
      photosArray.push({
        'url': urlArray[i],
        'likes': utils.getRandomNumberFromRange(settings.minLikes, settings.maxLikes),
        'comments': getCommentsArray(COMMENTS)
      });
    }
    return photosArray;
  };
  return {
    photosObject: generatePhotoObjects(photosSettings)
  };
})();