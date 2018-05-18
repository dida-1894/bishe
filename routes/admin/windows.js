var express = require('express');
var db = require('../../libs/db.js');
var nowDate = require('../../libs/time.js');
var router = express.Router();

router.get("/",function(req,res){
  db.query(`SELECT * FROM request WHERE time='${nowDate}' AND window IS NOT NULL`,function(err,data){
    if (err) {
      console.log(err);
    } else {
      var Aarr=[];
      var Barr=[];
      var Carr=[];
      var Darr=[];
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].window%4);
        var sequence = data[i].window%4
        if (sequence == 0) {
          Aarr.push(data[i]);
        } else if(sequence == 1){
          Barr.push(data[i]);
        } else if(sequence == 2){
          Carr.push(data[i]);
        } else if (sequence == 3) {
          Darr.push(data[i]);
        }
      }
      console.log(Aarr);
      console.log(Barr);
      console.log(Carr);
      console.log(Darr);
      res.render('admin/windows',{Aarr,Barr,Carr,Darr});
    }
  });
});

router.post("/",function(req,res){
  console.log(req.body);
  db.query(`UPDATE request SET process = '${req.body.process}' WHERE id='${req.body.process_id}'`,function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin/windows');
    }
  })
})

module.exports = router;
