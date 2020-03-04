const Trail = require('../models/trail')
const User = require('../models/user');
module.exports = {
    index,
    create,
    new: newTrail,
    addToTrails,
    show,
    delReview,
    update,
    edit
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
        console.log(req.user);
        res.redirect(`/trails/${trail._id}`);
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
            trail,
            review: trail.reviews
        });
    });
}

function delReview(req, res, next) {
    Trail.findOne({'reviews._id': req.params.id}, function(err, trail) {
        console.log(trail)
        trail.reviews.id(req.params.id).remove();
        console.log('working');
        trail.save(function(err) {
            res.redirect(`/trails/${trail._id}`);
        })
    });
}

function update(req, res) {
    console.log(req.body)
    Trail.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, trail) {
        console.log('UPDATED TRAIL:', trail)
        res.redirect('/trails');
    });
}

function edit(req, res) {
    Trail.findById(req.params.id, function(err, trail) {
        res.render('trails/edit', {
            user: req.user,
            trail,
            idx: req.params.id
        });
    })
}