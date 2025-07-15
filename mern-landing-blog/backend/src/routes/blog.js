const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Obtener todos los posts del blog
router.get('/', blogController.getAllPosts);

// Crear un nuevo post
router.post('/', blogController.createPost);

// Obtener un post por ID
router.get('/:id', blogController.getPostById);

// Eliminar un post por ID
router.delete('/:id', blogController.deletePost);

module.exports = router;