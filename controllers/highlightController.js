const pool = require("../config/database");

const {
  addHighlight,
  removeHighlight,
  getHighlightById,
  getAllHighlights,
  isProductHighlighted
} = require("../models/highlightModel");

exports.addProductToHighlight = async (req, res) => {
  const { id } = req.params;

  try {
    const alreadyHighlighted = await isProductHighlighted(id);
    console.log(alreadyHighlighted);
    if (alreadyHighlighted) {
      return res
        .status(400)
        .json({ message: "Product is already highlighted" });
    }
    const highlight = await addHighlight(id);
    res.status(201).json(highlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeProductFromHighlight = async (req, res) => {
  const { id } = req.params;

  try {
    const highlight = await removeHighlight(id);
    if (!highlight) {
      return res
        .status(404)
        .json({ message: "Product not found in highlights" });
    }
    res.json({
      message: `Product with ID ${id} removed from highlights successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHighlightById = async (req, res) => {
  const { id } = req.params;

  try {
    const highlight = await getHighlightById(id);
    if (!highlight) {
      return res.status(404).json({ message: "Highlight not found" });
    }
    res.json(highlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllHighlights = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const highlights = await getAllHighlights(limit, offset);
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNonHighlightedProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const result = await pool.query(
      `SELECT * FROM "Product" 
       WHERE id NOT IN (SELECT product_id FROM "Product_Highlight")
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};