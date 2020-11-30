var express = require('express');
var mongoose = require('mongoose');
require("../model/board");
var board = mongoose.model('Board');
var router = express.Router();

//게시글 목록 반환
router.get('/boardList', function(req, res, next){
	board.find().sort('id').exec(function(err, results){
		if(err){
			return next(err);
		}
		res.json(results);
	});
}); //END 게시글 목록 반환

module.exports = router;