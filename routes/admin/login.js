var express = require('express');
var comment=require('../../libs/comment');
var mysql=require('mysql');
var router = express.Router();

var db=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'xiaojin',
  database: 'bishe'
});

/* GET home page. */
router.get('/', function(req, res) {
  // console.log(req.body);
  res.render('admin/login', { title: 'Express' });
});

router.post('/',function(req,res,next){
  var username =req.body.username;
  var password=comment.md5(req.body.password + comment.MD5_SUFFIX);
  console.log(req.body);
  db.query(`SELECT * FROM admin_table WHERE name='${username}'`, function(err,data) {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      if (data.length==0) {
        res.status(400).send('no this admin').end();
      } else if (data[0].passwd==password){
        // console.log(data[0].password;);
        req.session['admin_id'] = data[0];
        if (req.session['admin_id'].type) {
          res.redirect('/admin');
        } else {
          res.redirect('/admin/windows');
        }
      } else {
        res.status(404).send('this password is incorrect').end();
      }
    }
  })
})

module.exports = router;
