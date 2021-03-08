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
        password: bcrypt.hashSync(params.password, 10),
    })

    return user.save()
        .then(() => true)
        .catch(() => false)
    // let user = new User ({
    //  firstName,    //    lastName,
    //  email,
    //  mobileNo,
    //  password
    // })
}

module.exports.login = (params) => {
    let { email, password } = params;
    // check email in the DB
    return User.findOne({ email })
        .then(user => {
            if (!user) return false;

            // compare password to hashed password
            // hashed pw = user.password
            isPasswordMatched = bcrypt.compareSync(password, user.password);
            if (!isPasswordMatched) return false;

            //create a token

            let accessToken = auth.createAccessToken(user)

            return {
                accessToken: accessToken
            }
        })
}

module.exports.details = (id) => {
    return User.findById(id, { password: 0 }).then(user => user)
}

module.exports.enroll = (params) => {
    console.log(params.courseId)
    return User.findById(params.userId)
        .then(user => {
            user.enrollments.push({ courseId: params.courseId })
            return user.save().then(() => {
                return Course.findById(params.courseId)
                    .then(course => {
                        course.enrollees.push({ userId: params.userId })
                        return course.save().then(() => {
                            return true
                        }).catch(() => false)
                    }).catch(() => false)
            }).catch(() => false)
        }).catch(() => false)


    // ================================================

    // return User.findById(params.userId)
    // .then( user => {
    //  user.enrollments.push({courseId: params.courseId})
    //  return user.save()
    // })
    // .then(() => {
    //  return Course.findById(params.courseId)
    // })
    // .then( course => {
    //  course.enrollees.push({userId: params.userId})
    //  return course.save()
    // })
    // .then(() => true)
    // .catch(() => false)

    // ===============================================

    // return User.findByIdAndUpdate(params.userId,{
    //  $push : { enrollments : { courseId : params.courseId}}
    // }).then( () =>{
    //  return Course.findByIdAndUpdate(params.courseId, {
    //      $push : { enrollees: { userId: params.userId}}
    //  })
    // }).then(()=> true)
    // .catch(() => false)


    // ============================================
    // return Course.findById(params.courseId)
    // console.log(params.courseId)
    // console.log(params.userId)
    //     .then(course => {
    //         if (!course) return false;
    //         return User.findByIdAndUpdate(params.userId, {
    //             $push: { enrollments: { courseId: params.courseId } }
    //         })
    //     })
    //     .then(() => {
    //         return Course.findByIdAndUpdate(params.courseId, {
    //             $push: { enrollees: { userId: params.userId } }
    //         })
    //     }).then(() => true)
    //     .catch(() => false)

}