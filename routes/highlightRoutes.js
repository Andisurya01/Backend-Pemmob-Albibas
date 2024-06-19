const express = require('express');
const router = express.Router();
const highlightController = require('../controllers/highlightController');
const { authenticateToken } = require('../helpers/authHelper');

router.post('/add/:id', authenticateToken, highlightController.addProductToHighlight);
router.delete('/remove/:id', authenticateToken, highlightController.removeProductFromHighlight);
router.get('/:id', authenticateToken, highlightController.getHighlightById);
router.get('/', authenticateToken, highlightController.getAllHighlights);

module.exports = router;
