const utils = {

  randomInt : function(min, max){

   return Math.floor(Math.random() * (max - min + 1)) + min;

  },
  randomItem : function(items){

    return items[Math.floor(Math.random()*items.length)];

  }

};

module.exports = utils;
