var express=require('express');
var router=express.Router();
var db = require('../../libs/db.js');
var nowDate = require('../../libs/time.js')
 router.get('/',function(req,res){
   if (req.session['session']) {

    switch (req.query.act) {
      case 'mod': db.query(`SELECT * FROM request WHERE id=${req.query.id}`, function(err,mod_data){
        if (err) {
          console.log(err);
        } else {
          db.query(`SELECT * FROM request`,function(err,data){
            if (err) {
              console.log(err);
            } else {
              res.render('web/request',{data,mod_data:mod_data[0]});
            }
          })
        }
      });

        break;
      case 'del': db.query(`DELETE FROM request WHERE id=${req.query.id}`,function(err,data){
        if (err) {
          console.log(err);
        } else {
          res.redirect('request');
        }
      });
      break;
      default: var id=req.session['session'].id;
      db.query(`SELECT * FROM request WHERE userid=${id} ORDER BY id DESC`,function(err,data){
        if (err) {
          console.log(err);
        } else {
          res.render('web/request',{data});
        }
      });
      break;
    }

   } else {
     res.redirect('login');
   }
 });

 router.post('/',function(req,res){
   var username = req.session['session'].name;
   var userid= req.session['session'].id;
   console.log(username);
   console.log(req.body);
   if (req.body.mod_id) {
     db.query(`SELECT COUNT(*) AS timeCount FROM request WHERE time='${req.body.time}' AND status!=2`,function(err,timeCot){
       if (err) {
         console.log(err);
       } else {
         var windows = timeCot[0].timeCount+1;
         if (windows>12) {
           res.send("今日预约已满，请另外选择日期");
         } else {
           console.log(windows);
           db.query(`UPDATE request SET \
             meetingname = '${req.body.meetingname}',\
             meetingnum = '${req.body.meetingnum}',\
             despretion = '${req.body.despretion}',\
             time = '${req.body.time}',\
             status = '0',\
             window = '${windows}'\
             WHERE id='${req.body.mod_id}'`,function(err,data){
               if (err) {
                 console.log(err);
               } else {
                 res.redirect('request');
               }
             });
         }
       }
     });
   } else {
     db.query(`SELECT COUNT(*) AS timeCount FROM request WHERE time='${req.body.time}' AND status!=2`,function(err,timeCot){
       if (err) {
         console.log(err);
       } else {
         var windows = timeCot[0].timeCount+1;
         if (windows>12) {
           res.send('今日预约已满，请另外选择日期');
         } else {
           db.query(`INSERT INTO request (meetingname,meetingnum,despretion,username,userid,time,status,window) VALUES('${req.body.meetingname}','${req.body.meetingnum}','${req.body.despretion}','${username}','${userid}','${req.body.time}','0','${windows}')`,function(err,data){
             if (err) {
               console.log(err);
             } else {
               db.query(`INSERT INTO log (content,time,userid) VALUES('submit the application successfully','${nowDate}','${userid}')`,function(err,log){
                 if (err) {
                   console.log(err);
                 } else {
                   res.redirect('/request');
                 }
               })
             }
           });
         }
       }
     });

   }
 })
 module.exports=router;
