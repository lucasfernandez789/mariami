import dynamic from 'next/dynamic';
import Link from 'next/link';

// Importar componentes de manera dinámica para evitar problemas de hidratación
const Navbar = dynamic(() => import('../components/layout/Navbar'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white shadow-sm"></div>
});

const Footer = dynamic(() => import('../components/layout/Footer'), {
  ssr: true,
  loading: () => <div className="h-32 bg-gray-900"></div>
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Mariami
              <span className="block text-pink-500">Centro de Estética</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Descubre tu belleza natural con nuestros tratamientos especializados 
              y profesionales expertos en estética facial y corporal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/turnos">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
                  Reservar Cita
                </button>
              </Link>
              <Link href="/servicios">
                <button className="bg-white hover:bg-gray-50 text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
                  Ver Servicios
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de tratamientos estéticos para cuidar tu belleza 
              y bienestar integral.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tratamientos Faciales</h3>
              <p className="text-gray-600 mb-6">
                Limpiezas profundas, hidratación, anti-aging y tratamientos específicos 
                para cada tipo de piel.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Limpieza facial profunda</li>
                <li>• Hidratación intensiva</li>
                <li>• Tratamientos anti-aging</li>
                <li>• Peeling químico</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tratamientos Corporales</h3>
              <p className="text-gray-600 mb-6">
                Moldeado corporal, reducción de celulitis, tonificación y tratamientos 
                para mejorar la textura de la piel.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Moldeado corporal</li>
                <li>• Reducción de celulitis</li>
                <li>• Tonificación muscular</li>
                <li>• Drenaje linfático</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">💄</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Depilación</h3>
              <p className="text-gray-600 mb-6">
                Depilación láser, cera y otros métodos para una piel suave y sin vello 
                no deseado.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Depilación láser</li>
                <li>• Depilación con cera</li>
                <li>• Tratamientos definitivos</li>
                <li>• Zonas específicas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Mariami?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Somos especialistas en belleza y bienestar con años de experiencia 
              y tecnología de vanguardia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Profesionales Expertos</h3>
              <p className="text-gray-600">Equipo capacitado y certificado en las últimas técnicas estéticas.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tecnología Avanzada</h3>
              <p className="text-gray-600">Equipos de última generación para resultados óptimos.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resultados Garantizados</h3>
              <p className="text-gray-600">Tratamientos efectivos con seguimiento personalizado.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Atención Personalizada</h3>
              <p className="text-gray-600">Cada tratamiento se adapta a tus necesidades específicas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Lista para descubrir tu belleza?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Agenda tu primera cita y recibe una consulta gratuita para evaluar 
            tus necesidades y crear un plan personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/turnos">
              <button className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
                Reservar Consulta Gratuita
              </button>
            </Link>
            <Link href="/contacto">
              <button className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-pink-500 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
                Ver Horarios
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}