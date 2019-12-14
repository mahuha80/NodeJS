var db = require('../db');
var shortid = require('shortid');

module.exports.index =
    (req, res) => {
        res.render('users/index.pug', {
            users: db.get('users').value()
        })
    }
module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index.pug', {
        users: matchedUsers
    })
}
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    
    db.get('users').push(req.body).write();
    res.redirect('/users')
};
module.exports.get = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value()
    res.render('users/view.pug', {
        user: user
    })

};
module.exports.create = (req, res) => {
    res.render('users/create.pug')
};