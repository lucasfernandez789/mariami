# Mariami - Landing Page y Blog

Proyecto completo de landing page con blog, tienda y sistema de turnos para Mariami.

## 🚀 Estado Actual

**Último commit:** bc53dd2 (panel de administración completo con autenticación y calendario)

### ✅ Funcionalidades Implementadas

#### Frontend (Next.js 13+)
- ✅ Landing page responsive con Tailwind CSS
- ✅ Blog con posts dinámicos
- ✅ Tienda de productos
- ✅ Formulario de contacto
- ✅ Sistema de turnos
- ✅ Panel de administración con autenticación
- ✅ **Calendario interactivo con gestión de turnos**
- ✅ **Confirmar/Cancelar appointments desde el modal**

#### Backend (Node.js + Express)
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ Servidor simple para desarrollo (test-simple.js)
- ✅ **Endpoints para gestión de appointments**
- ✅ **PUT /api/appointments/:id (confirmar/cancelar)**
- ✅ **DELETE /api/appointments/:id**

## 🛠️ Tecnologías

- **Frontend:** Next.js 13+, React 18+, Tailwind CSS, react-calendar
- **Backend:** Node.js, Express, JWT
- **Base de datos:** MongoDB (Mongoose) - en desarrollo
- **Servidor de desarrollo:** test-simple.js (in-memory)

## 📁 Estructura del Proyecto

```
mariami/
├── mern-landing-blog/
│   ├── backend/
│   │   ├── test-simple.js          # Servidor de desarrollo
│   │   ├── test-appointments.js    # Script de prueba
│   │   ├── add-test-appointments.js # Agregar datos de prueba
│   │   └── src/
│   │       ├── controllers/
│   │       │   └── appointmentController.js
│   │       └── models/
│   │           └── Appointment.js
│   └── frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── admin/
│       │   │   │   ├── calendar/
│       │   │   │   │   └── page.js    # Calendario principal
│       │   │   │   └── dashboard/
│       │   │   └── turnos/
│       │   ├── components/
│       │   └── lib/
│       │       └── api.js             # Funciones de API
│       └── tailwind.config.js
```

## 🚀 Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd mariami/mern-landing-blog
```

### 2. Instalar dependencias
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Iniciar servidores

#### Backend (Servidor de desarrollo)
```bash
cd backend
node test-simple.js
```
**Puerto:** 5000
**URLs disponibles:**
- GET http://localhost:5000/api/appointments
- PUT http://localhost:5000/api/appointments/:id
- DELETE http://localhost:5000/api/appointments/:id

#### Frontend
```bash
cd frontend
npm run dev
```
**Puerto:** 3000
**URLs principales:**
- http://localhost:3000 (Landing page)
- http://localhost:3000/admin/calendar (Calendario de turnos)

### 4. Agregar datos de prueba
```bash
cd backend
node add-test-appointments.js
```

## 📅 Funcionalidades del Calendario

### ✅ Implementado
- **Visualización de turnos por fecha**
- **Modal con detalles del turno**
- **Botones de confirmar/cancelar**
- **Estados visuales (Confirmado, Cancelado, Pendiente)**
- **Botones deshabilitados según estado**
- **Recarga automática después de acciones**

### 🎯 Cómo usar el calendario

1. **Acceder al calendario:**
   - Ve a http://localhost:3000/admin/login
   - Inicia sesión como admin
   - Navega a "Calendario de Turnos"

2. **Ver turnos:**
   - Los días con turnos se marcan con un punto rosa
   - Haz clic en cualquier día para ver los turnos

3. **Gestionar turnos:**
   - En el modal, verás todos los turnos del día
   - Usa "Confirmar Turno" para confirmar
   - Usa "Cancelar Turno" para cancelar
   - Los botones se deshabilitan según el estado

4. **Estados de turnos:**
   - **Pendiente:** Turno sin confirmar ni cancelar
   - **Confirmado:** Turno confirmado (botón verde)
   - **Cancelado:** Turno cancelado (botón rojo)

## 🔧 Scripts Útiles

### Probar endpoints
```bash
cd backend
node test-appointments.js
```

### Agregar datos de prueba
```bash
cd backend
node add-test-appointments.js
```

### Cargar datos de seed
```bash
cd backend
node seed-data.js
```

## 🎨 Características del Frontend

### Calendario
- **react-calendar** con estilos personalizados
- **Modal overlay** con detalles completos
- **Responsive design** para móviles y desktop
- **Estados visuales** para cada turno
- **Botones inteligentes** que se adaptan al estado

### Panel de Administración
- **Autenticación JWT** con localStorage
- **Dashboard** con estadísticas
- **Calendario** con gestión completa
- **Navegación** intuitiva

## 🔒 Autenticación

### Admin Login
- **Email:** admin@mariami.com
- **Password:** admin123
- **Token:** Se guarda en localStorage
- **Protección:** Rutas protegidas con middleware

## 📊 API Endpoints

### Appointments
- `GET /api/appointments` - Obtener todos los turnos
- `POST /api/appointments` - Crear nuevo turno
- `PUT /api/appointments/:id` - Actualizar estado (confirmar/cancelar)
- `DELETE /api/appointments/:id` - Eliminar turno

### Parámetros para PUT
```json
{
  "status": "confirmed" | "cancelled"
}
```

## 🐛 Problemas Conocidos

- **PowerShell:** No usar `&&` en comandos, usar `;` en su lugar
- **Backend:** Usando datos in-memory (no persistente)
- **Hydration:** Algunos componentes usan mounted state

## 🚀 Próximos Pasos

1. **Base de datos real:** Migrar de in-memory a MongoDB
2. **Notificaciones:** Email/SMS para confirmaciones
3. **Filtros:** Filtrar turnos por estado/fecha
4. **Exportar:** Exportar calendario a PDF/Excel
5. **Múltiples servicios:** Diferentes tipos de servicios
6. **Horarios:** Configurar horarios disponibles

## 📝 Notas de Desarrollo

- **Servidor simple:** Perfecto para testing de frontend
- **Datos in-memory:** Se reinician al reiniciar el servidor
- **CORS habilitado:** Para desarrollo local
- **Logs detallados:** Para debugging

---

**Desarrollado con ❤️ para Mariami**