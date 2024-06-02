const express = require('express');
const router = express.Router();
const highlightController = require('../controllers/highlightController');

router.post('/add/:id', highlightController.addHighlight);
router.post('/remove/:id', highlightController.removeHighlight);

module.exports = router;
