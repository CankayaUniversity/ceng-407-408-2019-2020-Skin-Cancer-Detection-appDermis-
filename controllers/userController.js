const express = require('express');
const router = express.Router();
const { User } = require("../models/user")
/*router.get("/", (req,res) => {
    res.send("dfdsf")
})*/

router.post("/create", (req,res) => {
    console.log(req.body)
    const userData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    }
    const user = new User(userData)
    user.save().then((user)=>{
        if(user){
            res.send(user)
        }
        else{
            res.sendStatus(400)
        }
    })
})

router.get("/login", (req,res) => {

})
router.delete("/logout", (req,res) => {

})
module.exports = router;
