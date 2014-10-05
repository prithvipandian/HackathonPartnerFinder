var landingPage = '/www/index.html',
            url = require('url'),
      mongoConn = require('./mongoconnector'),
           uuid = require('node-uuid');

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
        var hackathon = req.param('hackathon');
        mongoConn.getAllIdeas(hackathon, function(err, teamsArray) {
            if (err) throw err;
            var dataJSON = { "Teams": teamsArray };
            res.redner("teamFinder.hbs", dataJSON);
        }); 
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
        
    });
    app.get('/myGroup/', function(req, res) {
        var hackathon = req.params("hackathon");
        var groupId = req.params("groupId");
        mongoConn.getIdea(hackathon, groupId, function(err, ideaJSON) {
            if (err) throw err;
            var dataJSON = ideaJSON;
            mongoConn.getAllUsersOfGroup(hackathon, groupId, function(err2, userInfoArray) {
                if (err2) throw err2;
                dataJSON.Teammates = userInfoArray;
                dataJSON.numTeammates = dataJSON.Teammates.length;
                res.render("myGroup.hbs", dataJSON);                
            });
        });
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
    });
/*
======================== API START =======================
*/
    app.get('/app/teaminfo', function(req, res) {
        var url_parts = url.parse(req.url, true);
        var idea = url_parts.query;
        delete idea['callback'];
        delete idea['_'];
        var uuid1 = uuid.v1();
        idea.gid = uuid1;
        //var idea = req.params;
        global.logger.info(idea);
        mongoConn.addIdea(idea.hackathon, idea, function(err){
            if(err) throw err;
    	});
    });
    app.get('/app/register', function(req,res){
        var url_parts = url.parse(req.url, true);
        var user = url_parts.query;
        delete user['callback'];
        delete user['_'];
        var uuid1 = uuid.v1();
        idea.uid = uuid1;
        //var user = req.params;
    	global.logger.info(user);
    	mongoConn.addUser('calhacks', user, function(err){
    	    if(err) throw err;
    	});
    	mongoConn.addUser('lahacks', user, function(err){
    	    if(err) throw err;
    	});
    	mongoConn.addUser('fbhacks', user, function(err){
    	    if(err) throw err;
    	});
    });
};
