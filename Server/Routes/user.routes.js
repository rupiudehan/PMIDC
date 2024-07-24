const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const roleController = require('../Controllers/role.controller');
const levelController = require('../Controllers/level.controller');


// Countries routes
router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.getUserbyid);
router.get('/roles', roleController.getAllRoles);
router.get('/levels', levelController.getAllLevels);

module.exports = router;