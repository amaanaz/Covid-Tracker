// //Mongo Connection credentials
// // const CONNECTION_URL = process.env.CONNECTION_URL
// // const DATABASE_NAME = process.env.DATABASE_NAME

// const CONNECTION_URL = "mongodb+srv://Amaan:amaanaz1611@covid19-data.4hvji.mongodb.net/covidDB?retryWrites=true&w=majority"

// const DATABASE_NAME = "covidDB"

// const MongoClient = require('mongodb').MongoClient;
// let _db;
// module.exports = {
//     connectToServer: function (callback) {
//         MongoClient.connect(CONNECTION_URL, function (err, client) {
//             _db = client.db(DATABASE_NAME);
//             console.log('Connected to database: ' + DATABASE_NAME);
//             return callback(err);
//         });
//     },
//     getDb: function () {
//         return _db;
//     }
// };

var MongoClient = require('mongodb').MongoClient

var state = {
    db: null,
}

exports.connect = function (url, done) {
    if (state.db) return done()

    MongoClient.connect(url, function (err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
}

exports.get = function () {
    return state.db
}

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        })
    }
}