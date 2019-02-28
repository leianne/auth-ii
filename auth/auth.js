const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkUserInfo, restricted, generateToken } = require('./authMiddleware');
const db = require('../data/usersModel');
const router = express();

router.post('/register', checkUserInfo, async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    try{
        const newUser = await db.addUser(user) ;
        if(newUser[0]){
            res.status(201).json({message: "User created!"});
        } else {
            res.status(400).json({message: "An error occurred please try again!"});
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Internal Error: Sorry for the inconvenience'});
    }
})

router.post('/login', checkUserInfo, async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await db.findUser(username);
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(201).json({message: "Credentials Verified", token});
        } else {
            res.status(401).json({message: "Invalid Credentials"});
        }
    }
    catch(error){
        res.status(500).json({message: 'Internal Error: Sorry for the inconvenience'});
    }
})

router.get('/users', restricted, async (req, res) => {
    try{

    }
    catch(error){

    }
})
module.exports = router;