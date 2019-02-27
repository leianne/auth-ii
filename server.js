const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const server = express();
const auth = require('./auth/auth');

server.use(logger());
server.use(helmet());
server.use(express.json());

server.use('/api', auth)

module.exports = server;