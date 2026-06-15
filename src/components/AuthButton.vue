<script setup>
import { useAuth } from '../composables/useAuth'

const { user, signIn, signOut, firebaseEnabled } = useAuth()
</script>

<template>
  <div v-if="firebaseEnabled" class="auth">
    <template v-if="user">
      <img v-if="user.photoURL" class="avatar" :src="user.photoURL" :alt="user.displayName || 'perfil'" referrerpolicy="no-referrer" />
      <button class="auth-btn ghost" type="button" @click="signOut" title="Sair">Sair</button>
    </template>
    <button v-else class="auth-btn" type="button" @click="signIn">
      <svg class="g" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.7 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5C43.6 37.6 46.1 31.6 46.1 24.5z"/>
        <path fill="#FBBC05" d="M10.4 28.3c-.5-1.4-.7-2.9-.7-4.3s.3-3 .7-4.3l-7.8-6.1C1 16.5 0 20.1 0 24s1 7.5 2.6 10.4l7.8-6.1z"/>
        <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.1-5.5c-2 1.4-4.6 2.2-7.9 2.2-6.3 0-11.7-3.7-13.6-9.3l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
      </svg>
      <span>Entrar com Google</span>
    </button>
  </div>
</template>

<style scoped>
.auth {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border);
}

.auth-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.auth-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.auth-btn.ghost {
  color: var(--text-muted);
}

.g {
  width: 16px;
  height: 16px;
}

@media (max-width: 480px) {
  .auth-btn span {
    display: none;
  }
}
</style>
