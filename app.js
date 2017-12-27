var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');

//MongoDB
mongoose.connect(config.database);

//Connection
mongoose.connection.on('connected', function(){
console.log('Connected to database: '+config.database);
});

//If Connection Error
mongoose.connection.on('error', function(err){
console.log('Database Error: '+err);
});

    

var app = express();

var users = require('./routes/users');

var port = 8000;

app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users', users);

app.get('/', function(req,res){
    res.send("Hello this is server 8000");
});
    

app.listen(port, function(){
    console.log("server started on port: "+port);
});


