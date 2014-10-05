var express = require('express'),
    app = express(),
    hbs = require('hbs'),
    mustache = require('mustache'),
    bodyParser  = require('body-parser'),
    log4js = require('log4js');
   // bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
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

// var http = require("http");
// var server = http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/html"});
//   response.write("<!DOCTYPE 'html'>");
//   response.write("<html>");
//   response.write("<head>");
//   response.write("<title>Hello World Page</title>");
//   response.write("</head>");
//   response.write("<body>");
//   response.write("Hello World!");
//   response.write("</body>");
//   response.write("</html>");
//   response.end();
// });
 
// server.listen(80);
// console.log("Server is listening");
