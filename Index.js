//Loads the express module
const express = require('express');
//Creates our express server
const app = express();
const port = 3000;

//Loads the handlebars module
const handlebars = require('express-handlebars');

//Database stuff
const distreetDB = require('./config/DBConnection');
distreetDB.setUpDB(false); // To set up database with new tables set (true)
const MySQLStore = require('express-mysql-session');
const db = require('./config/db'); // db.js config file


//Extra Modules
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Body parser middleware to parse HTTP body in order to read HTTP data
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Method override middleware to use other HTTP methods such as PUT and DELETE
app.use(methodOverride('_method'));

// Enables session to be stored using browser's Cookie ID
app.use(cookieParser());

//Routes
const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const eventRoute = require('./Routes/event');

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
}));

//Serves static files (we need it to import a css file)
app.use(express.static('public'))

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));