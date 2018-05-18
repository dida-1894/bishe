var express=require('express');
var router = express.Router();
var db=require('../../libs/db.js');
var time = require('../../libs/time.js');

router.get('/',function(req,res){
  switch(req.query.act){
    case 'pass':db.query(`UPDATE request SET status='1' WHERE id=${req.query.id}`,function(err,data){
      if (err) {
        console.log(err);
      } else {
        db.query(`INSERT INTO log (content,time,userid) VALUES('pass it','${time}','${req.query.userid}')`,function(err,data){
          if (err) {
            console.log(err);
          } else {
            res.redirect('/admin/request');
          }
        });
      }
    });
    break;
    case 'rej':db.query(`UPDATE request SET status='2' WHERE id=${req.query.id}`,function(err,data){
      if (err) {
        console.log(err);
      } else {
          db.query(`INSERT INTO log (content,time,userid) VALUES('sorry reject','${time}','${req.query.userid}')`,function(err,data){
            if (err) {
              console.log(err);
            } else {
              res.redirect('/admin/request');
            }
          });
      }
    });
    break;
    default:db.query(`SELECT * FROM request ORDER BY id DESC`,function(err,data){
      if (err) {
        console.log(err);
      } else {
        res.render('admin/request', {data});
      }
    })
    break;
  }
});

router.post('/',function(req,res){

});

module.exports = router;
