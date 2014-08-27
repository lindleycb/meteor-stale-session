Package.describe({
  name:    'zuuk:stale-session',
  summary: 'Stale session and session timeout handling for meteorjs',
  git:     "https://github.com/lindleycb/meteor-stale-session.git",
  version: "1.0.5"
});

Package.onUse(function(api) {
    api.use('accounts-base', ['client','server']);
    api.use('jquery', 'client');
    api.addFiles('client.js', 'client');
    api.addFiles('server.js', 'server');
});
