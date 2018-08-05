const jwt = require('jsonwebtoken');
const SECRET = 'my jwt secret';

module.exports = () => (req, res, next) => {
    const token = req.headers['x-access-token'];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            res.status(403).send('Access Forbidden')
        } else {
            req.user = decoded;
            next()
        }
    });
}
