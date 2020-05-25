const express = require('express');
const app = express();
const {mongoose} = require('../db/db')
const userController = require('../controllers/userController')
const photoController = require('../controllers/photoController')
let {PythonShell} = require('python-shell')
const bodyParser = require('body-parser')
const port = 3333
const path = 'C:\\Users\\HP\\ceng-407-408-2019-2020-Skin-Cancer-Detection-appDermis-\\server\\ml.py'
const path2 = "C:\\Users\\HP\\Desktop\\appDermisPredict\\appdermis.py"
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use ("/user",userController)
app.use("/photo",photoController)
app.use ('/sendPhoto', callFunc); 
  
function callFunc(req, res) {  
  var pyshell = new PythonShell(path, { mode:"text", pythonPath: "C:\\Users\\HP\\Anaconda3\\python"});
pyshell.send(req.body.photo);
const pythonData = []

pyshell.on('message', function (message) {
  console.log(message)
})

pyshell.end(function (err) {
  if (err) {
    throw err
  }
// Exploit pythonData
})
/*   PythonShell.run(path + 'ml.py', { pythonPath: 'C:\\Python27\\python', args: [req.body.photo]},  function  (err, results)  {
   if  (err)  console.log(err)//throw err;
   console.log('ml.py finished.');
    console.log('results:', results);
    res.send(results);
  });*/
} 
app.listen(port,() => {
console.log('💥 Server is running on port',port)
});