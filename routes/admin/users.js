var express = require('express');
// var comment=require('../../libs/db');
var mysql=require('mysql');
var router = express.Router();

var db=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'xiaojin',
  database: 'bishe'
});

router.get('/',function(req,res,next){
  switch(req.query.act){
    case 'del':db.query(`DELETE FROM user WHERE id=${req.query.id}`,function(err,data){
      if (err) {
        console.log(err);
        res.status(500).send('database erro').end();
      } else if(data.length==0){
        console.log('404 data not found');
      }else{
        res.redirect('/admin/users');
      }
    });
    break;
    case 'pass':db.query(`UPDATE user SET status='1' WHERE id=${req.query.id}`,function(err,data){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/admin/users')
      }
    });
    break;
    default: db.query(`SELECT * FROM user`,function(err,data){
      if (err) {
        console.log(err);
      } else {
        res.render('admin/users',{data});
      }
    })
  }
});

/* GET home page. */
// router.use('/', function(req, res, next) {
//   // console.log(req.body);
//   db.query(`SELECT * FROM user`,function(err,data){
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('admin/users', {data});
//     }
//   })
// });

module.exports = router;
