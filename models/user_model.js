//==============================
// user_model.js
//===============================
var express = require('express');
//include stuff you need for model files like bcrypt
//and database access

/*=======================================
 Global MYSQL TEST
=======================================*/
var db = require('../config/database.js');

var squel = require("squel"); //easy sql queries



module.exports = 
{
	 /**
	  *  @Description: insert new user with password
	  *       @Params: array
	  *
	  *  	 @returns: nothing
	  */
	insert_user:function(array)
	{
		var q =
		    squel.insert({
		        autoQuoteFieldNames: true
		    })
		    .into("user")
		    .setFields(array)
		    .toParam()

		console.log(q);
		db.query(q.text,q.values, function(err, rows, fields) {
		    if (err) throw err

		})
		
	},
	 /**
	  *  @Description: update user details
	  *       @Params: id,array
	  *
	  *  	 @returns: nothing
	  */
	update_user:function(id,array)
	{
		var q =
		    squel.update({
		        autoQuoteFieldNames: true
		    })
		    .table("user")
		    .setFields(array)
		    .where("id=?", id)
		    .toParam()

		db.query(q.text,q.values, function(err, rows, fields) {
		    if (err) throw err

		})
	},
	 /**
	  *  @Description: delete user by id
	  *       @Params: id
	  *
	  *  	 @returns: nothing
	  */
	delete_user:function(id)
	{
		 var q =
		     squel.delete({
		        autoQuoteFieldNames: true
		    })
		     .from("user")
		     .where("id=?", id)
		     .toParam()

		 db.query(q.text,q.values, function(err, rows, fields) {
		     if (err) throw err
		 })
	},
	 /**
	  *  @Description: list all users in table
	  *       @Params: send in response
	  *
	  *  	 @returns: nothing
	  */
	list_users:function(res)
	{
		var q =
		    squel.select({
		        autoQuoteFieldNames: true
		    })
		    .from("user")
		    .toParam();

		db.query(q.text,q.values, function(err, rows, fields) {
		    if (err) throw err

            res.render('login/home', {
		     rows: rows
            })
		  
		})

	},

	 /**
	  *  @Description: Find user by id
	  *       @Params: id
	  *
	  *  	 @returns: returns
	  */
	find_user:function(id,res)
	{
		var q =
		    squel.select({
		        autoQuoteFieldNames: true
		    })
		    .from("user")
		    .where("id=?", id)
		    .toParam();

		db.query(q.text,q.values, function(err, rows, fields) {
		    if (err) throw err

		    if(rows.length > 0)
			{
				res.render('login/editusers', {
                    rows: rows,
                    id: id
                })
			}
		})

	}
}