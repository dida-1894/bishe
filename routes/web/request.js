var express=require('express');
var router=express.Router();
var db = require('../../libs/db.js');
var nowDate = require('../../libs/time.js')
 router.get('/',function(req,res){
   if (req.session['session']) {
     var id=req.session['session'].id;
     db.query(`SELECT * FROM request WHERE userid=${id}`,function(err,data){
       if (err) {
         console.log(err);
       } else {
         res.render('web/request',{data});
       }
     });
   } else {
     res.redirect('login');
   }
 });
 router.post('/',function(req,res){
   console.log(req.body);
   var username = req.session['session'].name;
   var userid= req.session['session'].id;
   console.log(username);
   db.query(`INSERT INTO request (meetingname,meetingnum,despretion,username,userid,time,status) VALUES('${req.body.meetingname}','${req.body.meetingnum}','${req.body.despretion}','${username}','${userid}','${req.body.time}','0')`,function(err,data){
     if (err) {
       console.log(err);
     } else {
       db.query(`INSERT INTO log (content,time,userid) VALUES('submit the application successfully','${nowDate}','${userid}')`,function(err,data){
         if (err) {
           console.log(err);
         } else {
           console.log('log it');
           res.redirect('/request');
         }
       })
     }
   });
 })
 module.exports=router;
