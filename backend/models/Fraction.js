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
   }
})

module.exports = mongoose.model('Fraction', FractionSchema);
