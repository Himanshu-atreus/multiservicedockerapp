import pool from '../db';

const createBlog = async (title, content, userId) => {
  const query = 'INSERT INTO blogs (title, content, user_id) VALUES ($1, $2, $3) RETURNING *';
  const result = await pool.query(query, [title, content, userId]);
  return result.rows[0];
};

const getAllBlogs = async () => {
  const query = 'SELECT * FROM blogs';
  const result = await pool.query(query);
  return result.rows;
};

const getBlogById = async (id) => {
  const query = 'SELECT * FROM blogs WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateBlog = async (id, title, content) => {
  const query = 'UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *';
  const result = await pool.query(query, [title, content, id]);
  return result.rows[0];
};

const deleteBlog = async (id) => {
  const query = 'DELETE FROM blogs WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
