const express = require('express');
const router = express.Router();
const stateController = require('../Controllers/state.controller');
const countryController = require('../Controllers/country.controller');


// Countries routes
router.post('/states', stateController.createState);
router.get('/states', stateController.getAllStates);
router.put('/states/:id', stateController.updateState);
router.delete('/states/:id', stateController.deleteState);
router.get('/states/:id', stateController.getStatebyid);
router.get('/countries', countryController.getAllCountries);

module.exports = router;