const User = require('../models/user');

module.exports = {
    index,
    create,
    new: newUser,
};

function index(req, res, next) {
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    User.find(modelQuery)
    .exec(function(err, users) {
        if (err) return next(err);
    User.find({}, function(err, users) {
        res.render('users/index', {
            users,
            user: req.user,
            name: req.query.name,
        })});
    });
}

function create(req, res) {
    const user = new User(req.body);
    user.save(function(err) {
        if (err) return res.redirect('/users/new');
        res.redirect('/users', {
            user: req.user
        });
    });
}

function newUser(req, res) {
    User.find({}, function(err, users) {
        res.render('users/new', {
            user: req.user,
            users });
    })
};