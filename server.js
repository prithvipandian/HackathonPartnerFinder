var express = require('express'),
    app = express(),
    hbs = require('hbs'),
    mustache = require('mustache'),
    bodyParser  = require('body-parser'),
    log4js = require('log4js');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'hbs');


log4js.configure('./config/logappender.json', {});

global.logger = log4js.getLogger('app');

require('./app/routes.js')(app);
var port = Number(process.env.PORT || 5000);
var server = app.listen(port, function() {
    global.logger.info('Listening on port %d', server.address().port);
});


