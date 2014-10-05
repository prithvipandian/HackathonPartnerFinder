var landingPage = '/www/index.html',
    mustache = require('mustache');


module.exports = function(app) {
/*
================== STATIC ROUTES =====================
*/
    app.get('/', function(req, res) {
        res.sendFile(__dirname + landingPage);
    });
    app.get('/register/', function(req, res) {
        res.sendFile(__dirname + "/www/register.html");
    });
    app.get('/myGroup/', function(req, res) {
        res.sendFile(__dirname + "/www/myGroup.html");
    });
/*
================= TEMPLATE RENDERINGS  ==================
*/
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
/*
======================== API START =======================
*/
    app.post('/app/teaminfo', function(req, res) {
        global.logger.info(req.body);
    });
};
