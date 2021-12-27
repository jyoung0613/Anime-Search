const { Schema } = require('mongoose');

const showSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: [
        {
            type: String,
        },
    ],
    showId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

module.exports = showSchema;