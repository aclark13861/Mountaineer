const Trail = require('../models/trail');

module.exports = {
    create,
    delReview
};

function create(req, res) {
    Trail.findById(req.params.id, function(err, trail) {
        trail.reviews.push(req.body);
        trail.save(function(err) {
            res.redirect(`/trails/${trail._id}`
        )});
    });
}

function delReview(req, res, next) {
    Trail.findByIdAndRemove({'review._id': req.params.id}, function(err, trail) {
        console.log(trail)
        trail.reviews.id(req.params.id).remove();
        trail.save(function(err) {
            res.redirect(`/trails`);
        })
    });
}