const { User } = require("../models/user")

const authenticate = (req,res,next) =>{
    var token = req.header("x-auth")
    User.findUserByToken(token).then((user)=>{
        if(!user){
            return Promise.reject()
        }
        else{
            req.user = user 
            req.token = token
            next()
        }
    }).catch((err) => {
       res.status(401).send() 
    })
}

module.exports = authenticate