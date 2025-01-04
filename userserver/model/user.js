import pool from '../db.js';

export const createUser = async (name, username, password) => {
  const query = 'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, username, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0];
};
