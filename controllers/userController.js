const express = require('express');
const router = express.Router();
const { User } = require("../models/user")
/*router.get("/", (req,res) => {
    res.send("dfdsf")
})*/

router.post("/create", (req,res) => {
    const userData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    }
    const user = new User(userData)
    user.save().then((user)=>{
        if(user){
            return user.generateAuthToken()
        }
        else{
            res.sendStatus(400)
        }
    }).then((token) => {
        console.log(token)
        res.header({"x-auth":token}).send(user)

    }).catch((err) => {
        console.log(err)
        res.status(400).send(err)
    })
})

router.post("/login", (req,res) => {
    User.findUserByCredentails(req.body.email, req.body.password).then((user) => {
        console.log(user)
        res.send(user)
    }).catch((err) => {
        console.log(err)
        res.status(400).send(err)

    })
})

router.delete("/logout", (req,res) => {

})
module.exports = router;
