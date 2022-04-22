const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   users: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
   }]
})

module.exports = mongoose.model('Group', GroupSchema);