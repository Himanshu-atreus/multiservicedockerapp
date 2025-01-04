import { addComment, getCommentsByPostId, deleteComment } from '../models/comment'; 

const newComment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user.id;

  try {
    const comment = await addComment(content, postId, userId);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
};

const getComments = async (req, res) => {
  const { post_id } = req.query;

  try {
    const comments = await getCommentsByPostId(post_id);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await deleteComment(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully', comment });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
};

module.exports = { newComment, getComments, deleteCommentById };
