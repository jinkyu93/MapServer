module.exports = function(app, sqlConnection)
{
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
}

