Package.describe({
    'summary': 'Stale session and session timeout handling for meteorjs'
});

Package.on_use(function(api) {
    api.use('jquery', 'client');
    api.add_files('client.js', 'client');
    api.add_files('server.js', 'server');
});
