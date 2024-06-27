const pool = require("../config/database");

const createProduct = async (productData) => {
  const [result] = await pool.query(
    `INSERT INTO \`Product\` (name, description, category, image, rating, size, stock, price) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      productData.name,
      productData.description,
      productData.category,
      productData.image,
      productData.rating,
      productData.size,
      productData.stock,
      productData.price,
    ]
  );
  return { id: result.insertId, ...productData };
};

module.exports = {
  createProduct,
};
