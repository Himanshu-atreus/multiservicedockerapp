import pool from '../db' ; 

const addComment = async (content, postId, userId) => {
  const query = 'INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING *';
  const result = await pool.query(query, [content, postId, userId]);
  return result.rows[0];
};

const getCommentsByPostId = async (postId) => {
  const query = 'SELECT * FROM comments WHERE post_id = $1';
  const result = await pool.query(query, [postId]);
  return result.rows;
};

const deleteComment = async (id) => {
  const query = 'DELETE FROM comments WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { addComment, getCommentsByPostId, deleteComment };
