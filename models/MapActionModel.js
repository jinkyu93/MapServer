var sqlConnection;
var request;
var response;

exports.render = function(req, res, sqlConn)
{
	sqlConnection = sqlConn;
	request = req;
	response = res;
	
	console.log('/mapAction');				
	
	loadContents();
}

function loadContents() {
	var sqlQuary = "select " + 
		"content_idx, user_id, title, lat, lng, datetime " +
		"from contents ";
	
	sqlConnection.query(sqlQuary, (err, rows) => {
		loadContentsAction(err, rows);
	});
}

function loadContentsAction(err, rows){
	if(err) return;

	/*
	for(var i = 0; i < rows.length; i++){
		console.log("");
		console.log("idx : " + rows[i].content_idx);
		console.log("id : " + rows[i].user_id);
		console.log("title : " + rows[i].title);
		console.log("content : " + rows[i].content);
		console.log("lat : " + rows[i].lat);
		console.log("lng : " + rows[i].lng);
		console.log("datetime : " + rows[i].datetime);
	}*/

	request.session.CONTENTS = rows;
	
	response.redirect('/mapPage');	
}
