const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const image = req.file ? req.file.path : '';
        
        const product = new Product({ name, price, category, stock, image });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};