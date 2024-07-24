const express = require('express');
const router = express.Router();
const fundsController = require('../Controllers/funds.controller');



router.post('/funds', fundsController.createFunds);
router.get('/funds', fundsController.getAllFunds);
router.put('/funds/:id', fundsController.updateFunds);
router.delete('/funds/:id', fundsController.deleteFunds);
router.get('/funds/:id', fundsController.getFundsbyid);

module.exports = router;
