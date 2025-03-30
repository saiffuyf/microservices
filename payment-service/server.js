const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(express.json());

// Routes
app.use('/payments', paymentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Payment Service: Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});
