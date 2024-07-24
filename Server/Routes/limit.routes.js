const express = require('express');
const router = express.Router();
const levelController = require('../Controllers/level.controller');
const userController = require('../Controllers/user.controller');
const schemeController = require('../Controllers/scheme.controller');
const limitController = require('../Controllers/limit.controller');


// Countries routes
router.post('/limit', limitController.createLimit);
router.get('/limit', limitController.getAllLimits);
router.put('/limit/:id', limitController.updateLimit);
router.delete('/limit/:id', limitController.deleteLimit);
router.get('/limit/:id', limitController.getLimitbyid);
router.get('/scheme', schemeController.getAllSchemes);
router.get('/levels', levelController.getAllLevels);
router.get('/user', userController.getAllUsers);

module.exports = router;