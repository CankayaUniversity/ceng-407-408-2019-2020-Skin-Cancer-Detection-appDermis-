const express = require('express');
const app = express();
const {mongoose} = require('../db/db')
const userController = require('../controllers/userController')
const photoController = require('../controllers/photoController')
let {PythonShell} = require('python-shell')
let data = ""
let options = {
    pythonPath: 'C:\\Python27\\python',
    args: [data],

  };
const bodyParser = require('body-parser')
const port = 3333
const path = 'C:\\Users\\HP\\ceng-407-408-2019-2020-Skin-Cancer-Detection-appDermis-\\server\\'

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use ("/user",userController)
app.use("/photo",photoController)
app.get('/sendPhoto', callFunc); 
  
function callFunc(req, res) {  
    console.log( "jsdhkhgfkfsdjg")
    //data = "req.body.photo"
    PythonShell.run(path + 'ml.py', options,  function  (err, results)  {
   if  (err)  throw err;
   console.log('ml.py finished.');
    // results is an array consisting of messages collected during execution
    console.log('results:', results);
  });
} 
app.listen(port,() => {
console.log('💥 Server is running on port',port)
});