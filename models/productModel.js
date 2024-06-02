const pool = require('../config/database');

const createProduct = async (productData) => {
    const result = await pool.query(
        `INSERT INTO "Product" (name, description, category, image, rating, size, stock, price) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
            productData.name, productData.description, productData.category,
            productData.image, productData.rating, productData.size,
            productData.stock, productData.price
        ]
    );
    return result.rows[0];
};

module.exports = {
    createProduct,
};
