const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const sec = require('./security');


exports.signup = (req, res, next) => {
    const {email, password} = req.body;
    const saltRounds = 10;

    if(!email || !password){
        res.status(422).send({error: 'You must provide an email and password'});
    }

    const cryptPassword = bcrypt.hashSync(password, saltRounds);

    User.create({email, password}).then(userDB => {
        const userToken = sec.getJwToken(userDB);

        res.json({
            ok: true,
            token: userToken,
            message: 'SignUp Succesfull'
        })
        // }, (err) => {
        //     console.log(err);
    })
    .catch(err => {
        if(err.code === 11000){
            err.message = 'user already exist';
        }
        next(err);
    })

}