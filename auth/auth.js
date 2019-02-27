const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkRegisterInfo} = require('./authMiddleware');
const db = require('../data/usersModel');
const router = express();

router.post('/register', checkRegisterInfo, async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10)
    try{
        const newUser = await db.addUser(user) 
        if(newUser[0]){
            res.status(201).json({message: "User created!"})
        } else {
            res.status(400).json({message: "An error occurred please try again!"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Internal Error: Sorry for the inconvenience'})
    }
})


module.exports = router;