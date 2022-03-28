//Loads the express module
const express = require('express');
const session = require('express-session');

//Passport Modules
const passport = require('passport');
const authenticate = require('./config/passport');
authenticate.localStrategy(passport);

//Database stuff
const distreetDB = require('./config/DBConnection');
distreetDB.setUpDB(false); // To set up database with new tables set (true)
const MySQLStore = require('express-mysql-session');
const db = require('./config/db'); // db.js config file

//Loads the handlebars module
const handlebars = require('express-handlebars');
var helpers = require('handlebars-helpers')();

//Extra Modules
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var multer = require('multer');

//Routes
const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const eventRoute = require('./Routes/event');

//Creates our express server
const app = express();
const port = 3000;

// Body parser middleware to parse HTTP body in order to read HTTP data
// app.use(bodyParser.urlencoded({
// 	extended: false
// }));
app.use(bodyParser.urlencoded({
	limit: "50mb",
	extended: false,
	parameterLimit: 1000000
}));

app.use(bodyParser.json({
	limit: '50mb'
}));

// Method override middleware to use other HTTP methods such as PUT and DELETE
app.use(methodOverride('_method'));

// Enables session to be stored using browser's Cookie ID
app.use(cookieParser());

// Express session middleware - uses MySQL to store session
app.use(session({
	key: 'distreet_session',
	secret: 'teertsid',
	store: new MySQLStore({
		host: db.host,
		port: 3306,
		user: db.username,
		password: db.password,
		database: db.database,
		clearExpired: true,
		// How frequently expired sessions will be cleared; milliseconds:
		checkExpirationInterval: 900000,
		// The maximum age of a valid session; milliseconds:
		expiration: 900000,
	}),
	resave: false,
	saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());


// To store session information. By default it is stored as a cookie on browser
app.use(session({
	key: 'distreet_session',
	secret: 'teertsid',
	resave: false,
	saveUninitialized: false,
}));

app.use(function(req, res, next){
	res.locals.user = req.user || null;
	next();
});

app.use('/', mainRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/event', eventRoute);


//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + '/Views/Layouts',
    extname: 'hbs',
    //new configuration parameter
    defaultLayout: 'Layout',
	helpers: helpers
}));


//Serves static files (we need it to import a css file)
app.use(express.static('public'))

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));