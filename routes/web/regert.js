var express=require('express');
var router=express.Router();
var db=require('../../libs/db.js');
router.get('/',function(req,res){
  res.render('web/regert');
});
router.post('/',function(req,res){
  db.query(`INSERT INTO user (name,phone,despretion,male,email,password,status) VALUES('${req.body.name}','${req.body.phone}','${req.body.despretion}','${req.body.male}','${req.body.email}','${req.body.password}','0')`,function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
});

module.exports=router;
