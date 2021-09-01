var http = require('http');
var express = require('express');
var session = require("express-session");
var path = require('path');
var app = express();
var port = 3000;

//환경변수 .env파일 설정 활성
require('dotenv').config();

//DB connect Module (Mongo or Mysql)
//var dbConnection = require("./mongoosseConnect");
var dbConnection = require("./mysqlConnect");

var shopApi = require("./api/shopApi");
var memberApi = require("./api/memberApi");
var authApi = require("./api/authApi");

//세션 설정
app.use(session({
	secret : '@!#POOZIM@!#',	//쿠키를 임의로 변조하는것을 방지하기 위한 값. 이 값으로 세션을 암호화 하여 저장한다고함
	resave : false,				//세션을 항상 저장할지 false 권장
	saveUninitialized : true	//세션이 저장되기 전 uninitialized 상태로 저장
}));

//body-parser  :  req의 body를 추출     module을 require 해야하지만 express 4.16 부터는 내장되어있음
app.use(express.json());
app.use(express.urlencoded( {extended : true} ));    //extended : true인 경우 객체안의 객체를 중첩으로 가능

//build 폴더를 스태틱경로 추가.  안하면 <img src:~~~ 안먹음
app.use(express.static("build"));

// C:\Users\pooreun.kang\eclipse-workspace\reactcumtom\
var buildPath = path.resolve('/Users/KangPooreun/git/reactcustom');

app.use(shopApi);
app.use(memberApi);
app.use(authApi);

app.all("*", function(req, res){
	console.log(req.path);
	if(req.path.startsWith("/shop")){ 
		console.log("go to page : " + req.path);
		res.sendFile(path.resolve("./build/index.html")); //모든경로 번들된 index.html로 send
	} 
	else if (req.path.startsWith("/upload/")){
		res.sendFile(req.path);
	} 
	else {
		console.log("req path : " + req.path);
	}
});
// END URL 라우팅

app.listen(port, function(req, res){
	console.log('server runs');
})