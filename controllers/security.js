const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getJwToken = (payload) => {
    return jwt.sign({payload}, config.secretKey, {expiresIn: '30d'});
}

const verifyToken = (userToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(userToken, config.secretKey, (err, decoded) => {
            if(err){
                reject();
            } else {
                resolve(decoded);
            }
        })
    })
}

exports.verifyUser = (req, res, next) => {

    const userToken = req.get('x-token') || '';

    verifyToken(userToken)
    .then(decoded => {
        req.user = decoded.payload;
        next();
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Token not valid'
        })
    }) 

}

