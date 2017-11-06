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

	createContent();
}

function createContent() {
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
		createContentAction(err, result);
	});
}

function createContentAction(err, result){
	if(err) {
		request.session.ERRORMESSAGE = "create content error";
		response.redirect('/errorPage');
		return;
	}
	if(result.affectedRows){
		console.log("insert success");
		response.redirect('/closePopup');			
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

}