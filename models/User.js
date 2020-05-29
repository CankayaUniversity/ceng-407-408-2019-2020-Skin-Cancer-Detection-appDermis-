const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    surname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 6,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});
let User = mongoose.model('User', userSchema);
module.exports = User;
