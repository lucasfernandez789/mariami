import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
// Nota: Estas son credenciales de ejemplo. Necesitarás reemplazarlas con las tuyas
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "mariami-estetica.firebaseapp.com",
  projectId: "mariami-estetica",
  storageBucket: "mariami-estetica.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 