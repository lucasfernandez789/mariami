// Script de prueba para los endpoints de servicios
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testServices() {
  console.log('🧪 Probando endpoints de servicios...\n');

  try {
    // 1. Obtener todos los servicios
    console.log('1️⃣ Obteniendo todos los servicios...');
    const getAllResponse = await axios.get(`${BASE_URL}/services`);
    console.log('✅ GET /services:', getAllResponse.data.length, 'servicios encontrados');
    
    // Mostrar los primeros 2 servicios
    getAllResponse.data.slice(0, 2).forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.name} - $${service.price} (${service.duration}min)`);
    });

    // 2. Crear un nuevo servicio
    console.log('\n2️⃣ Creando nuevo servicio...');
    const newService = {
      name: 'Tratamiento de Hidratación',
      description: 'Hidratación profunda con ácido hialurónico y vitaminas',
      duration: 45,
      price: 1800,
      category: 'facial'
    };
    
    const createResponse = await axios.post(`${BASE_URL}/services`, newService);
    console.log('✅ Servicio creado:', createResponse.data.message);
    console.log('   ID:', createResponse.data.service.id);

    // 3. Actualizar el servicio creado
    console.log('\n3️⃣ Actualizando servicio...');
    const updateData = {
      price: 2000,
      description: 'Hidratación profunda con ácido hialurónico y vitaminas (actualizado)'
    };
    
    const updateResponse = await axios.put(`${BASE_URL}/services/${createResponse.data.service.id}`, updateData);
    console.log('✅ Servicio actualizado:', updateResponse.data.message);

    // 4. Obtener el servicio específico
    console.log('\n4️⃣ Obteniendo servicio específico...');
    const getOneResponse = await axios.get(`${BASE_URL}/services/${createResponse.data.service.id}`);
    console.log('✅ Servicio obtenido:', getOneResponse.data.name);

    // 5. Verificar el estado final
    console.log('\n5️⃣ Verificando estado final...');
    const finalResponse = await axios.get(`${BASE_URL}/services`);
    console.log('✅ Estado final:', finalResponse.data.length, 'servicios');
    
    finalResponse.data.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.name} - $${service.price} - ${service.category}`);
    });

    console.log('\n🎉 Todas las pruebas de servicios completadas exitosamente!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Ejecutar las pruebas
testServices(); 