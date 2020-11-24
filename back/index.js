const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const groupUserRouter = require('./routes/groupUserRouter');
const postRouter = require('./routes/postRouter');
const groupRouter = require('./routes/groupRouter');

const app = express();
const port = process.env.PORT;
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
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', groupUserRouter);
app.use('/api', postRouter);
app.use('/api', groupRouter);

mongoose.connect(mongourl, mongoOptions, (err) => {
    if (err)
        console.log(err);
});

app.listen(port, () => {
    console.log('Server is listening');
});