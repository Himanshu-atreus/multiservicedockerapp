import express from 'express' ; 
import {
  createBlogPost,
  getBlogs,
  getSingleBlog,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blog' ; 
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/blogs', verifyToken, createBlogPost);
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getSingleBlog);
router.put('/blogs/:id', verifyToken, updateBlogPost);
router.delete('/blogs/:id', verifyToken, deleteBlogPost);

module.exports = router;
