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
      <section className="section-gradient-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              SERVICIOS
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra variedad de tratamientos profesionales para el cuidado de tu belleza y bienestar. Elige la categoría que más se adapte a tus necesidades y explora cada opción.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios por Categoría */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {servicios.map((categoria, categoriaIndex) => (
            <div key={categoriaIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-widest" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                  {categoria.categoria.toUpperCase()}
                </h2>
                <div className="w-24 h-1 bg-gray-900 mx-auto rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoria.servicios.map((servicio, servicioIndex) => (
                  <div
                    key={servicioIndex}
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-200"
                  >
                    <img
                      src="/vercel.svg"
                      alt={servicio.nombre}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      style={{ background: '#f5f5f5' }}
                    />
                    <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>{servicio.nombre}</h3>
                    <p className="text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>{servicio.descripcion}</p>
                    <span className="text-sm text-gray-500">Duración: {servicio.duracion}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
} 