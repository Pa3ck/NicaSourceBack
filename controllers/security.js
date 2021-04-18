const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getJwToken = (payload) => {
    return jwt.sign({payload}, config.secretKey, {expiresIn: '30d'});
}

