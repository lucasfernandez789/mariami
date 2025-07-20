'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { appointmentsAPI } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

export default function TurnosPage() {
  const { user, login, isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    fecha: '',
    horario: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const servicios = [
    { id: 'facial', name: 'Tratamiento Facial', duration: '60 min' },
    { id: 'corporal', name: 'Tratamiento Corporal', duration: '90 min' },
    { id: 'depilacion', name: 'Depilación Definitiva', duration: '45 min' },
    { id: 'manicuria', name: 'Manicuría', duration: '30 min' },
    { id: 'pedicuria', name: 'Pedicuría', duration: '45 min' },
    { id: 'limpieza', name: 'Limpieza Facial', duration: '45 min' }
  ];

  const horarios = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Llenar automáticamente los datos del usuario cuando esté autenticado
  useEffect(() => {
    if (user && !formData.nombre) {
      setFormData(prev => ({
        ...prev,
        nombre: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user, formData.nombre]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Llamada a nuestro backend usando la API helper
      const appointmentData = {
        name: formData.nombre,
        email: formData.email,
        phone: formData.telefono,
        date: formData.fecha,
        time: formData.horario,
        service: formData.servicio,
        userId: user.uid // Agregar ID del usuario
      };

      await appointmentsAPI.create(appointmentData);
      
      setSubmitSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        servicio: '',
        fecha: '',
        horario: '',
        mensaje: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al enviar el formulario: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    try {
      await login();
      setShowLoginPrompt(false);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Reserva tu Turno
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Agenda tu cita online de forma fácil y rápida. Te confirmaremos tu turno por email.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario de Reserva */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Estado de autenticación */}
          {!loading && (
            <div className="mb-8">
              {isAuthenticated ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">Sesión iniciada</p>
                      <p className="text-green-600 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">ℹ</span>
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Inicia sesión para reservar tu turno</p>
                      <p className="text-blue-600 text-sm">Usa tu cuenta de Google para un proceso más rápido</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-900 mb-4">
                ¡Turno Reservado Exitosamente!
              </h2>
              <p className="text-green-700 mb-6">
                Hemos recibido tu solicitud. Te enviaremos una confirmación por email con los detalles de tu cita.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Reservar Otro Turno
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Personal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                {/* Servicio y Fecha */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                      Servicio *
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                    >
                      <option value="">Selecciona un servicio</option>
                      {servicios.map((servicio) => (
                        <option key={servicio.id} value={servicio.name}>
                          {servicio.name} ({servicio.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                      required
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-2">
                    Horario *
                  </label>
                  <select
                    id="horario"
                    name="horario"
                    value={formData.horario}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                  >
                    <option value="">Selecciona un horario</option>
                    {horarios.map((horario) => (
                      <option key={horario} value={horario}>
                        {horario}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200"
                    placeholder="Comentarios adicionales o preferencias especiales..."
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Información Importante:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Llega 10 minutos antes de tu cita</li>
                    <li>• Cancelaciones con 24 horas de anticipación</li>
                    <li>• Trae ropa cómoda para tratamientos corporales</li>
                    <li>• No uses maquillaje para tratamientos faciales</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
                </button>
              </form>
            </div>
          )}
        </div>
            </section>
      
      {/* Modal de Login */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h3>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔐</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Inicia sesión para continuar
                </h4>
                <p className="text-gray-600">
                  Necesitas iniciar sesión para reservar tu turno. Usa tu cuenta de Google para un proceso más rápido.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar con Google
                </button>
                
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
} 