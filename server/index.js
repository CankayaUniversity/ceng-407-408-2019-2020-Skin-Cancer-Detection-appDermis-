const express = require('express');
const app = express();
const {mongoose} = require('../db/db')
const userController = require('../controllers/userController')
const photoController = require('../controllers/photoController')

const bodyParser = require('body-parser')
const port = 3333
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use ("/user",userController)
app.use("/photo",photoController)

app.listen(port,() => {
console.log('💥 Server is running on port',port)
});