import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../models/blog';

const createBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const blog = await createBlog(title, content, userId);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await getBlogById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await updateBlog(id, title, content);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await deleteBlog(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully', blog });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
};

module.exports = { createBlogPost, getBlogs, getSingleBlog, updateBlogPost, deleteBlogPost };
