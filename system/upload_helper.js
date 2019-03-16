//------------------------------
//
//  File Name: Upload helper
//
//  Description:
//  
//  Utility class for uploading files
//
//
//
//-------------------------------

const multer = require('multer');
const path = require('path'); //needed for multer

module.exports =
{
	 /**
	  *  @Description: set the storage path
	  *       @Params: path eg ./assets
	  *
	  *  	 @returns: storage object
	  */
    setStorage:function(dest)
    {
		const storage = multer.diskStorage({
		    destination: dest,
		    filename: function(req, file, cb) {
		        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		    }
		})
		return storage;  
    },

     /**
      *  @Description: set file types
      *       @Params: file,cb (must keep these) file extensions e.g /jpg|gif/
      *
      *  	 @returns: returns
      */

    checkFileType:function(file, cb, typees)
    {
		// Allowed ext
		var filetypes = typees;
		// Check ext
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		// Check mime
		const mimetype = filetypes.test(file.mimetype);

		if(mimetype && extname)
		{
			return cb(null,true);
		} else 
		{
			cb('Error: File not accepted!');
		}
    }
}