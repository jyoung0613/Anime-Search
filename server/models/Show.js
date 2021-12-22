const { Schema } = require('mongoose');

// this is a subdocument schema, it won't become it's own model but we'll use it as the schema for the User's `savedShows` array in User.js
const showSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    plot_overview: {
        type: String,
        required: true,
    },
    // saved show id from watchmode api
    showId: {
        type: String,
        required: true,
    },
    thumbnail_url: {
        type: String,
    },
    web_url: {
        type: String,
    },
});

module.exports = showSchema;