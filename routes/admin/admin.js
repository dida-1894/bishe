var express = require('express');
var comment=require('../../libs/comment.js')
var router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
  if (!req.session['admin_id'] && req.url != '/login') {
    console.log(req.session);
    res.redirect('/admin/login');
  } else {
    next();
  }
});


router.get('/', function(req, res) {
  res.render('admin/index', { title: 'Admin' });
});

var login=require('./login.js');
router.use('/login',login);

var request=require('./request.js');
router.use('/request',request);

var users=require('./users.js');
router.use('/users',users)

module.exports = router;
