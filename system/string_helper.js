/*=================================
String helper functions
===================================*/

var fs = require('fs');
path = require('path');
var randomstring = require('randomstring');
var S = require('string');


module.exports = 
{
	 /**
	  *  @Description: random string generator
	  *       @Params: type,length
	  *
	  *  	 @returns: string
	  */
	random_string:function(type,len)
	{

		if (type == 'alnum') 
		{
		    return randomstring.generate(len);
		}
		if (type == 'alpha') 
		{
		    return randomstring.generate({
		    	length:len,
		    	charset:'alphabetic'
		    });
		}
	},

	 /**
	  *  @Description: inside string find all occurences and replace
	  *       @Params: search,replacement,target
	  *
	  *  	 @returns: new string
	  */
	find_and_replace:function(search,replacement,target)
	{
	    //var target = search;
	    return target.split(search).join(replacement);
	},

    //convert to camel case
    camelcase:function(string)
    {

        return S(string).camelize().s;
    },

    //capitalize
    capitalize:function(string)
    {
        return S(string).capitalize().s;
    },

    //remove duplicate white space
    singleSpace:function(string)
    {
        return S(string).collapseWhitespace().s;
    },

    //sanitize html
    sanitize:function(string)
    {
        return S(string).escapeHTML().s;
    }
    //humanize
    humanize:function(string)
    {
        return S(string).humanize().s;
    }



}