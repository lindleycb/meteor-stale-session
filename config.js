Meteor.startup(function() {
  if (! Meteor.settings) {
      Meteor.settings = {};
  }

  if (! Meteor.settings.public) {
      Meteor.settings.public = {};
  }

  // Meteor settings:
  // - staleSessionHeartbeatInterval: interval (in ms) at which activity heartbeats are sent up to the server
  // - staleSessionActivityEvents: the jquery events which are considered indicator of activity e.g. in an on() call.
  // - staleSessionInactivityTimeout: the amount of time (in ms) after which, if no activity is noticed, a session will be considered stale
  // - staleSessionPurgeInterval: interval (in ms) at which stale sessions are purged i.e. found and forcibly logged out
  //
  var defaults = {
    staleSessionHeartbeatInterval: (3*60*1000), // 3mins
    staleSessionActivityEvents: 'mousemove click keydown',
    staleSessionPurgeInterval: (1*60*1000), // 1min
    staleSessionInactivityTimeout: (30*60*1000) // 30mins
  };

  for (var key in defaults) {
    var _default = defaults[key];
    if (! Meteor.settings.public[key]) {
      Meteor.settings.public[key] = _default;
    }
  }
});
