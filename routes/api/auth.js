const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authenticate');
const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/', authentication, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

// @route  POST api/auth
// @desc   Authenticate use & get token
// @access Public
router.post('/', [
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Password is required.').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({'email': email});
        if (!user) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid credentials'}]});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid credentials'}]});
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, "mysecretjwttoken", {expiresIn: 360000}, (err, token) => {
            if (err) throw err;
            res.json({token});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});
module.exports = router;

