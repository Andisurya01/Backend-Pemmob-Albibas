const pool = require('../config/database');
const bcrypt = require('bcrypt');

const createUser = async (userName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `INSERT INTO "User" (user_name, email, password) VALUES ($1, $2, $3) RETURNING *`,
        [userName, email, hashedPassword]
    );
    return result.rows[0];
};

module.exports = {
    createUser,
};
