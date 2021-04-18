const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const sec = require('./security');


exports.login = (req, res, next) => {
    const {email, password} = req.body;

    
    if(!email || !password){
        return res.status(422).json({message: 'You must provide an email and password'});
    }

    
    User.findOne({email:email}, (err, userDB) => {

        if(err){
            next(err);
        }

        if(!userDB){
            return res.status(422).json({message: 'Wrong email/password'});
        }

        console.log('compara passwords');
        if(userDB.comparePassword(password)){

            const userToken = sec.getJwToken(userDB.email);

            return res.json({
                ok: true,
                token: userToken,
                message: 'Login Succesfull'
            })
        }else{
            return res.status(422).send({message: 'Wrong email/password!'});
        }

    })
    .catch(err => {
        next(err);
    })

}

exports.signup = (req, res, next) => {
    const {email, password} = req.body;
    const saltRounds = 10;

    if(!email || !password){
        return res.status(422).json({message: 'You must provide an email and password'});
    }

    const cryptPassword = bcrypt.hashSync(password, saltRounds);

    User.create({email, password:cryptPassword}).then(userDB => {
        const userToken = sec.getJwToken(userDB.email);

        return res.json({
            ok: true,
            token: userToken,
            message: 'SignUp Succesfull'
        })
       
    })
    .catch(err => {
        if(err.code === 11000){
            err.message = 'user already exist';
        }
        next(err);
    })

}