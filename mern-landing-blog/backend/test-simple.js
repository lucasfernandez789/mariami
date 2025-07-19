// Servidor de prueba simple sin base de datos
const express = require('express');
const cors = require('cors');

const app = express();

// Almacenamiento en memoria para simular base de datos
let appointments = [
  {
    id: '1',
    name: 'Cliente Test 1',
    email: 'cliente1@test.com',
    phone: '123456789',
    date: '2024-01-15',
    time: '10:00',
    service: 'Consulta general',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Cliente Test 2',
    email: 'cliente2@test.com',
    phone: '987654321',
    date: '2024-01-16',
    time: '14:00',
    service: 'Consulta especializada',
    createdAt: new Date().toISOString()
  }
];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Mariami funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba para usuarios
app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      message: 'Todos los campos son requeridos',
      received: { name, email, password: password ? '***' : 'missing' }
    });
  }

  res.status(201).json({
    message: 'Usuario registrado exitosamente (simulado)',
    user: {
      id: 'test-user-id',
      name,
      email,
      role: 'user'
    },
    token: 'test-jwt-token-123'
  });
});

// Ruta de prueba para login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Email y contraseña son requeridos',
      received: { email, password: password ? '***' : 'missing' }
    });
  }

  res.status(200).json({
    message: 'Login exitoso (simulado)',
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email,
      role: 'user'
    },
    token: 'test-jwt-token-123'
  });
});

// Ruta de prueba para productos
app.get('/api/products', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Producto Test 1',
      price: 99.99,
      description: 'Descripción del producto test 1',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Producto Test 2',
      price: 149.99,
      description: 'Descripción del producto test 2',
      createdAt: new Date().toISOString()
    }
  ]);
});

// Ruta de prueba para blog
app.get('/api/blog', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Post Test 1',
      content: 'Contenido del post test 1',
      author: 'Test Author',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Post Test 2',
      content: 'Contenido del post test 2',
      author: 'Test Author',
      createdAt: new Date().toISOString()
    }
  ]);
});

// Ruta de prueba para turnos
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

// POST para crear turno
app.post('/api/appointments', (req, res) => {
  const { name, email, phone, date, time, service, message } = req.body;
  
  console.log('📝 Nuevo turno recibido:', { name, email, phone, date, time, service, message });
  
  if (!name || !email || !date || !time || !service) {
    return res.status(400).json({ 
      message: 'Campos requeridos faltantes',
      required: ['name', 'email', 'date', 'time', 'service'],
      received: { name, email, phone, date, time, service, message }
    });
  }

  // Crear nuevo turno
  const newAppointment = {
    id: `appointment-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    date,
    time,
    service,
    message: message || '',
    createdAt: new Date().toISOString()
  };

  // Agregar a la lista en memoria
  appointments.push(newAppointment);
  
  console.log('✅ Turno guardado. Total de turnos:', appointments.length);

  res.status(201).json({
    message: 'Turno creado exitosamente',
    appointment: newAppointment
  });
});

// POST para crear producto
app.post('/api/products', (req, res) => {
  const { name, price, description } = req.body;
  
  if (!name || !price || !description) {
    return res.status(400).json({ 
      message: 'Campos requeridos faltantes',
      required: ['name', 'price', 'description'],
      received: { name, price, description }
    });
  }

  res.status(201).json({
    message: 'Producto creado exitosamente (simulado)',
    product: {
      _id: `product-${Date.now()}`,
      name,
      price,
      description,
      createdAt: new Date().toISOString()
    }
  });
});

// POST para crear post de blog
app.post('/api/blog', (req, res) => {
  const { title, content, author, summary } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ 
      message: 'Campos requeridos faltantes',
      required: ['title', 'content', 'author'],
      received: { title, content, author, summary }
    });
  }

  res.status(201).json({
    message: 'Post creado exitosamente (simulado)',
    post: {
      _id: `post-${Date.now()}`,
      title,
      content,
      author,
      summary,
      createdAt: new Date().toISOString()
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log('🚀 Servidor de prueba SIMPLE iniciado en puerto', PORT);
  console.log('📝 Para probar la API:');
  console.log('   - GET  http://localhost:5000/');
  console.log('   - GET  http://localhost:5000/api/products');
  console.log('   - GET  http://localhost:5000/api/blog');
  console.log('   - GET  http://localhost:5000/api/appointments');
  console.log('   - POST http://localhost:5000/api/users/register');
  console.log('   - POST http://localhost:5000/api/users/login');
  console.log('   - POST http://localhost:5000/api/appointments');
  console.log('');
  console.log('✅ Este servidor NO requiere base de datos');
  console.log('✅ Todas las respuestas son simuladas');
  console.log('✅ Perfecto para testing de frontend');
}); 