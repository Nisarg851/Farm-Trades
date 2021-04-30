// Configurations for Plain MongoDB Logic (not requiered for Mongoose)
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; // TO capture DB connection

const MongoConnect = (callback) => {
    MongoClient.connect(
       'mongodb+srv://Nisarg851:sarg12ni34@cluster0.vjesx.mongodb.net/shop?retryWrites=true&w=majority' 
    ,{ useUnifiedTopology:true }) 
    .then(client => {
        console.log("Connected !");
        _db = client.db(); 
        callback();
    })
    .catch(err => console.log(err));
}

const getDB = () => {
    if(_db)
        return _db;
    throw "Can't connect to DataBase";
}

exports.MongoConnect = MongoConnect;
exports.getDB = getDB;
exports.MongoObjectID = mongodb.ObjectID;