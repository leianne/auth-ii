const db = require('./dbConfig');

module.exports = {
    addUser,
    findUser,
    getUsers
}

function addUser(user){
    return db('users').insert(user);
}

function findUser(filter){
    return db('users').where({username: filter}).first();
}

function getUsers(){
    return db('users');
}