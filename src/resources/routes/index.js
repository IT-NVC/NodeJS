const newsRouter = require('../routes/news');
const siteRouter = require('../routes/site');
const coursesRouter = require('../routes/course');
const meRouter = require('../routes/me');

function route(app) {
    //news
    app.use('/Webcourses/news', newsRouter);

    //course
    app.use('/Webcourses/courses', coursesRouter);

    //me
    app.use('/Webcourses/me', meRouter);

    //site
    app.use('/Webcourses', siteRouter);
}

module.exports = route;
