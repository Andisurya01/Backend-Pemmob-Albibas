const pool = require("../config/database");
const bcrypt = require("bcrypt");

const createUser = async (userName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    `INSERT INTO \`User\` (user_name, email, password) VALUES (?, ?, ?)`,
    [userName, email, hashedPassword]
  );
  return { id: result.insertId, user_name: userName, email };
};

module.exports = {
  createUser,
};
