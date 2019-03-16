//------------------------------
//
//  File Name: upload file test
//
//  Description:
//  
//  Route to upload files
//
//
//
//-------------------------------

var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path'); //needed for multer

var up = require('../system/upload_helper.js'); //description


// Init Upload
const upload = multer({
  storage: up.setStorage('./assets'),
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
    up.checkFileType(file, cb, /jpeg|jpg|png|gif/);
  }
}).single('myImage');



//file upload test
router.post('/upload', (req, res) => 
{
    upload(req, res, (err) => 
    {
      if(err)
      {
        res.render('upload/index', {
          msg: err
        });
      } 
      else 
      {
        if(req.file == undefined)
        {
          res.render('upload/index', 
          {
            msg: 'Error: No File Selected!'
          });
        } 
        else 
        {
          res.render('upload/index', {
            msg: 'File Uploaded!',
            file: `${req.file.filename}`
          });
        }
      }
    });
});

router.get('/upload', (req, res) => res.render('upload/index'));


module.exports = router;
