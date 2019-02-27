const checkRegisterInfo = (req, res, next) => {
    if(req.body.username && req.body.password){
        next()
    } else {
        res.status(400).json({message: 'Please add a valid username and password!'})
    }
}

module.exports = { checkRegisterInfo }