'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { appointmentsAPI } from '../../../lib/api';

export default function AdminCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
  }, [router]);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Filtrar turnos para la fecha seleccionada
    const appointmentsForDate = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });
    setSelectedAppointments(appointmentsForDate);
    
    // Mostrar modal si hay turnos
    if (appointmentsForDate.length > 0) {
      setShowModal(true);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (date) => {
    const appointmentDate = new Date(date);
    const now = new Date();
    
    if (appointmentDate < now) {
      return 'bg-gray-100 text-gray-800'; // Pasado
    } else if (appointmentDate.toDateString() === now.toDateString()) {
      return 'bg-yellow-100 text-yellow-800'; // Hoy
    } else {
      return 'bg-green-100 text-green-800'; // Futuro
    }
  };

  const getStatusText = (date) => {
    const appointmentDate = new Date(date);
    const now = new Date();
    
    if (appointmentDate < now) {
      return 'Completado';
    } else if (appointmentDate.toDateString() === now.toDateString()) {
      return 'Hoy';
    } else {
      return 'Pendiente';
    }
  };

  // Función para personalizar el tile del calendario
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const appointmentsForDate = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });

    if (appointmentsForDate.length === 0) return null;

    return (
      <div className="absolute bottom-1 right-1">
        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
      </div>
    );
  };

  const handleConfirmAppointment = (appointmentId) => {
    // Aquí iría la lógica para confirmar el turno
    console.log('Confirmando turno:', appointmentId);
    alert('Función de confirmación en desarrollo');
  };

  const handleCancelAppointment = (appointmentId) => {
    // Aquí iría la lógica para cancelar el turno
    console.log('Cancelando turno:', appointmentId);
    alert('Función de cancelación en desarrollo');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando calendario...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Calendario de Turnos</h1>
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
        {/* Calendario Principal */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">📅 Calendario de Turnos</h2>
              <p className="text-base lg:text-lg text-gray-600">Selecciona un día para ver los turnos programados</p>
            </div>
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-4 h-4 lg:w-5 lg:h-5 bg-pink-500 rounded-full shadow-sm"></div>
                <span className="text-sm lg:text-base font-medium text-gray-700">Días con turnos</span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-4 h-4 lg:w-5 lg:h-5 bg-yellow-400 rounded-full shadow-sm"></div>
                <span className="text-sm lg:text-base font-medium text-gray-700">Hoy</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              className="w-full max-w-6xl lg:max-w-7xl text-lg lg:text-xl"
              tileClassName={({ date, view }) => {
                if (view !== 'month') return '';
                const appointmentsForDate = appointments.filter(apt => {
                  const aptDate = new Date(apt.date);
                  return aptDate.toDateString() === date.toDateString();
                });
                return appointmentsForDate.length > 0 ? 'bg-pink-50 border-pink-200' : '';
              }}
            />
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Turnos</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
              <div className="text-2xl">📅</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter(apt => new Date(apt.date) > new Date()).length}
                </p>
              </div>
              <div className="text-2xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Hoy</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {appointments.filter(apt => {
                    const aptDate = new Date(apt.date);
                    const today = new Date();
                    return aptDate.toDateString() === today.toDateString();
                  }).length}
                </p>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-gray-600">
                  {appointments.filter(apt => new Date(apt.date) < new Date()).length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
                 </div>
       </div>

       {/* Modal de Turnos */}
       {showModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
             <div className="p-6 border-b border-gray-200">
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-2xl font-bold text-gray-900">
                     Turnos del {selectedDate.toLocaleDateString('es-ES', {
                       weekday: 'long',
                       year: 'numeric',
                       month: 'long',
                       day: 'numeric'
                     })}
                   </h3>
                   <p className="text-gray-600 mt-1">
                     {selectedAppointments.length} turno{selectedAppointments.length !== 1 ? 's' : ''} programado{selectedAppointments.length !== 1 ? 's' : ''}
                   </p>
                 </div>
                 <button
                   onClick={() => setShowModal(false)}
                   className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                 >
                   ×
                 </button>
               </div>
             </div>
             
             <div className="p-6">
               <div className="space-y-4">
                 {selectedAppointments.map((appointment) => (
                   <div key={appointment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                     <div className="flex items-start justify-between mb-4">
                       <div className="flex-1">
                         <div className="flex items-center space-x-3 mb-2">
                           <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                             <span className="text-pink-600 font-semibold text-lg">
                               {appointment.name.charAt(0).toUpperCase()}
                             </span>
                           </div>
                           <div>
                             <h4 className="text-lg font-semibold text-gray-900">{appointment.name}</h4>
                             <p className="text-sm text-gray-600">{appointment.service}</p>
                           </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                           <div>
                             <p className="flex items-center mb-1">
                               <span className="mr-2">🕐</span>
                               <span className="font-medium">{formatTime(appointment.date)}</span>
                             </p>
                             <p className="flex items-center mb-1">
                               <span className="mr-2">📧</span>
                               <span>{appointment.email}</span>
                             </p>
                             {appointment.phone && (
                               <p className="flex items-center">
                                 <span className="mr-2">📞</span>
                                 <span>{appointment.phone}</span>
                               </p>
                             )}
                           </div>
                           <div>
                             <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.date)}`}>
                               {getStatusText(appointment.date)}
                             </span>
                           </div>
                         </div>
                         
                         {appointment.message && (
                           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                             <p className="text-sm text-gray-700 italic">
                               💬 "{appointment.message}"
                             </p>
                           </div>
                         )}
                       </div>
                     </div>
                     
                     <div className="flex space-x-3 pt-4 border-t border-gray-100">
                       <button
                         onClick={() => handleConfirmAppointment(appointment.id)}
                         className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                       >
                         <span className="mr-2">✅</span>
                         Confirmar Turno
                       </button>
                       <button
                         onClick={() => handleCancelAppointment(appointment.id)}
                         className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                       >
                         <span className="mr-2">❌</span>
                         Cancelar Turno
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 } 