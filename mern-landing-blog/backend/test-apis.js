// Script para testear todas las APIs del backend
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Colores para console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Función para hacer requests
async function testAPI(method, endpoint, data = null, token = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status 
    };
  }
}

// Función para imprimir resultados
function printResult(testName, result) {
  if (result.success) {
    console.log(`${colors.green}✅ ${testName}${colors.reset}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Data: ${JSON.stringify(result.data, null, 2)}`);
  } else {
    console.log(`${colors.red}❌ ${testName}${colors.reset}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Error: ${JSON.stringify(result.error, null, 2)}`);
  }
  console.log('');
}

// Tests
async function runTests() {
  console.log(`${colors.blue}🚀 Iniciando tests de APIs...${colors.reset}\n`);

  // Test 1: Ruta principal
  console.log(`${colors.yellow}📝 Test 1: Ruta principal${colors.reset}`);
  const mainResult = await testAPI('GET', '/');
  printResult('GET /', mainResult);

  // Test 2: Registrar usuario
  console.log(`${colors.yellow}📝 Test 2: Registrar usuario${colors.reset}`);
  const registerData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };
  const registerResult = await testAPI('POST', '/users/register', registerData);
  printResult('POST /users/register', registerResult);

  // Test 3: Login usuario
  console.log(`${colors.yellow}📝 Test 3: Login usuario${colors.reset}`);
  const loginData = {
    email: 'test@example.com',
    password: 'password123'
  };
  const loginResult = await testAPI('POST', '/users/login', loginData);
  printResult('POST /users/login', loginResult);

  let token = null;
  if (loginResult.success && loginResult.data.token) {
    token = loginResult.data.token;
    console.log(`${colors.green}🔑 Token obtenido: ${token.substring(0, 20)}...${colors.reset}\n`);
  }

  // Test 4: Crear producto (con token)
  console.log(`${colors.yellow}📝 Test 4: Crear producto${colors.reset}`);
  const productData = {
    name: 'Producto Test',
    price: 99.99,
    description: 'Descripción del producto test'
  };
  const productResult = await testAPI('POST', '/products', productData, token);
  printResult('POST /products', productResult);

  // Test 5: Obtener productos
  console.log(`${colors.yellow}📝 Test 5: Obtener productos${colors.reset}`);
  const getProductsResult = await testAPI('GET', '/products');
  printResult('GET /products', getProductsResult);

  // Test 6: Crear post de blog (con token)
  console.log(`${colors.yellow}📝 Test 6: Crear post de blog${colors.reset}`);
  const blogData = {
    title: 'Post Test',
    content: 'Contenido del post test',
    author: 'Test User'
  };
  const blogResult = await testAPI('POST', '/blog', blogData, token);
  printResult('POST /blog', blogResult);

  // Test 7: Obtener posts de blog
  console.log(`${colors.yellow}📝 Test 7: Obtener posts de blog${colors.reset}`);
  const getBlogResult = await testAPI('GET', '/blog');
  printResult('GET /blog', getBlogResult);

  // Test 8: Crear turno
  console.log(`${colors.yellow}📝 Test 8: Crear turno${colors.reset}`);
  const appointmentData = {
    name: 'Cliente Test',
    email: 'cliente@example.com',
    phone: '123456789',
    date: '2024-01-15',
    time: '10:00',
    service: 'Consulta general'
  };
  const appointmentResult = await testAPI('POST', '/appointments', appointmentData);
  printResult('POST /appointments', appointmentResult);

  // Test 9: Obtener turnos
  console.log(`${colors.yellow}📝 Test 9: Obtener turnos${colors.reset}`);
  const getAppointmentsResult = await testAPI('GET', '/appointments');
  printResult('GET /appointments', getAppointmentsResult);

  console.log(`${colors.blue}🎉 Tests completados!${colors.reset}`);
}

// Ejecutar tests
runTests().catch(console.error); 