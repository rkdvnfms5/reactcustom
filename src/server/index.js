var http = require('http');
var express = require('express');
var session = require("express-session");
var path = require('path');
var helmet = require('helmet');
var requestIp = require('request-ip');
var request = require('request');
var app = express();
var port = 3000;

let blackReq = [".git", ".svn", "git", "svn", ".php", ".html", ".htm", ".jsp", "modules", "static",
                "lib", "admin", "file", "cms", ".txt", "robots", "source", "config"];

const cspOptions = {
	directives: {
		...helmet.contentSecurityPolicy.getDefaultDirectives(),
		"default-src" : ["'self'", "*.kakao.com", "*.daumcdn.net", "*.kakaocdn.net"],
		"script-src" : ["'self'", "*.kakao.com", "*.daumcdn.net", "*.kakaocdn.net" , "'unsafe-inline'", "'unsafe-eval'"],
		"img-src" : ["'self'", "data:", "*.daumcdn.net", "*.kakaocdn.net"],
	}
}

app.use(helmet({
	contentSecurityPolicy: cspOptions,
	hsts : false,
}));

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
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request('https://api.ip.pe.kr/json/', function(error, response, body){
		if(error){
			console.log(error);
			return;
		}
		if(!error && response.statusCode==200){
			//let ip = JSON.parse(body).ip;
			let country_code = JSON.parse(body).country_code;
			if(country_code != 'KR'){
				res.send("Access Denied");
				return;
			}
		}
	})
	if(!checkBlackReq(req.path)){
		res.send("Access Denied");
		return;
	}

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

function checkBlackReq(requestPath){
    let result = true;

    blackReq.map((word) => {
        if(requestPath.indexOf(word) > -1){
            result = false;
        }
    })
    return result;
}

app.listen(port, '0.0.0.0', function(req, res){
	console.log('server runs');
})