module.exports = function(app, sqlConnection)
{
    app.get('/createNewPostPopup', function(request, response){	  
		response.render('CreateNewPostPopup.ejs');
		console.log('/createNewPostPopup');
    });
    app.post('/createContentAction', function(request, response){
		var model = require('../models/CreateContentActionModel.js');	
		model.render(request, response, sqlConnection);
	});
	app.get('/closePopup', function(request, response){	  
		response.render('ClosePopup.ejs');
		console.log('/closePopup');
	});
}

