const pool = require("../config/database");

exports.addHighlight = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `INSERT INTO "Product_Highlight" (product_id) VALUES ($1) RETURNING *`,
      [id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeHighlight = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM "Product_Highlight" WHERE product_id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Highlight not found" });
    }

    res.json({ message: "Highlight removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
