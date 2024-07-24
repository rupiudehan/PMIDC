const express = require('express');
const router = express.Router();
const subComponentController = require('../Controllers/sub-component.controller');
const schemeController = require('../Controllers/scheme.controller');
const subSchemeController = require('../Controllers/sub-scheme.controller');


// Countries routes
router.post('/sub-component', subComponentController.createSubComponent);
router.get('/sub-component', subComponentController.getAllSubComponent);
router.put('/sub-component/:id', subComponentController.updateSubComponent);
router.delete('/sub-component/:id', subComponentController.deleteSubComponent);
router.get('/sub-component/:id', subComponentController.getSubComponentbyid);
router.get('/scheme', schemeController.getAllSchemes);
router.get('/subScheme', subSchemeController.getAllSubScheme);

module.exports = router;