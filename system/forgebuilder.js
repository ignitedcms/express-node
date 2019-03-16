//------------------------------
//
//  File Name: Database table builder
//
//  Description:
//  
//  To dynamically generate the structure
//  of the Mysql tables (simple not complete)
//
//
//-------------------------------

var db = require('../config/database'); //description

var mysql = require('mysql'); //description

module.exports =
{
	  /**
	   *  @Description: iterate through json and print DOES NOT PREVENT SQL INJECTION!!
	   *       @Params: json array
	   *
	   *  	 @returns: console.log
	   */
	 loop:function(table,a)
	 {
        var string = "CREATE TABLE IF NOT EXISTS `"+table+"` (`id` int(11) NOT NULL AUTO_INCREMENT,";
        
    	 	a.forEach(function(a) {
    	 	    var fieldName = a.name;
    	 	    var type = a.type;
    	 	    var size = a.size;
    	 	    
            string = string + " `"+fieldName + "` " +module.exports.getType(type,size) + " NOT NULL,";

    	 	});

        //add primary key
        string = string + "PRIMARY key (`id`))";
        console.log(string);

        return string;
	 },

   getType:function(type,size)
   {
      if (type == 'varchar') {
         return "varchar(" +size+")";
      }
      if (type == 'int') {
         return "int(11)";
      }
      if (type == 'text') {
         return "text";
      }
      if (type == 'date') {
         return "date";
      }
      if (type == 'datetime') {
         return "datetime";
      }

   },

   /**
    *  @Description: Generate the table
    *       @Params: table name, array of attributes
    *          for columns
    *    @returns: boolean
    */
    generateTable:function(tablename,array)
    {

      var sql = module.exports.loop(tablename,array);
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        
    }
}