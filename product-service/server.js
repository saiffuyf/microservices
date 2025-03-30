const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Routes
app.use('/products', productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Product Service: Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});