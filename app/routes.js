var landingPage = '/www/index.html',
    mustache = require('mustache');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + landingPage);
    });
    app.get('/teamFinder/', function(req, res) {
        res.sendFile(__dirname + "/www/teamFinder.html");
    });
    app.get('/register/', function(req, res) {
        res.sendFile(__dirname + "/www/register.html");
    });
    app.get('/myGroup/', function(req, res) {
        res.sendFile(__dirname + "/www/myGroup.html");
    });
};
