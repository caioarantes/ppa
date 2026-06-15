<script setup>
const year = 2026
</script>

<template>
  <footer>
    <div class="container footer-in">
      <p class="f-main">
        Plataforma de estudo gratuita e independente para a prova teórica da ANAC (PP-A).
        Não é material oficial nem afiliada à ANAC.
      </p>
      <p class="f-credit">
        Vídeo-aulas do canal
        <a
          class="f-link"
          href="https://www.youtube.com/@aviadoreseaeronautas7439"
          target="_blank"
          rel="noopener noreferrer"
          >Aviadores e Aeronautas</a
        >. Conteúdo teórico compilado de fontes públicas, citadas em cada artigo da wiki.
        © {{ year }}.
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--primary);
  padding: 2.2rem 0;
}

.footer-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}

.f-main {
  max-width: 60ch;
}

.f-credit {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 64ch;
}

.f-link {
  color: inherit;
  text-decoration: underline;
}

.f-link:hover {
  color: #fff;
}
</style>
