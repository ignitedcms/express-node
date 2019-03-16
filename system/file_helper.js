/*=================================
File helper functions
===================================*/

var fs = require('fs'),
path = require('path')


module.exports = 
{

	 /**
	  *  @Description: Takes in path and returns json array
	  *       @Params: filename
	  *
	  *  	 @returns: json array
	  */

    directory_to_json:function(filename)
    {
    	var stats = fs.lstatSync(filename),
    	    info = {
    	        path: filename,
    	        name: path.basename(filename)
    	    };

    	if (stats.isDirectory()) {
    	    info.type = "folder";
    	    info.children = fs.readdirSync(filename).map(function(child) {
    	        return module.exports.directory_to_json(filename + '/' + child);
    	    });
    	} else {
    	    // Assuming it's a file. In real life it could be a symlink or
    	    // something else!
    	    info.type = "file";
    	}

    	return info;
    },

     /**
      *  @Description: read one level directory
      *       @Params: params
      *
      *  	 @returns: returns
      */
    read_directory:function(filename)
    {
    	fs.readdirSync(filename).forEach(file => {
  		console.log(file);
		})
    },

     /**
      *  @Description: read a file line by line
      *       @Params: path/file
      *
      *  	 @returns: console log
      */
    read_file:function(filename)
    {

    	var lineReader = require('readline').createInterface({
    	    input: require('fs').createReadStream(filename)
    	});

    	lineReader.on('line', function(line) {
    	    console.log(line);
    	});

    },

     /**
      *  @Description: write a text file
      *       @Params: filename, string
      *
      *  	 @returns: console log
      */
    write_file:function(filename,string)
    {
    	fs.writeFile(filename, string, function(err) {
    	    if (err) {
    	        return console.log(err);
    	    }

    	    console.log("The file was saved!");
    	});
    },

     /**
      *  @Description: delete a single file
      *       @Params: path/file
      *
      *  	 @returns: console log
      */
    delete_file: function(filename) 
    {
        fs.unlink(filename, (err) => {
            if (err) throw err;
            console.log('File removed');
        });
    }


}