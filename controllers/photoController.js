const express = require('express');
const router = express.Router();
const {Photo} = require("../models/photo")

router.post("/save", (req, res) => {
    console.log("req",req)
    const imgData = {
    img: 
      { data: req.body.img.data, 
        contentType: req.body.img.contentType
      }
    }
    const photo = new Photo(imgData)
    photo.save().then((photo) => {
        if (photo) {
           console.log("iff")
        } else {
            res.sendStatus(400)
        }
    }).then((res) => {
			console.log(res)
    }).catch((err) => {
        res.status(400).send(err)
    })
})
module.exports = router;
