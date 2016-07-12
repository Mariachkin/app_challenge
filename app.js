var express      = require('express');
var bodyParser   = require('body-parser');
var morgan       = require('morgan');
const exp_hbs    = require('express-handlebars');
const USER_MODEL = require('./data/models/user_model');
const app        = express();

var webRouter = require('./routes/web');
var apiRouter = require('./routes/api');


var port =  process.env.PORT || 3000;

/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
*/



/*const hbs_options = {
	extname	        : '.hbs',
	layoutsDir 	    : 'views/layouts/',
	partialsDir 	: 'views/partials/',
	defaultLayout	: 'main'
}*/
app.engine('hbs', exp_hbs(hbs_options));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'))


/*app.get('/', (req, res) => {
  res.render('homepage')
})

app.get('/users', (req, res) => {
 res.render('users_list',{users_arr:USER_MODEL.UserSchema})
})

app.get('/add_user', (req, res) => {
  res.render('add_user')
})*/

app.use('/api',apiRouter);
app.use('/',webRouter);


app.listen(3000, ()=>{
  console.log('Express server listening on port 3000');
});
