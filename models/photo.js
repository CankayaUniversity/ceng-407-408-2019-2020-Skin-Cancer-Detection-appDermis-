const mongoose = require('mongoose')
const Schema = mongoose.Schema
const _ = require('lodash')

const photoSchema = new Schema({
    img: 
      { data: Buffer, 
        contentType: String
      },
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = {Photo}