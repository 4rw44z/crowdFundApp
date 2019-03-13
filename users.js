const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbname = 'fundmedb';
const dbuser = 'arwaz';
const dbpass = 'arwaz123';
const url = `mongodb://${dbuser}:${dbpass}@ds115729.mlab.com:15729/fundmedb`;
const mongoOptions = {useNewUrlParser : true};

const state = {
    db: null
};
const connect = (cb)=>{
    if(state.db)
        cb();
    else{
        MongoClient.connect(url, mongoOptions, (err, client)=>{
            if(err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }    
        });
    }
}
function findUser(email, cb){
    db.users.find({email}),function(err,data){
        if(err) throw err;
        cb(data);
    }
}
const getPrimaryKey = (_id)=>{
    return ObjectId(_id);
}

const getDB = ()=>{
    return state.db;
}

module.exports = {connect, getPrimaryKey, getDB, findUser}