var express = require('express');
var router = express.Router();

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

router.get('/api/board/:seq', (req, res) => {
    var sql = "SELECT * FROM Board WHERE seq=" + req.params.seq;

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

module.exports = router;