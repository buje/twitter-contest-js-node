const utils = {

  randomInt : function(min, max){

   return Math.floor(Math.random() * (max - min + 1)) + min;

  },
  randomItem : function(items){

    return items[Math.floor(Math.random()*items.length)];

  },
  getInfoOfTweet : function(tweet){

    var data = {
      idTweet : null,
      userToFollow : null,
      text : ''
    };

    if(tweet.quoted_status){
      data.idTweet = tweet.quoted_status.id_str;
      data.userToFollow = tweet.quoted_status.user.screen_name;
      if(tweet.quoted_status.truncated){
        if(tweet.quoted_status.extended_tweet){
          data.text = tweet.quoted_status.extended_tweet.full_text;
        }
      }else{
        data.text = tweet.quoted_status.text;
      }
    }else if(tweet.retweeted_status){
      data.idTweet = tweet.retweeted_status.id_str;
      data.userToFollow = tweet.retweeted_status.user.screen_name;
      if(tweet.retweeted_status.truncated){
        if(tweet.retweeted_status.extended_tweet){
          data.text = tweet.retweeted_status.extended_tweet.full_text;
        }
      }else{
        data.text = tweet.retweeted_status.text;
      }
    }else{

      data.idTweet = tweet.id_str;
      data.userToFollow = tweet.user.screen_name;
      if(tweet.truncated){
        data.text = tweet.extended_tweet.full_text;
      }else{
        data.text = tweet.text;
      }

    }

    return data;

  }

};

module.exports = utils;
