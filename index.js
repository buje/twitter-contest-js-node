var Twit = require('twit-promise-fix');
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
const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

var express = require('express')
var app = express()
var http = require('http');

app.get('/', function (req, res) {
  res.send('API is running on env '+process.env.NODE_ENV)
})
const PORT = process.env.PORT || 5000;
app.listen(PORT)

if(process.env.NODE_ENV == 'production'){
  console.log(chalk.green("SET INTERVAL FOR HEROKU http://"+process.env.HEROKU_APP_NAME+".herokuapp.com"));
  setInterval(function() {
      console.log(chalk.green('PING HEROKU'));
      http.get("http://"+process.env.HEROKU_APP_NAME+".herokuapp.com");
  }, 300000); // every 5 minutes (300000)
}

console.log(chalk.green('APP LISTEN TO '+PORT+' port'));

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

var friendsLoop = 0;
var next = -1;

function start(){

  getAllFriends(next);
  addDataToFile();

  var stream = T.stream('statuses/filter', { track: config.TEXT_TO_SEARCH, language: config.LANGUAGE });

  stream.on('limit', function (limitMessage) {
    console.log(chalk.red('⛔⛔⛔⛔ LIMIT ⛔⛔⛔⛔'), limitMessage);
    reset(limitMessage);
  });

  stream.on('tweet', function (tweet) {

      try{

        var idTweet = utils.getInfoOfTweet(tweet).idTweet;
        if(idTweet){
          if(tweetsData.data.indexOf(idTweet) > -1){
            console.log('\n\n'+chalk.red('@@@@@@@@@@@@@@@@@ #'+chalk.blue(idTweet)+' already retweet @@@@@@@@@@@@@@@@@'));
            tweetsArr = __.reject(tweetsArr, function(tweet){
              return idTweet == utils.getInfoOfTweet(tweet).idTweet;
            });
            console.log('\n\n'+chalk.red(tweetsArr.length+' in tweet\'s queue, limitLockout : ' + limitLockout));
          }else{
            console.log('\n\n'+chalk.green('************* #'+chalk.green(idTweet)+' NEW Tweet found, adding to list *************'));
            tweetsArr.push(tweet);
            console.log('\n\n'+chalk.blue(tweetsArr.length+' in tweet\'s queue, limitLockout : ' + limitLockout));
          }
        }

      }catch(e){
        console.error('ERROR  '+ e+'\n\n');
        console.error('tweet', tweet);
      }

  });

}

function getAllFriends(){

  T.get('friends/list', { count : 200, cursor : next })
    .catch(reset)
    .then(function (result) {
      if(result){
        var data = result.data;
        var users = data.users;
        if(users){
          if(users.length > 0){
            var friendsTmp = __.pluck(users, 'screen_name');
            friends = __.union(friends, friendsTmp);
            next = result.data.next_cursor;
            friendsLoop++;
            if(next > 0){
              if(friendsLoop >= 14){
                console.log(chalk.bgBlack.white('STARTING WORKER !!! friendsLoop ' + friendsLoop));
                worker();
                console.log(chalk.bgBlack.white('GET more friends in 16 min'));
                setTimeout(function(){
                  //get rest of friends in 16 min
                  getAllFriends();
                }, 1000*60*16);
              }else{
                console.log(chalk.bgBlue.white('friendsTmp ' + friendsTmp.length + ' friends ' +friends.length +' friendsLoop ' + friendsLoop));
                getAllFriends();
              }
            }else{
              console.log(chalk.bgBlack.white('GET all friends friendsLoop ' + friendsLoop));
              if(friendsLoop <= 14){
                console.log(chalk.bgBlack.white('STARTING WORKER !!!'));
                worker();
              }
            }

          }else{
            console.log(chalk.bgBlack.white('NO FIRENDS STARTING WORKER !!!'));
            worker();
          }
        }else{
          console.err('ERROR in getting friends/list ', result);
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
                console.log('tweets.json',err);
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
      setTimeout(function(data){
        T.post('statuses/update', { status: data.text })
          .catch(reset)
          .then(function (result) {
            if(result){
              console.log(chalk.bgGreen.white('** AUTO RETWEETED ** ' + result.data.text));
            }
          });
      }, config.RETWEET_TIMEOUT, data);
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

    console.log(chalk.yellow('\n\n'+ tweetsArr.length+' tweets in queue'));

    var tweet = tweetsArr[0];
    tweetsArr.shift();

    try{

      var infos = utils.getInfoOfTweet(tweet);

      if(infos.idTweet && infos.userToFollow){
        console.log(chalk.bgBlack.green.bold('\n\n############################## A TWITTER ##############################\n'));
        console.log(chalk.bgBlack.green.bold('--- i must retweet : ' +infos.idTweet + ' and follow : '+infos.userToFollow+'\n' + infos.text));
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
                  setTimeout(() => worker(), config.RETWEET_TIMEOUT);
                }else{
                  console.log('RETWEET error', err);
                  reset(err);
                }
              }else{
                setTimeout(() => worker(), config.RETWEET_TIMEOUT);
              }


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
                },1000*60*2);
                setTimeout(function(){
                  getTweetOfUser();
                },1000*60*3);
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
                  console.log(chalk.bgRedBright.black('\n\n--------------'+usernamesT[i]+' already following --------------'));
                }else{
                  setTimeout(function(name){
                    T.post('friendships/create', { screen_name: name })
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
                  }, parseInt(config.RETWEET_TIMEOUT+(1000*60*i)), usernamesT[i]);
                }
              }

              if(infos.text && infos.userToFollow){

                var ttLow = infos.text.toLowerCase();
                //Check if we should Like (favorite) the Tweet
                if (ttLow.indexOf('fav') > -1 || ttLow.indexOf('like') > -1 || ttLow.indexOf('aime') > -1) {

                  setTimeout(function(idTweet){
                    T.post('favorites/create', { id: idTweet })
                    .catch(reset)
                    .then(function (result) {
                      if(result){
                        console.log(chalk.bgGreen.white.bold('** FAVORITE ** ' + result.data.text));
                      }
                    });
                  }, config.RETWEET_TIMEOUT, infos.idTweet);

                }

                //Check if we should Reply
                if (ttLow.indexOf('reply') > -1) {

                    setTimeout(function(infos){
                      var emo = utils.randomItem(config.EMOJIS);
                      var text = "@"+infos.userToFollow+" Je participe ! "+emo;

                      T.post('statuses/update', { status: text, in_reply_to_status_id: infos.idTweet })
                        .catch(reset)
                        .then(function (result) {
                          if(result){
                            console.log(chalk.bgGreen.white.bold('** REPLY ** ' + result.data.text));
                          }
                        });
                    }, config.RETWEET_TIMEOUT, infos);

                }

                if (ttLow.indexOf('mentionne') > -1 || ttLow.indexOf('tag ') > -1 || ttLow.indexOf('tagguez') > -1 || ttLow.indexOf('taguez') > -1) {

                  setTimeout(function(infos){
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
                  }, config.RETWEET_TIMEOUT, infos);

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
    console.log(chalk.bgRed.white('No more results. Will search and analyze again in '+ config.RATE_SEARCH_TIMEOUT/1000/60 + ' minutes.'));
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

  console.error('reset error  limitLockout ' + limitLockout, err);
  if(limitLockout){
    return false;
  }

  limitLockout = true;
  console.log(chalk.bgRed.yellow.bold('RESTART Script in ' + config.RATE_LIMIT_EXCEEDED_TIMEOUT/1000/60 +' minutes'));
  setTimeout(function(){
    limitLockout = false;
    worker();
    console.log(chalk.bgGreen.black.bold('RE STARTING Script'));
  }, config.RATE_LIMIT_EXCEEDED_TIMEOUT);

  if(err.allErrors){
    if(err.allErrors.length > 0){
      if(err.allErrors[0].code === 88){
        console.log(chalk.bgRed.yellow.bold('CODE 88'));
      }else if(err.allErrors[0].code === 261){
        console.log(chalk.bgRed.yellow.bold('CODE 261'));
        //Application BOT IS BANNED, stop script
        const request = mailjet
            .post("send")
            .request({
            	FromEmail: process.env.MAIL,
            	FromName: 'BOTS',
            	Subject: 'Application error STOP '+process.env.HEROKU_APP_NAME,
            	'Text-part': 'Twitter\'s bot application as stop at : '+new Date().toTimeString(),
            	Recipients: [{'Email': process.env.MAIL}]
          })
        request
            .then((result) => {
                console.log(result.body)
                process.exit(1);
            })
            .catch((err) => {
                console.log(err.statusCode)
            });
      }
    }else{
      console.log(chalk.bgRed.yellow.bold('CODE UNKNOW'));
    }

  }

  const request = mailjet
      .post("send")
      .request({
        FromEmail: process.env.MAIL,
        FromName: 'BOTS',
        Subject: 'Application error '+process.env.HEROKU_APP_NAME,
        'Text-part': 'Twitter\'s bot application have an error : '+new Date().toTimeString()+'\n\n'+JSON.stringify(err),
        Recipients: [{'Email': process.env.MAIL}]
    })
  request
      .then((result) => {
          console.log(result.body)
      })
      .catch((err) => {
          console.log(err.statusCode)
      });

}

start();
