const router = require('express').Router();
const CourseController = require('./../controllers/course')


//create course
router.post('/', (req, res) => {
    CourseController.add(req.body).then(course => res.send(course));
});



module.exports = router;