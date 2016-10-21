var appRouter = function(app,connection)
{
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
    //  console.log(result[0]);
  app.get("/",function(req,res){
     connection.query('select * from bye',function(err,result){
       if(err)
        throw err
        return res.send(result);
     })
  });
  app.get("/display_by_id",function(req,res){
    /*var accountMock ={
      "username": "arpit",
      "password": "xyz",
      "handle": "arpit165"
    }*/
  //  return res.send(accountMock);
  connection.query('select * from bye',function(err,result){
    if(err)
      throw err
    if(!req.query.id){
     return res.send({"status": "error", "message": "missing id"});
    }
    for(var i=0;i<result.length;i++)
    {
      if(result[i].id == req.query.id)
       return res.send(result[i]);
    }
    return res.send({"status": "error", "message": "wrong id"});
  })
});

app.post("/add", function(req, res) {
    if(!req.body.id || !req.body.freq || !req.body.name) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        connection.query('insert into bye (id,freq,name) values (? , ? , ?)',[req.body.id,req.body.freq,req.body.name],function(err){
          if(err)
            throw err
          return res.send({"status":"success"});
        })
    }
});
})
app.delete("/delete_by_id",function(req,res){
  if(!req.query.id){
   return res.send({"status": "error", "message": "missing id"});
  }
  connection.query('delete from bye where id=?',[req.query.id],function(err){
    if(err)
      throw err;
    return res.send({"status":"success"});
  })
});

}

module.exports = appRouter;
