'use client';

import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categorias = [
    { id: 'todos', name: 'Todos' },
    { id: 'facial', name: 'Facial' },
    { id: 'corporal', name: 'Corporal' },
    { id: 'cabello', name: 'Cabello' },
    { id: 'maquillaje', name: 'Maquillaje' }
  ];

  const productos = [
    {
      id: 1,
      nombre: 'Crema Hidratante Facial',
      descripcion: 'Hidratación profunda 24 horas con ácido hialurónico',
      precio: 45.00,
      precioOriginal: 60.00,
      categoria: 'facial',
      imagen: '🌸',
      stock: 15,
      destacado: true
    },
    {
      id: 2,
      nombre: 'Serum Anti-Aging',
      descripcion: 'Rejuvenecimiento con vitamina C y retinol',
      precio: 75.00,
      precioOriginal: 90.00,
      categoria: 'facial',
      imagen: '✨',
      stock: 8,
      destacado: true
    },
    {
      id: 3,
      nombre: 'Aceite Corporal Nutritivo',
      descripcion: 'Nutrición profunda para piel seca y sensible',
      precio: 35.00,
      precioOriginal: 45.00,
      categoria: 'corporal',
      imagen: '💧',
      stock: 12,
      destacado: false
    },
    {
      id: 4,
      nombre: 'Shampoo Profesional',
      descripcion: 'Limpieza suave y reparación del cabello',
      precio: 28.00,
      precioOriginal: 35.00,
      categoria: 'cabello',
      imagen: '🧴',
      stock: 20,
      destacado: false
    },
    {
      id: 5,
      nombre: 'Base de Maquillaje',
      descripcion: 'Cobertura natural y larga duración',
      precio: 55.00,
      precioOriginal: 70.00,
      categoria: 'maquillaje',
      imagen: '💄',
      stock: 10,
      destacado: true
    },
    {
      id: 6,
      nombre: 'Mascarilla Facial',
      descripcion: 'Purificación y exfoliación suave',
      precio: 25.00,
      precioOriginal: 30.00,
      categoria: 'facial',
      imagen: '🧖‍♀️',
      stock: 18,
      destacado: false
    }
  ];

  const productosFiltrados = selectedCategory === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === selectedCategory);

  const productosDestacados = productos.filter(producto => producto.destacado);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Productos de Belleza
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra selección de productos premium para el cuidado de tu piel, 
              cabello y maquillaje. Calidad profesional para tu rutina de belleza.
            </p>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600">
              Los productos más populares y recomendados por nuestras clientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosDestacados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4">{producto.imagen}</div>
                    {producto.precioOriginal > producto.precio && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                        -{Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {producto.nombre}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {producto.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-pink-500">
                        ${producto.precio}
                      </span>
                      {producto.precioOriginal > producto.precio && (
                        <span className="text-gray-400 line-through ml-2">
                          ${producto.precioOriginal}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      Stock: {producto.stock}
                    </span>
                  </div>
                  
                  <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros y Catálogo */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Catálogo Completo
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explora todos nuestros productos organizados por categorías.
            </p>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => setSelectedCategory(categoria.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                    selectedCategory === categoria.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
                  }`}
                >
                  {categoria.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Grid de Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{producto.imagen}</div>
                    {producto.precioOriginal > producto.precio && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                        Oferta
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {producto.nombre}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {producto.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-pink-500">
                        ${producto.precio}
                      </span>
                      {producto.precioOriginal > producto.precio && (
                        <span className="text-gray-400 line-through ml-2 text-sm">
                          ${producto.precioOriginal}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {producto.stock} disponibles
                    </span>
                  </div>
                  
                  <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Necesitas asesoramiento?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Nuestras profesionales pueden ayudarte a elegir los productos perfectos 
            para tu tipo de piel y necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg">
              Consultar Productos
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-pink-500 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200">
              Ver Tratamientos
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 