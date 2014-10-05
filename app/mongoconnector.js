var MongoClient = require('mongodb').MongoClient,
    mongoURL = "mongodb://127.0.0.1:27017/hackafinder",
    mclient = null;

var connectToMongo = function(next) {
    if (mclient) {
        next(null, mclient);
    } else {
        MongoClient.connect(mongoURL, function(err, db) {
            if (err) {
                global.logger.error('Error connecting to Mongo');
                next(err, null);
            } else {
                mclient = db;
                next(null, db);
            }
        });
    }
};

exports.addIdea = function(ideaJSON, next) {
    connectToMongo(function(err, db) {
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

exports.getIdea = function(groupId, next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('ideas').findOne( { gid: groupId }, function(err, document) {
            next(null, document);
        });
    });
};

exports.getAllIdeas = function(next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('ideas').find().toArray(function(err, results) {
            next(null, results);
        });
    });
};

exports.addUser = function(userJSON, next) {
    connectToMongo(function(err, db) {
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

exports.getUser = function(userId, next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('users').findOne( { uid: userId }, function(err, document) {
            next(null, document);
        });
    });
};

exports.addUserToGroup = function(userId, groupId, next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('ideas').update( { gid: groupId }, { $push: { users: userId } }, { w:1, upsert: true }, function(err) {
            if (err) {
                global.logger.error('Error adding user ' + userId + ' to group');
                next(err);
            } 
            next(null);
        });
    });
};

exports.removeUserFromGroup = function(userId, groupId, next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
	db.collection('ideas').update({gid: groupId}, {$pull: {users: userId}});
    });
};

exports.getAllUsersOfGroup = function(groupId, next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('ideas').findOne({gid: groupId},{ users: true}, function(err, document) {
            var uids = document.users;
            db.collection('ideas').find({uid: {$in: uids}}).toArray(function(err, document) {
                next(null, document);
            });
	});
    });
};

