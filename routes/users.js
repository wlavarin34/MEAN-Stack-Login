var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

// Register
router.post('/register', function(req, res, next){
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser,function(err, user){
        if(err){
            res.json({sucess:false, msg:'Failed to register user'});
        }
        else{
            res.json({sucess:true, msg:'User registered'});
        }
    });

});

router.post('/authenticate',function(req,res,nest){
    var username = req.body.username;
    var password = req.body.password;

    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if (!user){
            return res.json({sucess: false, msg:'User not found'});

        }

        User.comparePassword(password, user.password, function(err, isAuthentic){
            if(err) throw err;
            if(isAuthentic){
                var token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800  // week
                });

                res.json({
                    sucess: true,
                    token: 'JWT '+ token,
                    user: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                    return res.json({ sucess: false, msg: 'Password is invalid'});
            }
        });
    });
});

router.get('/profile', passport.authenticate("jwt", {session:false}), function(req,res,next){
res.json({user: req.user});
});


module.exports = router;