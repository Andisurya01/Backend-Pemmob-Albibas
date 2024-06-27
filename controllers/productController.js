const pool = require("../config/database");
const upload = require("../middlewares/upload");
const { validationResult, query } = require("express-validator");

exports.addProduct = [
  upload.single("image"),
  async (req, res) => {
    const { name, description, category, rating, size, stock, price } =
      req.body;
    const image = req.file ? req.file.path : "";

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
    res.json(result);
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

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = [
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { name, description, category, rating, size, stock, price } =
      req.body;
    const image = req.file ? req.file.path : null;

    try {
      const [result] = await pool.query(
        `UPDATE \`Product\` SET name = ?, description = ?, category = ?, image = ?, rating = ?, size = ?, stock = ?, price = ? WHERE id = ?`,
        [name, description, category, image, rating, size, stock, price, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({
        id,
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

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM \`Product\` WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNonHighlightedProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const [result] = await pool.query(
      `SELECT * FROM \`Product\` 
       WHERE id NOT IN (SELECT product_id FROM \`Product_Highlight\`)
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
