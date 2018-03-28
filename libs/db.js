var mysql=require('mysql');
var db=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'xiaojin',
  database:'bishe'
});

module.exports=db;
