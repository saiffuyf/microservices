require('dotenv').config(); // Load .env at the top

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Ensure env variables are loaded
if (!process.env.AUTH_SERVICE_URL || !process.env.PRODUCT_SERVICE_URL || 
    !process.env.ORDER_SERVICE_URL || !process.env.PAYMENT_SERVICE_URL) {
    throw new Error("One or more service URLs are missing in .env file!");
}

// Middleware
app.use(express.json());
app.use(morgan('combined')); // Logging middleware

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});
app.use(limiter);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Proxy Routes with Authentication
app.use('/auth', createProxyMiddleware({ target: process.env.AUTH_SERVICE_URL, changeOrigin: true,pathRewrite: { 
    '^/auth/signup': '/frontend/signup/',  // 🔥 Fix this mapping
    '^/auth/login': '/auth/login' 
},
    onProxyReq: (proxyReq, req, res) => {
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData); // Ensure body is forwarded
        }
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`Proxy Response Status: ${proxyRes.statusCode}`);
    }
}));
app.use('/products', authenticateToken, createProxyMiddleware({ target: process.env.PRODUCT_SERVICE_URL, changeOrigin: true }));
app.use('/orders', authenticateToken, createProxyMiddleware({ target: process.env.ORDER_SERVICE_URL, changeOrigin: true }));
app.use('/payments', authenticateToken, createProxyMiddleware({ target: process.env.PAYMENT_SERVICE_URL, changeOrigin: true }));


app.get('/', (req, res) => {
    res.send('API Gateway is running');
});


app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});