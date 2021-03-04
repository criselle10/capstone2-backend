const router = require('express').Router();


//create course
router.post('/', (req, res) => {
    res.send("add course routes");
})

module.exports = router;