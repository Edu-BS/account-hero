const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FractionSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   amount: {
      type: Number,
      required: true,
   },
   state: {
      type: String
   },
   group : {
      type: Schema.Types.ObjectId,
      ref: 'Group',
   },
   expense : {
      type: Schema.Types.ObjectId,
      ref: 'expense'
   },
   state: {
      type: String,
      enum: ['pending', 'unpaid', 'payed']
   }
})

module.exports = mongoose.model('Fraction', FractionSchema);
