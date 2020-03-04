var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');

router.get('/', userCtrl.index);
router.get('/new', userCtrl.new);
router.post('/', userCtrl.create);

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
