const User = require('./../models/User');
const Course = require('./../models/Course');
const bcrypt = require('bcrypt');
const auth = require('./../auth');

module.exports.register = (params) => {

    let user = new User({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        mobileNo: params.mobileNo,
        password: bcrypt.hashSync(params.password, 10)
    })

    return user.save()
        .then(() => true)
        .catch(() => false)
}

module.exports.login = (params) => {
    let { email, password } = params //destructuring

    return User.findOne({ email })
        .then(user => {
            console.log(user)
            if (!user) return false;

            let isPasswordMatched = bcrypt.compareSync(password, user.password);
            if (!isPasswordMatched) return false;

            let accessToken = auth.createAccessToken(user)

            return {
                accessToken: accessToken
            }

        })
}

module.exports.details = (id) => {
    return User.findById(id, { password: 0 })
        .then(user => {
            return user
        })
}

//Activity number 2

// module.exports.enrolluser = (id, req, next) => {
// // console.log(req);
// console.log(id)
// return User.findByIdAndUpdate(id, {
// $push: {
// enrollments: [{ _id: req.id }]
// }
// })
// .then( course => {
// return Course.findByIdAndUpdate(req.id,{
// $push: {
// enrollees: [{ _id: id }]
// }
// })
// })
// .then( () => true)
// .catch( () => false)
// }

module.exports.enroll = (params) => {
    // return User.findById(params.userId)
    // .then(user => {
    //     user.enrollments.push({ courseId: params.courseId })
    //     return user.save().then(() => {
    //         return Course.findById(params.courseId)
    //             .then(course => {
    //                 course.enrollees.push({ userId: params.userId })
    //                 return course.save().then(() => {
    //                     return true
    //                 }).catch(() => false)
    //             }).catch(() => false)
    //     }).catch(() => false)
    // }).catch(() => false)


    // ================================================

    // return User.findById(params.userId)
    // .then(user => {
    //     user.enrollments.push({ courseId: params.courseId })
    //     return user.save()
    // })
    // .then(() => {
    //     return Course.findById(params.courseId)
    // })
    // .then(course => {
    //     course.enrollees.push({ userId: params.userId })
    //     return course.save()
    // })
    // .then(() => true)
    // .catch(() => false)

    // ===============================================

    // return User.findByIdAndUpdate(params.userId, {
    //     $push: { enrollments: { courseId: params.courseId } }
    // }).then(() => {
    //     return Course.findByIdAndUpdate(params.courseId, {
    //         $push: { enrollees: { userId: params.userId } }
    //     })
    // }).then(() => true)
    // .catch(() => false)

    // ============================================
    return Course.findById(params.courseId)
        .then(course => {
            if (!course) return false;
            return User.findByIdAndUpdate(params.userId, {
                $push: { enrollments: { courseId: params.courseId } }
            })
        })
        .then(() => {
            return Course.findByIdAndUpdate(params.courseId, {
                $push: { enrollees: { userId: params.userId } }
            })
        }).then(() => true)
        .catch(() => false)


}




//ACTIVITY 1

// const jwt = require('jsonwebtoken');
// module.exports.viewdetails = (req, res) => {

// if(!req.headers.authorization) return res.send("Unauthenticated");

// let token = req.headers.authorization.replace("Bearer ", "");
// let decoded = jwt.verify(token, process.env.SECRET);
// // res.send(decoded)

// User.findById(decoded._id, {password: 0})
// .then( user => {
// if (!user) return res.send("Unauthenticated");

// res.send(user);
// })

// }



// return bcrypt.compare(params.body.password, User.password, (err, result) => {
// res.send(result)
// })