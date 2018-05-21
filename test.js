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

var tweets = [
  {
    "created_at": "Fri May 18 07:25:56 +0000 2018",
    "id": 997377732190318600,
    "id_str": "997377732190318592",
    "text": "@Cdiscount Je tente ma chance 😊 #Concours #iPhoneX #CdiscountDays",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "Concours",
          "indices": [
            32,
            41
          ]
        },
        {
          "text": "iPhoneX",
          "indices": [
            42,
            50
          ]
        },
        {
          "text": "CdiscountDays",
          "indices": [
            51,
            65
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Cdiscount",
          "name": "Cdiscount",
          "id": 63142684,
          "id_str": "63142684",
          "indices": [
            0,
            10
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997365635087786000,
    "in_reply_to_status_id_str": "997365635087785984",
    "in_reply_to_user_id": 63142684,
    "in_reply_to_user_id_str": "63142684",
    "in_reply_to_screen_name": "Cdiscount",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 1,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": true,
    "lang": "fr"
  },
  {
    "created_at": "Fri May 18 07:24:58 +0000 2018",
    "id": 997377489705062400,
    "id_str": "997377489705062400",
    "text": "RT @Cdiscount: 🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVkagKgo\n\n🔸 Pour tenter votre chance : \nRT +…",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "Concours",
          "indices": [
            17,
            26
          ]
        },
        {
          "text": "CdiscountDays",
          "indices": [
            49,
            63
          ]
        },
        {
          "text": "iPhoneX",
          "indices": [
            69,
            77
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Cdiscount",
          "name": "Cdiscount",
          "id": 63142684,
          "id_str": "63142684",
          "indices": [
            3,
            13
          ]
        }
      ],
      "urls": [
        {
          "url": "https://t.co/gAQVkagKgo",
          "expanded_url": "http://bit.ly/2Io6Vy4",
          "display_url": "bit.ly/2Io6Vy4",
          "indices": [
            80,
            103
          ]
        }
      ]
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "retweeted_status": {
      "created_at": "Thu May 17 06:00:07 +0000 2018",
      "id": 996993749506027500,
      "id_str": "996993749506027520",
      "text": "🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVkagKgo\n\n🔸 Pour tenter votre chanc… https://t.co/ElIDRFXgor",
      "truncated": true,
      "entities": {
        "hashtags": [
          {
            "text": "Concours",
            "indices": [
              2,
              11
            ]
          },
          {
            "text": "CdiscountDays",
            "indices": [
              34,
              48
            ]
          },
          {
            "text": "iPhoneX",
            "indices": [
              54,
              62
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/gAQVkagKgo",
            "expanded_url": "http://bit.ly/2Io6Vy4",
            "display_url": "bit.ly/2Io6Vy4",
            "indices": [
              65,
              88
            ]
          },
          {
            "url": "https://t.co/ElIDRFXgor",
            "expanded_url": "https://twitter.com/i/web/status/996993749506027520",
            "display_url": "twitter.com/i/web/status/9…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "source": "<a href=\"https://twitter.facelift-cloud.com\" rel=\"nofollow\">Facelift Cloud</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 63142684,
        "id_str": "63142684",
        "name": "Cdiscount",
        "screen_name": "Cdiscount",
        "location": "France",
        "description": "Cdiscount, N'économisez pas votre plaisir ! #BonPlan & #Concours 👍 Besoin d'un conseil ? Nous sommes en DM de 08h à 19h",
        "url": "https://t.co/IUhLib3sxX",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/IUhLib3sxX",
                "expanded_url": "http://bit.ly/Cdiscount-Site",
                "display_url": "bit.ly/Cdiscount-Site",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 305996,
        "friends_count": 3946,
        "listed_count": 676,
        "created_at": "Wed Aug 05 14:12:44 +0000 2009",
        "favourites_count": 2598,
        "utc_offset": 7200,
        "time_zone": "Paris",
        "geo_enabled": true,
        "verified": true,
        "statuses_count": 81380,
        "lang": "fr",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "180882",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/63142684/1526533496",
        "profile_link_color": "FF3300",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": false,
        "has_extended_profile": false,
        "default_profile": false,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 20613,
      "favorite_count": 4079,
      "favorited": false,
      "retweeted": true,
      "possibly_sensitive": false,
      "lang": "fr"
    },
    "is_quote_status": false,
    "retweet_count": 20613,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": true,
    "possibly_sensitive": false,
    "lang": "fr"
  },
  {
    "created_at": "Fri May 18 07:24:37 +0000 2018",
    "id": 997377399355510800,
    "id_str": "997377399355510784",
    "text": "RT @Cdiscount: 🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVkagKgo\n\n🔸 Pour tenter votre chance : \nRT +…",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "Concours",
          "indices": [
            17,
            26
          ]
        },
        {
          "text": "CdiscountDays",
          "indices": [
            49,
            63
          ]
        },
        {
          "text": "iPhoneX",
          "indices": [
            69,
            77
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Cdiscount",
          "name": "Cdiscount",
          "id": 63142684,
          "id_str": "63142684",
          "indices": [
            3,
            13
          ]
        }
      ],
      "urls": [
        {
          "url": "https://t.co/gAQVkagKgo",
          "expanded_url": "http://bit.ly/2Io6Vy4",
          "display_url": "bit.ly/2Io6Vy4",
          "indices": [
            80,
            103
          ]
        }
      ]
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "retweeted_status": {
      "created_at": "Fri May 18 06:37:52 +0000 2018",
      "id": 997365635087786000,
      "id_str": "997365635087785984",
      "text": "🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVkagKgo\n\n🔸 Pour tenter votre chanc… https://t.co/gdNgcOshe7",
      "truncated": true,
      "entities": {
        "hashtags": [
          {
            "text": "Concours",
            "indices": [
              2,
              11
            ]
          },
          {
            "text": "CdiscountDays",
            "indices": [
              34,
              48
            ]
          },
          {
            "text": "iPhoneX",
            "indices": [
              54,
              62
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/gAQVkagKgo",
            "expanded_url": "http://bit.ly/2Io6Vy4",
            "display_url": "bit.ly/2Io6Vy4",
            "indices": [
              65,
              88
            ]
          },
          {
            "url": "https://t.co/gdNgcOshe7",
            "expanded_url": "https://twitter.com/i/web/status/997365635087785984",
            "display_url": "twitter.com/i/web/status/9…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 63142684,
        "id_str": "63142684",
        "name": "Cdiscount",
        "screen_name": "Cdiscount",
        "location": "France",
        "description": "Cdiscount, N'économisez pas votre plaisir ! #BonPlan & #Concours 👍 Besoin d'un conseil ? Nous sommes en DM de 08h à 19h",
        "url": "https://t.co/IUhLib3sxX",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/IUhLib3sxX",
                "expanded_url": "http://bit.ly/Cdiscount-Site",
                "display_url": "bit.ly/Cdiscount-Site",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 305996,
        "friends_count": 3946,
        "listed_count": 676,
        "created_at": "Wed Aug 05 14:12:44 +0000 2009",
        "favourites_count": 2598,
        "utc_offset": 7200,
        "time_zone": "Paris",
        "geo_enabled": true,
        "verified": true,
        "statuses_count": 81380,
        "lang": "fr",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "180882",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/63142684/1526533496",
        "profile_link_color": "FF3300",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": false,
        "has_extended_profile": false,
        "default_profile": false,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": true,
      "quoted_status_id": 996993749506027500,
      "quoted_status_id_str": "996993749506027520",
      "quoted_status": {
        "created_at": "Thu May 17 06:00:07 +0000 2018",
        "id": 996993749506027500,
        "id_str": "996993749506027520",
        "text": "🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVkagKgo\n\n🔸 Pour tenter votre chanc… https://t.co/ElIDRFXgor",
        "truncated": true,
        "entities": {
          "hashtags": [
            {
              "text": "Concours",
              "indices": [
                2,
                11
              ]
            },
            {
              "text": "CdiscountDays",
              "indices": [
                34,
                48
              ]
            },
            {
              "text": "iPhoneX",
              "indices": [
                54,
                62
              ]
            }
          ],
          "symbols": [],
          "user_mentions": [],
          "urls": [
            {
              "url": "https://t.co/gAQVkagKgo",
              "expanded_url": "http://bit.ly/2Io6Vy4",
              "display_url": "bit.ly/2Io6Vy4",
              "indices": [
                65,
                88
              ]
            },
            {
              "url": "https://t.co/ElIDRFXgor",
              "expanded_url": "https://twitter.com/i/web/status/996993749506027520",
              "display_url": "twitter.com/i/web/status/9…",
              "indices": [
                117,
                140
              ]
            }
          ]
        },
        "source": "<a href=\"https://twitter.facelift-cloud.com\" rel=\"nofollow\">Facelift Cloud</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 63142684,
          "id_str": "63142684",
          "name": "Cdiscount",
          "screen_name": "Cdiscount",
          "location": "France",
          "description": "Cdiscount, N'économisez pas votre plaisir ! #BonPlan & #Concours 👍 Besoin d'un conseil ? Nous sommes en DM de 08h à 19h",
          "url": "https://t.co/IUhLib3sxX",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "https://t.co/IUhLib3sxX",
                  "expanded_url": "http://bit.ly/Cdiscount-Site",
                  "display_url": "bit.ly/Cdiscount-Site",
                  "indices": [
                    0,
                    23
                  ]
                }
              ]
            },
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 305996,
          "friends_count": 3946,
          "listed_count": 676,
          "created_at": "Wed Aug 05 14:12:44 +0000 2009",
          "favourites_count": 2598,
          "utc_offset": 7200,
          "time_zone": "Paris",
          "geo_enabled": true,
          "verified": true,
          "statuses_count": 81380,
          "lang": "fr",
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "180882",
          "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
          "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/63142684/1526533496",
          "profile_link_color": "FF3300",
          "profile_sidebar_border_color": "FFFFFF",
          "profile_sidebar_fill_color": "DDEEF6",
          "profile_text_color": "333333",
          "profile_use_background_image": false,
          "has_extended_profile": false,
          "default_profile": false,
          "default_profile_image": false,
          "following": true,
          "follow_request_sent": false,
          "notifications": false,
          "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 20613,
        "favorite_count": 4079,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "fr"
      },
      "retweet_count": 1333,
      "favorite_count": 309,
      "favorited": false,
      "retweeted": true,
      "possibly_sensitive": false,
      "lang": "fr"
    },
    "is_quote_status": true,
    "quoted_status_id": 996993749506027500,
    "quoted_status_id_str": "996993749506027520",
    "retweet_count": 1333,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": true,
    "possibly_sensitive": false,
    "lang": "fr"
  },
  {
    "created_at": "Fri May 18 07:21:12 +0000 2018",
    "id": 997376543054803000,
    "id_str": "997376543054802944",
    "text": "@Perrette56 @telematin Royalement 😁",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Perrette56",
          "name": "Perrette56",
          "id": 886650338,
          "id_str": "886650338",
          "indices": [
            0,
            11
          ]
        },
        {
          "screen_name": "telematin",
          "name": "telematin",
          "id": 301317246,
          "id_str": "301317246",
          "indices": [
            12,
            22
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997374716192198700,
    "in_reply_to_status_id_str": "997374716192198656",
    "in_reply_to_user_id": 886650338,
    "in_reply_to_user_id_str": "886650338",
    "in_reply_to_screen_name": "Perrette56",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 1,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Fri May 18 07:20:24 +0000 2018",
    "id": 997376338158813200,
    "id_str": "997376338158813184",
    "text": "@CORNEVILLE Bonjour et bonne journée Geneviève",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "CORNEVILLE",
          "name": "Corneville Geneviève",
          "id": 529186473,
          "id_str": "529186473",
          "indices": [
            0,
            11
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997359386464055300,
    "in_reply_to_status_id_str": "997359386464055296",
    "in_reply_to_user_id": 529186473,
    "in_reply_to_user_id_str": "529186473",
    "in_reply_to_screen_name": "CORNEVILLE",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Fri May 18 05:45:40 +0000 2018",
    "id": 997352499395866600,
    "id_str": "997352499395866624",
    "text": "Je suis contre 🙅🏽\u200d♀️ #Homophobie",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "Homophobie",
          "indices": [
            21,
            32
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 2,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Fri May 18 05:40:50 +0000 2018",
    "id": 997351284276650000,
    "id_str": "997351284276649985",
    "text": "@arnoval59 Bonjour Arno, \nÇa secoue dans le bateau 😬🤣\nBonne journée 😘",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "arnoval59",
          "name": "Arno",
          "id": 2273275530,
          "id_str": "2273275530",
          "indices": [
            0,
            10
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997330486086242300,
    "in_reply_to_status_id_str": "997330486086242304",
    "in_reply_to_user_id": 2273275530,
    "in_reply_to_user_id_str": "2273275530",
    "in_reply_to_screen_name": "arnoval59",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 1,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Fri May 18 05:39:09 +0000 2018",
    "id": 997350861306302500,
    "id_str": "997350861306302464",
    "text": "@Zedde54 Bonjour et bonne journée 😘",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Zedde54",
          "name": "✪Ⓩ 𝓩è𝓭𝓮 Ⓩ✪ ™",
          "id": 337004517,
          "id_str": "337004517",
          "indices": [
            0,
            8
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997237325917761500,
    "in_reply_to_status_id_str": "997237325917761536",
    "in_reply_to_user_id": 337004517,
    "in_reply_to_user_id_str": "337004517",
    "in_reply_to_screen_name": "Zedde54",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 1,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 20:30:26 +0000 2018",
    "id": 997212768716644400,
    "id_str": "997212768716644352",
    "text": "@Brevesdepresse Et ceux qui trime toute l’année à travailler comme des malades y a pas de richesse !! https://t.co/guJUCGH98V",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Brevesdepresse",
          "name": "Brèves de presse",
          "id": 472852289,
          "id_str": "472852289",
          "indices": [
            0,
            15
          ]
        }
      ],
      "urls": [],
      "media": [
        {
          "id": 997212756251103200,
          "id_str": "997212756251103232",
          "indices": [
            102,
            125
          ],
          "media_url": "http://pbs.twimg.com/tweet_video_thumb/DdbPt-XV0AA9NsK.jpg",
          "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/DdbPt-XV0AA9NsK.jpg",
          "url": "https://t.co/guJUCGH98V",
          "display_url": "pic.twitter.com/guJUCGH98V",
          "expanded_url": "https://twitter.com/chichichacha9/status/997212768716644352/photo/1",
          "type": "photo",
          "sizes": {
            "thumb": {
              "w": 150,
              "h": 150,
              "resize": "crop"
            },
            "large": {
              "w": 498,
              "h": 248,
              "resize": "fit"
            },
            "small": {
              "w": 498,
              "h": 248,
              "resize": "fit"
            },
            "medium": {
              "w": 498,
              "h": 248,
              "resize": "fit"
            }
          }
        }
      ]
    },
    "extended_entities": {
      "media": [
        {
          "id": 997212756251103200,
          "id_str": "997212756251103232",
          "indices": [
            102,
            125
          ],
          "media_url": "http://pbs.twimg.com/tweet_video_thumb/DdbPt-XV0AA9NsK.jpg",
          "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/DdbPt-XV0AA9NsK.jpg",
          "url": "https://t.co/guJUCGH98V",
          "display_url": "pic.twitter.com/guJUCGH98V",
          "expanded_url": "https://twitter.com/chichichacha9/status/997212768716644352/photo/1",
          "type": "animated_gif",
          "sizes": {
            "thumb": {
              "w": 150,
              "h": 150,
              "resize": "crop"
            },
            "large": {
              "w": 498,
              "h": 248,
              "resize": "fit"
            },
            "small": {
              "w": 498,
              "h": 248,
              "resize": "fit"
            },
            "medium": {
              "w": 498,
              "h": 248,
              "resize": "fit"
            }
          },
          "video_info": {
            "aspect_ratio": [
              249,
              124
            ],
            "variants": [
              {
                "bitrate": 0,
                "content_type": "video/mp4",
                "url": "https://video.twimg.com/tweet_video/DdbPt-XV0AA9NsK.mp4"
              }
            ]
          }
        }
      ]
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997121842342170600,
    "in_reply_to_status_id_str": "997121842342170624",
    "in_reply_to_user_id": 472852289,
    "in_reply_to_user_id_str": "472852289",
    "in_reply_to_screen_name": "Brevesdepresse",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 1,
    "favorited": false,
    "retweeted": false,
    "possibly_sensitive": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 20:25:49 +0000 2018",
    "id": 997211607993372700,
    "id_str": "997211607993372673",
    "text": "@Cdiscount #CdiscountDays je tente 🤞🏽#iphoneX",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "CdiscountDays",
          "indices": [
            11,
            25
          ]
        },
        {
          "text": "iphoneX",
          "indices": [
            37,
            45
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Cdiscount",
          "name": "Cdiscount",
          "id": 63142684,
          "id_str": "63142684",
          "indices": [
            0,
            10
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997079571986985000,
    "in_reply_to_status_id_str": "997079571986984960",
    "in_reply_to_user_id": 63142684,
    "in_reply_to_user_id_str": "63142684",
    "in_reply_to_screen_name": "Cdiscount",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 20:24:55 +0000 2018",
    "id": 997211383736553500,
    "id_str": "997211383736553477",
    "text": "RT @Cdiscount: 🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVk9Z8RO \n\n🔸 Pour tenter votre chance : \nRT…",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "Concours",
          "indices": [
            17,
            26
          ]
        },
        {
          "text": "CdiscountDays",
          "indices": [
            49,
            63
          ]
        },
        {
          "text": "iPhoneX",
          "indices": [
            69,
            77
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Cdiscount",
          "name": "Cdiscount",
          "id": 63142684,
          "id_str": "63142684",
          "indices": [
            3,
            13
          ]
        }
      ],
      "urls": [
        {
          "url": "https://t.co/gAQVk9Z8RO",
          "expanded_url": "http://bit.ly/2Io6Vy4",
          "display_url": "bit.ly/2Io6Vy4",
          "indices": [
            80,
            103
          ]
        }
      ]
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "retweeted_status": {
      "created_at": "Thu May 17 11:41:09 +0000 2018",
      "id": 997079571986985000,
      "id_str": "997079571986984960",
      "text": "🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVk9Z8RO \n\n🔸 Pour tenter votre chan… https://t.co/M0Y6dU25oe",
      "truncated": true,
      "entities": {
        "hashtags": [
          {
            "text": "Concours",
            "indices": [
              2,
              11
            ]
          },
          {
            "text": "CdiscountDays",
            "indices": [
              34,
              48
            ]
          },
          {
            "text": "iPhoneX",
            "indices": [
              54,
              62
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/gAQVk9Z8RO",
            "expanded_url": "http://bit.ly/2Io6Vy4",
            "display_url": "bit.ly/2Io6Vy4",
            "indices": [
              65,
              88
            ]
          },
          {
            "url": "https://t.co/M0Y6dU25oe",
            "expanded_url": "https://twitter.com/i/web/status/997079571986984960",
            "display_url": "twitter.com/i/web/status/9…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 63142684,
        "id_str": "63142684",
        "name": "Cdiscount",
        "screen_name": "Cdiscount",
        "location": "France",
        "description": "Cdiscount, N'économisez pas votre plaisir ! #BonPlan & #Concours 👍 Besoin d'un conseil ? Nous sommes en DM de 08h à 19h",
        "url": "https://t.co/IUhLib3sxX",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/IUhLib3sxX",
                "expanded_url": "http://bit.ly/Cdiscount-Site",
                "display_url": "bit.ly/Cdiscount-Site",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 305996,
        "friends_count": 3946,
        "listed_count": 676,
        "created_at": "Wed Aug 05 14:12:44 +0000 2009",
        "favourites_count": 2598,
        "utc_offset": 7200,
        "time_zone": "Paris",
        "geo_enabled": true,
        "verified": true,
        "statuses_count": 81380,
        "lang": "fr",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "180882",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/63142684/1526533496",
        "profile_link_color": "FF3300",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": false,
        "has_extended_profile": false,
        "default_profile": false,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": true,
      "quoted_status_id": 996993749506027500,
      "quoted_status_id_str": "996993749506027520",
      "quoted_status": {
        "created_at": "Thu May 17 06:00:07 +0000 2018",
        "id": 996993749506027500,
        "id_str": "996993749506027520",
        "text": "🎁 #Concours \n\n👌 À gagner pour les #CdiscountDays : un #iPhoneX 👉 https://t.co/gAQVkagKgo\n\n🔸 Pour tenter votre chanc… https://t.co/ElIDRFXgor",
        "truncated": true,
        "entities": {
          "hashtags": [
            {
              "text": "Concours",
              "indices": [
                2,
                11
              ]
            },
            {
              "text": "CdiscountDays",
              "indices": [
                34,
                48
              ]
            },
            {
              "text": "iPhoneX",
              "indices": [
                54,
                62
              ]
            }
          ],
          "symbols": [],
          "user_mentions": [],
          "urls": [
            {
              "url": "https://t.co/gAQVkagKgo",
              "expanded_url": "http://bit.ly/2Io6Vy4",
              "display_url": "bit.ly/2Io6Vy4",
              "indices": [
                65,
                88
              ]
            },
            {
              "url": "https://t.co/ElIDRFXgor",
              "expanded_url": "https://twitter.com/i/web/status/996993749506027520",
              "display_url": "twitter.com/i/web/status/9…",
              "indices": [
                117,
                140
              ]
            }
          ]
        },
        "source": "<a href=\"https://twitter.facelift-cloud.com\" rel=\"nofollow\">Facelift Cloud</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 63142684,
          "id_str": "63142684",
          "name": "Cdiscount",
          "screen_name": "Cdiscount",
          "location": "France",
          "description": "Cdiscount, N'économisez pas votre plaisir ! #BonPlan & #Concours 👍 Besoin d'un conseil ? Nous sommes en DM de 08h à 19h",
          "url": "https://t.co/IUhLib3sxX",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "https://t.co/IUhLib3sxX",
                  "expanded_url": "http://bit.ly/Cdiscount-Site",
                  "display_url": "bit.ly/Cdiscount-Site",
                  "indices": [
                    0,
                    23
                  ]
                }
              ]
            },
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 305996,
          "friends_count": 3946,
          "listed_count": 676,
          "created_at": "Wed Aug 05 14:12:44 +0000 2009",
          "favourites_count": 2598,
          "utc_offset": 7200,
          "time_zone": "Paris",
          "geo_enabled": true,
          "verified": true,
          "statuses_count": 81380,
          "lang": "fr",
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "180882",
          "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
          "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/63142684/1526533496",
          "profile_link_color": "FF3300",
          "profile_sidebar_border_color": "FFFFFF",
          "profile_sidebar_fill_color": "DDEEF6",
          "profile_text_color": "333333",
          "profile_use_background_image": false,
          "has_extended_profile": false,
          "default_profile": false,
          "default_profile_image": false,
          "following": true,
          "follow_request_sent": false,
          "notifications": false,
          "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 20613,
        "favorite_count": 4079,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "fr"
      },
      "retweet_count": 3416,
      "favorite_count": 908,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "fr"
    },
    "is_quote_status": true,
    "quoted_status_id": 996993749506027500,
    "quoted_status_id_str": "996993749506027520",
    "retweet_count": 3416,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "possibly_sensitive": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 20:24:43 +0000 2018",
    "id": 997211332876390400,
    "id_str": "997211332876390401",
    "text": "@StephanieDruel1 @AmazingLovelyGM @myaddictionGM @2000Saraf6 @mado_mader @SimoneBlanchett @LilyYog83 @Smithpaula22… https://t.co/CPf9zRFrEl",
    "truncated": true,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "StephanieDruel1",
          "name": "Stephanie Druelle",
          "id": 2401697404,
          "id_str": "2401697404",
          "indices": [
            0,
            16
          ]
        },
        {
          "screen_name": "AmazingLovelyGM",
          "name": "Ilse",
          "id": 245050009,
          "id_str": "245050009",
          "indices": [
            17,
            33
          ]
        },
        {
          "screen_name": "myaddictionGM",
          "name": "💞BEÆTRICE💞",
          "id": 824702176912150500,
          "id_str": "824702176912150529",
          "indices": [
            34,
            48
          ]
        },
        {
          "screen_name": "2000Saraf6",
          "name": "RÆchel🌹",
          "id": 774228914327711700,
          "id_str": "774228914327711744",
          "indices": [
            49,
            60
          ]
        },
        {
          "screen_name": "mado_mader",
          "name": "Mado Mader🎶GM 🌹",
          "id": 2973384232,
          "id_str": "2973384232",
          "indices": [
            61,
            72
          ]
        },
        {
          "screen_name": "SimoneBlanchett",
          "name": "Sibi 💙💙💙",
          "id": 2249485646,
          "id_str": "2249485646",
          "indices": [
            73,
            89
          ]
        },
        {
          "screen_name": "LilyYog83",
          "name": "Lιℓу Æ ♑ #VamosRafa 🇪🇸",
          "id": 262748432,
          "id_str": "262748432",
          "indices": [
            90,
            100
          ]
        },
        {
          "screen_name": "Smithpaula22",
          "name": "Samara Smith",
          "id": 4033808765,
          "id_str": "4033808765",
          "indices": [
            101,
            114
          ]
        }
      ],
      "urls": [
        {
          "url": "https://t.co/CPf9zRFrEl",
          "expanded_url": "https://twitter.com/i/web/status/997211332876390401",
          "display_url": "twitter.com/i/web/status/9…",
          "indices": [
            116,
            139
          ]
        }
      ]
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997115135188750300,
    "in_reply_to_status_id_str": "997115135188750336",
    "in_reply_to_user_id": 2401697404,
    "in_reply_to_user_id_str": "2401697404",
    "in_reply_to_screen_name": "StephanieDruel1",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 3,
    "favorite_count": 14,
    "favorited": false,
    "retweeted": false,
    "possibly_sensitive": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 19:50:00 +0000 2018",
    "id": 997202594656346100,
    "id_str": "997202594656346113",
    "text": "#JaiToujoursLeTempsPour en fait non j’ai jamais le temps",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "JaiToujoursLeTempsPour",
          "indices": [
            0,
            23
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 4,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 17:21:26 +0000 2018",
    "id": 997165207200952300,
    "id_str": "997165207200952320",
    "text": "Les parisiennes avec Arielle Domsbal 🙄 #Quotidien",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "Quotidien",
          "indices": [
            39,
            49
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 5,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 11:35:45 +0000 2018",
    "id": 997078213087191000,
    "id_str": "997078213087191041",
    "text": "@Zedde54 🤨😘😘",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Zedde54",
          "name": "✪Ⓩ 𝓩è𝓭𝓮 Ⓩ✪ ™",
          "id": 337004517,
          "id_str": "337004517",
          "indices": [
            0,
            8
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997060256525004800,
    "in_reply_to_status_id_str": "997060256525004800",
    "in_reply_to_user_id": 337004517,
    "in_reply_to_user_id_str": "337004517",
    "in_reply_to_screen_name": "Zedde54",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 1,
    "favorited": false,
    "retweeted": false,
    "lang": "und"
  },
  {
    "created_at": "Thu May 17 11:35:19 +0000 2018",
    "id": 997078105666871300,
    "id_str": "997078105666871297",
    "text": "@Cdiscount J’ai besoin de voyager 😁 merci",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Cdiscount",
          "name": "Cdiscount",
          "id": 63142684,
          "id_str": "63142684",
          "indices": [
            0,
            10
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997077150418251800,
    "in_reply_to_status_id_str": "997077150418251776",
    "in_reply_to_user_id": 63142684,
    "in_reply_to_user_id_str": "63142684",
    "in_reply_to_screen_name": "Cdiscount",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 1,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 11:34:47 +0000 2018",
    "id": 997077970383704000,
    "id_str": "997077970383704065",
    "text": "RT @Cdiscount: 🛫 Cdiscount lance #CdiscountVoyages \n\n🎁 Célébrons cette nouveauté avec un cadeau !\nÀ gagner avec Aigle Azur : un voyage pour…",
    "truncated": false,
    "entities": {
      "hashtags": [
        {
          "text": "CdiscountVoyages",
          "indices": [
            33,
            50
          ]
        }
      ],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Cdiscount",
          "name": "Cdiscount",
          "id": 63142684,
          "id_str": "63142684",
          "indices": [
            3,
            13
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "retweeted_status": {
      "created_at": "Thu May 17 11:31:32 +0000 2018",
      "id": 997077150418251800,
      "id_str": "997077150418251776",
      "text": "🛫 Cdiscount lance #CdiscountVoyages \n\n🎁 Célébrons cette nouveauté avec un cadeau !\nÀ gagner avec Aigle Azur : un vo… https://t.co/QtOvNgj8Oh",
      "truncated": true,
      "entities": {
        "hashtags": [
          {
            "text": "CdiscountVoyages",
            "indices": [
              18,
              35
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/QtOvNgj8Oh",
            "expanded_url": "https://twitter.com/i/web/status/997077150418251776",
            "display_url": "twitter.com/i/web/status/9…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 63142684,
        "id_str": "63142684",
        "name": "Cdiscount",
        "screen_name": "Cdiscount",
        "location": "France",
        "description": "Cdiscount, N'économisez pas votre plaisir ! #BonPlan & #Concours 👍 Besoin d'un conseil ? Nous sommes en DM de 08h à 19h",
        "url": "https://t.co/IUhLib3sxX",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/IUhLib3sxX",
                "expanded_url": "http://bit.ly/Cdiscount-Site",
                "display_url": "bit.ly/Cdiscount-Site",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 305996,
        "friends_count": 3946,
        "listed_count": 676,
        "created_at": "Wed Aug 05 14:12:44 +0000 2009",
        "favourites_count": 2598,
        "utc_offset": 7200,
        "time_zone": "Paris",
        "geo_enabled": true,
        "verified": true,
        "statuses_count": 81380,
        "lang": "fr",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "180882",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/63142684/1526533496",
        "profile_link_color": "FF3300",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": false,
        "has_extended_profile": false,
        "default_profile": false,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": true,
      "quoted_status_id": 997063445320228900,
      "quoted_status_id_str": "997063445320228865",
      "quoted_status": {
        "created_at": "Thu May 17 10:37:04 +0000 2018",
        "id": 997063445320228900,
        "id_str": "997063445320228865",
        "text": "🛫 Cdiscount lance #CdiscountVoyages \n\n🎁 Célébrons cette nouveauté avec un cadeau !\nÀ gagner avec Aigle Azur : un vo… https://t.co/NtBxCg8ILN",
        "truncated": true,
        "entities": {
          "hashtags": [
            {
              "text": "CdiscountVoyages",
              "indices": [
                18,
                35
              ]
            }
          ],
          "symbols": [],
          "user_mentions": [],
          "urls": [
            {
              "url": "https://t.co/NtBxCg8ILN",
              "expanded_url": "https://twitter.com/i/web/status/997063445320228865",
              "display_url": "twitter.com/i/web/status/9…",
              "indices": [
                117,
                140
              ]
            }
          ]
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 63142684,
          "id_str": "63142684",
          "name": "Cdiscount",
          "screen_name": "Cdiscount",
          "location": "France",
          "description": "Cdiscount, N'économisez pas votre plaisir ! #BonPlan & #Concours 👍 Besoin d'un conseil ? Nous sommes en DM de 08h à 19h",
          "url": "https://t.co/IUhLib3sxX",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "https://t.co/IUhLib3sxX",
                  "expanded_url": "http://bit.ly/Cdiscount-Site",
                  "display_url": "bit.ly/Cdiscount-Site",
                  "indices": [
                    0,
                    23
                  ]
                }
              ]
            },
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 305996,
          "friends_count": 3946,
          "listed_count": 676,
          "created_at": "Wed Aug 05 14:12:44 +0000 2009",
          "favourites_count": 2598,
          "utc_offset": 7200,
          "time_zone": "Paris",
          "geo_enabled": true,
          "verified": true,
          "statuses_count": 81380,
          "lang": "fr",
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "180882",
          "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
          "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/481675260773691392/TqtHRSuj.jpeg",
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/964135209208774657/e5D9z1EU_normal.jpg",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/63142684/1526533496",
          "profile_link_color": "FF3300",
          "profile_sidebar_border_color": "FFFFFF",
          "profile_sidebar_fill_color": "DDEEF6",
          "profile_text_color": "333333",
          "profile_use_background_image": false,
          "has_extended_profile": false,
          "default_profile": false,
          "default_profile_image": false,
          "following": true,
          "follow_request_sent": false,
          "notifications": false,
          "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 5929,
        "favorite_count": 1132,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "fr"
      },
      "retweet_count": 928,
      "favorite_count": 303,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "fr"
    },
    "is_quote_status": true,
    "quoted_status_id": 997063445320228900,
    "quoted_status_id_str": "997063445320228865",
    "retweet_count": 928,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 11:34:02 +0000 2018",
    "id": 997077780293738500,
    "id_str": "997077780293738496",
    "text": "RT @Actu17: 🇺🇸 États-Unis : Sa cigarette électronique explose, il meurt sur le coup. https://t.co/5Tk6iuA9Wa https://t.co/8g7MvBceZt",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "Actu17",
          "name": "Actu17",
          "id": 3025757015,
          "id_str": "3025757015",
          "indices": [
            3,
            10
          ]
        }
      ],
      "urls": [
        {
          "url": "https://t.co/5Tk6iuA9Wa",
          "expanded_url": "http://wp.me/p7GDoh-9Iz",
          "display_url": "wp.me/p7GDoh-9Iz",
          "indices": [
            85,
            108
          ]
        }
      ],
      "media": [
        {
          "id": 997048750924292100,
          "id_str": "997048750924292096",
          "indices": [
            109,
            132
          ],
          "media_url": "http://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
          "media_url_https": "https://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
          "url": "https://t.co/8g7MvBceZt",
          "display_url": "pic.twitter.com/8g7MvBceZt",
          "expanded_url": "https://twitter.com/Actu17/status/997048757043781632/photo/1",
          "type": "photo",
          "sizes": {
            "thumb": {
              "w": 150,
              "h": 150,
              "resize": "crop"
            },
            "medium": {
              "w": 710,
              "h": 482,
              "resize": "fit"
            },
            "small": {
              "w": 680,
              "h": 462,
              "resize": "fit"
            },
            "large": {
              "w": 710,
              "h": 482,
              "resize": "fit"
            }
          },
          "source_status_id": 997048757043781600,
          "source_status_id_str": "997048757043781632",
          "source_user_id": 3025757015,
          "source_user_id_str": "3025757015"
        }
      ]
    },
    "extended_entities": {
      "media": [
        {
          "id": 997048750924292100,
          "id_str": "997048750924292096",
          "indices": [
            109,
            132
          ],
          "media_url": "http://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
          "media_url_https": "https://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
          "url": "https://t.co/8g7MvBceZt",
          "display_url": "pic.twitter.com/8g7MvBceZt",
          "expanded_url": "https://twitter.com/Actu17/status/997048757043781632/photo/1",
          "type": "photo",
          "sizes": {
            "thumb": {
              "w": 150,
              "h": 150,
              "resize": "crop"
            },
            "medium": {
              "w": 710,
              "h": 482,
              "resize": "fit"
            },
            "small": {
              "w": 680,
              "h": 462,
              "resize": "fit"
            },
            "large": {
              "w": 710,
              "h": 482,
              "resize": "fit"
            }
          },
          "source_status_id": 997048757043781600,
          "source_status_id_str": "997048757043781632",
          "source_user_id": 3025757015,
          "source_user_id_str": "3025757015"
        }
      ]
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "retweeted_status": {
      "created_at": "Thu May 17 09:38:42 +0000 2018",
      "id": 997048757043781600,
      "id_str": "997048757043781632",
      "text": "🇺🇸 États-Unis : Sa cigarette électronique explose, il meurt sur le coup. https://t.co/5Tk6iuA9Wa https://t.co/8g7MvBceZt",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/5Tk6iuA9Wa",
            "expanded_url": "http://wp.me/p7GDoh-9Iz",
            "display_url": "wp.me/p7GDoh-9Iz",
            "indices": [
              73,
              96
            ]
          }
        ],
        "media": [
          {
            "id": 997048750924292100,
            "id_str": "997048750924292096",
            "indices": [
              97,
              120
            ],
            "media_url": "http://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
            "media_url_https": "https://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
            "url": "https://t.co/8g7MvBceZt",
            "display_url": "pic.twitter.com/8g7MvBceZt",
            "expanded_url": "https://twitter.com/Actu17/status/997048757043781632/photo/1",
            "type": "photo",
            "sizes": {
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "medium": {
                "w": 710,
                "h": 482,
                "resize": "fit"
              },
              "small": {
                "w": 680,
                "h": 462,
                "resize": "fit"
              },
              "large": {
                "w": 710,
                "h": 482,
                "resize": "fit"
              }
            }
          }
        ]
      },
      "extended_entities": {
        "media": [
          {
            "id": 997048750924292100,
            "id_str": "997048750924292096",
            "indices": [
              97,
              120
            ],
            "media_url": "http://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
            "media_url_https": "https://pbs.twimg.com/media/DdY6jm6W4AAPQzP.jpg",
            "url": "https://t.co/8g7MvBceZt",
            "display_url": "pic.twitter.com/8g7MvBceZt",
            "expanded_url": "https://twitter.com/Actu17/status/997048757043781632/photo/1",
            "type": "photo",
            "sizes": {
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "medium": {
                "w": 710,
                "h": 482,
                "resize": "fit"
              },
              "small": {
                "w": 680,
                "h": 462,
                "resize": "fit"
              },
              "large": {
                "w": 710,
                "h": 482,
                "resize": "fit"
              }
            }
          }
        ]
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 3025757015,
        "id_str": "3025757015",
        "name": "Actu17",
        "screen_name": "Actu17",
        "location": "Paris, France.",
        "description": "L'actualité #Police #Sécurité #Terrorisme en direct. • Décryptages et alertes •📱Téléchargez notre appli iPhone et Android !",
        "url": "https://t.co/TOZv5k9mwx",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/TOZv5k9mwx",
                "expanded_url": "http://www.Actu17.fr",
                "display_url": "Actu17.fr",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 24914,
        "friends_count": 3225,
        "listed_count": 408,
        "created_at": "Sun Feb 08 23:30:23 +0000 2015",
        "favourites_count": 1489,
        "utc_offset": 7200,
        "time_zone": "Paris",
        "geo_enabled": true,
        "verified": false,
        "statuses_count": 21977,
        "lang": "fr",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "000000",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/858464895666466817/mfslHOyL_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/858464895666466817/mfslHOyL_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/3025757015/1522431373",
        "profile_link_color": "0D006E",
        "profile_sidebar_border_color": "000000",
        "profile_sidebar_fill_color": "000000",
        "profile_text_color": "000000",
        "profile_use_background_image": false,
        "has_extended_profile": false,
        "default_profile": false,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 44,
      "favorite_count": 20,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "fr"
    },
    "is_quote_status": false,
    "retweet_count": 44,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "possibly_sensitive": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 11:32:20 +0000 2018",
    "id": 997077354676654100,
    "id_str": "997077354676654080",
    "text": "@MistyKyu Je n’ai nullement cette impression 😊",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "MistyKyu",
          "name": "Misty",
          "id": 1635407270,
          "id_str": "1635407270",
          "indices": [
            0,
            9
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997060220575715300,
    "in_reply_to_status_id_str": "997060220575715328",
    "in_reply_to_user_id": 1635407270,
    "in_reply_to_user_id_str": "1635407270",
    "in_reply_to_screen_name": "MistyKyu",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  },
  {
    "created_at": "Thu May 17 10:02:10 +0000 2018",
    "id": 997054660128190500,
    "id_str": "997054660128190464",
    "text": "@MistyKyu Le truc qui énerve bien !!",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [
        {
          "screen_name": "MistyKyu",
          "name": "Misty",
          "id": 1635407270,
          "id_str": "1635407270",
          "indices": [
            0,
            9
          ]
        }
      ],
      "urls": []
    },
    "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
    "in_reply_to_status_id": 997034190045577200,
    "in_reply_to_status_id_str": "997034190045577216",
    "in_reply_to_user_id": 1635407270,
    "in_reply_to_user_id_str": "1635407270",
    "in_reply_to_screen_name": "MistyKyu",
    "user": {
      "id": 4185842841,
      "id_str": "4185842841",
      "name": "shasha",
      "screen_name": "chichichacha9",
      "location": "",
      "description": "La vie ne vaut rien mais rien ne vaut la vie...",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 249,
      "friends_count": 252,
      "listed_count": 13,
      "created_at": "Sat Nov 14 11:13:55 +0000 2015",
      "favourites_count": 17762,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": false,
      "verified": false,
      "statuses_count": 18259,
      "lang": "fr",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/760520516662878209/Agr70m1Y_normal.jpg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/4185842841/1502431261",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": true,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "lang": "fr"
  }
];


__.each(tweets, function(tweet){
  console.log('tweet',utils.getInfoOfTweet(tweet));
});
