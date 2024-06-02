const pool = require('../config/database');

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

module.exports = {
    addHighlight,
    removeHighlight,
};
