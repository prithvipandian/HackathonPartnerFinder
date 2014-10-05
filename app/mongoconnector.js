var MongoClient = require('mongodb').MongoClient,
    mongoBaseURL = "mongodb://127.0.0.1:27017/",
    mclients = {};

var connectToMongo = function(dbname, next) {
    if (mclients[dbname] != null) {
        next(null, mclients[dbname]);
    } else {
        MongoClient.connect(mongoBaseURL+dbname, function(err, db) {
            if (err) {
                global.logger.error('Error connecting to Mongo');
                next(err, null);
            } else {
                mclients[dbname] = db;
                next(null, db);
            }
        });
    }
};

exports.addIdea = function(dbname, ideaJSON, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
        db.collection('ideas').insert(ideaJSON, {w:1}, function(err, records){
            if (err) {
                global.logger.error('Error inserting ideaJSON into ideas collection');
                next(err);
            } 
            next(null);
        });
    });
};

exports.getIdea = function(dbname, groupId, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
        db.collection('ideas').findOne( { gid: groupId }, function(err, document) {
            next(null, document);
        });
    });
};

exports.getAllIdeas = function(dbname, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
        db.collection('ideas').find().toArray(function(err, results) {
            next(null, results);
        });
    });
};

exports.addUser = function(dbname, userJSON, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
	db.collection('users').insert(userJSON, {w: 1}, function(err, records){
            if (err) {
                global.logger.error('Error inserting user JSON into users collection');
                next(err);
            }
            next(null);
	});
    });
};

exports.getUser = function(dbname, userId, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
        db.collection('users').findOne( { uid: userId }, function(err, document) {
            next(null, document);
        });
    });
};

exports.addUserToGroup = function(dbname, userId, groupId, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
        global.logger.info("entered addusertogroup");
        db.collection('ideas').update( { gid: groupId }, { $push: { users: userId } }, { w:1, upsert: true }, function(err) {
            if (err) {
                global.logger.error('Error adding user ' + userId + ' to group');
                next(err);
            } 
            global.logger.info("going to call callback");
            next(null);
        });
    });
};

exports.removeUserFromGroup = function(dbname, userId, groupId, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
	db.collection('ideas').update({gid: groupId}, {$pull: {users: userId}}, function(err) {
        if (err) throw err;  
    });
    });
};

exports.getAllUsersOfGroup = function(dbname, groupId, next) {
    connectToMongo(dbname, function(err, db) {
        if (err) throw err;
        db.collection('ideas').findOne({gid: groupId},{ users: true}, function(err, document) {
            var uids = document.users;
            db.collection('users').find({uid: {$in: uids}}).toArray(function(err, document2) {
                next(null, document2);
            });
	});
    });
};

