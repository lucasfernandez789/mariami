'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { appointmentsAPI } from '../../../lib/api';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    date: '',
    service: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const serviceOptions = [
    { value: 'all', label: 'Todos los servicios' },
    { value: 'Limpieza Facial Profunda', label: 'Limpieza Facial Profunda' },
    { value: 'Tratamiento Anti-Aging', label: 'Tratamiento Anti-Aging' },
    { value: 'Consulta Dermatológica', label: 'Consulta Dermatológica' },
    { value: 'Tratamiento Corporal', label: 'Tratamiento Corporal' },
    { value: 'Peeling Químico', label: 'Peeling Químico' }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Verificar si el admin está logueado
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    if (!adminToken || !adminUser) {
      router.push('/admin/login');
      return;
    }

    try {
      setUser(JSON.parse(adminUser));
    } catch (error) {
      console.error('Error parsing admin user:', error);
      router.push('/admin/login');
      return;
    }

    // Cargar turnos
    fetchAppointments();
  }, [router, mounted]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsAPI.getAll();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleConfirm = async (appointmentId) => {
    try {
      await appointmentsAPI.confirm(appointmentId);
      alert('✅ Turno confirmado exitosamente');
      fetchAppointments();
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error: ' + error.message);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await appointmentsAPI.cancel(appointmentId);
      alert('✅ Turno cancelado exitosamente');
      fetchAppointments();
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error: ' + error.message);
    }
  };

  const handleDelete = async (appointmentId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este turno?')) {
      return;
    }

    try {
      await appointmentsAPI.delete(appointmentId);
      alert('✅ Turno eliminado exitosamente');
      fetchAppointments();
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error: ' + error.message);
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'cancelled':
        return 'Cancelado';
      case 'pending':
      default:
        return 'Pendiente';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  // Filtrar turnos
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filters.status === 'all' || appointment.status === filters.status;
    const matchesService = filters.service === 'all' || appointment.service === filters.service;
    const matchesDate = !filters.date || appointment.date === filters.date;
    const matchesSearch = !searchTerm || 
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesService && matchesDate && matchesSearch;
  });

  const getStats = () => {
    const total = appointments.length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;
    const pending = appointments.filter(a => !a.status || a.status === 'pending').length;

    return { total, confirmed, cancelled, pending };
  };

  const stats = getStats();

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando turnos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="text-pink-500 hover:text-pink-600 font-medium"
              >
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Turnos</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.name || user?.email}
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
        {/* Header de la página */}
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">📅 Gestión de Turnos</h2>
          <p className="text-base lg:text-lg text-gray-600">Administra y gestiona todos los turnos de los clientes</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmados</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">❌</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelados</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre, email o servicio..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Filtro por estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por servicio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Servicio
              </label>
              <select
                value={filters.service}
                onChange={(e) => setFilters(prev => ({ ...prev, service: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                {serviceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por fecha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Lista de turnos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Turnos ({filteredAppointments.length})
            </h3>
          </div>
          
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay turnos</h3>
              <p className="text-gray-600">No se encontraron turnos con los filtros aplicados</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{appointment.name}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusLabel(appointment.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Email:</span>
                          <span className="ml-2">{appointment.email}</span>
                        </div>
                        <div>
                          <span className="font-medium">Teléfono:</span>
                          <span className="ml-2">{appointment.phone}</span>
                        </div>
                        <div>
                          <span className="font-medium">Servicio:</span>
                          <span className="ml-2">{appointment.service}</span>
                        </div>
                        <div>
                          <span className="font-medium">Fecha:</span>
                          <span className="ml-2">{formatDate(appointment.date)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Hora: {formatTime(appointment.time)}</span>
                        {appointment.message && (
                          <span>Mensaje: {appointment.message}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleViewDetails(appointment)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Ver
                      </button>
                      
                      {(!appointment.status || appointment.status === 'pending') && (
                        <>
                          <button
                            onClick={() => handleConfirm(appointment.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Detalles del Turno</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                    <p className="text-lg font-semibold">{selectedAppointment.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                      {getStatusLabel(selectedAppointment.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <p className="text-gray-900">{selectedAppointment.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <p className="text-gray-900">{selectedAppointment.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Servicio</label>
                    <p className="text-gray-900">{selectedAppointment.service}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <p className="text-gray-900">{formatDate(selectedAppointment.date)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    <p className="text-gray-900">{formatTime(selectedAppointment.time)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Creado</label>
                    <p className="text-gray-900">{formatDate(selectedAppointment.createdAt)}</p>
                  </div>
                </div>

                {selectedAppointment.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAppointment.message}</p>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Cerrar
                </button>
                
                {(!selectedAppointment.status || selectedAppointment.status === 'pending') && (
                  <>
                    <button
                      onClick={() => {
                        handleConfirm(selectedAppointment.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                    >
                      Confirmar Turno
                    </button>
                    <button
                      onClick={() => {
                        handleCancel(selectedAppointment.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancelar Turno
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 