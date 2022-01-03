const { Schema } = require("mongoose")

// this will be for the save show 
const ShowSchema = new Schema({
    description: {
        type: String,
        required: true,
    },

    showId: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    title: {
        type: String,
        required: true
    }
})

module.exports = ShowSchema