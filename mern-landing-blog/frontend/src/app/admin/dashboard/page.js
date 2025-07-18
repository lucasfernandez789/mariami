'use client';

import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const stats = [
    { name: 'Citas Hoy', value: '12', change: '+2', changeType: 'positive' },
    { name: 'Citas Pendientes', value: '8', change: '-1', changeType: 'negative' },
    { name: 'Ingresos del Mes', value: '$15,420', change: '+12%', changeType: 'positive' },
    { name: 'Clientes Nuevos', value: '24', change: '+8', changeType: 'positive' },
  ];

  const quickActions = [
    {
      name: 'Gestionar Servicios',
      description: 'Agregar, editar o eliminar servicios',
      href: '/admin/services',
      icon: '🌸',
      color: 'bg-pink-500'
    },
    {
      name: 'Ver Citas',
      description: 'Revisar y gestionar citas',
      href: '/admin/appointments',
      icon: '📅',
      color: 'bg-blue-500'
    },
    {
      name: 'Gestionar Productos',
      description: 'Administrar catálogo de productos',
      href: '/admin/products',
      icon: '💄',
      color: 'bg-purple-500'
    },
    {
      name: 'Blog',
      description: 'Crear y editar artículos',
      href: '/admin/blog',
      icon: '✍️',
      color: 'bg-green-500'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Bienvenido, {user?.displayName || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Estadísticas */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del Negocio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <Link key={action.name} href={action.href}>
                  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${action.color} text-white mr-4`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{action.name}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Citas Recientes */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Citas Recientes</h2>
            </div>
            <div className="p-6">
              <div className="text-center text-gray-500 py-8">
                <p>No hay citas recientes para mostrar</p>
                <Link 
                  href="/admin/appointments"
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  Ver todas las citas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 