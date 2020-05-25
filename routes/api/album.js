const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/authenticate');
const Album = require('../../models/Album');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route  POST api/album
// @desc   Create an album
// @access Private
router.post('/', [auth, [
    check('name', 'Name is required.').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const newAlbum = new Album({
            name: req.body.name,
            user: req.user.id,
            description: req.body.description,
            date: req.body.date
        });
        const post = await newAlbum.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// @route  GET api/album
// @desc   Create an album
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        //sadece bu userin olusturdugu albumleri getirir
        const albums = await Album.findAll({user: req.user.id}).sort({date: -1});
        if (!albums) {
            return res.status(404).json({msg: 'This user dont have any albums.'})
        }
        res.json(albums);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route  DELETE api/album/:id
// @desc   Delete an album
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        //secili albumu siler
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({msg: 'Album not found.'});
        }
        //Check user
        if (album.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized.'});
        }
        await album.remove();
        res.json({msg: 'Album removed'});
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Album not found.'});
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;
