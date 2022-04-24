const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
   payer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   amount: {
      type: Number,
      required: true,
   }, 
   date: {
      type: Date,
      required: true,
   },
   fractions: [{
      type: Schema.Types.ObjectId,
      ref: 'Fraction',
   }],
   payments: [{
      type: Schema.Types.ObjectId,
      ref: 'Payment',
   }]

},{
   timestamps: true
})
