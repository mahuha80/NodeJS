var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
var shortid = require('shortid');
const adapter = new FileSync('db.json')
const db = low(adapter)

app.set('views', 'pug') // specify the views directory
app.set('views', './views')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
db.defaults({ users: [] })
    .write()
app.get('/', (request, response) => {
    response.render('index.pug', {
        name: 'AAA'
    });
})
app.get('/users', (req, res) => {
    res.render('users/index.pug', {
        users: db.get('users').value()
    })
})
app.get('/users/search', (req, res) => {
    var q = req.query.q;
    console.log(q);
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index.pug', {
        users: matchedUsers
    })
})
app.get('/users/create', (req, res) => {
    res.render('users/create.pug')
})
app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})
app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value()
    console.log('user :', user);
    res.render('users/view.pug', {
        user: user
    })

})
app.listen(port, () => {
    console.log(`serve on port ${port}`)
})