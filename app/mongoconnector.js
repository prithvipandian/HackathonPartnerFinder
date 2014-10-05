var MongoClient = require('mongodb').MongoClient,
    mongoURL = "mongodb://127.0.0.1:27017/hackafinder",
    mclient = null;

var connectToMongo = function(next) {
    if (mclient) {
        next(mclient);
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
        db.collection('ideas').update( { name: 'idea_array' }, { $push: { ideaArray: ideaJSON } }, { w:1, upsert: true }, function(err) {
            if (err) {
                global.logger.error('Error updating idea_array document in collection ideas');
                return;
            } 
            next(null);
        });
    });
};

exports.getIdea = function(next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('ideas').findOne( { name: 'idea_array' }, function(err, document) {
            next(null, document);
        });
    });
};

exports.addUser = function(userJSON, next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('users').update( { name: 'user_array' }, { $push: { userArray: userJSON } }, { w:1, upsert: true }, function(err) {
            if (err) {
                global.logger.error('Error updating user_array document in collection users');
                return;
            } 
            next(null);
        });
    });
};

exports.getUser = function(next) {
    connectToMongo(function(err, db) {
        if (err) throw err;
        db.collection('users').findOne( { name: 'user_array' }, function(err, document) {
            next(null, document);
        });
    });
};
