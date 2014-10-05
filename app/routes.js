var landingPage = '/www/index.html',
    mustache = require('mustache'),
    mongoConn = require('./mongoconnector');


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
    app.get('/myGroup/', function(req, res) {
        var dummyJSON = {
            "ideaTitle": "GEOLOCATION HACK!",
            "ideaDescription": "Make us go to class",
            "Tags": [
	        {
                    "imageName": "android.png"
                },
	        {
                    "imageName": "nodejs.jpeg"
	        },
	    ],
            "lookingFor": "NodeJS, Android, Wearables"
        };
        res.render("myGroup.hbs", dummyJSON);
    });
/*
======================== API START =======================
*/
    app.post('/app/teaminfo', function(req, res) {
    	var idea = req.body;
        global.logger.info(idea);
        mongoConn.addIdea(idea, function(err){
    		if(err) throw err;
    	});
    });
    app.post('/app/register', function(req,res){
    	var user = req.body;
    	global.logger.info(user);
    	mongoConn.addUser(user, function(err){
    		if(err) throw err;
    	});
    });
};
