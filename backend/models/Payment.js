const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
   fraction: {
      type: Schema.Types.ObjectId,
      ref: 'Fraction',
      required: true,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   amount: {
      type: Number,
      required: true,
   },
   picture: {
      type: String,
   }
}, {
   timestamps: true,
});

module.exports = mongoose.model('Payment', PaymentSchema);