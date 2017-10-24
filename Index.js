module.exports = function(app, sqlConnection)
{
    var loginController = require('./controllers/LoginController')(app, sqlConnection);
    var signUpController = require('./controllers/SignUpController')(app, sqlConnection);
    var mapController = require('./controllers/MapController')(app, sqlConnection);
    var errorController = require('./controllers/ErrorController')(app, sqlConnection);
    var createContentController = require('./controllers/CreateContentController')(app, sqlConnection);
    var contentListController = require('./controllers/ContentListController')(app, sqlConnection);    
}

