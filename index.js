const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = require('./db');
const apiRouter = express.Router();
const authMiddleware = require('./authmiddleware');

const SECRET = 'my jwt secret';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('jwt example app');
});

app.post('/login', (req, res) => {
    const postBody = req.body;
    let user = {};
    console.log(postBody)

    if (postBody.username === db.username && postBody.password === db.password) {
        user.username = postBody.username;
        user.password = postBody.password;

        const token = jwt.sign(user, SECRET);
        return res.json({
           status: 'authorized',
           token: token
        });
    } else {
        return res.status(400).send('Could not authorize');
    }
});

apiRouter.use(authMiddleware());

apiRouter.get('/getcall', (req, res) => {
    res.send(JSON.stringify(req.user));
});

app.use('/api/v1', apiRouter);

app.listen(3000);
