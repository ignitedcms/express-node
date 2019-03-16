//------------------------------
//
// Mysql Database Config file
// Enter your settings here
//
//------------------------------


var mysql = require('mysql');

var config =
{
	host:'localhost',
	user:'root',
	password:'root',
	port:'8889',
	database:'expressnode'
}

var db;
function connectDatabase() {
    if (!db) 
    {
        db = mysql.createConnection(config);

        db.connect(function(err)
        {
            if(!err) 
            {
                console.log('Database is connected!');
            } 
            else 
            {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();