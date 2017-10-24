module.exports = function(app, sqlConnection)
{
    app.get('/createNewPostPopup', function(request, response){	  
			response.render('CreateNewPostPopup.html');
			console.log('/createNewPostPopup');
    });
    app.post('/createContentAction', function(request, response){
			var model = require('../models/CreateContentActionModel.js');	
			model.render(request, response, sqlConnection);
	});
}

