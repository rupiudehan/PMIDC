const express = require('express');
const router = express.Router();
const levelController = require('../Controllers/level.controller');
// const stateController = require('../controllers/stateController');

// Countries routes
router.post('/levels', levelController.createLevel);
router.get('/levels', levelController.getAllLevels);
router.put('/levels/:id', levelController.updateLevel);
router.delete('/levels/:id', levelController.deleteLevel);
router.get('/levels/:id', levelController.getLevelbyid);

module.exports = router;
