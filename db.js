const mongoose = require('mongoose');
const dbname = 'fundmedb';
const dbuser = 'arwaz';
const dbpass = 'arwaz123';
const url = `mongodb://${dbuser}:${dbpass}@ds115729.mlab.com:15729/fundmedb`;
mongoose.connect('url', {useNewUrlParser : true}, (err)=>{
    if(!err){
        console.log('Connected to MongoDb');
    }
    else{
        console.log("err in db connection" + err);
        
    }
});