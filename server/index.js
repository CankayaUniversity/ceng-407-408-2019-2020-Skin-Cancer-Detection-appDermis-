const express = require('express');
const app = express();
const {mongoose} = require('../db/db')
const userController = require('../controllers/userController')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use ("/user",userController)

app.listen(3333,() => {
console.log('server is running on port 3333')
});