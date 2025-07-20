// Configuración de APIs del backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Turnos
  APPOINTMENTS: `${API_BASE_URL}/appointments`,
  
  // Blog
  BLOG: `${API_BASE_URL}/blog`,
  
  // Productos
  PRODUCTS: `${API_BASE_URL}/products`,
  
  // Servicios
  SERVICES: `${API_BASE_URL}/services`,
  
  // Usuarios
  USERS: `${API_BASE_URL}/users`,
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
  
  // Ruta principal
  MAIN: `${API_BASE_URL.replace('/api', '')}`
};

// Función helper para hacer requests
export const apiRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Funciones específicas para cada endpoint
export const appointmentsAPI = {
  // Crear turno
  create: (data) => apiRequest(API_ENDPOINTS.APPOINTMENTS, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Obtener todos los turnos
  getAll: () => apiRequest(API_ENDPOINTS.APPOINTMENTS),
  
  // Obtener turno por ID
  getById: (id) => apiRequest(`${API_ENDPOINTS.APPOINTMENTS}/${id}`),
  
  // Actualizar turno
  update: (id, data) => apiRequest(`${API_ENDPOINTS.APPOINTMENTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Eliminar turno
  delete: (id) => apiRequest(`${API_ENDPOINTS.APPOINTMENTS}/${id}`, {
    method: 'DELETE',
  }),
  
  // Confirmar turno
  confirm: (id) => apiRequest(`${API_ENDPOINTS.APPOINTMENTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'confirmed' }),
  }),
  
  // Cancelar turno
  cancel: (id) => apiRequest(`${API_ENDPOINTS.APPOINTMENTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'cancelled' }),
  }),
};

export const blogAPI = {
  // Obtener todos los posts
  getAll: () => apiRequest(API_ENDPOINTS.BLOG),
  
  // Obtener post por ID
  getById: (id) => apiRequest(`${API_ENDPOINTS.BLOG}/${id}`),
  
  // Crear post
  create: (data, token) => apiRequest(API_ENDPOINTS.BLOG, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  // Actualizar post
  update: (id, data, token) => apiRequest(`${API_ENDPOINTS.BLOG}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  // Eliminar post
  delete: (id, token) => apiRequest(`${API_ENDPOINTS.BLOG}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

export const productsAPI = {
  // Obtener todos los productos
  getAll: () => apiRequest(API_ENDPOINTS.PRODUCTS),
  
  // Obtener producto por ID
  getById: (id) => apiRequest(`${API_ENDPOINTS.PRODUCTS}/${id}`),
  
  // Crear producto
  create: (data) => apiRequest(API_ENDPOINTS.PRODUCTS, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Actualizar producto
  update: (id, data) => apiRequest(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Eliminar producto
  delete: (id) => apiRequest(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
    method: 'DELETE',
  }),
};

export const servicesAPI = {
  // Obtener todos los servicios
  getAll: () => apiRequest(API_ENDPOINTS.SERVICES),
  
  // Obtener servicio por ID
  getById: (id) => apiRequest(`${API_ENDPOINTS.SERVICES}/${id}`),
  
  // Crear servicio
  create: (data) => apiRequest(API_ENDPOINTS.SERVICES, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Actualizar servicio
  update: (id, data) => apiRequest(`${API_ENDPOINTS.SERVICES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Eliminar servicio
  delete: (id) => apiRequest(`${API_ENDPOINTS.SERVICES}/${id}`, {
    method: 'DELETE',
  }),
};

export const usersAPI = {
  // Login
  login: (data) => apiRequest(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Registro
  register: (data) => apiRequest(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Obtener perfil
  getProfile: (token) => apiRequest(`${API_ENDPOINTS.USERS}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  // Actualizar perfil
  updateProfile: (data, token) => apiRequest(`${API_ENDPOINTS.USERS}/profile`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
}; 