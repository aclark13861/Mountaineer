const Trail = require('../models/trail');

module.exports = {
    create
};

function create(req, res) {
    Trail.findById(req.params.id, function(err, trail) {
        trail.reviews.push(req.body);
        trail.save(function(err) {
            res.redirect(`/trails/${trail._id}`
        )});
    });
}
