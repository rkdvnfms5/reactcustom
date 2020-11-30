var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;
var mongoose = require("mongoose");
var boardRouter = require("./boardRouter");

//템플릿 엔진 ejs 설정
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//body-parser  :  req의 body를 추출     module을 require 해야하지만 express 4.16 부터는 내장되어있음
app.use(express.json());
app.use(express.urlencoded( {extended : true} ));    //extended : true인 경우 객체안의 객체를 중첩으로 가능

//build 폴더를 스태틱경로 추가.  안하면 <img src:~~~ 안먹음
app.use(express.static("build"));

// C:\Users\pooreun.kang\eclipse-workspace\reactcumtom\
var buildPath = path.resolve('/Users/KangPooreun/git/reactcustom');

// MongoDB Connect
var db = mongoose.connection;
db.on("error", console.error);
db.once('open', function(){
	// Connect to MongoDB Server
	console.log("Connected to mongoDB Server");
});

//mongodb://호스트:포트/db?파라미터
mongoose.connect('mongodb://localhost:27017/practice');
// END MongoDB Connect

// Model 정의
var Board = require('../model/board');

// URL 라우팅
app.get('/sign', function(req, res){
	console.log("In path : /sign");
//	res.send(buildPath);
	res.sendFile(buildPath+'/build/index.html'); //__dirname : /src/server 까지
});

app.get('/list', function(req, res){
	Board.find(function(error, boards){
		if(error) {
			return res.status(500).send({error : "database failure"});
			console.log("@@ Boads : " + boards);
			res.json(boards);
		}
	});
	res.sendFile(buildPath+'/build/index.html'); //__dirname : /src/server 까지
});

app.get('/test', function(req, res){
	res.send('test URLdddd');
});
// END URL 라우팅

//board 라우팅 사용
app.use(boardRouter);

app.listen(port, function(req, res){
	console.log('server runs');
})