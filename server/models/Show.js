const { Schema } = require('mongoose');

const showSchema = new Schema({
    showId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    image_url: {
        type: String,
    },

});

module.exports = showSchema;