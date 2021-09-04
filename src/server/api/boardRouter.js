var express = require('express');
var router = express.Router();

var con = require("../mysqlConnect");

router.get('/api/board', (req, res) => {
    let sql = "SELECT * FROM Board";

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

router.get('/api/board/:seq', (req, res) => {
    let sql = "SELECT * FROM Board WHERE seq=" + req.params.seq;

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//insert
router.post('/api/board', (req, res) => {
    let board = req.body;
    let sql = "INSERT INTO Board (title, content, regdate) VALUES (?, ?, NOW())";
    con.query(sql, [board.title, board.content] ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//update
router.put('/api/board/:seq', (req, res) => {
    let board = req.body;   //req.params 는 {seq : ?}  req.body는 {seq : ?, title : ? , ~~~}
    let sql = "UPDATE Board SET title = ?, content = ? WHERE seq = ?";
    con.query(sql, [board.title, board.content, board.seq] ,(err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

//delete
router.delete('/api/board/:seq', (req, res) => {
    let sql = "DELETE FROM Board WHERE seq=" + req.params.seq;

    con.query(sql, (err, result) => {
        if(err){
            return res.status(500).send({error : 'database failure'});
        }
        
        console.log('result : ' + result);
        res.json(result);
    });
});

module.exports = router;