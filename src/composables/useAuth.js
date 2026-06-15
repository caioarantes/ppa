// Estado de autenticação (Google) compartilhado em todo o app.
import { ref } from 'vue'
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth, provider, firebaseEnabled } from '../lib/firebase'

const user = ref(null)
const authReady = ref(!firebaseEnabled)

if (firebaseEnabled) {
  onAuthStateChanged(auth, (u) => {
    user.value = u
    authReady.value = true
  })
}

async function signIn() {
  if (!firebaseEnabled) return
  await signInWithPopup(auth, provider)
}

async function signOut() {
  if (!firebaseEnabled) return
  await fbSignOut(auth)
}

export function useAuth() {
  return { user, authReady, signIn, signOut, firebaseEnabled }
}
