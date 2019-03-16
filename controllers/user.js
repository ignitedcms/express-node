var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs'); //password hashing
var dateFormat = require('dateformat'); //better dates



var user_model = require('../models/user_model.js');





router.get('/newuser', function(req, res) {
    res.render('login/newuser', {
        title: 'newuser'
    });
});


/**
 *  @Description: the delete function
 *       @Params: id
 *
 *  	 @returns: returns
 */
router.get('/delete/:id', function(req, res) {

    //first get the id from the query parameter
    var id = req.params.id;

    user_model.delete_user(id)

    res.redirect("/user")


});


/**
 *  @Description: edit user
 *       @Params: id
 *
 *  	 @returns: null ->goes to view
 */

router.get('/edit/:id', function(req, res) {

    //first get the id from the query parameter
    var id = req.params.id;

    user_model.find_user(id,res)

    //load da view
    // res.render('login/editusers', {
    //     id: id
    // });


});


router.post('/edited/:id', function(req, res) {

    //first get the id from the query parameter
    var id = req.params.id;

    let name = req.body.name;

    var stuff = {
        name: name,
        email:'sarah@gmail.com'
    };

    user_model.update_user(id,stuff);

    res.redirect("/user")


});


router.get('/', function(req, res) {
	
    user_model.list_users(res)
});



module.exports = router;