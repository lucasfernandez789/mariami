'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.card-fade-up').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          card.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, system-ui, sans-serif', letterSpacing: '0.08em' }}>
              MARIAMI
              <span className="block text-gray-700 tracking-widest font-semibold">CENTRO DE ESTÉTICA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Descubre tu belleza natural con nuestros tratamientos especializados 
              y profesionales expertos en estética facial y corporal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/turnos">
                <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-md" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                  Reservar Cita
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              Servicios Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conocé los tratamientos más elegidos por nuestros clientes y descubrí cómo podemos ayudarte a realzar tu belleza natural.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center card-fade-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif', letterSpacing: '0.06em' }}>Tratamientos Faciales</h3>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
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
            <div className="bg-gray-100 rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center card-fade-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif', letterSpacing: '0.06em' }}>Tratamientos Corporales</h3>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
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
            <div className="bg-gray-100 rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center card-fade-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif', letterSpacing: '0.06em' }}>Depilación</h3>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
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
      <section className="py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif', letterSpacing: '0.08em' }}>
              ¿POR QUÉ ELEGIR MARIAMI?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              "La belleza es confianza, bienestar y cuidado. En Mariami, cada detalle está pensado para que te sientas única."
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gray-200 rounded-2xl p-8 border border-gray-300 flex flex-col items-center card-fade-up">
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>Profesionales Expertos</h3>
              <p className="text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                "Confía en manos capacitadas."
              </p>
              <span className="text-gray-500 text-sm">Especialistas certificados y en constante formación.</span>
            </div>
            <div className="text-center bg-gray-200 rounded-2xl p-8 border border-gray-300 flex flex-col items-center card-fade-up">
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>Tecnología Avanzada</h3>
              <p className="text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                "Innovación para tu bienestar."
              </p>
              <span className="text-gray-500 text-sm">Equipos y productos de última generación.</span>
            </div>
            <div className="text-center bg-gray-200 rounded-2xl p-8 border border-gray-300 flex flex-col items-center card-fade-up">
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>Resultados Garantizados</h3>
              <p className="text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                "Tu cambio, nuestra prioridad."
              </p>
              <span className="text-gray-500 text-sm">Seguimiento personalizado y logros visibles.</span>
            </div>
            <div className="text-center bg-gray-200 rounded-2xl p-8 border border-gray-300 flex flex-col items-center card-fade-up">
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>Atención Personalizada</h3>
              <p className="text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                "Cada cliente es único."
              </p>
              <span className="text-gray-500 text-sm">Planes y asesoramiento a tu medida.</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}