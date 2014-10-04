var landingPage = '/index.html',
        rootdir = '/home/ubuntu/';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('www/index.html', {"root": rootdir});
    });
};
