Meteor.startup(function() {
  //
  // Server side activity detection for the session timeout
  //
  var staleSessionPurgeInterval = Meteor.settings.public.staleSessionPurgeInterval;
  var inactivityTimeout = Meteor.settings.public.staleSessionInactivityTimeout;

  //
  // provide a user activity heartbeat method which stamps the user record with a timestamp of the last
  // received activity heartbeat.
  //
  Meteor.methods({
    heartbeat: function(options) {
      if (!this.userId) { return; }
      var user = Meteor.users.findOne(this.userId);
      if (user) {
          Meteor.users.update(user._id, {$set: {heartbeat: new Date()}});
      }
    }
  });


  //
  // periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.
  //
  Meteor.setInterval(function() {
    var now = new Date(), overdueTimestamp = new Date(now-inactivityTimeout);
    Meteor.users.update({heartbeat: {$lt: overdueTimestamp}},
                        {$set: {'services.resume.loginTokens': []},
                         $unset: {heartbeat:1}},
                        {multi: true});
  }, staleSessionPurgeInterval);
});
