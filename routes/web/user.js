var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'xiaojin',
  database: 'bishe'
});

router.get('/', function(req, res) {
  if (req.session['session']) {
    var id = req.session['session'].id;
    // console.log(id);
    db.query(`SELECT * FROM user WHERE id=${req.session['session'].id}`, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).send('database error').end();
      } else {
        var user = data[0];
        db.query(`SELECT * FROM log WHERE userid=${id} ORDER BY id DESC`, function(err, log) {
          if (err) {
            console.log(err);
          } else {
            // console.log(log);
            res.render('web/user', {
              user,
              log
            });
          }
        })
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
