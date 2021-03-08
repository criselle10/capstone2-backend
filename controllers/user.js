const User = require('./../models/User');
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

module.exports.enroll = (id) => {
        return User.findByIdAndUpdate(id.userId, {
                    $push: { enrollments: { courseId: id.courseId } }
                    .then coure.findByIdAndUpdate(id.courseId, {
                        $push: { enrollees: { userId: id.userId } }
                    })
                    .then(course => {
                        return true
                    })
                    .catch(err => false)

                }