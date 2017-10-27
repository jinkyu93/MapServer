var async = require("async");

var sqlConnection;
var request;
var response;

exports.action = function(req, res, sqlConn, idx)
{
	sqlConnection = sqlConn;
	request = req;
	response = res;
	console.log("/deleteContentAction");

	deleteContent(idx);
}

function deleteContent(idx) {
	var moveQuary = "insert into deleted_contents select * from contents where content_idx=" + idx + ";"
	var deleteQuary = "delete from contents where content_idx=" + '\'' + idx + '\'' + ";";
	var updateContentsCountQuary = 'update counts set count=count-1 where what_count="contents_count";';
	var updateDeletedCountQuary = 'update counts set count=count+1 where what_count="deleted_count";';
	
	var sqlQuary = moveQuary + deleteQuary + updateContentsCountQuary + updateDeletedCountQuary;

	sqlConnection.query(sqlQuary, (err, result) => {
		deleteContentAction(err, result);
	});
}

function deleteContentAction(err, result){
	if(err) {
		console.log(err);
		request.session.ERRORMESSAGE = "delete content error";
		response.redirect('/errorPage');
		return;
	}
	
	console.log("delete success");
	response.redirect('/contentListPage');	
}