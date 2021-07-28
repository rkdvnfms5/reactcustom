var express = require('express');
var router = express.Router();

// Mongo DB (mongoose)
// var Board = require("../model/board");
// router.get('/boardList', function(req,res){
//     Board.find(function(err, results){
// 		if(err) return res.status(500).send({error: 'database failure'});
// 		console.log("results : " + results);
//         res.json(results);
//     })
// });

// Mysql
var con = require("./mysqlConnect");

router.get('/api/board', (req, res) => {
    var sql = "SELECT * FROM Board";

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

module.exports = router;