const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
   admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
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
   }],

   expenses : [{
         type: Schema.Types.ObjectId,
         ref: 'Expense'
   }]
})

module.exports = mongoose.model('Group', GroupSchema);