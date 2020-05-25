const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    birthdate: {
        type: String,
        required:true,
    },
    gender: {
        type: String,
        required: true,
    }
});
let Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
