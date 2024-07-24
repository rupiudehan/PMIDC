const express = require('express');
const router = express.Router();
const userCountController = require('../Controllers/dashboard.controller');
// const stateController = require('../controllers/stateController');

// Countries routes
// router.post('/countries', countryController.createCountry);
router.get('/dashboard', userCountController.getAllUser);
// router.put('/countries/:id', countryController.updateCountry);
// router.delete('/countries/:id', countryController.deleteCountry);
// router.get('/dashboard', userCountController.getTotalAmount);

module.exports = router;
