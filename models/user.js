  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const jwt = require('jsonwebtoken');
  const _ = require('lodash');
 // const bcrypt = require('bcryptjs');

  const userSchema = new Schema({
   name: { 
       type: String,
       trim: true,
       required: true,
   },
   surname:{
       type: String,
       trim: true,
       required: true,
   },
   email:{
       type: String,
       trim: true,
       required: true,
       unique: true,
       minlength: 6,
   },
   password: {
       type: String,
       trim: true,
       required: true,
       minlength: 8,
   },
   tokens: [
       {
           access:{
               type: String,
               required: true
           },
           token:{
               type: String,
               required: true
           }
       }
   ]
  });

userSchema.methods.generateAuthToken = function () {
    const user = this
    const access = "auth"
    const token = jwt.sign({_id:user._id.toHexString(),access}, 'shhhhh').toString();
    user.tokens.push({access,token})
    return user.save().then(()=>{
        return token
    })
}

userSchema.statics.findUserByCredentails = function(email,password){
   const User = this;
  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    } else {
      return new Promise((resolve, reject)=>{
        /*bcrypt.compare(password, user.password, (err, res) => {
          if(res){
            resolve(user);
          } else {
              console.log("err",err)
            reject();
          }
        });*/
        if(password == user.password){
            resolve(user);
          } else {
            reject();
          }
      });
    }
  });
}
userSchema.statics.findUserByToken = function(token){
    const User = this;
    let decoded;
    try{
        decoded = jwt.verify(token,'shhhhh')
    } catch(e){
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token':token,
		'tokens.access':'auth'
    })
}

userSchema.methods.removeToken = function (token){
    const user = this
    return user.update({
        $pull:{
            tokens: {token}
        }
    })
}
const User = mongoose.model('User', userSchema);

module.exports = {User}