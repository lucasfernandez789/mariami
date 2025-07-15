const express = require('express');
const router = express.Router();

// Importar subrutas
const blogRoutes = require('./blog');
const productRoutes = require('./product');
const appointmentRoutes = require('./appointment');

// Usar subrutas
router.use('/posts', blogRoutes);
router.use('/products', productRoutes);
router.use('/appointments', appointmentRoutes);

module.exports = router;