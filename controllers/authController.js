const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authHelper = require("../helpers/authHelper");

exports.login = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const userResult = await pool.query(
      'SELECT * FROM "User" WHERE user_name = $1',
      [user_name]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = authHelper.generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
