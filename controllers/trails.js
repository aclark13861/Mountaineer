const Trail = require('../models/trail')
const User = require('../models/user');
module.exports = {
    index,
    create,
    new: newTrail,
    addToTrails,
    show
};

function index(req, res) {
    Trail.find({}, function(err, trails) {
        res.render('trails/index', {
            user: req.user,
            trails })
    });
}

function create(req, res) {
    console.log('req', req.body)
    req.body.bikeFriendly = !!req.body.bikeFriendly;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const trail = new Trail(req.body);
    trail.save(function(err) {
        if (err) return res.redirect('/trails/new');
        console.log('newtrail:', trail);
        res.redirect(`/trails/${trail._id}`, {
            user: req.user
        });
    })
//    Trail.create(req.body, function(err, trail) {
//        res.redirect(`/trails/${trail._id}`);
//    });
}

function newTrail(req, res) {
Trail.find({}, function(err, trails) {
    res.render('trails/new', {
        user: req.user,
        trails
    });
  });
}

function addToTrails(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.trails.push(req.body.trailId);
        user.save(function(err) {
            res.redirect(`/users/${user._id}`, {
                user: req.user
            });
        });
    });
}

function show(req, res) {
    Trail.findById(req.params.id,
     function(err, trail) {
         console.log('trailsss', trail);
        res.render('trails/show', {
            user: req.user,
            trail
        });
    });
}