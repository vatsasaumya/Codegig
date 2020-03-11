var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
//Handlebars
app.engine('handlebars',exphbs({ defaultLayout: 'main'}));
app.set('view engine','handlebars');
//Body parser (for form)
app.use(bodyParser.urlencoded({extended:false}));
//set static folder
app.use(express.static(path.join(__dirname,'public')));
//Index route
app.get('/',(req,res) => res.render('index',{layout:'landing'}));

var db = require('./config/database');
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error:'+err))
app.get('/', function(req,res)
	{
		res.send('INDEX');
	});
//Gig routes
app.use('/gigs',require('./routes/gigs'));
app.listen(3000, function()
{
	console.log("Server started on port 3000.");
});