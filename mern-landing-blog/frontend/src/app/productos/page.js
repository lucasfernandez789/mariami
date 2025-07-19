'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { productsAPI } from '../../lib/api';

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  const categorias = [
    { id: 'todos', name: 'Todos' },
    { id: 'facial', name: 'Facial' },
    { id: 'corporal', name: 'Corporal' },
    { id: 'cabello', name: 'Cabello' },
    { id: 'maquillaje', name: 'Maquillaje' }
  ];

  // Cargar productos del backend
  useEffect(() => {
    setMounted(true);
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getAll();
        setProductos(data);
      } catch (err) {
        console.error('Error fetching productos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = selectedCategory === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === selectedCategory);

  // Mostrar los primeros 3 productos como destacados (temporal)
  const productosDestacados = productos.slice(0, 3);

  // Evitar hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <p className="text-gray-600">Asegúrate de que el backend esté corriendo en http://localhost:5000</p>
          </div>
        </div>
      </div>
    );
  }

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
            {productosDestacados.map((producto, index) => (
              <div
                key={producto._id || `producto-${index}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4">🌸</div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {producto.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {producto.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-pink-500">
                        ${producto.price}
                      </span>
                    </div>
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
              {categorias.map((categoria, index) => (
                <button
                  key={categoria.id || `categoria-${index}`}
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
            {productosFiltrados.map((producto, index) => (
              <div
                key={producto._id || `producto-${index}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">🌸</div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {producto.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {producto.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-pink-500">
                        ${producto.price}
                      </span>
                    </div>
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