var http = require('http');
var querystring = require('querystring');
var url = require('url');
var fs = require('fs');
var express = require('express');
var mysql = require('mysql');
var sync = require('sync');

var hostName = '127.0.0.1'; 
var serverPort = '21002';
var sqlPort = '3306';

var mysqlConnection = mysql.createConnection({
	host:hostName,
	port:sqlPort,
	database:'mapdb',
	user:'mapuser',
	password:'jkjkiii'
});

mysqlConnection.connect(err => {
	if(err) throw new Error(err);
});

		

/*
var app = express();
app.get('/', function(request, response) {
	response.writeHead(200, {'Content-Type':'text/plain'}); 
	response.end('root page', 'utf-8'); 
});
app.get('/login', function(request, response) {
	var data;
	request.on('data', function(chunck) { 
		data = querystring.parse(chunck.toString()); 
	});
	var id = data.id;
	var pw = data.pw;
	console.log('/login');		
	onLogin(id, pw, response);	
});
app.get('/sign', function(request, response) {
	var data;
	request.on('data', function(chunck) { 
		data = querystring.parse(chunck.toString()); 
	});
	var id = data.id;
	var pw = data.pw;
	console.log('/sign');			
	onSign(id, pw, response);	
});
app.listen(serverPort, ()=>{
	console.log('Server running at http://'+hostName+':'+ serverPort);	
});
*/
/*
app.set('trust proxy', 1);
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialized:true,
	cookie:{secure:true}
}));
*/


http.createServer(function(request, response){
	request.on('data', function(chunck) { 
		var data = querystring.parse(chunck.toString()); 
		
		var id = data.id;
		var pw = data.pw;
		
		var parsedUrl = url.parse(request.url);
		var resource = parsedUrl.pathname;

		if(resource == '/login'){
			onLogin(id, pw, response);
		}
		else if (resource == '/sign'){
			onSign(id, pw, response);			
		}
		else if(resource == '/'){
			response.writeHead(200, {'Content-Type':'text/plain'}); 
			response.end('root page', 'utf-8'); 
		}
	});
  
}).listen(serverPort, hostName);

console.log('Server running at http://'+hostName+':'+ serverPort);

function onLogin(id, pw, response){
	mysqlConnection.query('select * from `users` where `id` = ? and `pw` = ?'
	, [id, pw]
	, (err, rows) => {
		if(err) throw new Error(err);
		if(rows.length){
			console.log('id : ' + id + ' pw : ' + pw + ' 일치');
			
			fs.readFile(__dirname + '/Map.html', (err, data) => {
				if (err) {
				  return console.error(err);
				}
				response.end(data, 'utf-8');
			});
		}
		else{
			console.log('불일치');
			response.writeHead(200, {'Content-Type':'text/plain'}); 
			response.end('login fail. id or pw is warn', 'utf-8'); 
		}
	});
}

function onSign(id, pw, response){
	var sqlQuary = 'select * from `users` where `id` = ' + '\'' + id + '\'';

	mysqlConnection.query(sqlQuary
	, [id]
	, (err, rows) => {
		if(err) throw new Error(err);
		console.log("rows.length : " + rows.length);		

		if(rows.length){
			console.log('이미 존재하는 id : ' + id);
			response.writeHead(200, {'Content-Type':'text/plain'}); 
			response.end('sign fail. id already exist', 'utf-8'); 
		}
		else{
			var user = {id : id, pw : pw};
			var sqlQuary = 'insert into `users` set ?';
			mysqlConnection.query(sqlQuary, user, callback);
			
			console.log('새로운 id : ' + id);
			response.writeHead(200, {'Content-Type':'text/plain'}); 
			response.end('sign success.', 'utf-8'); 
		}
	});
}


function callback(err, rows, fields){
	if(err) throw new Error(err);
}