const BlogPost = require('../models/BlogPost');

// Obtener todos los posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'name');
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un post por ID
exports.deletePost = async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ message: 'Post eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};