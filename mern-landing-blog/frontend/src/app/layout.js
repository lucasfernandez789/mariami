import './globals.css'
import { AuthProvider } from '../contexts/AuthContext';

export const metadata = {
  title: 'Mariami - Centro de Estética',
  description: 'Centro de estética especializado en tratamientos faciales y corporales. Agenda tu cita online.',
  keywords: 'estética, belleza, tratamientos, facial, corporal, spa',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
