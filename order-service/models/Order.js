const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
