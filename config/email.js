//------------------------------
//
// Email Config file
// Enter your settings here
//
//------------------------------

const nodemailer = require('nodemailer');

var config =
{
	host: 'smtp.googlemail.com',
	    port: 465,
	    secure: true, // true for 465, false for other ports
	    auth: {
	        user: 'EMAIL', // email address
	        pass: 'PASSWORD' // user password
	    }
}

var email;

function connectEmail() {
    email = nodemailer.createTransport(config);
    return email;
}

module.exports = connectEmail();
