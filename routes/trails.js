var express = require('express');
var router = express.Router();
var trailsCtrl = require('../controllers/trails')

router.get('/trails', trailsCtrl.index);
router.get('/trails/new', isLoggedIn, trailsCtrl.new)
router.get('/trails/:id', isLoggedIn, trailsCtrl.show);
router.post('/trails', isLoggedIn, trailsCtrl.create)
router.post('/users/:id/trails', isLoggedIn, trailsCtrl.addToTrails)
router.delete('/trails/:id/review', isLoggedIn, trailsCtrl.delReview);
router.delete('/trails/:id', isLoggedIn, trailsCtrl.delTrail);
router.get('/trails/:id/edit', isLoggedIn, trailsCtrl.edit);
router.put('/trails/:id', isLoggedIn, trailsCtrl.update);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;