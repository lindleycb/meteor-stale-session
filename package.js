Package.describe({
  'summary': 'Stale session and session timeout handling for meteorjs'
});

Package.on_use(function(api) {
  api.use('deps');
  api.use('jquery', 'client');
  api.add_files('config.js', ['client', 'server']);
  api.add_files('client.js', 'client');
  api.add_files('server.js', 'server');
});
