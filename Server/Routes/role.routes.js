const express = require('express');
const router = express.Router();
const roleController = require('../Controllers/role.controller');
// const stateController = require('../controllers/stateController');

// Countries routes
router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getAllRoles);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);
router.get('/roles/:id', roleController.getRolebyid);
router.get('/roles/:id', roleController.getRoleId);

module.exports = router;
