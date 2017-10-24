﻿// --- 모듈 추가
var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');
var session = require('express-session');

// --- ip 설정
var hostName = '127.0.0.1'; 
var sqlPort = '3306';
var serverPort = '21002';

// --- mysql설정
var mySqlConnection = mysql.createConnection({
	host:hostName,
	port:sqlPort,
	database:'mapdb',
	user:'mapuser',
	password:'jkjkiii'
});

mySqlConnection.connect(err => {
	if(err) throw new Error(err);
});

// --- 모듈 설정
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// --- 세션 설정
app.use(session({
	secret: '@#@$q1w2e3r4#@$#$',
	resave: false,
	saveUninitialized: true
}));   

// --- 캐시 제거로 인한 뒤로 가기 방지
app.use(function(request, response, next){
	response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});

// --- 라우터 설정
//var router = require('./controllers/Router')(app, mySqlConnection);

var router = require('./Index')(app, mySqlConnection);

// --- 서버 실행
app.listen(serverPort, function(){
	console.log('Server running at http://' + hostName+':'+ serverPort);	
});

