const express = require('express');
const router = express.Router();
const schemeController = require('../Controllers/scheme.controller');
// const stateController = require('../controllers/stateController');

// Countries routes
router.post('/scheme', schemeController.createScheme);
router.get('/scheme', schemeController.getAllSchemes);
router.put('/scheme/:id', schemeController.updateScheme);
router.delete('/scheme/:id', schemeController.deleteScheme);
router.get('/scheme/:id', schemeController.getSchemebyid);

module.exports = router;
