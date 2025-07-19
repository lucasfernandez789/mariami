'use client';

import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { appointmentsAPI } from '../../lib/api';

export default function TurnosPage() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Llamada a nuestro backend usando la API helper
      const appointmentData = {
        name: formData.nombre,
        email: formData.email,
        phone: formData.telefono,
        date: formData.fecha,
        time: formData.horario,
        service: formData.servicio
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

      <Footer />
    </div>
  );
} 