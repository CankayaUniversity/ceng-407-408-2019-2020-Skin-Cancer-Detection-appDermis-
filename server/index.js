const express = require('express');
const app = express();
const {mongoose} = require('../db/db')
const userController = require('../controllers/userController')
const bodyParser = require('body-parser')
const port = 3333
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use ("/user",userController)

app.listen(port,() => {
console.log('💥 Server is running on port',port)
});