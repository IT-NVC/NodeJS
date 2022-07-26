const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        description: { type: String, maxlength: 600 },
        img: { type: String, maxlength: 255 },
        videoId: { type: String, maxlength: 255 },
        level: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

//custom query helpers
CourseSchema.query.sortable = function (req){
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = [ 'asc', 'desc '].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}

//add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
}); //thư viện xóa mềm

module.exports = mongoose.model('Course', CourseSchema);
