#### Go here to create an app and get OAuth credentials (if you haven't already): https://dev.twitter.com/apps/new

### .env file
Create .env file with your access_token / consumer_key

CONSUMER_KEY=<your_key_here>
CONSUMER_SECRET=<your_key_here>
ACCESS_TOKEN=<your_key_here>
ACCESS_TOKEN_SECRET=<your_key_here>

MJ_APIKEY_PUBLIC=<mailjet_your_key_here>
MJ_APIKEY_PRIVATE=<mailjet_your_key_here>
MAIL=<your_email>

## RUN

`npm install`

`node index.js`


### TODO
blackliste des twitts déjà retweeter
http://support.twitter.com/articles/66885-i-can-t-follow-people-follow-limits
se désabonner des comptes les plus anciens pour ne pas atteindre la limite de 1K / jour et 5K au total

information about limit : https://help.twitter.com/fr/rules-and-policies/twitter-limits
 2 400 (re)tweet by day
 100 (re)tweet by hour
 50 (re)tweet by half-hour
 1 000 abonnement par jour //TODO

documentation sur le streaming (utiliser pour la recherche) : https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/connecting.html


## Heroku help

//push modif
git push heroku master

//lancer le process
heroku ps:scale web=1

//voir les process
heroku ps

//stopper un process (web.1 = nom du process obtenu via heroku ps)
heroku ps:stop web.1

//stopper complètement
heroku ps:scale web=0

//voir les logs
heroku logs --tail

//ouvrir la console
heroku run bash

//installer vim
https://gist.github.com/dvdbng/7375821b20f189c189ab1bd29392c98e

heroku open


Twitter API https://developer.twitter.com/en/docs

Keep heroku app alive http://kaffeine.herokuapp.com/#!
