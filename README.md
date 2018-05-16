
#### Go here to create an app and get OAuth credentials (if you haven't already): https://dev.twitter.com/apps/new
#### Rename config_tmp.js to config.js
#### Add your APP key to config.js file

## RUN

`npm install`

Apply this fix to twit package : FIX Promises : https://github.com/ttezel/twit/pull/297

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
