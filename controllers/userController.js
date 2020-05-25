const express = require('express');
const router = express.Router();
const {User} = require("../models/User")
const authenticate = require("../middleware/authenticate")
router.post("/create", (req, res) => {
    const userData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    }
    const user = new User(userData)
    user.save().then((user) => {
        if (user) {
            return user.generateAuthToken()
        } else {
            res.sendStatus(400)
        }
    }).then((token) => {
        res.header({"x-auth": token}).send(user)

    }).catch((err) => {
        res.status(400).send(err)
    })
})

router.get("/user", authenticate, (req, res) => {
    res.send(req.user)
})

router.post("/login", (req, res) => {
    User.findUserByCredentails(req.body.email, req.body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header({"x-auth": token}).send(user)
        })
    })
})
router.post('/update',authenticate, (req, res) => {
    console.log(req.body.id);
    User.findByIdAndUpdate(req.body.id, {
            $set: {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
            }
        }, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});
router.delete("/logout", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send("user logged out")
    }).catch((err) => {
        res.status(401).send()
    })
})
module.exports = router;
