const Course = require('./../models/Course')

module.exports.add = (reqBody) => {

    let course = new Course({
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price

    })
    return course.save()
        .then(() => true)
        .catch(() => false)
}

module.exports.getAll = () => {
    return Course.find({ isActive: true }).then(courses => {
        return courses
    })
}

module.exports.archive = courseId => {
    return Course.findByIdAndUpdate(courseId, { isActive: false })
        .then(() => true)
}