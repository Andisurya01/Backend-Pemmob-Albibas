const pool = require("../config/database");
const upload = require("../middlewares/upload");
const { validationResult, query } = require("express-validator");

exports.addProduct = [
  upload.single("image"),
  async (req, res) => {
    const { name, description, category, rating, size, stock, price } =
      req.body;
    const image = req.file ? req.file.filename : "";

    try {
      const [result] = await pool.query(
        `INSERT INTO \`Product\` (name, description, category, image, rating, size, stock, price) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, description, category, image, rating, size, stock, price]
      );

      res
        .status(201)
        .json({
          id: result.insertId,
          name,
          description,
          category,
          image,
          rating,
          size,
          stock,
          price,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const [result] = await pool.query(
      `SELECT * FROM \`Product\` LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `SELECT * FROM \`Product\` WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = [
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { name, description, category, rating, size, stock, price } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      // Ambil data produk yang ada
      const [currentProductResult] = await pool.query(
        `SELECT * FROM \`Product\` WHERE id = ?`,
        [id]
      );

      if (currentProductResult.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      const currentProduct = currentProductResult[0];

      // Gunakan nilai yang ada jika data baru kosong
      const updatedName = name || currentProduct.name;
      const updatedDescription = description || currentProduct.description;
      const updatedCategory = category || currentProduct.category;
      const updatedImage = image || currentProduct.image;
      const updatedRating = rating || currentProduct.rating;
      const updatedSize = size || currentProduct.size;
      const updatedStock = stock || currentProduct.stock;
      const updatedPrice = price || currentProduct.price;

      // Update produk dengan data baru atau yang sudah ada
      const [result] = await pool.query(
        `UPDATE \`Product\` SET name = ?, description = ?, category = ?, image = ?, rating = ?, size = ?, stock = ?, price = ? WHERE id = ?`,
        [updatedName, updatedDescription, updatedCategory, updatedImage, updatedRating, updatedSize, updatedStock, updatedPrice, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(201).json({
        id,
        name: updatedName,
        description: updatedDescription,
        category: updatedCategory,
        image: updatedImage,
        rating: updatedRating,
        size: updatedSize,
        stock: updatedStock,
        price: updatedPrice,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];


exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM \`Product\` WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


