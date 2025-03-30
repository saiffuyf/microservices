const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount } = req.body;
        
        const order = new Order({ userId, products, totalAmount, status: 'Pending' });
        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
