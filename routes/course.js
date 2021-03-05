const router = require('express').Router();
const CourseController = require('./../controllers/course')


//create course
router.post('/', (req, res) => {
    CourseController.add(req.body).then(course => res.send(course))
});

//get all course
router.get('/', (req, res) => {
    CourseController.getAll().then(courses => res.send(courses))
});

//delete course
router.delete('/:courseId', (req, res) => {
    CourseController.archive(req.params.courseId).then(course => res.send(course))
})

//get specific course
router.get('/:courseId', (req, res) => {
    CourseController.get(req.params.courseId).then(course => res.send(course))
});

//update course
router.put('/', (req, res) => {
    CourseController.update(req.body).then(result => res.send(result))
})


module.exports = router;