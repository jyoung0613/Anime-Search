const { Schema, Types} = require('mongoose');

const showSchema = new Schema({
    showId:{
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId(),
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