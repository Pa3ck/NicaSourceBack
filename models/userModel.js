const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.method('comparePassword', function(password) {
    
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
});

module.exports = mongoose.model('User', userSchema);