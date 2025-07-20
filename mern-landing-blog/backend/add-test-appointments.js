// Script para agregar appointments de prueba con fechas actuales
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Función para obtener fechas de los próximos días
function getFutureDates() {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    dates.push(futureDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
  }
  
  return dates;
}

// Datos de prueba con fechas actuales
const testAppointments = [
  {
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '11-1234-5678',
    date: getFutureDates()[0], // Mañana
    time: '09:00',
    service: 'Limpieza Facial Profunda'
  },
  {
    name: 'Ana Rodríguez',
    email: 'ana.rodriguez@email.com',
    phone: '11-9876-5432',
    date: getFutureDates()[0], // Mañana
    time: '11:00',
    service: 'Tratamiento Anti-Aging'
  },
  {
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    phone: '11-5555-1234',
    date: getFutureDates()[1], // Pasado mañana
    time: '14:00',
    service: 'Consulta Dermatológica'
  },
  {
    name: 'Laura Martínez',
    email: 'laura.martinez@email.com',
    phone: '11-6666-7890',
    date: getFutureDates()[2], // En 3 días
    time: '10:30',
    service: 'Tratamiento Corporal'
  },
  {
    name: 'Roberto Silva',
    email: 'roberto.silva@email.com',
    phone: '11-7777-4567',
    date: getFutureDates()[3], // En 4 días
    time: '16:00',
    service: 'Peeling Químico'
  }
];

async function addTestAppointments() {
  console.log('🌱 Agregando appointments de prueba con fechas actuales...\n');
  
  const dates = getFutureDates();
  console.log('📅 Fechas disponibles:', dates.join(', '));
  
  for (const appointment of testAppointments) {
    try {
      const response = await axios.post(`${BASE_URL}/appointments`, appointment);
      console.log(`✅ Appointment agregado: ${appointment.name} - ${appointment.service} (${appointment.date} ${appointment.time})`);
    } catch (error) {
      console.log(`❌ Error agregando appointment ${appointment.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 Appointments de prueba agregados exitosamente!');
  console.log('📝 Ahora puedes probar el calendario en el frontend:');
  console.log('   - Ve a http://localhost:3000/admin/calendar');
  console.log('   - Selecciona las fechas:', dates.join(', '));
  console.log('   - Prueba los botones de confirmar/cancelar');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  addTestAppointments();
}

module.exports = { addTestAppointments }; 