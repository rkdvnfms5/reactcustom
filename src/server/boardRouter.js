var express = require('express');
var mongoose = require('mongoose');
var Board = require("../model/board");
var router = express.Router();

router.get('/boardList', function(req,res){
    Board.find(function(err, results){
		if(err) return res.status(500).send({error: 'database failure'});
		console.log("results : " + results);
        res.json(results);
    })
});
//게시글 목록 반환
// router.get('/boardList', function(req, res, next){
// 	Board.find().sort('seq').exec(function(err, results){
// 		if(err){
// 			return next(err);
// 		}
// 		console.log("results : " + results);
// 		res.json(results);
// 	});
// }); 
//END 게시글 목록 반환

module.exports = router;