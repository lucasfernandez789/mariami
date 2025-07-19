// Cargar configuración
if (process.env.NODE_ENV !== 'production') {
  require('../test-config.js');
} else {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rutas
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');
const productRoutes = require('./routes/product');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas conectado'))
.catch(err => console.error('❌ Error de conexión:', err));

// Rutas
app.use('/api/blog', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Mariami funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

module.exports = app;