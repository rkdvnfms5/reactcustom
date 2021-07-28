var mongoose = require("mongoose");

var dbUrl = 'mongodb://localhost:27017/practice'; //mongodb://호스트:포트/db?파라미터
var db = mongoose.connection;
db.on("error", console.error);

module.exports = mongoose.connect(dbUrl, { useNewUrlParser: true } ,function(err) {
	if(err){
		console.log('Mongo DB connect X');
		console.error(err.message);
		return; 
	}
	console.log('Mongo DB connect ok');
});
