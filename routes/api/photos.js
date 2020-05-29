const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authenticate');
const Photos = require('../../models/Photo');
const {check, validationResult} = require('express-validator/check');

// @route  POST api/photos/save
// @desc   Get current users profile
// @access Private
router.post('/save', auth, async (req, res) => {
    //Build photo object
    console.log(req.body);
    const imgData = {
        img: req.body.kaydedilcek.img,
        photoLocation: req.body.kaydedilcek.photoLocation,
        photoDate: req.body.kaydedilcek.photoDate,
        user: req.user.id,
    }
    console.log(imgData)
    try {
        let photo;
        photo = new Photos(imgData);
        await photo.save(photo);
        res.json(photo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route  POST api/photo/
// @desc   Get current users photos
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const photos = await Photos.find({user: req.user.id});
        if (!photos) {
            return res.status(400).json({msg: 'There is no photos for that user.'});
        }
        res.json(photos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;
