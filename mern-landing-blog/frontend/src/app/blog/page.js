'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Importar componentes de manera dinámica
const Navbar = dynamic(() => import('../../components/layout/Navbar'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white shadow-sm"></div>
});

const Footer = dynamic(() => import('../../components/layout/Footer'), {
  ssr: true,
  loading: () => <div className="h-32 bg-gray-900"></div>
});

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorias = [
    { id: 'todos', name: 'Todos' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'tratamientos', name: 'Tratamientos' },
    { id: 'consejos', name: 'Consejos' },
    { id: 'tendencias', name: 'Tendencias' }
  ];

  // Cargar posts del backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/blog');
        if (!response.ok) {
          throw new Error('Error al cargar los posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filtrar posts por categoría
  const postsFiltrados = selectedCategory === 'todos' 
    ? posts 
    : posts.filter(post => post.categoria === selectedCategory);

  // Posts destacados (los primeros 2 por ahora)
  const postsDestacados = posts.slice(0, 2);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando artículos...</p>
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
              Blog de Belleza
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre consejos, tendencias y todo lo que necesitas saber sobre belleza, 
              tratamientos estéticos y cuidado de la piel.
            </p>
          </div>
        </div>
      </section>

      {/* Artículos Destacados */}
      {postsDestacados.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Artículos Destacados
              </h2>
              <p className="text-xl text-gray-600">
                Los artículos más populares y recomendados por nuestras lectoras.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {postsDestacados.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">🌸</div>
                      <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                        Destacado
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{post.author || 'Equipo Mariami'}</span>
                      <span>{post.readingTime || '5 min'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {formatDate(post.date)}
                      </span>
                      <Link
                        href={`/blog/${post._id}`}
                        className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filtros y Catálogo */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Todos los Artículos
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explora nuestro contenido organizado por categorías.
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
          
          {/* Grid de Artículos */}
          {postsFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postsFiltrados.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">🌸</div>
                      <span className="text-xs text-gray-500">
                        {post.readingTime || '5 min'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{post.author || 'Equipo Mariami'}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    
                    <Link
                      href={`/blog/${post._id}`}
                      className="text-pink-500 hover:text-pink-600 font-medium text-sm transition-colors duration-200"
                    >
                      Leer más →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {selectedCategory === 'todos' 
                  ? 'No hay artículos disponibles en este momento.'
                  : `No hay artículos en la categoría "${categorias.find(c => c.id === selectedCategory)?.name}".`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Suscríbete a Nuestro Blog
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Recibe los mejores consejos de belleza y las últimas tendencias directamente en tu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
            />
            <button className="bg-white text-pink-500 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 