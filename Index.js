//Loads the express module
const express = require('express');
//Creates our express server
const app = express();
const port = 3000;

//Loads the handlebars module
const handlebars = require('express-handlebars');

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