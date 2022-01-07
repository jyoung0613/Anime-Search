<<<<<<< HEAD
const { Schema, Types} = require('mongoose');

const showSchema = new Schema({
    showId:{
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId(),
    },  
=======
const { Schema, Types } = require('mongoose');

const showSchema = new Schema({
    showId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),  
    },
>>>>>>> 2699b28f68aca601cb2e5d43c85795859146bda7
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