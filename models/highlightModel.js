const pool = require("../config/database");

const addHighlight = async (productId) => {
  const result = await pool.query(
    `INSERT INTO "Product_Highlight" (product_id) VALUES ($1) RETURNING *`,
    [productId]
  );
  return result.rows[0];
};

const removeHighlight = async (productId) => {
  const result = await pool.query(
    `DELETE FROM "Product_Highlight" WHERE product_id = $1 RETURNING *`,
    [productId]
  );
  return result.rows[0];
};

const getHighlightById = async (productId) => {
  const result = await pool.query(
    `SELECT p.* FROM "Product_Highlight" ph
         JOIN "Product" p ON ph.product_id = p.id
         WHERE ph.product_id = $1`,
    [productId]
  );
  return result.rows[0];
};

const getAllHighlights = async (limit, offset) => {
  const result = await pool.query(
    `SELECT p.* FROM "Product_Highlight" ph
         JOIN "Product" p ON ph.product_id = p.id
         LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
};

module.exports = {
  addHighlight,
  removeHighlight,
  getHighlightById,
  getAllHighlights,
};
