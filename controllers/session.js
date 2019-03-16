//------------------------------
//
//  File Name: Session test
//
//  Description:
//  
//  Quick test to check if sessions are working
//
//
//
//-------------------------------

var express = require('express');
var router = express.Router();


function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.session.hey)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}






//set the session
router.get('/set', function (req,res){

 req.session.hey = 'hey';
 res.send('setting');

});


//set the session
router.get('/test',isAuthenticated, function (req,res){

 res.send('look logged in');
 

});

router.get('/logout', function(req,res){

 req.session.destroy();
 res.redirect('/user');

});


module.exports = router;