//------------------------------
//
//  File Name: Email test
//
//  Description:
//  
//  route to test emails
//
//
//
//-------------------------------

var express = require('express');
var router = express.Router();


//=========================================
// Test email
//=========================================
var email = require('../config/email.js');

/**
 *  @Description: A note mailer test
 *       @Params: params
 *
 *       @returns: returns
 */

router.get('/mailer', function(req, res) {

    // setup email data with unicode symbols
    let mailOptions = 
    {
        from: '"Fred Foo " <foo@example.com>', // sender address
        to: 'EMAIL', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    email.sendMail(mailOptions, (error, info) => 
    {
        if (error) 
        {
            return console.log(error);
        } 
        else 
        {
            res.redirect('/user');
        }
    });
});



module.exports = router;