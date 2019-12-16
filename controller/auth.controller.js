var db = require('../db');
var md5=require('md5');
module.exports.login = (req, res) => {
    res.render('auth/login.pug')
}
module.exports.postLogin = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email: email }).value();
    if (!user) {
        res.render('auth/login.pug', {
            errors: [
                'user does not exist.'
            ], value: req.body
        })
        return;
    }
    var hashedPassword=md5(password);
    if (user.password !== hashedPassword) {
        res.render('auth/login.pug', {
            errors: [
                'Wrong password'
            ], value: req.body
        })
        return;
    }
    res.cookie('userId', user.id,{
        signed:true
    });
    res.redirect('/users');


}