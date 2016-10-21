var express = require("express");
var bodyParser = require("body-parser");
var mysql =require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user :  'root',
  password : 'lnmiit',
  database : 'test'
});
/*connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
  connection.query('select * from bye',function(err,result){
    if(err)
      throw err
    console.log(result[0]);
  })
})*/

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes=require("./routes/routes.js")(app,connection);

var server = app.listen(3000,function(){
    console.log("Listening ",server.address().port);
});
