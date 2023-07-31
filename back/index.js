const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const groupUserRouter = require('./routes/groupUserRouter');
const postRouter = require('./routes/postRouter');
const groupRouter = require('./routes/groupRouter');
const voteRouter = require('./routes/voteRouter');

const app = express();
const port = process.env.PORT || 8080;
const mongourl = process.env.MONGOURL;

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.path);
    next();
});
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json());
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', groupUserRouter);
app.use('/api', postRouter);
app.use('/api', groupRouter);
app.use('/api', voteRouter);

mongoose.connect(mongourl, mongoOptions, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to DB!')
    }
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
