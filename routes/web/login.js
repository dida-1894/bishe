var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var db=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'xiaojin',
  database: 'bishe'
});
router.get('/',function(req,res,next){
  res.render('web/login');
});

router.post('/',function(req,res){
  var phone=req.body.phone;
  // console.log(req.body.phone + "   " + "16");
  db.query(`SELECT * FROM user WHERE phone='${phone}'`,function(err,data){
    if (err) {
      console.log(err);
    } else if(data.length == 0)  {
      res.send('no the user').end();
    }else if(data[0].status) {
      if (data[0].password==req.body.password) {
        req.session['session'] = data[0];
        res.redirect('/user');
      } else {
        res.send('password wrong');
        res.redirect('login')
      }
    }else{
      res.send('watting to the admin');
    }
  });
});
 module.exports=router;
