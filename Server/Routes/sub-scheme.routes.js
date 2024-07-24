const express = require('express');
const router = express.Router();
const subSchemeController = require('../Controllers/sub-scheme.controller');
const schemeController = require('../Controllers/scheme.controller');


// Countries routes
router.post('/subScheme', subSchemeController.createSubScheme);
router.get('/subScheme', subSchemeController.getAllSubScheme);
router.put('/subScheme/:id', subSchemeController.updateSubScheme);
router.delete('/subScheme/:id', subSchemeController.deleteSubScheme);
router.get('/subScheme/:id', subSchemeController.getSubSchemebyid);
router.get('/scheme', schemeController.getAllSchemes);

module.exports = router;