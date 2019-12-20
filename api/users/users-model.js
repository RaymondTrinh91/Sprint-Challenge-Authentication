const db = require('../../database/dbConfig.js')

module.exports = {
    addUser,
    getAllUsers,
    findUserBy,
    findUserById
}

function getAllUsers(){
    return db('users')
}

function findUserBy(filter){
    return db('users').where(filter)
}

function findUserById(id){
    return db('users').where({id}).first()
}

async function addUser(user){
    const [id] = await db('users').insert(user)

    return findUserById(id)
}