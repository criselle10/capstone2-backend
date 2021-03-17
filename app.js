const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();
require('dotenv').config();

mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.connection.on('error', () => { console.log("Error connecting to DB.") })
mongoose.connection.once('open', () => { console.log("Connected to DB!") });

app.use((req, res, next) => {
    // console.log(new Date())
    next();
})

//MIDDLEWARE
app.use(cors())
app.use(express.json());

const coursesRoutes = require('./routes/course');
app.use('/api/courses', coursesRoutes)

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})