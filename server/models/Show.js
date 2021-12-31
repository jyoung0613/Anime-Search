const { Schema } = require('mongoose');

const showSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },

});

module.exports = showSchema;