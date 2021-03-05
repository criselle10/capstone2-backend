const router = require('express').Router();
const CourseController = require('./../controllers/course')


//create course
router.post('/', (req, res) => {
    CourseController.add(req.body).then(course => res.send(course))
});

//get course
router.get('/', (req, res) => {
    CourseController.getAll().then(courses => res.send(courses))
});

router.delete('/:courseId', (req, res) => {
    CourseController.archive(req.params.courseId).then(course => res.send(course))
})

module.exports = router;