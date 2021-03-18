const router = require('express').Router();
const CourseController = require('./../controllers/course')
const auth = require('./../auth');


//create course
router.post('/', auth.verify, (req, res) => {
    CourseController.add(req.body).then(course => res.send(course))
});

//get all course
router.get('/', (req, res) => {
    CourseController.getAll().then(courses => res.send(courses))
});

//get all for admin use
router.get('/view', (req, res) => {
    CourseController.getAllCourses().then(courses => res.send(courses))
});

//delete course/disabling
router.delete('/:courseId', auth.verify, (req, res) => {
    CourseController.archive(req.params.courseId).then(course => res.send(course))
})

//enable course
router.post('/:courseId', auth.verify, (req, res) => {
    CourseController.active(req.params.courseId).then(course => res.send(course))
})

//get specific course
router.get('/:courseId', (req, res) => {
    CourseController.get(req.params.courseId).then(course => res.send(course))
});

//update course
router.put('/', auth.verify, (req, res) => {
    CourseController.update(req.body).then(result => res.send(result))
})


module.exports = router;