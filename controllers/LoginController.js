module.exports = function(app, sqlConnection)
{
	app.get('/',function(request,response){
		response.redirect('/loginPage');			
	});
	app.get('/loginPage',function(request,response){
		response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

		if(request.session.USER){
			response.redirect('/mapAction');
		}
		else{
			response.render('LoginPage.html');
			console.log('/loginPage');
		}	
	});
	
	app.get('/logoutAction', function(request, response){
		delete request.session.USER;
		response.redirect('/');		
	});

	// --- db 접근 동작이 필요한 경우 model을 호출해서 사용
	app.post('/loginAction', function(request, response){
		var model = require('../models/LoginActionModel.js');	
		model.render(request, response, sqlConnection);
	});
	
}

