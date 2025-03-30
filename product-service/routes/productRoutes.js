const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { addProduct, getProducts } = require('../controllers/productController');

router.post('/add', upload.single('image'), addProduct);
router.get('/', getProducts);

module.exports = router;