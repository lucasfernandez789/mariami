require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const Appointment = require('./models/Appointment');
const appointmentRoutes = require('./routes/appointment');
const MONGODB_URI = process.env.MONGODB_URI
const app = express();

app.use(express.json());

// Conexión a MongoDB Atlas

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas conectado'))
.catch(err => console.error('Error de conexión:', err));

// Usar rutas
app.use('/api/blog', blogRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
module.exports = app;