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
	maxContentsLength = 2;
	page = request.query.page - 1;

	console.log('/contentListActionModel');				
	
	////////////// ------------- callback -------------- 나는 콜백을 몰라 나는 콜백을 몰라 그래서 코드가 이따구야~
	
	loadContentsCount(); 
}

function loadContentsCount() {
	var countQuary = "select count(*) as count from contents";

	sqlConnection.query(countQuary, (err, rows) => {
		loadContestsCountAction(err, rows);
	});
}

function loadContestsCountAction(err, rows){
	if(err) return;

	console.log("count : " + rows[0].count);
	
	loadContents(rows[0].count);
}

function loadContents(contentsCount) {
	var pageRange = (contentsCount / maxContentsLength);
	if(contentsCount % maxContentsLength != 0){
		pageRange = pageRange + 1;
	}

	if(request.query.page > pageRange){
		console.log("page : " + page + ", pageRange : " + pageRange);
				
		request.session.ERRORMESSAGE = "out of page range";
		response.redirect('/errorPage');
		return;
	}

	var startLimitNumber = maxContentsLength * page;
	console.log("maxContentsLength : " + maxContentsLength + ", page : " + page);
	
	var selectQuary = "select " + 
	"content_idx, user_id, title, lat, lng, datetime " +
	"from contents " + 
	"order by datetime desc " + 
	"limit " + startLimitNumber + "," + maxContentsLength;

	console.log(selectQuary);
	sqlConnection.query(selectQuary, (err, rows) => {
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
	}
	*/

	request.session.CONTENTS = rows;
	
	response.redirect('/contentListPage' + '?page=' + request.query.page);	
}

function callback(err){
	if(err) throw new Error(err);
}