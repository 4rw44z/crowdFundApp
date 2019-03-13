const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const users = require('./users');
const bcrypt = require('bcrypt');
const collection = 'users'; // Users Table
const contactCollection = 'contactform'; //contactformtable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: 'BoringPassport'
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}));

passport.use(new localStrategy(
    function (email, password, done) {

        users.findUser(email, function (data) {
            if (email != data[0].email) {
                console.log("from db " + data[0].email);
                console.log("from form" + email);
                return done(null, false)
            }
            if (!res) {
                console.log("from db " + data.password);
                console.log("from form" + password);
                return done(null, false)
            }

            console.log(email);
            return done(null, email); 
        })

    }
));
app.post('/register',(req, res)=>{
    
    users.getDB().collection(collection).insertOne(req.body, (err, result)=>{
    if(err){
        console.log(err)
    }
    else{
        res.json({result: result, document: result.ops[0]});
    }
    })
});
app.get('/dashboard', function (req, res) {
    if (req.user) {
        res.send("Login Successfully");

    } else {
        res.redirect('/');
    }
})
passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})
app.get('/logout', function (req, res) {
    req.logOut()
    res.redirect('/')
})

app.post('/contact',(req, res)=>{
    
    users.getDB().collection(contactCollection).insertOne(req.body, (err, result)=>{
    if(err){
        console.log(err)
    }
    else{
        res.json({result: result, document: result.ops[0]});
    }
    })
});
users.connect((err)=>{
    if(err){
    console.log("unable to connect to database");
    process.exit(1);
    }
    else{
        app.listen(PORT, ()=>{
            console.log(`connected to database, app listneing to ${PORT}`);
        });
    }
});