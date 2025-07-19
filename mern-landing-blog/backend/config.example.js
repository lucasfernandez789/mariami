// Archivo de ejemplo para configuración
// Copiar este archivo como .env y configurar las variables

module.exports = {
  // Configuración del servidor
  PORT: process.env.PORT || 5000,
  
  // Base de datos MongoDB Atlas
  MONGODB_URI: process.env.MONGODB_URI || '***REMOVED***://tu_usuario:tu_password@cluster0.mongodb.net/mariami?retryWrites=true&w=majority',
  
  // JWT Secret (cambiar por una clave segura en producción)
  JWT_SECRET: process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro_aqui',
  
  // Configuración de desarrollo
  NODE_ENV: process.env.NODE_ENV || 'development'
}; 