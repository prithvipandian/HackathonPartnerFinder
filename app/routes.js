var landingPage = '/www/index.html',
            url = require('url'),
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
            "lookingFor": "NodeJS, Android, Wearables",
            "Teammates": [ 
                {
                    "first_name": "Daniel",
                    "last_name": "Feldman",
                    "uuid": "asdf",
                    "skills": "Mad skillz yo",
                    "img":"/img/leader1.jpg",
                    "level": "5"
                },
                {
                    "first_name": "Daniel",
                    "last_name": "Feldman",
                    "uuid": "qwer",
                    "skills": "Mad skillz yo 2",
                    "img":"/img/leader1.jpg",
                    "level": "5"
                },
                {
                    "first_name": "Daniel",
                    "last_name": "Feldman",
                    "uuid": "zxcv",
                    "skills": "Mad skillz yo 3",
                    "img":"/img/leader1.jpg",
                    "level": "5"
                }
            ]
        };
        dummyJSON.numTeammates = dummyJSON.Teammates.length;
        res.render("myGroup.hbs", dummyJSON);
    });
/*
======================== API START =======================
*/
    app.get('/app/teaminfo', function(req, res) {
        var url_parts = url.parse(req.url, true);
        var idea = url_parts.query;
        delete idea['callback'];
        delete idea['_'];
        //var idea = req.params;
        global.logger.info(idea);
        mongoConn.addIdea(idea, function(err){
            if(err) throw err;
    	});
    });
    app.get('/app/register', function(req,res){
        var url_parts = url.parse(req.url, true);
        var user = url_parts.query;
        delete user['callback'];
        delete user['_'];
        //var user = req.params;
    	global.logger.info(user);
    	mongoConn.addUser(user, function(err){
    	    if(err) throw err;
    	});
    });
};
