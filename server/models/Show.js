const { Schema } = require('mongoose');

// this is a subdocument schema, it won't become it's own model but we'll use it as the schema for the User's `savedShows` array in User.js
const showSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

module.exports = showSchema;