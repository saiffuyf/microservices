const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
    try {
        const { orderId, userId, amount, paymentMethod } = req.body;
        
        const payment = new Payment({ orderId, userId, amount, paymentMethod, status: 'Success' });
        await payment.save();
        res.status(201).json({ message: 'Payment processed successfully', payment });
    } catch (error) {
        res.status(500).json({ error: 'Payment processing failed' });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
};