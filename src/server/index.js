var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;

//환경변수 .env파일 설정 활성
require('dotenv').config();

//DB connect Module (Mongo or Mysql)
//var dbConnection = require("./mongoosseConnect");
var dbConnection = require("./mysqlConnect");

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

// Model 정의
var Board = require('../model/board');

// URL 라우팅
// app.get('/sign', function(req, res){
// 	res.sendFile(path.resolve("./build/index.html"));
// });

// app.get('/list', function(req, res){
// 	res.sendFile(path.resolve("./build/index.html"));
// });

//board 라우팅 사용
app.use(boardRouter);


app.all("*", function(req, res){
	if(!req.path.startsWith("/api/")){ //api가 아닌 경우
		console.log("go to page");
		res.sendFile(path.resolve("./build/index.html")); //모든경로 번들된 index.html로 send
	} else {
		console.log("req path : " + req.path);
	}
});
// END URL 라우팅


app.listen(port, function(req, res){
	console.log('server runs');
})