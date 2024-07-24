const express = require('express');
const router = express.Router();
const countryController = require('../Controllers/country.controller');
// const stateController = require('../controllers/stateController');

// Countries routes
router.post('/countries', countryController.createCountry);
router.get('/countries', countryController.getAllCountries);
router.put('/countries/:id', countryController.updateCountry);
router.delete('/countries/:id', countryController.deleteCountry);
router.get('/countries/:id', countryController.getCountrybyid);

module.exports = router;
