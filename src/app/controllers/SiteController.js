const res = require('express/lib/response');
const Course = require('../model/Course');
const { mutilMongooseToObject } = require('../../resources/until/mongoose');

class SiteController {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('home', {
                    courses: mutilMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
