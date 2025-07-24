'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, userData, isAuthenticated, login, logout, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cierra el menú de usuario al hacer click fuera
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('#user-menu')) setUserMenuOpen(false);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [userMenuOpen]);

  // Evitar renderizado hasta que esté montado
  if (!mounted) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="mr-2">
                  {/* SVG hoja costilla de adán (Monstera deliciosa) inspirada en Instagram */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2C8.82 2 3 8.16 3 16c0 7.84 5.82 14 13 14s13-6.16 13-14C29 8.16 23.18 2 16 2zm0 2c6.08 0 11 5.36 11 12 0 6.64-4.92 12-11 12S5 20.64 5 14C5 7.36 9.92 2 16 2zm-1.5 5c-.7 0-1.5.8-1.5 1.5s.8 1.5 1.5 1.5 1.5-.8 1.5-1.5-.8-1.5-1.5-1.5zm4.5 2c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm-6 2c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm8 2c-.7 0-1.5.8-1.5 1.5s.8 1.5 1.5 1.5 1.5-.8 1.5-1.5-.8-1.5-1.5-1.5zm-10 2c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm8 2c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm-4 2c-.7 0-1.5.8-1.5 1.5s.8 1.5 1.5 1.5 1.5-.8 1.5-1.5-.8-1.5-1.5-1.5z" fill="#181818"/>
                  </svg>
                </span>
                <span className="text-2xl font-bold text-gray-900 tracking-widest uppercase" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>MARIAMI</span>
                <span className="ml-2 text-sm text-gray-500 font-medium tracking-wide uppercase" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>Estética</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <span className="text-gray-700 px-3 py-2 text-sm font-medium">Inicio</span>
                <span className="text-gray-700 px-3 py-2 text-sm font-medium">Servicios</span>
                <span className="text-gray-700 px-3 py-2 text-sm font-medium">Productos</span>
                <span className="text-gray-700 px-3 py-2 text-sm font-medium">Blog</span>
                <span className="text-gray-700 px-3 py-2 text-sm font-medium">Turnos</span>
                <span className="text-gray-700 px-3 py-2 text-sm font-medium">Contacto</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium">Reservar Turno</span>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Productos', href: '/productos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="mr-2">
                {/* SVG hoja costilla de adán (Monstera deliciosa) minimalista */}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2C8.477 2 4 7.477 4 14c0 6.523 4.477 12 10 12s10-5.477 10-12C24 7.477 19.523 2 14 2zm0 2c4.418 0 8 4.03 8 10 0 5.97-3.582 10-8 10s-8-4.03-8-10c0-5.97 3.582-10 8-10zm-1.5 4.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm4.5 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm-6 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm8 2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-10 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm8 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm-4 2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" fill="#222"/>
                </svg>
              </span>
              <span className="text-2xl font-semibold text-gray-900 tracking-widest">MARIAMI</span>
              <span className="ml-2 text-sm text-gray-500 font-medium">Estética</span>
            </Link>
          </div>

          {/* Desktop Navigation centrado absoluto */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 hover:text-gray-900 px-3 py-1 text-sm font-medium flex items-center h-full transition-colors duration-200 link-underline"
                  style={{ transition: 'color 0.2s' }}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/turnos"
                className="text-gray-900 px-3 py-1 text-sm font-bold whitespace-nowrap flex items-center h-full transition-colors duration-200 link-underline"
                style={{ fontWeight: 700, letterSpacing: '0.01em' }}
              >
                Reservar Turno
              </Link>
            </div>
          </div>

          {/* User/Menu Section - SIEMPRE a la derecha */}
          <div className="hidden md:flex items-center relative ml-6">
            {loading ? null : !isAuthenticated ? (
              <button
                onClick={login}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-gray-200 bg-white shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Iniciar sesión
              </button>
            ) : (
              <div className="relative" id="user-menu">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200 bg-white shadow-sm"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
                      {user.displayName ? user.displayName[0] : 'U'}
                    </div>
                  )}
                  <span className="text-gray-800 font-medium">Hola, {user.displayName?.split(' ')[0] || 'Usuario'}</span>
                  <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50 animate-fade-in" style={{minWidth: '160px'}}>
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm transition-colors duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mi perfil
                    </Link>
                    <button
                      onClick={() => { setUserMenuOpen(false); logout(); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm transition-colors duration-200"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex-1 flex justify-end md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 ml-auto"
              aria-label="Abrir menú"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Navigation */}
        {mounted && isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/turnos"
                className="text-gray-900 block px-3 py-2 text-base font-semibold transition-colors duration-200"
                style={{ fontWeight: 600 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Reservar Turno
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 