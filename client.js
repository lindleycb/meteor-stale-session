//
// Client side activity detection for the session timeout
// - depends on jquery
//

//
// Runs in a `Meteor.startup` function so that we don't hook up the heartbeat
// interval before the server sends `Meteor.settings` to the client.
//
Meteor.startup(function(c) {
  if (! Meteor.settings || ! Meteor.settings.public)
    return;

  var activityDetected = false;
  var heartbeatInterval = Meteor.settings.public.staleSessionHeartbeatInterval;
  var activityEvents = Meteor.settings.public.staleSessionActivityEvents;

  //
  // periodically send a heartbeat if activity has been detected within the interval
  //
  Meteor.setInterval(function() {
    if (Meteor.userId() && activityDetected) {
      Meteor.call('heartbeat');
      activityDetected = false;
    }
  }, heartbeatInterval);

  //
  // detect activity and mark it as detected on any of the following events
  //
  $('body').on(activityEvents, function() {
    activityDetected = true;
  });
});
