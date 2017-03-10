var express = require('express');
var app = express();
var port=process.env.PORT || 3000;
var user = require('./model/index.js');
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');
// 引用静态文件
app.use(express.static('public'));
//index page
app.get('/',user.index);
//detail page
app.get('/user/:id',user.detail);
//del user page
app.get('/deluser/:id',user.del);
//add user page
app.get('/adduser',function(req,res){
	res.render('adduser');
});
app.post('/adduser',user.adduser);
// edit user page
app.get('/edituser/:id',function(req,res){
	res.render('adduser',{valueid:req.params.id});
});
app.post('/edituser/:id',user.edituser);
// 监听端口l
app.listen(port, function () {
  console.log('myapp started on port'+port);
});
