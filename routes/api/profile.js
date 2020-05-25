const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authenticate');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator/check');

// @route  POST api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for that user.'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route  POST api/profile/
// @desc   Create or update current users profile
// @access Private
router.post('/', [auth, [
    check('gender', 'Gender is required.')
        .not().isEmpty(),
    check('birthdate', 'Birthdate is required.')
        .not().isEmpty()]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {gender, birthdate} = req.body;
    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (gender) profileFields.gender = gender;
    if (birthdate) profileFields.birthdate = birthdate;

    //iki tane id olacak bi tane profile icin birisi de userin kendi idsi

    try {
        let profile = await Profile.findOne({user: req.user.id});
        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
            return res.json(profile);
            console.log('Profile updated');
        }
        //Create a profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});
// @route  DELETE api/profile
// @desc   Delete profile & user
// @access Private
router.delete('/', auth, async (req, res) => {
    try {
        //Remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove user
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: 'User removed.'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
