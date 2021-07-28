var mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.POOZIM_HOST,
    port: process.env.POOZIM_PORT,
    user: process.env.POOZIM_USER,
    password: process.env.POOZIM_PASSWORD,
    database:"test"
})

connection.connect(function(err){
    if(err){
		console.log('MySql DB connect X');
		console.error(err.message);
		return; 
	}
	console.log('MySql DB connect ok');
});

module.exports = connection;