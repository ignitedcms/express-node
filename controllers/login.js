var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs'); //password hashing
var dateFormat = require('dateformat'); //better dates

var login_model = require('../models/login_model.js');
var user_model = require('../models/user_model.js');


/**
 *  @Description: save password to db
 *       @Params: post name,password
 *
 *  	 @returns: returns
 */
router.post('/password2', function(req, res) {

    let name = req.body.name;
    let password = req.body.password;

    var values = []

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('password', 'Password is required ').notEmpty();

    var errors = req.validationErrors();
    //failue
    if (errors) {
        var er = "";

        var arr = errors;
        for (var i = 0; i < arr.length; i++) {
            var er = er + arr[i].msg + " ";
        }

        res.render('login/newuser', {
            errors: er,
            name: name,
            password: password
        });
    } else {
       
        /*======================================
        Success hash the password
        ========================================*/
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        var insert = {
            name: name,
            password: hash,
            email: 'joedoe@gmail.com',
            joindate: dateFormat(new Date(), "isoDateTime")

        };

        //insert the user
        user_model.insert_user(insert)

        //direct to home page
        res.redirect('/user');
    }
});

/**
 *  @Description: validate password
 *       @Params: post name,password
 *
 *  	 @returns: returns
 */
router.post('/validatePassword', function(req, res) {

    let name = req.body.name;
    let password = req.body.password;

    var values = []

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('password', 'Password is required ').notEmpty();


    var errors = req.validationErrors();
    if (errors) {
        var er = "";

        var arr = errors;
        for (var i = 0; i < arr.length; i++) {
            var er = er + arr[i].msg + " ";
        }

        res.render('login/login', {
            errors: er
        });
    } else {
        //res.send('success saved to database');

        login_model.validate_password(res,name,password);
    }
});




router.get('/loginview', function(req, res) {
    res.render('login/login', {
        title: 'Login'
    });
});



module.exports = router;