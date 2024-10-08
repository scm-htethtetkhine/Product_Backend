const express = require('express');
const router = express.Router();
const salereceiptController = require('../controller/salereceiptcontroller')

router.post('/add', salereceiptController.calculateDivision);

module.exports = router;