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

//for admin use
module.exports.getAllCourses = () => {
    return Course.find().then(courses => {
        return courses
    })
}

//disabling
module.exports.archive = courseId => {
    return Course.findByIdAndUpdate(courseId, { isActive: false })
        .then(() => true)
}

//enabling
module.exports.active = courseId => {
    return Course.findByIdAndUpdate(courseId, { isActive: true })
        .then(() => true)
        .catch(() => false)
}

module.exports.get = courseId => {
    return Course.findById(courseId).then((course) => course)
};

module.exports.update = reqBody => {
    return Course.findByIdAndUpdate(reqBody._id, {
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price
        }).then(() => true)
        .catch(() => false)
}