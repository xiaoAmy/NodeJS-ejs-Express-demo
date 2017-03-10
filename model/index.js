var test = require('../lib/server.db');
var async = require('async');

// 用户列表页数据
exports.index = function(req,res){
    async.series({
        one: function (done) {
            test.index('SELECT * FROM user_info', function (list) {
		 done(null, list);
            });
        }
    }, function (error, result) {
         //res.render('index',{userlist: result.one});
         res.send(JSON.stringify(result.one));
    });
};

//用户详情页
exports.detail = function(req,res){
    async.series({
        one: function (done) {
            test.index('SELECT * FROM user_info WHERE user_id='+req.params.id+'', function (list) {
		 		done(null, list);
            });
        }
    }, function (error, result) {
        res.render('detail',{userdetail: result.one[0]});
    });
};

//删除用户
exports.del = function(req,res){
    async.series({
        one: function (done) {
            test.index('DELETE FROM user_info WHERE user_id='+req.params.id+'', function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/');
    });
};

// 添加用户
exports.adduser = function(req,res){
    var username=req.body;
    async.series({
        one: function (done) {
            var mysql="INSERT INTO user_info (user_n,user_p) VALUES ('"+username.user+"','"+username.password+"')";
            test.index(mysql, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
         res.redirect('/');
    });
};

// 编辑用户
exports.edituser = function(req,res){
    var username=req.body;
    async.series({
        one: function (done) {
            var mysql="UPDATE user_info SET user_n='"+username.user+"', user_p='"+username.password+"' WHERE user_id='"+req.params.id+"'";
            test.index(mysql, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
         res.redirect('/');
    });
};
