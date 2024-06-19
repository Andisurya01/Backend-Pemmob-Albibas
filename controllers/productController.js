const pool = require("../config/database");
const upload = require("../middlewares/upload");

exports.addProduct = [
  upload.single("image"),
  async (req, res) => {
    const { name, description, category, rating, size, stock, price } =
      req.body;
    const image = req.file ? req.file.path : "";

    try {
      const result = await pool.query(
        `INSERT INTO "Product" (name, description, category, image, rating, size, stock, price) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, description, category, image, rating, size, stock, price]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  
  try {
    const result = await pool.query(
      `SELECT * FROM "Product" LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM "Product" WHERE id = $1`, [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = [
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { name, description, category, rating, size, stock, price } = req.body;
    const image = req.file ? req.file.path : null;

    try {
      const result = await pool.query(
        `UPDATE "Product" SET name = $1, description = $2, category = $3, image = $4, rating = $5, size = $6, stock = $7, price = $8 WHERE id = $9 RETURNING *`,
        [name, description, category, image, rating, size, stock, price, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];


exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM "Product" WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
