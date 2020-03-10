const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
}, {
    timestamps: true
});

const trailSchema = new Schema({
    name: {
        type: String
    },
    bikeFriendly: {
        type: Boolean
    },
    miles: {
        type: Number
    },
    rating: {
        type: Number,
        min:1,
        max: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    content: String,

    reviews: [reviewsSchema],
},{
    timestamps: true
});

module.exports = mongoose.model('Trail', trailSchema);