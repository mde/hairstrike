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

var NAVS = {
      '/': 'Home'
    , '/band': 'The Band'
    , '/pics': 'Pics'
    , '/music': 'Music'
    , '/schedule': 'Schedule'
    , '/setlist': 'Set List'
    , '/contact': 'contact'
    }
  , EVENTS_URL = 'https://graph.facebook.com/539862106054222/events?fields=id,name,description,picture&access_token=2418803385|lvofYVRMdQf9Vz7cj-WIWipWwqM';

var Main = function () {
  var self = this
    , navArray = Object.keys(NAVS);

  this.navs = NAVS;

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
        ev.start_time = geddy.date.strftime(dt, '%B %e, %Y, at %l:%M %p');
      });
      self.respond(params, {
        format: 'html'
      , template: 'app/views/main/schedule'
      });
    });
  };

};

exports.Main = Main;


