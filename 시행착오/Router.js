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
	app.get('/signUpPage', function(request, response){
		response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		
		if(request.session.USER){
			response.redirect('/mapAction');
		}
		else{
			response.render('SignUpPage.html');
			console.log('/signUpPage');
		}
	});
	// --- 이부분은 현제 MapActionModel에서 contents데이터를 받아와서 사용중
	// --- 하지만 새로고침 시에 동작하지 않기 때문에 수정 필요함 (자동새로고침 등 실시간 통신이 가능한 놈이 좋을듯)
	app.get('/mapPage', function(request, response){
		response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		if(!request.session.USER){
			response.redirect('/');			
		}
		else if(request.session.CONTENTS){
			var rows = request.session.CONTENTS;
			delete request.session.CONTENTS;
			
			response.render('MapPage.ejs', {
				user : request.session.USER,
				contents : rows
			});
			console.log('/mapPage');
		}
		else{
			response.redirect('/mapAction');
		}
	});
	/*
	app.get('/mapPage', function(request, response){
		response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	  
		if(request.session.USER){
			if(request.session.CONTENTS){
				response.render('MapPage.ejs', {
					user : request.session.USER,
					contents : request.session.CONTENTS
				});
	
				console.log('/mapPage');
			}
			else{
				response.redirect('/mapAction');
				console.log('/mapAction');				
			}
		}
		else{
			response.redirect('/');
		}
	});
	*/
	app.get('/errorPage', function(request, response){	  
		if(request.session.ERRORMESSAGE){
			response.render('ErrorPage.ejs', {
				message : request.session.ERRORMESSAGE
			});
			delete request.session.ERRORMESSAGE;
			console.log('/errorPage');
		}
		else{
			response.redirect('/');
		}
	});
	app.get('/logoutAction', function(request, response){
		delete request.session.USER;
		response.redirect('/');		
	});
	app.get('/createNewPostPopup', function(request, response){	  
		response.render('CreateNewPostPopup.html');
		console.log('/createNewPostPopup');
	});
	app.get('/contentListPage', function(request, response){
		response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		if(!request.session.USER){
			response.redirect('/');			
		}
		else if(request.session.CONTENTS){
			var rows = request.session.CONTENTS;
			delete request.session.CONTENTS;
			
			response.render('ContentListPage.ejs', {
				user : request.session.USER,
				contents : rows
			});
			console.log('/contentListPage');
		}
		else{
			response.redirect('/contentListAction');
		}
	});

	// --- db 접근 동작이 필요한 경우 model을 호출해서 사용
	app.post('/loginAction', function(request, response){
		var model = require('../models/LoginActionModel.js');	
		model.render(request, response, sqlConnection);
	});
	app.post('/signUpAction', function(request, response){	
		var model = require('../models/SignUpActionModel.js');	
		model.render(request, response, sqlConnection);
	});
	app.post('/createContentAction', function(request, response){
		var model = require('../models/CreateContentActionModel.js');	
		model.render(request, response, sqlConnection);
	});
	app.get('/mapAction', function(request, response){
		if(request.session.USER){
			var model = require('../models/MapActionModel.js');
			model.render(request, response, sqlConnection);	
		}
		else{
			response.render('ErrorPage.ejs', {
				message : "login first please"
			});		
		}
	});
	app.get('/contentListAction', function(request, response){
		if(request.session.USER){
			var model = require('../models/ContentListActionModel.js');
			model.render(request, response, sqlConnection);	
		}
		else{
			response.render('ErrorPage.ejs', {
				message : "login first please"
			});		
		}
	});
}

