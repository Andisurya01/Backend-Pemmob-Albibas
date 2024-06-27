const pool = require("../config/database");

const addHighlight = async (productId) => {
  const [result] = await pool.query(
    `INSERT INTO \`Product_Highlight\` (product_id) VALUES (?)`,
    [productId]
  );
  return { id: result.insertId, product_id: productId };
};

const removeHighlight = async (productId) => {
  const [result] = await pool.query(
    `DELETE FROM \`Product_Highlight\` WHERE product_id = ?`,
    [productId]
  );
  return result.affectedRows > 0 ? { product_id: productId } : null;
};

const getHighlightById = async (productId) => {
  const [result] = await pool.query(
    `SELECT p.* FROM \`Product_Highlight\` ph
         JOIN \`Product\` p ON ph.product_id = p.id
         WHERE ph.product_id = ?`,
    [productId]
  );
  return result[0];
};

const getAllHighlights = async (limit, offset) => {
  const [result] = await pool.query(
    `SELECT p.* FROM \`Product_Highlight\` ph
         JOIN \`Product\` p ON ph.product_id = p.id
         LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  return result;
};

const isProductHighlighted = async (productId) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  console.log("Checking if product ID is highlighted:", productId);

  const [result] = await pool.query(
    `SELECT * FROM \`Product_Highlight\` WHERE product_id = ?`,
    [productId]
  );
  return result.length > 0;
};

module.exports = {
  addHighlight,
  removeHighlight,
  getHighlightById,
  getAllHighlights,
  isProductHighlighted,
};
