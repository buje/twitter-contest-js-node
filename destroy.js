var Twit = require('twit-promise-fix');
var __ = require('underscore')._;
var chalk = require('chalk');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const config = require('./config');
const T = new Twit(config.auth);

var friends = [];
var friendsLoop = 0;
var next = -1;

function destroyFriend(){

  T.post('friendships/destroy', { screen_name: friends.pop() })
  .catch(function(err){
    console.error(err);
  })
  .then(function(result){
    destroyFriend();
    console.log(chalk.bgGreen.black.bold('friendships/destroy ** UNFOLLOW +**' + result.data.screen_name));
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
                destroyFriend();
                setTimeout(function(){
                  //get rest of friends in 16 min
                  getAllFriends();
                }, 1000*60*16);
              }else{
                console.log(chalk.bgBlue.white('friendsTmp ' + friendsTmp.length + ' friends ' +friends.length +' friendsLoop ' + friendsLoop));
                getAllFriends();
              }
            }else{
              if(friendsLoop < 14){
                console.log(chalk.bgBlack.white('STARTING WORKER !!!'));
                destroyFriend();
              }
            }

          }
        }else{
          console.err('ERROR in getting friends/list ', result);
        }
      }

    });

}


function reset(err){

  console.error('reset error ', err);

  if(err.allErrors){
    if(err.allErrors.length > 0){
      if(err.allErrors[0].code === 88){
        console.log(chalk.bgRed.yellow.bold('CODE 88'));
      }else if(err.allErrors[0].code === 261){
        console.log(chalk.bgRed.yellow.bold('CODE 261'));
      }
    }else{
      console.log(chalk.bgRed.yellow.bold('CODE UNKNOW'));
    }

  }

}

getAllFriends();
