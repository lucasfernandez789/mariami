// Script de prueba para verificar que el servidor funciona
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('🚀 Servidor de prueba iniciado en puerto', PORT);
  console.log('📝 Para probar la API:');
  console.log('   - GET  http://localhost:5000/');
  console.log('   - GET  http://localhost:5000/api/blog');
  console.log('   - GET  http://localhost:5000/api/products');
  console.log('   - POST http://localhost:5000/api/users/register');
  console.log('   - POST http://localhost:5000/api/users/login');
  console.log('');
  console.log('⚠️  Recuerda configurar las variables de entorno en .env');
  console.log('   - MONGODB_URI');
  console.log('   - JWT_SECRET');
}); 