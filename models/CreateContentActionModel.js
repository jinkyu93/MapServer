var async = require("async");

var sqlConnection;
var request;
var response;

exports.action = function(req, res, sqlConn)
{
	sqlConnection = sqlConn;
	request = req;
	response = res;
	console.log("/createContentAction");

	async.waterfall(
		[
			function(callback){
				createContent(callback);
			},
			function(isSuccess, callback){
				if(isSuccess){
					updateContentCount(callback);					
				}
			},
			function(err){
				if(err) console.log(err);
			}
		]
	);
}

function createContent(callback) {
	var sqlQuary = "insert into contents(user_id, title, content, lat, lng, datetime) values ?";

	var id = request.body.id;
	var title = request.body.title;
	var content = request.body.content;
	var lat = request.body.lat;
	var lng = request.body.lng;
	var datetime = new Date();
	
	console.log("id : " + id);
	console.log("title : " + title);
	console.log("content : " + content);
	console.log("lat : " + lat);
	console.log("lng : " + lng);
	
	var values = [ [id, title, content, lat, lng, datetime] ];

	sqlConnection.query(sqlQuary, [values], (err, result) => {
		createContentAction(err, result, callback);
	});
}

function createContentAction(err, result, callback){
	if(err) {
		request.session.ERRORMESSAGE = "create content error";
		response.redirect('/errorPage');
		return;
	}
	if(result.affectedRows){
		console.log("insert success");
		callback(null, true);
	}
}

function updateContentCount(callback){
	var sqlQuary = 'update counts set count=count+1 where what_count="contents_count";';
	
	sqlConnection.query(sqlQuary, (err, result) => {
		updateContentCountAction(err, result, callback);
	});
}

function updateContentCountAction(err, result, callback){
	if(err) {
		request.session.ERRORMESSAGE = "update content count error";
		response.redirect('/errorPage');
		return;
	}
	if(result.affectedRows){
		console.log("insert success");
		callback(null);
	}

	response.redirect('/closePopup');	
}