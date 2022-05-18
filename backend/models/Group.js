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
   isEtherGroup: {
      type: Boolean,
      default: false
   },
   users: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
   }],
   expenses : [{
         type: Schema.Types.ObjectId,
         ref: 'Expense'
   }]
}, {
   toObject: { virtuals: true },
   toJSON: { virtuals: true },
})

GroupSchema.virtual('etherExpenses', {
   ref: 'EtherExpense',
   localField: '_id',
   foreignField: 'group'
})

module.exports = mongoose.model('Group', GroupSchema);