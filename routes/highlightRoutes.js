const express = require('express');
const router = express.Router();
const highlightController = require('../controllers/highlightController');
const { authenticateToken } = require('../helpers/authHelper');

router
    .get("/non-highlighted", highlightController.getNonHighlightedProducts)

    .post('/add/:id', authenticateToken, highlightController.addProductToHighlight)
    .delete('/remove/:id', authenticateToken, highlightController.removeProductFromHighlight)
    .get('/:id', authenticateToken, highlightController.getHighlightById)
    .get('/', authenticateToken, highlightController.getAllHighlights)

module.exports = router;
