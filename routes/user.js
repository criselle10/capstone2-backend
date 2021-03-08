const router = require('express').Router();
const UserController = require('./../controllers/user');

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


// details
// return the user details of the logged user
// router.get('/', (req, res) => {
//     UserController.find({ isActive: true })
// })
router.get('/details', (req, res) => {
    let token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, process.env.SECRET);
    User.findById(decoded.id, { password: 0 })
        .then(user => res.send(user))
});

// enroll
// enroll student

module.exports = router;