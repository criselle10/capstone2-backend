const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mobileNo: String,
    enrollments: [{
        courseId: {
            type: String,
            required: [true, 'Course Id is required']
        },
        enrolledOn: {
            type: Date,
            default: new Date()
        },
        status: {
            type: String,
            default: 'Enrolled'
        }
    }]

})

module.exports = mongoose.model('User', userSchema);