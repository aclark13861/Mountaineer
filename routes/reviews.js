const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/trails/:id/reviews', reviewsCtrl.create);
// router.delete('/reviews/:id', reviewsCtrl.delReview);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;