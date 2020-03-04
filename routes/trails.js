var express = require('express');
var router = express.Router();
var trailsCtrl = require('../controllers/trails')

router.get('/trails', trailsCtrl.index);
router.get('/trails/new', trailsCtrl.new)
router.get('/trails/:id', trailsCtrl.show);
router.post('/trails', trailsCtrl.create)
router.post('/users/:id/trails', trailsCtrl.addToTrails)

module.exports = router;