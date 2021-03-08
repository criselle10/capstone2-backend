const router = require('express').Router();
const UserController = require('./../controllers/user');
const auth = require('./../auth');

router.post('/', (req, res) => {
    if (req.body.password !== req.body.confirmPassword) return res.send(false);
    UserController.register(req.body).then(result => res.send(result))
});

//login
// ----to create endpoint ---
// http method?
// uri?
// need to access req.body?
// req body format?

router.post('/login', (req, res) => {
    UserController.login(req.body).then(result => res.send(result));
})

router.get('/details', auth.verify, (req, res) => {

    UserController.details(req.decodedToken.id).then(result => res.send(result))
})

// enroll// enroll student
router.get('/enroll', auth.verify, (req, res) => {
    let id = {
        userId: req.decodedToken.id,
        courseId: req.body.id
    }
    UserController.enroll(id).then(result => res.send(result))
})

module.exports = router;