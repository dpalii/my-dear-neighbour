const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const groupUserRouter = require('./routes/groupUserRouter');
const postRouter = require('./routes/postRouter');
const groupRouter = require('./routes/groupRouter');
const voteRouter = require('./routes/voteRouter');
const { dirname } = require('path');

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
app.use('/api', voteRouter);

mongoose.connect(mongourl, mongoOptions, (err) => {
    if (err)
        console.log(err);
});

const privateKey  = fs.readFileSync(path.join(__dirname, 'sslcert', 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'sslcert', 'server.cert'), 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log("Server is listening");
});
