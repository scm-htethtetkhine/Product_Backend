const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller')

router.get('/list', userController.getAllUsers);
router.get('/getbyid/:id', userController.getByUserId);
router.post('/add', userController.addUser);
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id',userController.deleteUser)

module.exports = router;