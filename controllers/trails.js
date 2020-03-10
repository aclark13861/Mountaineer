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
    edit,
    delTrail
};

function index(req, res) {
    Trail.find({}, function(err, trails) {
        res.render('trails/index', {
            user: req.user,
            trails })
    });
}

function create(req, res) {
    req.body.bikeFriendly = !!req.body.bikeFriendly;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    console.log(req.user)
    req.body.user = req.user.id
    console.log(req.body)
    const trail = new Trail(req.body);
    trail.save(function(err) {
        if (err) return res.redirect('/trails/new');
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
    Trail.findById(req.params.id).populate('user').exec(function(err, trail) {
        console.log(trail);
        res.render('trails/show', {
            user: req.user,
            trail,
            review: trail.reviews
        });
    });
}

function delReview(req, res, next) {
    Trail.findOne({'reviews._id': req.params.id}, function(err, trail) {
        trail.reviews.id(req.params.id).remove();
        trail.save(function(err) {
            res.redirect(`/trails/${trail._id}`);
        })
    });
}

function update(req, res) {
    Trail.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, trail) {
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

function delTrail(req, res, next) {
    Trail.findByIdAndRemove(req.params.id, function(err) {
        res.redirect(`/trails`);
    });
}