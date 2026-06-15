// Inicialização do Firebase (Auth + Firestore).
// A config web do Firebase NÃO é segredo — vai no bundle do cliente de qualquer
// forma; a proteção real são as regras do Firestore (ver firestore.rules).
// Lemos de variáveis VITE_* para não fixar valores de um projeto específico.
// Se a config não estiver presente, o app funciona normalmente, só sem login/sync.
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Login só é oferecido quando o projeto está configurado.
export const firebaseEnabled = Boolean(config.apiKey && config.projectId && config.appId)

let auth = null
let db = null
let provider = null

if (firebaseEnabled) {
  const app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)
  provider = new GoogleAuthProvider()
}

export { auth, db, provider }
