const res = require('express/lib/response');
const Course = require('../model/Course');
const { mutilMongooseToObject } = require('../../resources/until/mongoose');
const { format, render } = require('express/lib/response');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([
                Course.find({}).sortable(req),
                Course.countDocumentsDeleted({})
        ])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-Courses', {
                    courses: mutilMongooseToObject(courses),
                    deleteCount,
                }),
            )
            .catch(next);
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-Courses', {
                    courses: mutilMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
