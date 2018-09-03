var  vueCookies =function(){

	function uuid() {
	    var s = [];
	    var hexDigits = "0123456789abcdef";
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    s[8] = s[13] = s[18] = s[23] = "-";
	 
	    var uuid = s.join("");
	    return uuid;
	}

	function getClientIp(req) {  
	        return req.headers['x-forwarded-for'] ||  
	        req.connection.remoteAddress ||  
	        req.socket.remoteAddress ||  
	        req.connection.socket.remoteAddress;  
	}  

	return function(req,res,next) {
	  // body...
	  var cookies = req.cookies;
	  //生成deviceid
	  if(!(cookies && cookies.DEVICEID)){
		  	var Days = 720;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	  		var DEVICEID = uuid();
 			res.setHeader("Set-Cookie","DEVICEID="+DEVICEID+";path=/;expires=" + exp.toGMTString());
 			req.cookies.DEVICEID = DEVICEID;
	  }
	  next();
	}
}

module.exports =  vueCookies;