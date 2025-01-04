const express = require('express');
const { newComment, getComments, deleteCommentById } = require('../controllers/comment');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/comments', verifyToken, newComment);
router.get('/comments', getComments);
router.delete('/comments/:id', verifyToken, deleteCommentById);

module.exports = router;
