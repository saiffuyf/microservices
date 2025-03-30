const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Success' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);