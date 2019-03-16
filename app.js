var express = require('express');
var app = express();

var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//set cors for external js and css hosted on other sites
var cors = require('cors');
app.use(cors());


//==========================================
// To parse form POST and GET variables
//==========================================
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//==========================================
// Set which files to serve
//==========================================

app.use(express.static('./views'));
app.use('/assets',express.static('./assets'));


//==========================================
// Set html template engine
//==========================================
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var helpers = require('handlebars-helpers')(); //description


//express session test
var session = require('express-session');

//--------------------------
//
//  Probably best to use u-id!
//  TODO
//
//--------------------------


app.use(session( {
  secret: 'treehouse loves you',
  resave: false,
  saveUninitialized: true,
  cookie: {secure:false }
}));


//===========================================================
// Require any external controllers MUST be after sessions!!!
//===========================================================

var c1 = require('./controllers/user.js');
app.use('/user',c1);

var c2 = require('./controllers/login.js');
app.use('/login',c2);

var c3 = require('./controllers/upload.js');
app.use('/upload',c3);

var c4 = require('./controllers/email.js');
app.use('/email',c4);

var c5 = require('./controllers/session.js');
app.use('/session',c5);



//quick dataforge test
app.get('/db', function(req, res) {
    //dataforge test
    var a = [
     {name:'hi',type:'int',size:'100'},
     {name:'description',type:'varchar',size:'100'},
	 ]

    var b = require('./system/forgebuilder.js'); //description
  
    b.generateTable('customers',a);
    res.send('done');
});



app.get('/', function(req, res) {
    res.redirect('/user');
});



var Jimp = require('jimp'); //description
//a quick image manip test

app.get('/image', function(req, res) {

      Jimp.read('assets/ig.png', (err, filename) => {
      if (err) throw err;
      filename
        //.resize(256, Jimp.AUTO) // resize
        .quality(80) // set JPEG quality
        //.crop(0,0,100,100)
        .gaussian(10)
        .write('assets/crop-test.jpg'); // save
    });
    res.send('done');
});












app.listen(3000);