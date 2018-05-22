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

function test(loop){


var usernamesT = ['bibi', 'bubu', 'baba'];
for(var i = 0; i < usernamesT.length; i++){

    setTimeout(function(names, loop){
      console.log(chalk.bgGreen.white.bold('\n** '+loop+' FOLLOWED ** ' + names));
      if(names === "baba"){
        test(utils.randomInt(0,10));
      }
    }, utils.randomInt(0,5000), usernamesT[i], loop);

}
}
test(utils.randomInt(0,10));
