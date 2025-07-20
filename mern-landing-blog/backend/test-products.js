// Script de prueba para los endpoints de productos
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testProducts() {
  console.log('🧪 Probando endpoints de productos...\n');

  try {
    // 1. Obtener todos los productos
    console.log('1️⃣ Obteniendo todos los productos...');
    const getAllResponse = await axios.get(`${BASE_URL}/products`);
    console.log('✅ GET /products:', getAllResponse.data.length, 'productos encontrados');
    
    // Mostrar los primeros 2 productos
    getAllResponse.data.slice(0, 2).forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
    });

    // 2. Crear un nuevo producto
    console.log('\n2️⃣ Creando nuevo producto...');
    const newProduct = {
      name: 'Gel Limpiador Suave',
      description: 'Limpieza suave para piel sensible. Sin fragancias ni irritantes.',
      price: 28.50,
      category: 'facial',
      stock: 35,
      image: '/images/gel-limpiador.jpg'
    };
    
    const createResponse = await axios.post(`${BASE_URL}/products`, newProduct);
    console.log('✅ Producto creado:', createResponse.data.message);
    console.log('   ID:', createResponse.data.product.id);

    // 3. Actualizar el producto creado
    console.log('\n3️⃣ Actualizando producto...');
    const updateData = {
      price: 32.00,
      stock: 40,
      description: 'Limpieza suave para piel sensible. Sin fragancias ni irritantes. (actualizado)'
    };
    
    const updateResponse = await axios.put(`${BASE_URL}/products/${createResponse.data.product.id}`, updateData);
    console.log('✅ Producto actualizado:', updateResponse.data.message);

    // 4. Obtener el producto específico
    console.log('\n4️⃣ Obteniendo producto específico...');
    const getOneResponse = await axios.get(`${BASE_URL}/products/${createResponse.data.product.id}`);
    console.log('✅ Producto obtenido:', getOneResponse.data.name);

    // 5. Verificar el estado final
    console.log('\n5️⃣ Verificando estado final...');
    const finalResponse = await axios.get(`${BASE_URL}/products`);
    console.log('✅ Estado final:', finalResponse.data.length, 'productos');
    
    finalResponse.data.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.price} - ${product.category} - Stock: ${product.stock}`);
    });

    console.log('\n🎉 Todas las pruebas de productos completadas exitosamente!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Ejecutar las pruebas
testProducts(); 