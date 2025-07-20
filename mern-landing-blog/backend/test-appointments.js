// Script de prueba para los endpoints de appointments
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAppointments() {
  console.log('🧪 Probando endpoints de appointments...\n');

  try {
    // 1. Obtener todos los appointments
    console.log('1️⃣ Obteniendo todos los appointments...');
    const getAllResponse = await axios.get(`${BASE_URL}/appointments`);
    console.log('✅ GET /appointments:', getAllResponse.data.length, 'appointments encontrados');
    
    // Mostrar los primeros 2 appointments
    getAllResponse.data.slice(0, 2).forEach((apt, index) => {
      console.log(`   ${index + 1}. ${apt.name} - ${apt.service} (${apt.status || 'sin status'})`);
    });

    // 2. Probar confirmar un appointment
    if (getAllResponse.data.length > 0) {
      const appointmentToConfirm = getAllResponse.data.find(apt => !apt.status);
      if (appointmentToConfirm) {
        console.log('\n2️⃣ Confirmando appointment:', appointmentToConfirm.id);
        const confirmResponse = await axios.put(`${BASE_URL}/appointments/${appointmentToConfirm.id}`, {
          status: 'confirmed'
        });
        console.log('✅ Appointment confirmado:', confirmResponse.data.message);
      } else {
        console.log('\n2️⃣ No hay appointments sin status para confirmar');
      }
    }

    // 3. Probar cancelar un appointment
    if (getAllResponse.data.length > 0) {
      const appointmentToCancel = getAllResponse.data.find(apt => !apt.status);
      if (appointmentToCancel) {
        console.log('\n3️⃣ Cancelando appointment:', appointmentToCancel.id);
        const cancelResponse = await axios.put(`${BASE_URL}/appointments/${appointmentToCancel.id}`, {
          status: 'cancelled'
        });
        console.log('✅ Appointment cancelado:', cancelResponse.data.message);
      } else {
        console.log('\n3️⃣ No hay appointments sin status para cancelar');
      }
    }

    // 4. Verificar el estado final
    console.log('\n4️⃣ Verificando estado final...');
    const finalResponse = await axios.get(`${BASE_URL}/appointments`);
    console.log('✅ Estado final:', finalResponse.data.length, 'appointments');
    
    finalResponse.data.forEach((apt, index) => {
      console.log(`   ${index + 1}. ${apt.name} - ${apt.service} - Status: ${apt.status || 'sin status'}`);
    });

    console.log('\n🎉 Todas las pruebas completadas exitosamente!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Ejecutar las pruebas
testAppointments(); 