var landingPage = '/www/index.html';


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + landingPage);
    });
    app.get('/', function(req, res) {
        res.sendFile(__dirname + "");
    });
};
