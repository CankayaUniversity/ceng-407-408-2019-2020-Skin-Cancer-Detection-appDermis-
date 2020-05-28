const express = require('express');
const app = express();
const connectDB = require('../db/db')
const bodyParser = require('body-parser')
const port = 3333

//Connect database
connectDB();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//app.use("/user", userController);

//Init middleware
app.use(express.json({extended: false}));

app.use('/api/users', require('../routes/api/users'));
app.use('/api/auth', require('../routes/api/auth'));
app.use('/api/profile', require('../routes/api/profile'));
app.use('/api/album', require('../routes/api/album'));

app.listen(port, () => {
    console.log('💥 Server is running on port', port)
});
