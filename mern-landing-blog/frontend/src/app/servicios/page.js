import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';

export default function ServiciosPage() {
  const servicios = [
    {
      categoria: 'Tratamientos Faciales',
      servicios: [
        {
          nombre: 'Limpieza Facial Profunda',
          descripcion: 'Limpieza completa con exfoliación, extracción de impurezas e hidratación profunda.',
          duracion: '45 min',
          precio: '$50',
          icono: '🌸'
        },
        {
          nombre: 'Tratamiento Anti-Aging',
          descripcion: 'Rejuvenecimiento facial con productos premium y técnicas avanzadas.',
          duracion: '60 min',
          precio: '$80',
          icono: '✨'
        },
        {
          nombre: 'Hidratación Intensa',
          descripcion: 'Tratamiento de hidratación profunda para pieles secas y deshidratadas.',
          duracion: '45 min',
          precio: '$60',
          icono: '💧'
        }
      ]
    },
    {
      categoria: 'Tratamientos Corporales',
      servicios: [
        {
          nombre: 'Moldeado Corporal',
          descripcion: 'Tratamiento para reducir celulitis y tonificar el cuerpo.',
          duracion: '90 min',
          precio: '$120',
          icono: '💪'
        },
        {
          nombre: 'Masaje Relajante',
          descripcion: 'Masaje completo para aliviar tensiones y promover la relajación.',
          duracion: '60 min',
          precio: '$70',
          icono: '🧘‍♀️'
        },
        {
          nombre: 'Tratamiento Reductor',
          descripcion: 'Técnicas especializadas para reducir medidas y tonificar.',
          duracion: '75 min',
          precio: '$100',
          icono: '🎯'
        }
      ]
    },
    {
      categoria: 'Depilación',
      servicios: [
        {
          nombre: 'Depilación Láser Piernas',
          descripcion: 'Depilación definitiva con tecnología láser avanzada.',
          duracion: '45 min',
          precio: '$150',
          icono: '⚡'
        },
        {
          nombre: 'Depilación Láser Axilas',
          descripcion: 'Depilación definitiva de axilas con láser.',
          duracion: '20 min',
          precio: '$80',
          icono: '⚡'
        },
        {
          nombre: 'Depilación Cera',
          descripcion: 'Depilación tradicional con cera caliente o fría.',
          duracion: '30 min',
          precio: '$40',
          icono: '🕯️'
        }
      ]
    },
    {
      categoria: 'Manicuría y Pedicuría',
      servicios: [
        {
          nombre: 'Manicuría Completa',
          descripcion: 'Corte, limado, cutículas y esmaltado semipermanente.',
          duracion: '45 min',
          precio: '$45',
          icono: '💅'
        },
        {
          nombre: 'Pedicuría Completa',
          descripcion: 'Tratamiento completo de pies con masaje relajante.',
          duracion: '60 min',
          precio: '$55',
          icono: '🦶'
        },
        {
          nombre: 'Esmaltado Semipermanente',
          descripcion: 'Esmaltado de larga duración con diseño a elección.',
          duracion: '30 min',
          precio: '$35',
          icono: '🎨'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra amplia gama de tratamientos profesionales diseñados para realzar tu belleza natural 
              y promover tu bienestar integral.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios por Categoría */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {servicios.map((categoria, categoriaIndex) => (
            <div key={categoriaIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {categoria.categoria}
                </h2>
                <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoria.servicios.map((servicio, servicioIndex) => (
                  <div
                    key={servicioIndex}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{servicio.icono}</div>
                        <span className="text-pink-500 font-semibold text-lg">
                          {servicio.precio}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {servicio.nombre}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {servicio.descripcion}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Duración: {servicio.duracion}
                        </span>
                        <Link
                          href="/turnos"
                          className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200"
                        >
                          Reservar →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Contáctanos para consultas personalizadas o tratamientos especiales. 
            Estamos aquí para ayudarte a encontrar el tratamiento perfecto para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/turnos"
              className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Reservar Turno
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-white text-white hover:bg-white hover:text-pink-500 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Profesionales Certificadas
              </h3>
              <p className="text-gray-600">
                Nuestro equipo cuenta con certificaciones y formación continua en las últimas técnicas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Productos Premium
              </h3>
              <p className="text-gray-600">
                Utilizamos productos de alta calidad y marcas reconocidas internacionalmente.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ambiente Relajante
              </h3>
              <p className="text-gray-600">
                Disfruta de un ambiente tranquilo y acogedor diseñado para tu comodidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 