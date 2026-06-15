<script setup>
import { ref } from 'vue'

const logoUrl = import.meta.env.BASE_URL + 'logo.svg'
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header>
    <div class="container nav">
      <router-link class="brand" to="/" @click="closeMenu" aria-label="Estudo PP-A">
        <img class="brand-logo" :src="logoUrl" alt="Estudo PP-A" />
      </router-link>
      <div class="nav-right">
        <button
          class="menu-toggle"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
        <nav class="nav-links" :class="{ open: menuOpen }" aria-label="Navegação principal">
          <router-link to="/" @click="closeMenu">Início</router-link>
          <router-link to="/videos" @click="closeMenu">Vídeo-aulas</router-link>
          <router-link
            to="/wiki/regulamentos"
            :class="{ 'router-link-active': $route.name === 'wiki' }"
            @click="closeMenu"
          >
            Wiki
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 0;
  gap: 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-logo {
  height: 30px;
  width: auto;
  object-fit: contain;
  display: block;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-soft);
  transition: color 0.15s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--primary);
}

.menu-toggle {
  display: none;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  cursor: pointer;
  color: var(--text);
  font-size: 1.1rem;
  line-height: 1;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.97);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    padding: 1rem 1.4rem;
    gap: 0.5rem;
    z-index: 40;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    padding: 0.5rem 0;
    font-size: 0.95rem;
  }

  .brand {
    margin-left: 0.5rem;
  }
}

@media (max-width: 480px) {
  .nav {
    padding: 0.6rem 0;
    gap: 0.8rem;
  }

  .brand-logo {
    height: 28px;
  }
}
</style>
