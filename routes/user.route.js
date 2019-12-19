var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller')
var validate = require('../validate/user.validate')
var multer = require('multer')
var upload = multer({ dest: 'public/uploads' })
var authMiddleware = require('../middlewares/auth.middleware')
router.get('/', authMiddleware.requireAuth, controller.index)
router.get('/search', controller.search)
router.get('/create', controller.create);
router.post('/create', upload.single('avatar')
    , validate.postCreate,
    controller.postCreate)
router.get('/:id', controller.get)
module.exports = router;
