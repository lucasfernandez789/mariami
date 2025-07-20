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
    status: 'confirmed',
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
    status: 'cancelled',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Cliente Test 3',
    email: 'cliente3@test.com',
    phone: '555555555',
    date: '2024-01-20',
    time: '09:00',
    service: 'Limpieza Facial',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Cliente Test 4',
    email: 'cliente4@test.com',
    phone: '666666666',
    date: '2024-01-20',
    time: '11:00',
    service: 'Tratamiento Corporal',
    createdAt: new Date().toISOString()
  }
];

// Almacenamiento para servicios
let services = [
  {
    id: '1',
    name: 'Limpieza Facial Profunda',
    description: 'Limpieza profunda con exfoliación y mascarilla hidratante',
    duration: 60,
    price: 2500,
    category: 'facial',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Tratamiento Anti-Aging',
    description: 'Tratamiento rejuvenecedor con ácido hialurónico y vitamina C',
    duration: 90,
    price: 3500,
    category: 'facial',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Consulta Dermatológica',
    description: 'Evaluación profesional de la piel y recomendaciones',
    duration: 45,
    price: 1800,
    category: 'consulta',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Tratamiento Corporal',
    description: 'Moldeado corporal con radiofrecuencia y masajes',
    duration: 120,
    price: 4200,
    category: 'corporal',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Peeling Químico',
    description: 'Renovación celular con ácidos específicos',
    duration: 75,
    price: 2800,
    category: 'facial',
    active: true,
    createdAt: new Date().toISOString()
  }
];

// Almacenamiento para productos
let products = [
  {
    id: '1',
    name: 'Crema Hidratante Facial',
    description: 'Hidratación profunda 24 horas con ácido hialurónico. Ideal para todo tipo de piel.',
    price: 45.00,
    category: 'facial',
    stock: 50,
    active: true,
    image: '/images/crema-hidratante.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Serum Anti-Aging',
    description: 'Rejuvenecimiento con vitamina C y retinol. Reduce líneas de expresión y manchas.',
    price: 75.00,
    category: 'facial',
    stock: 30,
    active: true,
    image: '/images/serum-antiaging.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Aceite Corporal Nutritivo',
    description: 'Nutrición profunda para piel seca y sensible. Con aceites esenciales naturales.',
    price: 35.00,
    category: 'corporal',
    stock: 40,
    active: true,
    image: '/images/aceite-corporal.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Mascarilla Facial Purificante',
    description: 'Purificación y exfoliación suave. Elimina impurezas y renueva la piel.',
    price: 25.00,
    category: 'facial',
    stock: 60,
    active: true,
    image: '/images/mascarilla-purificante.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Protector Solar SPF 50',
    description: 'Protección solar de amplio espectro. Hidratante y no comedogénico.',
    price: 55.00,
    category: 'proteccion',
    stock: 25,
    active: true,
    image: '/images/protector-solar.jpg',
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

// PUT para actualizar turno (confirmar/cancelar)
app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  console.log('🔄 Actualizando turno:', { id, status });
  
  if (!status) {
    return res.status(400).json({ 
      message: 'Status es requerido',
      required: ['status'],
      received: { status }
    });
  }

  // Buscar el turno en memoria
  const appointmentIndex = appointments.findIndex(apt => apt.id === id);
  
  if (appointmentIndex === -1) {
    return res.status(404).json({ 
      message: 'Turno no encontrado',
      id 
    });
  }

  // Actualizar el status del turno
  appointments[appointmentIndex] = {
    ...appointments[appointmentIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  
  console.log('✅ Turno actualizado:', appointments[appointmentIndex]);

  res.json({
    message: `Turno ${status === 'confirmed' ? 'confirmado' : 'cancelado'} exitosamente`,
    appointment: appointments[appointmentIndex]
  });
});

// DELETE para eliminar turno
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  
  console.log('🗑️ Eliminando turno:', { id });
  
  // Buscar el turno en memoria
  const appointmentIndex = appointments.findIndex(apt => apt.id === id);
  
  if (appointmentIndex === -1) {
    return res.status(404).json({ 
      message: 'Turno no encontrado',
      id 
    });
  }

  // Eliminar el turno
  const deletedAppointment = appointments.splice(appointmentIndex, 1)[0];
  
  console.log('✅ Turno eliminado. Total de turnos:', appointments.length);

  res.json({
    message: 'Turno eliminado exitosamente',
    appointment: deletedAppointment
  });
});

// ===== ENDPOINTS PARA SERVICIOS =====

// GET para obtener todos los servicios
app.get('/api/services', (req, res) => {
  console.log('📋 Obteniendo servicios...');
  res.json(services);
});

// GET para obtener un servicio por ID
app.get('/api/services/:id', (req, res) => {
  const { id } = req.params;
  
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return res.status(404).json({ 
      message: 'Servicio no encontrado',
      id 
    });
  }
  
  res.json(service);
});

// POST para crear un nuevo servicio
app.post('/api/services', (req, res) => {
  const { name, description, duration, price, category } = req.body;
  
  console.log('➕ Creando nuevo servicio:', { name, description, duration, price, category });
  
  if (!name || !description || !duration || !price || !category) {
    return res.status(400).json({ 
      message: 'Todos los campos son requeridos',
      required: ['name', 'description', 'duration', 'price', 'category'],
      received: { name, description, duration, price, category }
    });
  }

  const newService = {
    id: `service-${Date.now()}`,
    name,
    description,
    duration: parseInt(duration),
    price: parseFloat(price),
    category,
    active: true,
    createdAt: new Date().toISOString()
  };

  services.push(newService);
  
  console.log('✅ Servicio creado. Total de servicios:', services.length);

  res.status(201).json({
    message: 'Servicio creado exitosamente',
    service: newService
  });
});

// PUT para actualizar un servicio
app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, duration, price, category, active } = req.body;
  
  console.log('🔄 Actualizando servicio:', { id, name, description, duration, price, category, active });
  
  const serviceIndex = services.findIndex(s => s.id === id);
  
  if (serviceIndex === -1) {
    return res.status(404).json({ 
      message: 'Servicio no encontrado',
      id 
    });
  }

  services[serviceIndex] = {
    ...services[serviceIndex],
    name: name || services[serviceIndex].name,
    description: description || services[serviceIndex].description,
    duration: duration ? parseInt(duration) : services[serviceIndex].duration,
    price: price ? parseFloat(price) : services[serviceIndex].price,
    category: category || services[serviceIndex].category,
    active: active !== undefined ? active : services[serviceIndex].active,
    updatedAt: new Date().toISOString()
  };
  
  console.log('✅ Servicio actualizado:', services[serviceIndex]);

  res.json({
    message: 'Servicio actualizado exitosamente',
    service: services[serviceIndex]
  });
});

// DELETE para eliminar un servicio
app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  
  console.log('🗑️ Eliminando servicio:', { id });
  
  const serviceIndex = services.findIndex(s => s.id === id);
  
  if (serviceIndex === -1) {
    return res.status(404).json({ 
      message: 'Servicio no encontrado',
      id 
    });
  }

  const deletedService = services.splice(serviceIndex, 1)[0];
  
  console.log('✅ Servicio eliminado. Total de servicios:', services.length);

  res.json({
    message: 'Servicio eliminado exitosamente',
    service: deletedService
  });
});

// ===== ENDPOINTS PARA PRODUCTOS =====

// GET para obtener todos los productos
app.get('/api/products', (req, res) => {
  console.log('🛍️ Obteniendo productos...');
  res.json(products);
});

// GET para obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ 
      message: 'Producto no encontrado',
      id 
    });
  }
  
  res.json(product);
});

// POST para crear un nuevo producto
app.post('/api/products', (req, res) => {
  const { name, description, price, category, stock, image } = req.body;
  
  console.log('➕ Creando nuevo producto:', { name, description, price, category, stock });
  
  if (!name || !description || !price || !category || stock === undefined) {
    return res.status(400).json({ 
      message: 'Todos los campos son requeridos',
      required: ['name', 'description', 'price', 'category', 'stock'],
      received: { name, description, price, category, stock, image }
    });
  }

  const newProduct = {
    id: `product-${Date.now()}`,
    name,
    description,
    price: parseFloat(price),
    category,
    stock: parseInt(stock),
    image: image || '/images/default-product.jpg',
    active: true,
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  
  console.log('✅ Producto creado. Total de productos:', products.length);

  res.status(201).json({
    message: 'Producto creado exitosamente',
    product: newProduct
  });
});

// PUT para actualizar un producto
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock, image, active } = req.body;
  
  console.log('🔄 Actualizando producto:', { id, name, description, price, category, stock, active });
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ 
      message: 'Producto no encontrado',
      id 
    });
  }

  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    description: description || products[productIndex].description,
    price: price ? parseFloat(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    stock: stock !== undefined ? parseInt(stock) : products[productIndex].stock,
    image: image || products[productIndex].image,
    active: active !== undefined ? active : products[productIndex].active,
    updatedAt: new Date().toISOString()
  };
  
  console.log('✅ Producto actualizado:', products[productIndex]);

  res.json({
    message: 'Producto actualizado exitosamente',
    product: products[productIndex]
  });
});

// DELETE para eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  console.log('🗑️ Eliminando producto:', { id });
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ 
      message: 'Producto no encontrado',
      id 
    });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];
  
  console.log('✅ Producto eliminado. Total de productos:', products.length);

  res.json({
    message: 'Producto eliminado exitosamente',
    product: deletedProduct
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
  console.log('   - GET  http://localhost:5000/api/services');
  console.log('   - POST http://localhost:5000/api/users/register');
  console.log('   - POST http://localhost:5000/api/users/login');
  console.log('   - POST http://localhost:5000/api/appointments');
  console.log('   - POST http://localhost:5000/api/services');
  console.log('   - POST http://localhost:5000/api/products');
  console.log('   - PUT  http://localhost:5000/api/appointments/:id (confirmar/cancelar)');
  console.log('   - PUT  http://localhost:5000/api/services/:id');
  console.log('   - PUT  http://localhost:5000/api/products/:id');
  console.log('   - DELETE http://localhost:5000/api/appointments/:id');
  console.log('   - DELETE http://localhost:5000/api/services/:id');
  console.log('   - DELETE http://localhost:5000/api/products/:id');
  console.log('');
  console.log('✅ Este servidor NO requiere base de datos');
  console.log('✅ Todas las respuestas son simuladas');
  console.log('✅ Perfecto para testing de frontend');
  console.log('✅ Nuevos endpoints para gestión de turnos, servicios y productos');
}); 