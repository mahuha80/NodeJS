var User = require('../models/user.model')
var shortid = require('shortid');

module.exports.index =
    async (req, res) => {
        var users = await User.find();
        res.render('users/index.pug', {
            users: users
        })
    }
module.exports.search =
    async (req, res) => {
        var q = req.query.q;
        var users = await User.find();
        var matchedUsers = users.filter((user) => {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('users/index.pug', {
            users: matchedUsers
        })
    }
module.exports.postCreate = (req, res) => {
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        avatar: req.body.avatar,
        phone: req.body.phone
    })
    user.save((err) => {
        if (err) {
            res.json({
                "result": "failed"
            })
        } else {
            res.redirect('/users')
        }
    })
};
module.exports.get = (req, res) => {
    var id = req.params.id;
    var user = User.findOne({
        _id: id
    }, (err, user) => {
        if (err) throw err;
        res.render('users/view.pug', {
            user: user
        })
    })


};
module.exports.create = (req, res) => {
    res.render('users/create.pug')
};