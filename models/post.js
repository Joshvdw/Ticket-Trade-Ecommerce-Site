const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    modalId: {
        type: String,
        require: true
    },
    place: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tags: {
        type: Array,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    comment: {
        type: Array,
        require: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Post', postSchema);