require('dotenv').config()

const express = require('express');
const server = require('./server');


server.listen(process.env.PORT, ()=> {
    console.log('you got it goinggggg!')
})