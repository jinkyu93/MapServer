var sqlConnection;
var request;
var response;
var page;
var maxContentsLength;

exports.render = function(req, res, sqlConn)
{
	sqlConnection = sqlConn;
	request = req;
	response = res;

	console.log('/contentActionModel');				

	loadContent();
}

function loadContent() {
	var sqlQuary = "select * " +
		"from contents " + 
		"where content_idx=" + request.query.idx;
	
	sqlConnection.query(sqlQuary, (err, rows) => {
		loadContentAction(err, rows);
	});
}

function loadContentAction(err, rows){
	if(err) return;

	request.session.CONTENT = rows[0];
	
	response.redirect('/contentPage' + '?idx=' + request.query.idx);		
}

function callback(err){
	if(err) throw new Error(err);
}