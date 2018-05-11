var Twit = require('twit');
var twitter = require('twitter-text');
var __ = require('underscore')._;
var fs = require('fs');

var config = require('./config');

var T = new Twit(config);
//TODO
//utiliser les promises
//blackliste des twitts déjà retweeter
//http://support.twitter.com/articles/66885-i-can-t-follow-people-follow-limits
//se désabonner des comptes les plus anciens pour ne pas atteindre la limite de 1K / jour et 5K au total

var tweetsData = {
  data : []
};

function addDataToFile(tweetToSave){

    var addData = function(){

      if(!tweetToSave)
        return false;

      tweetsData.data.push(tweetToSave);
      var tabUnique = __.uniq(tweetsData.data);
      var json = JSON.stringify({ data : tabUnique });
      fs.writeFile('tweets.json', json, function(error){
        if(error){
          console.log('Erreur : ' + error);
        }else{
          console.log('Add tweetToSave to file : ' + tweetsData.data.length);
        }
      });
    };

    fs.exists('tweets.json', function(exists){
      if(exists){
          fs.readFile('tweets.json', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
              tweetsData = JSON.parse(data);
              addData();
            }
        });
      } else {
          addData();
      }
    });

}

addDataToFile();

var textToSearch = ['retweet to win',
        'RT to win',
        'retweet 2 win',
        'RT 2 win',
        'concours'];
var stream = T.stream('statuses/filter', { track: textToSearch })

stream.on('tweet', function (tweet) {

    var idTweet = null;
    var userToFollow = null;
    var tt = '';

    try{

      if(tweet.quoted_status){
        if(!tweet.quoted_status.retweeted){
          idTweet = tweet.quoted_status.id_str;
          userToFollow = tweet.quoted_status.user.screen_name;
          if(tweet.quoted_status.truncated){
            tt = tweet.quoted_status.extended_tweet.full_text;
          }else{
            tt = tweet.quoted_status.text;
          }

        }
      }else if(tweet.retweeted_status){
        if(!tweet.retweeted_status.retweeted){
          idTweet = tweet.retweeted_status.id_str;
          userToFollow = tweet.retweeted_status.user.screen_name;
          if(tweet.retweeted_status.truncated){
            tt = tweet.retweeted_status.extended_tweet.full_text;
          }else{
            tt = tweet.retweeted_status.text;
          }
        }
      }else{
        if(!tweet.retweeted){
          idTweet = tweet.id_str;
          userToFollow = tweet.user.screen_name;
          if(tweet.truncated){
            tt = tweet.extended_tweet.full_text;
          }else{
            tt = tweet.text;
          }
        }
      }

      if(tweetsData.data.indexOf(idTweet) > -1){
        console.log('\n\n@@@@@@@@@@@@@@@@@ #'+idTweet+' Déjà Retweeter @@@@@@@@@@@@@@@@@n');
        return false;
      }

      if(tt && userToFollow){

        var ttLow = tt.toLowerCase();
        // Check if we should Like (favorite) the Tweet
        if (ttLow.indexOf('fav') > -1 || ttLow.indexOf('like') > -1 || ttLow.indexOf('aime') > -1) {
          T.post('favorites/create', { id: idTweet }, function (err, data, response) {
            if(err){
              console.error(err);
              //console.error(tweet);
            }else{
              console.log('** FAVORIS ** ' + data.text);
            }
          });
        }

        // Check if we should Reply
        if (ttLow.indexOf('reply') > -1) {
          var text = "@"+userToFollow+" Je participe !";
          T.post('statuses/update', { status: text, in_reply_to_status_id: idTweet }, function (err, data, response) {
            if(err){
              console.error(err);
              //console.error(tweet);
            }else{
              console.log('** REPLY ** ' + data.text);
            }
          });
        }

        if(userToFollow){
          var usernames = twitter.extractMentions(tt);
          if(usernames.indexOf(userToFollow) == -1){
            usernames.push(userToFollow);
          }

          if(__.indexOf(usernames, userToFollow) == -1){
            usernames.push(userToFollow);

          }

          usernamesT = __.unique(usernames);
        }

      }

      if(idTweet && userToFollow){
        console.log('\n\n############################## A TWITTER ##############################\n');
        console.log('--- je dois rewetter : ' +idTweet + ' et suivre : '+userToFollow+'\n' + tt);
        console.log('\n#########################################################################');

        T.post('statuses/retweet/:id', { id: idTweet }, function (err, data, response) {
          if(err){
            console.error(err);
            //console.error(tweet);
            addDataToFile(idTweet);
          }else{
            console.log('** RETWEETED ** ' + data.text);
          }
        });
        for(var i = 0; i < usernamesT.length; i++){
          T.post('friendships/create', { screen_name: usernamesT[i] }, function (err, data, response) {
            if(err){
              console.error(err);
              //console.error(tweet);
            }else{
              console.log('** FOLLOWED ** ' + data.screen_name);
            }
          });
        }


      }

    }catch(e){
      console.error('ERROR  '+ e+'\n\n');
      console.error(tweet);
    }

});
