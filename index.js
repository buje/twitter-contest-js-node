var Twit = require('twit');
var twitter = require('twitter-text');
var __ = require('underscore')._;
var fs = require('fs');
var chalk = require('chalk');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

//FIX Promises :https://github.com/ttezel/twit/pull/297
const config = require('./config');
const utils = require('./utils');
const T = new Twit(config.auth);

//use to lock the script is the API limit is reach
var limitLockout = false;
//count tweet retweeted
var count = 0;
//use to auto retweet tweet from ACCOUNT_TO_RETWEET
var limit = utils.randomInt(1,15);

//save all friends
var friends = [];
//queue tweets
var tweetsArr = [];

//save ID tweet to exclude
var tweetsData = {
  data : []
};

function start(){

  getAllFriends();
  addDataToFile();

  var stream = T.stream('statuses/filter', { track: config.TEXT_TO_SEARCH, language: config.LANGUAGE });

  stream.on('tweet', function (tweet) {

      try{

        var idTweet = utils.getInfoOfTweet(tweet).idTweet;

        if(tweetsData.data.indexOf(idTweet) > -1){
          console.log('\n\n'+chalk.red('@@@@@@@@@@@@@@@@@ #'+chalk.blue(idTweet)+' Déjà Retweeter @@@@@@@@@@@@@@@@@'));
          tweetsArr = __.reject(tweetsArr, function(tweet){
            return idTweet == utils.getInfoOfTweet(tweet).idTweet;
          });
          console.log('\n\n'+chalk.red(tweetsArr.length+' restants à traiter'));
          return false;
        }else{
          console.log('\n\n'+chalk.green('************* #'+chalk.green(idTweet)+' NEW Tweet found, adding to list *************'));
          tweetsArr.push(tweet);
          console.log('\n\n'+chalk.blue(tweetsArr.length+' restants à traiter'));
        }

      }catch(e){
        console.error('ERROR  '+ e+'\n\n');
        console.error(tweet);
      }

  });

}

function getAllFriends(next){

  if(!next){
    next = -1;
  }
  T.get('friends/list', { count : 200, cursor : next })
    .catch(reset)
    .then(function (result) {

      if(result){
        var data = result.data;
        var users = data.users;
        if(users.length > 0){
          var friendsTmp = __.pluck(users, 'screen_name');
          friends = __.union(friends, friendsTmp);
          next = result.data.next_cursor;
          if(next > 0){
            console.log(chalk.bgBlue.white('friendsTmp ' + friendsTmp.length + ' friends ' +friends.length));
            getAllFriends(next);
          }else{
            console.log(chalk.bgBlack.white('LANCEMENT DU WORKER !!!'));
            worker();
          }

        }
      }

    });

}

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
          console.log('\n\n'+chalk.bgYellow.black('&&&&&&&&&&&&&&&& #'+tweetToSave+' Add tweetToSave to file &&&&&&&&&&&&&&&&\n'));
          console.log(chalk.yellow('Add tweetToSave to file : ' + tweetsData.data.length));
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

function getTweetOfUser(data){

  var doTweet = function(data){
    T.post('statuses/update', { status: data.text })
      .catch(reset)
      .then(function (result) {
        if(result){
          console.log(chalk.bgGreen.white('** AUTO RETWEETED ** ' + result.data.text));
        }
      });
  };

  if(data){
    if(data.length > 0){
      rTweet = utils.randomItem(data);

      try{
        var dataT = utils.getInfoOfTweet(rTweet);
        if(dataT.text !== ''){
          doTweet(dataT);
        }else{
          getTweetOfUser(data);
        }
      }catch(e){
        getTweetOfUser(data);
      }
    }
  }else{

    var user = utils.randomItem(config.ACCOUNT_TO_RETWEET);

    T.get('statuses/user_timeline', { screen_name : user})
      .catch(reset)
      .then(function (result) {
        if(result){
          var data = result.data;
          if(data.length > 0){

            rTweet = utils.randomItem(data);

            try{
              var dataT = utils.getInfoOfTweet(rTweet);
              if(dataT.text !== ''){
                doTweet(dataT);
              }else{
                getTweetOfUser(data);
              }
            }catch(e){
              getTweetOfUser(data);
            }

          }
        }

      });
  }

}

function worker(){

  if(limitLockout){
    return false;
  }

  if(tweetsArr.length > 0){

    console.log(chalk.yellow('\n\n'+ tweetsArr.length+' restants à traiter'));

    var tweet = tweetsArr[0];
    tweetsArr.shift();

    try{

      var infos = utils.getInfoOfTweet(tweet);

      if(infos.idTweet && infos.userToFollow){
        console.log(chalk.bgBlack.green.bold('\n\n############################## A TWITTER ##############################\n'));
        console.log(chalk.bgBlack.green.bold('--- je dois rewetter : ' +infos.idTweet + ' et suivre : '+infos.userToFollow+'\n' + infos.text));
        console.log(chalk.bgBlack.green.bold('\n#########################################################################'));

        T.post('statuses/retweet/:id', { id: infos.idTweet })
          .catch(function (err) {
              if(err.allErrors){
                if(err.allErrors[0].code === 327){
                  //You have already retweeted this Tweet.
                  addDataToFile(infos.idTweet);
                  tweetsArr = __.reject(tweetsArr, function(tweet){
                    return infos.idTweet == utils.getInfoOfTweet(tweet).idTweet;
                  });
                }else{
                  console.log('RETWEET error', err);
                }
              }
              setTimeout(() => worker(), config.RETWEET_TIMEOUT);

            })
          .then(function (result) {

            if(result){

              var data = result.data;

              count++;
              if(count > limit){
                count = 0;
                limit = utils.randomInt(1,15);
                getTweetOfUser();
                setTimeout(function(){
                  getTweetOfUser();
                },1000 * 120);
              }
              console.log(chalk.bgGreen.white.bold('** RETWEETED ** ' + data.text));

              if(infos.userToFollow){
                var usernames = twitter.extractMentions(infos.text);
                if(usernames.indexOf(infos.userToFollow) == -1){
                  usernames.push(infos.userToFollow);
                }

                if(__.indexOf(usernames, infos.userToFollow) == -1){
                  usernames.push(infos.userToFollow);

                }

                usernamesT = __.unique(usernames);
              }

              for(var i = 0; i < usernamesT.length; i++){
                if(friends.indexOf(usernamesT[i]) > -1){
                  console.log(chalk.bgRedBright.black('\n\n--------------'+usernamesT[i]+' Déjà Following --------------'));
                }else{
                  T.post('friendships/create', { screen_name: usernamesT[i] })
                    .catch(reset)
                    .then(function (result) {
                      if(result){
                        friends.unshift(result.data.screen_name);
                        if(friends.length > 4950){
                          destroyFriend();
                        }
                        console.log(chalk.bgGreen.white.bold('** FOLLOWED ** ' + result.data.screen_name));
                      }
                    });
                }
              }

              if(infos.text && infos.userToFollow){

                var ttLow = infos.text.toLowerCase();
                //Check if we should Like (favorite) the Tweet
                if (ttLow.indexOf('fav') > -1 || ttLow.indexOf('like') > -1 || ttLow.indexOf('aime') > -1) {

                  T.post('favorites/create', { id: infos.idTweet })
                  .catch(reset)
                  .then(function (result) {
                    if(result){
                      console.log(chalk.bgGreen.white.bold('** FAVORIS ** ' + result.data.text));
                    }
                  });

                }

                //Check if we should Reply
                if (ttLow.indexOf('reply') > -1) {
                  var emo = utils.randomItem(config.EMOJIS);
                  var text = "@"+infos.userToFollow+" Je participe ! "+emo;

                  T.post('statuses/update', { status: text, in_reply_to_status_id: infos.idTweet })
                    .catch(reset)
                    .then(function (result) {
                      if(result){
                        console.log(chalk.bgGreen.white.bold('** REPLY ** ' + result.data.text));
                      }
                    });

                }

                if (ttLow.indexOf('mentionne') > -1 || ttLow.indexOf('tag ') > -1 || ttLow.indexOf('tagguez') > -1 || ttLow.indexOf('taguez') > -1) {
                  var friends1 = utils.randomItem(friends);
                  var friends2 = utils.randomItem(friends);
                  var emo = utils.randomItem(config.EMOJIS);
                  var text = "@"+infos.userToFollow+" Je participe ! et je tag @"+friends1+" & @"+friends2+" "+emo;

                  T.post('statuses/update', { status: text, in_reply_to_status_id: infos.idTweet })
                    .catch(reset)
                    .then(function (result) {
                      if(result){
                        console.log(chalk.bgGreen.white.bold('** TAG ** @'+friends1+' & @'+friends2+" "+ result.data.text));
                      }
                    });

                }

              }

              setTimeout(() => worker(), config.RETWEET_TIMEOUT);
            }

          });

      }

    }catch(e){
      console.error('ERROR  '+ e+'\n\n');
      console.error(tweet);
      setTimeout(() => worker(), config.RETWEET_TIMEOUT);
    }

  }else{
    console.log(chalk.bgRed.white('No more results. Will search and analyze again in '+ config.RATE_SEARCH_TIMEOUT / 1000 + ' seconds.'));
    setTimeout(() => worker(), config.RATE_SEARCH_TIMEOUT);
  }

}

function destroyFriend(){

  T.post('friendships/destroy', { screen_name: friends.pop() })
  .catch(function(err){
    console.error(err);
  })
  .then(function(result){
    console.log(chalk.bgGreen.black.bold('friendships/destroy ** UNFOLLOW +**' + result.data.screen_name));
  });

}

function reset(err){

  console.error('error', err);

  if(err.allErrors){
    if(err.allErrors[0].code === 88){
      limitLockout = true;

      T.get('application/rate_limit_status', { resources : 'application,statuses'}, function (err, data, response) {
        if(err){
          console.error(err);
        }else{
          console.log('application/rate_limit_status', data);
          console.log('/statuses/retweets/:id', data.resources.statuses['/statuses/retweets/:id']);
          console.log('/application/rate_limit_status', data.resources.application['/application/rate_limit_status']);
          var time = data.resources.statuses['/statuses/retweets/:id'].reset;
          var startDate = new Date();
          var endDate   = new Date(time*1000);
          var milliseconds = (endDate.getTime() - startDate.getTime());
          console.log(chalk.bgRed.yellow.bold('RESTART Script in ' + (milliseconds/1000/60) +' minutes'));
          setTimeout(function(){
            limitLockout = false;
            worker();
            console.log(chalk.bgGreen.black.bold('STARTING Script'));
          }, milliseconds);
        }
      });

    }
  }

}

start();
