const express = require('express');
const router = express.Router();
const productController = require('../controller/productcontroller')

router.get('/list', productController.getAllProducts);
router.post('/add', productController.addProduct);
router.get('/getbyid/:id', productController.getByProductId);
router.put('/edit/:id', productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;