var async = require("async");

var sqlConnection;
var request;
var response;

exports.render = function(req, res, sqlConn)
{
	sqlConnection = sqlConn;
	request = req;
	response = res;

	// --- body parser로 post 데이터 받기
	var id = request.body.id;
	var pw = request.body.pw;
	
	// --- 오류 검사
	if(id == ''){
		console.log('undefined id');					
		
		request.session.ERRORMESSAGE = "undefined id";
		response.redirect('/errorPage');
	}
	else if(pw == ''){
		console.log('undefined id');					
		
		request.session.ERRORMESSAGE = "undefined pw";
		response.redirect('/errorPage');
	}
	else{
		console.log('/signUpAction');		
		
		// ----회원 가입 진행
		async.waterfall(
			[
				function(callback){
					checkUserExist(id, pw, callback);
				},
				function(isSuccess, callback){
					if(isSuccess){
						signUpAction(id, pw, callback);					
					}
					else{
						callback(null);
					}
				},
				function(err){
					if(err) console.log(err);
				}
			]
		);
	}
}


function checkUserExist(id, pw, callback){
	var sqlQuary = 'select * ' + 
					'from `users` ' + 
					' where `id` = ' + '\'' + id + '\'';
	
	sqlConnection.query(sqlQuary, [id], (err, rows) => {
		console.log("rows.length : " + rows.length);		
		
		if(rows.length){
			console.log('id already exist : ' + id);
			
			request.session.ERRORMESSAGE = "id already exist";
			response.redirect('/errorPage');
			callback(null, false);			
		}
		else{
			callback(null, true);
		}
	});
}

function signUpAction(id, pw, callback){	
	var user = {id : id, pw : pw};
	var sqlQuary = 'insert into `users` set ?';
	sqlConnection.query(sqlQuary, user);
	
	console.log('sign up success, new id : ' + id);
	request.session.USER = user;		
	response.redirect('/mapPage');
	callback(null);
}