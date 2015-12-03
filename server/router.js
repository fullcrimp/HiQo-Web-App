// DI
var express = require('express');
var app = express();

// dev|prod logic
var staticFolderToServe = 'development';
var portToServe = 1111;

if( process.argv.length > 2 ) {
    staticFolderToServe = process.argv[2];
}

if( process.argv.length > 3 ) {
    portToServe = process.argv[3];
}

// SPA ROUTES
app.get('/', function (req, res) {
    res.sendfile(staticFolderToServe + '/index.html');
});

app.use(express.static(staticFolderToServe));

var server = app.listen(portToServe, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Serving "' + staticFolderToServe + '" at http://%s:%s', host, port);
});
