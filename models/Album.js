const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        required: true,
    },
    photos: [
        {
            photo: {
                type: Schema.Types.ObjectId,
                ref: 'photos'
            }
        }
    ]
})
let Album = mongoose.model('Album', albumSchema);
module.exports = Album;
