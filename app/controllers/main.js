/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
var fs = require('fs');


var NAVS = {
      '/': 'Home'
    , '/band': 'The Band'
    , '/pics': 'Pics'
    , '/music': 'Music'
    , '/schedule': 'Schedule'
    , '/setlist': 'Set List'
    , '/fans': 'Fans'
    , '/contact': 'Contact'
    }
  , EVENTS_URL = 'https://graph.facebook.com/539862106054222/events?fields=id,name,description,picture&access_token=2418803385|lvofYVRMdQf9Vz7cj-WIWipWwqM'
  , QUOTES = {
      'Katie S. Newark, CA': "Where to begin? It's like being at the Head Bangers Ball! You guys are frickin’ amazing I'm always a fan of live music and I know all the words too:) The vocalist's range is crazy awesome! Guitar riffs the best! You guys totally take me down to Paradise City! Rock on -- your biggest fan and yes I graduated in 1988 :)"

, 'Maryellen H., Hayward, CA': "OMG! Hairstrike is so much fun! Their energy and vocals made it an instant “everyone singing along” kind of party!!"

, 'Christine C., Bobby D’s Cocktail Lounge, Redwood City, CA': "Hello to Hairstrike and fans! For all who have yet to see these guys, please go see  them! The band is a throwback of the 80's hairband days and a blast to see. They sing most of the songs you would expect from the era and do it well. We are definitely going to book them again in the New Year so if you haven't seen them by then I urge you to do so with us."

, 'Kevin M., San Francisco, CA': "I have seen many local bands play here at Abbey Tavern and most struggle with their sound. Hairstrike had their sound down to a “T”. As a regular here, I was actually getting ready to leave until I heard them at sound check. I immediately called my friends to come down and we stayed for all three sets."

, 'David M., Redwood City, CA': "Although I can appreciate bands that play original material, the fact is, folks want to hear songs they know and love and when it comes to 80's rock, Hairstrike delivers in a big way. They play all the big hits from the genre, interact with the audience and really make them feel a part of things and make sure they have fun. True crowd  pleasers. They really live up to their slogan of \"Nothin' But A Good Time.\" If you have a club or bar and host live music, you better book these guys now. Something tells me they are going to be a very busy band soon."

, 'Glen D., Belmont, CA': "WOW, its like I was back at The Stone or Keystone Palo Alto all over again. These guys rock. Brought me right back to 1985 \m/"

, 'Martin S., San Francisco, CA': "One of the best cover bands I have seen in a long time. Great vocals and solid musicianship. I look forward to catching them again soon."
    }
  , PIC_LIST = fs.readdirSync('./public/img/pics').filter(function (item) {
      return /\.jpg$/.test(item) && !/_thumb\.jpg$/.test(item);
    });

PIC_LIST.sort();

var Main = function () {
  var self = this
    , navArray = Object.keys(NAVS);

  this.navs = NAVS;
  this.picList = PIC_LIST;

  navArray.forEach(function (item) {
    var action = item.replace('/', '');
    action = action || 'index';

    if (action == 'schedule') {
      return;
    }

    self[action] = function (req, resp, params) {
      self.respond(params, {
        format: 'html'
      , template: 'app/views/main/' + action
      });
    };
  });

  this.before(function () {
    this.quotes = this.getRandomQuotes(2);
    this.allQuotes = QUOTES;
  });

  this.schedule = function (req, resp, params) {
    var self = this;
    geddy.request({url: EVENTS_URL, dataType: 'json'}, function (err, data) {
      self.events = data.data;
      self.events.reverse();
      self.events.forEach(function (ev) {
        // 2014-03-22T22:00:00-0700
        var s = ev.start_time
          , dt;
        // Strip TZ info to create a floating date
        s = s.replace(/-\d+?$/, '');
        dt = geddy.date.parse(s);
        ev.start_time = geddy.date.strftime(dt, '%A, %B %e, %Y, at %l:%M %p');
      });
      self.respond(params, {
        format: 'html'
      , template: 'app/views/main/schedule'
      });
    });
  };

};

// Fisher-Yates shuffle:
// http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

Main.prototype.getRandomQuotes = function (count) {
  var keys = Object.keys(QUOTES)
    , key
    , shuffled = shuffle(keys)
    , ret = {};
    for (var i = 0, ii = count; i < ii; i++) {
      key = shuffled[i];
      ret[key] = QUOTES[key];
    }
    return ret;
};

exports.Main = Main;


