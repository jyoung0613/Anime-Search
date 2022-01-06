<<<<<<< HEAD
const { Schema, Types } = require('mongoose');

const showSchema = new Schema({
    showId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),  
    },
=======
const { Schema, Types} = require('mongoose');

const showSchema = new Schema({
    showId:{
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId(),
    },  
>>>>>>> 33446907b926c5792c95744dd36b00661f433762
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