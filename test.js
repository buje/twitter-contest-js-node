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

//test your script here
