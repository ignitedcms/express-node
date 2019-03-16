//==============================
// login_model.js
//===============================
var express = require('express');
//include stuff you need for model files like bcrypt
//and database access
var bcrypt = require('bcryptjs'); //password hashing
var dateFormat = require('dateformat'); //better dates

/*=======================================
 Global MYSQL TEST
=======================================*/
var db = require('../config/database.js');

var squel = require("squel"); //easy sql queries

module.exports = 
{
	validate_password:function(res,name,password)
	{
		var q =
            squel.select({ autoQuoteFieldNames: true })
            .from("user")
            .where("name=?",name)
            .toParam();

        db.query(q.text,q.values, function(err, rows, fields) {
            if (err) throw err

            /*======================================
			Validate the password - todo check if no row returned!!!!!
			========================================*/
			if(rows.length > 0)
			{
				if (bcrypt.compareSync(password, rows[0].password) == true) // true
	            {
	                res.send('Passed');
	            } else {
	                res.send('Failed');
	            }
			}
			else
			{
				res.render('login/login', {
		            errors: 'User does not exist!'
		        });
			}
        })
	}


}
