const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Auth Service: Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});