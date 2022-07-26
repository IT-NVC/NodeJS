const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const port = 3000;

const SortMiddleware = require('../src/app/middlewares/SortMiddleware');

const route = require('./resources/routes');
const db = require('../src/config/db');
const req = require('express/lib/request');

//method PUT
app.use(methodOverride('_method'));

//custom middleware
app.use(SortMiddleware);

//connect to db
db.connect();

//dùng cho post
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//static file
app.use(express.static(path.join(__dirname, 'public')));
//_dirname mặc định là src

//http logger
app.use(morgan('combined'));

//Template engine
const hbs = handlebars.create({
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
