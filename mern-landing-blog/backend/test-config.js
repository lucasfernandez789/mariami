// Configuración temporal para testing
// En producción, usar variables de entorno

process.env.PORT = 5000;
// Usar MongoDB Atlas gratuito para testing
process.env.MONGODB_URI = '***REMOVED***://testuser:testpass123@cluster0.mongodb.net/mariami-test?retryWrites=true&w=majority';
process.env.JWT_SECRET = 'mariami_jwt_secret_test_2024';
process.env.NODE_ENV = 'development';

console.log('🔧 Configuración de testing cargada');
console.log('📝 Para producción, crear archivo .env con:');
console.log('   PORT=5000');
console.log('   MONGODB_URI=tu_uri_de_mongodb_atlas');
console.log('   JWT_SECRET=tu_clave_secreta_jwt');
console.log('   NODE_ENV=development');
console.log('');
console.log('⚠️  IMPORTANTE: Esta URI es de prueba. En producción usar tu propia base de datos.');
console.log(''); 