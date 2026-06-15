<script setup>
import subjects from '../data/subjects'
import ProgressBar from '../components/ProgressBar.vue'
import { useProgress } from '../composables/useProgress'
import { useAuth } from '../composables/useAuth'

const { subjectStats, overall } = useProgress()
const { user, firebaseEnabled } = useAuth()
</script>

<template>
  <!-- Hero -->
  <section class="hero">
    <div class="container hero-in">
      <p class="sec-label light">Prova teórica da ANAC · Piloto Privado de Avião</p>
      <h1>Estude para a banca da ANAC de Piloto Privado</h1>
      <p class="hero-lead">
        Vídeo-aulas e resumos teóricos das cinco matérias da prova de PP-A, reunidos num só lugar
        e de graça. Estude no seu ritmo e chegue confiante na banca.
      </p>
      <div class="hero-cta">
        <router-link class="btn btn-white" to="/videos">Ver vídeo-aulas</router-link>
        <router-link class="btn btn-ghost" to="/wiki/regulamentos">Abrir a wiki</router-link>
      </div>
    </div>
  </section>

  <!-- Progress banner (shows once there is any progress) -->
  <section v-if="overall.done > 0" class="prog-banner">
    <div class="container prog-in">
      <div class="prog-text">
        <p class="sec-label">Seu progresso</p>
        <h2>{{ overall.pct }}% do conteúdo concluído</h2>
        <p class="prog-sub" v-if="firebaseEnabled && !user">
          Entre com o Google para salvar e sincronizar entre dispositivos.
        </p>
        <p class="prog-sub" v-else-if="user">Sincronizado na sua conta Google.</p>
        <p class="prog-sub" v-else>Salvo neste dispositivo.</p>
      </div>
      <ProgressBar :pct="overall.pct" :done="overall.done" :total="overall.total" />
    </div>
  </section>

  <!-- Exam overview -->
  <section class="alt">
    <div class="container">
      <p class="sec-label">Como é a prova</p>
      <h2>O que esperar da banca</h2>
      <p class="sec-lead">
        A prova teórica de Piloto Privado é feita em agência da ANAC, no computador, com questões
        sorteadas aleatoriamente. Estude todo o conteúdo — não dá para prever o que cai.
      </p>
      <div class="grid3 facts">
        <div class="card">
          <div class="card-icon">📝</div>
          <h3>100 questões</h3>
          <p>20 questões de cada uma das cinco matérias, em até 3 horas de prova.</p>
        </div>
        <div class="card">
          <div class="card-icon">🎯</div>
          <h3>70% por matéria</h3>
          <p>Mínimo de 14 acertos em cada matéria. Reprovou em 1 ou 2? Faz só elas na 2ª época.</p>
        </div>
        <div class="card">
          <div class="card-icon">🎲</div>
          <h3>Sorteio aleatório</h3>
          <p>As questões são sorteadas ao iniciar — cobre todo o programa para não ser pego de surpresa.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Subjects -->
  <section>
    <div class="container">
      <p class="sec-label">As cinco matérias</p>
      <h2>O que você vai estudar</h2>
      <p class="sec-lead">
        Cada matéria tem vídeo-aulas e um artigo teórico com os tópicos cobrados na prova.
      </p>
      <div class="subjects">
        <router-link
          v-for="s in subjects"
          :key="s.key"
          class="card subject-card"
          :to="`/wiki/${s.key}`"
        >
          <div class="card-icon">{{ s.icon }}</div>
          <h3>{{ s.label }}</h3>
          <p>{{ s.desc }}</p>
          <div class="subject-prog">
            <ProgressBar
              :pct="subjectStats(s.key).pct"
              :done="subjectStats(s.key).done"
              :total="subjectStats(s.key).total"
            />
          </div>
          <span class="card-link">Estudar →</span>
        </router-link>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section class="alt cta">
    <div class="container cta-in">
      <h2>Pronto para começar?</h2>
      <p class="sec-lead">Comece pelas vídeo-aulas ou mergulhe direto na teoria.</p>
      <div class="hero-cta">
        <router-link class="btn btn-primary" to="/videos">Ver vídeo-aulas</router-link>
        <router-link class="btn" to="/wiki/regulamentos" style="border: 1px solid var(--border)"
          >Abrir a wiki</router-link
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(160deg, #0b3d66 0%, #07223a 100%);
  padding: 5.5rem 0 5rem;
}

.hero-in {
  max-width: 760px;
}

.sec-label.light {
  color: #8fc7f0;
}

.hero-lead {
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.12rem;
  line-height: 1.75;
  max-width: 56ch;
  margin-bottom: 2rem;
}

.hero-cta {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.facts .card h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
}

.subjects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
}

.subject-card {
  display: flex;
  flex-direction: column;
}

.subject-prog {
  margin-top: 1rem;
}

.subject-card .card-link {
  margin-top: auto;
  padding-top: 0.9rem;
}

.prog-banner {
  background: var(--accent-soft);
  padding: 2.4rem 0;
}

.prog-in {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.prog-text {
  flex: 1 1 280px;
}

.prog-text h2 {
  margin-bottom: 0.3rem;
}

.prog-sub {
  color: var(--text-soft);
  font-size: 0.9rem;
}

.prog-in .pb {
  flex: 1 1 280px;
}

.cta-in {
  text-align: center;
}

.cta-in .hero-cta {
  justify-content: center;
}

.cta-in .sec-lead {
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .hero {
    padding: 3.5rem 0;
  }

  .hero-lead {
    font-size: 1rem;
  }
}
</style>
