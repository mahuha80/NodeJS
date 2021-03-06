// process.env
require('dotenv').config();
console.log(process.env.SESSION_SECRET);
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var port = 3000;
var app = express();
app.use(express.static('public'))
var mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URL);
var apiProductRoute=require('./api/routes/product.route')

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware=require('./middlewares/session.middleware')

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productRoute=require('./routes/product.route')
var cartRoute=require('./routes/cart.route')
app.set('views', 'pug') // specify the views directory
app.set('views', './views')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware);
app.get('/', (request, response) => {
    response.render('index.pug', {
        name: 'AAA'
    });
})
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products',productRoute);
app.use('/cart',cartRoute)
app.use('/api/products',apiProductRoute)
app.listen(port, () => {
    console.log(`serve on port ${port}`)
})
// killall -9 node
