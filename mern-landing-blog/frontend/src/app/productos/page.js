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
  const [search, setSearch] = useState("");

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

  // Filtrado por búsqueda y categoría
  const productosFiltrados = productos.filter((producto) => {
    const matchCategoria = selectedCategory === 'todos' || producto.category === selectedCategory;
    const matchSearch =
      producto.name.toLowerCase().includes(search.toLowerCase()) ||
      producto.description.toLowerCase().includes(search.toLowerCase());
    return matchCategoria && matchSearch;
  });

  // Mostrar los primeros 3 productos como destacados (temporal)
  const productosDestacados = productos.slice(0, 3);

  // Evitar hydration mismatch y renderizar productos solo en cliente
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
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

  // Función para limitar la cantidad de palabras en la descripción
  function limitarDescripcion(texto, maxPalabras = 15) {
    const palabras = texto.split(' ');
    return palabras.length > maxPalabras
      ? palabras.slice(0, maxPalabras).join(' ') + '...'
      : texto;
  }

  // Render principal solo cuando mounted, !loading y !error
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 section-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              PRODUCTOS DE BELLEZA
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra selección de productos premium para el cuidado de tu piel, 
              cabello y maquillaje. Calidad profesional para tu rutina de belleza.
            </p>
          </div>
        </div>
      </section>

      {/* Buscador y Filtros */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200 text-gray-900 bg-white"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            />
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              {categorias.map((categoria, index) => (
                <button
                  key={categoria.id || `categoria-${index}`}
                  onClick={() => setSelectedCategory(categoria.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                    selectedCategory === categoria.id
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  {categoria.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados y Catálogo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map((producto, index) => (
              <div
                key={producto.id || `producto-${index}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex flex-col items-center flex-1">
                  <img
                    src="/vercel.svg"
                    alt={producto.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    style={{ background: '#f5f5f5' }}
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>{producto.name}</h3>
                  <p className="text-gray-700 mb-2 text-center" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                    {limitarDescripcion(producto.description)}
                  </p>
                  <span className="text-sm text-gray-500 mb-2">Stock: {producto.stock}</span>
                  <span className="text-xl font-bold text-gray-900 mb-4">${producto.price}</span>
                  <div className="mt-auto w-full">
                    <button className="w-full bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 