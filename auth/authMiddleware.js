const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'Hey its a secrect'

const checkUserInfo = (req, res, next) => {
    if(req.body.username && req.body.password){
        next()
    } else {
        res.status(400).json({message: 'Please add a valid username and password!'})
    }
}

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if(decodedToken){
                req.decodedJWT = decodedToken;
                next();
            } else {
                res.status(401).json({message: "Please try again"});
            }
        })
    }
}

const generateToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, secret, options)
}

module.exports = { checkUserInfo, restricted, generateToken }