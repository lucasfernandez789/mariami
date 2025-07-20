'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulación de login admin
      if (formData.email === 'admin@mariami.com' && formData.password === 'admin123') {
        // Guardar token en localStorage
        localStorage.setItem('adminToken', 'admin-jwt-token-123');
        localStorage.setItem('adminUser', JSON.stringify({
          id: 'admin-1',
          name: 'Admin Mariami',
          email: formData.email,
          role: 'admin'
        }));
        
        router.push('/admin/dashboard');
      } else {
        setError('Credenciales incorrectas. Usa: admin@mariami.com / admin123');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h2>
          <p className="text-gray-600">
            Inicia sesión para gestionar Mariami
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                placeholder="admin@mariami.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Credenciales de prueba: admin@mariami.com / admin123
              </p>
            </div>
          </form>
        </div>

        <div className="text-center">
          <Link 
            href="/"
            className="text-pink-600 hover:text-pink-500 text-sm font-medium"
          >
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  );
} 