var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('web/index', { title: '' });
});

var login=require('./login.js');
router.use('/login',login);

var regert=require('./regert.js');
router.use('/regert',regert);

var user=require('./user.js');
router.use('/user',user);

var request=require('./request.js');
router.use('/request',request);

router.use('/logout',function(req,res){
  req.session['session'] = '';
  res.redirect('/');
});

module.exports = router;
