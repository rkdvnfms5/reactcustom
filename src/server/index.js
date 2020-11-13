var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var port = 3001;

//템플릿 엔진 ejs 설정
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//body-parser  :  req의 body를 추출     module을 require 해야하지만 express 4.16 부터는 내장되어있음
app.use(express.json());
app.use(express.urlencoded( {extended : true} ));    //extended : true인 경우 객체안의 객체를 중첩으로 가능

//build 폴더를 스태틱경로 추가.  안하면 <img src:~~~ 안먹음
app.use(express.static("build"));

// C:\Users\pooreun.kang\eclipse-workspace\reactcumtom\
var buildPath = path.resolve('/Users/pooreun.kang/eclipse-workspace/reactcumtom');

app.get('/', function(req, res){
//	res.send(buildPath);
	res.sendFile(buildPath+'/build/index.html'); //__dirname : /src/server 까지
});

app.get('/test', function(req, res){
	res.send('test URL');
});

//app.get('/sample', function(req, res){
//	res.render('first', {data : 'This is Test Data'});
////	res.render('firstSample', {data : 'This is Test Data'});
//});

app.listen(port, function(req, res){
	console.log('server runs');
})