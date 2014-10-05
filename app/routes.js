var landingPage = '/www/index.html',
    mustache = require('mustache');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + landingPage);
    });
    app.get('/teamFinder/', function(req, res) {
	var dummyJSON = {
		"Teams": [
	    {
		"Title": "GEOLOCATION HACK!",
		"Description": "Make us go to class",
		"Tags": [
	    {
		"imageName": "android.png"
	    },
	    {
		"imageName": "nodejs.jpeg"
	    }
			 ],
		"lookingFor": "NodeJS, Java, Android"
	    }
  ]
	    };
        
        res.render("teamFinder.hbs", dummyJSON);
    });
    app.get('/register/', function(req, res) {
        res.sendFile(__dirname + "/www/register.html");
    });
};
