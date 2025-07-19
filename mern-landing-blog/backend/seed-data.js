// Script para agregar datos de prueba al backend
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Datos de prueba
const testProducts = [
  {
    name: 'Crema Hidratante Facial',
    price: 45.00,
    description: 'Hidratación profunda 24 horas con ácido hialurónico. Ideal para todo tipo de piel.'
  },
  {
    name: 'Serum Anti-Aging',
    price: 75.00,
    description: 'Rejuvenecimiento con vitamina C y retinol. Reduce líneas de expresión y manchas.'
  },
  {
    name: 'Aceite Corporal Nutritivo',
    price: 35.00,
    description: 'Nutrición profunda para piel seca y sensible. Con aceites esenciales naturales.'
  },
  {
    name: 'Mascarilla Facial Purificante',
    price: 25.00,
    description: 'Purificación y exfoliación suave. Elimina impurezas y renueva la piel.'
  },
  {
    name: 'Protector Solar SPF 50',
    price: 55.00,
    description: 'Protección solar de amplio espectro. Hidratante y no comedogénico.'
  }
];

const testBlogPosts = [
  {
    title: 'Rutina de Skincare para Principiantes',
    content: 'Descubre los pasos esenciales para una rutina de skincare efectiva. Desde la limpieza hasta la hidratación, te guiamos paso a paso para lograr una piel radiante y saludable.',
    author: 'Equipo Mariami',
    summary: 'Guía completa para crear tu primera rutina de skincare'
  },
  {
    title: 'Los Beneficios del Ácido Hialurónico',
    content: 'El ácido hialurónico es uno de los ingredientes más populares en el mundo del skincare. Descubre por qué es tan efectivo para la hidratación y cómo incorporarlo en tu rutina diaria.',
    author: 'Dra. María González',
    summary: 'Todo lo que necesitas saber sobre el ácido hialurónico'
  },
  {
    title: 'Tratamientos Estéticos para el Verano',
    content: 'Prepara tu piel para el verano con estos tratamientos estéticos recomendados. Desde limpiezas profundas hasta tratamientos de hidratación, te ayudamos a lucir radiante.',
    author: 'Equipo Mariami',
    summary: 'Tratamientos ideales para preparar tu piel para el verano'
  }
];

const testAppointments = [
  {
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    phone: '11-1234-5678',
    date: '2024-01-20',
    time: '10:00',
    service: 'Limpieza Facial'
  },
  {
    name: 'María López',
    email: 'maria.lopez@email.com',
    phone: '11-9876-5432',
    date: '2024-01-21',
    time: '14:00',
    service: 'Tratamiento Corporal'
  }
];

// Función para agregar productos
async function addProducts() {
  console.log('🌱 Agregando productos de prueba...');
  
  for (const product of testProducts) {
    try {
      const response = await axios.post(`${BASE_URL}/products`, product, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token' // Para el servidor simple
        }
      });
      console.log(`✅ Producto agregado: ${product.name}`);
    } catch (error) {
      console.log(`❌ Error agregando producto ${product.name}:`, error.message);
    }
  }
}

// Función para agregar posts de blog
async function addBlogPosts() {
  console.log('📝 Agregando posts de blog...');
  
  for (const post of testBlogPosts) {
    try {
      const response = await axios.post(`${BASE_URL}/blog`, post, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token' // Para el servidor simple
        }
      });
      console.log(`✅ Post agregado: ${post.title}`);
    } catch (error) {
      console.log(`❌ Error agregando post ${post.title}:`, error.message);
    }
  }
}

// Función para agregar turnos
async function addAppointments() {
  console.log('📅 Agregando turnos de prueba...');
  
  for (const appointment of testAppointments) {
    try {
      const response = await axios.post(`${BASE_URL}/appointments`, appointment, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Turno agregado: ${appointment.name} - ${appointment.service}`);
    } catch (error) {
      console.log(`❌ Error agregando turno ${appointment.name}:`, error.message);
    }
  }
}

// Función principal
async function seedData() {
  console.log('🚀 Iniciando carga de datos de prueba...\n');
  
  try {
    await addProducts();
    console.log('');
    await addBlogPosts();
    console.log('');
    await addAppointments();
    console.log('');
    
    console.log('✅ Datos de prueba cargados exitosamente!');
    console.log('📝 Ahora puedes probar:');
    console.log('   - GET http://localhost:5000/api/products');
    console.log('   - GET http://localhost:5000/api/blog');
    console.log('   - GET http://localhost:5000/api/appointments');
    console.log('   - Formulario de turnos en el frontend');
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedData();
}

module.exports = { seedData }; 