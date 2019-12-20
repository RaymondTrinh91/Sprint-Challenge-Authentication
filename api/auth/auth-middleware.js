const jwt = require("jsonwebtoken");

const { jwtSecret } = require('../../secrets/secret.js')

module.exports = {
    signToken
}

function signToken(user){
    const payload = {
        subject : user.id,
        username : user.username
    }

    const secret = process.env.JWT_SECRET || jwtSecret

    const options = {
        expiresIn: '3h'
    }

    return jwt.sign(payload, secret, options)
}