const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
    type: String,
    },
    googleId: String,
    trails: [{
        type: Schema.Types.ObjectId,
        ref: 'Trail'
    }]
}, {
});

module.exports = mongoose.model('User', userSchema);