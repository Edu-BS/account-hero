const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    rejected: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Invitation', InvitationSchema);