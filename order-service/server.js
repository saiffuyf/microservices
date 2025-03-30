const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(express.json());

// Routes
app.use('/orders', orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Order Service: Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
