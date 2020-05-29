const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
    },
    photoLocation: {
        type: String,
        trim: true,
        required: true,
    },
    photoDate: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
})

let Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
