var express=require('express');
var router=express.Router();
var db=require('../../libs/db.js');
var randomCode=require("../../libs/randomCode");
router.get('/',function(req,res,next){
  res.render('web/regert');
});

var indent = randomCode();
router.post('/',function(req,res){
  db.query(`INSERT INTO user (name,phone,despretion,male,password,status) VALUES('${req.body.name}','${req.body.phone}','${req.body.despretion}','${req.body.male}','${req.body.password}','0')`,function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
 });
});

module.exports=router;
