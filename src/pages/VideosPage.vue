<script setup>
import { computed } from 'vue'
import subjects, { SUBJECT_ORDER } from '../data/subjects'
import videos from '../data/videos'
import CourseSections from '../components/CourseSections.vue'

const labelOf = Object.fromEntries(subjects.map((s) => [s.key, s.label]))

const groups = computed(() =>
  SUBJECT_ORDER.map((key) => ({
    key,
    label: labelOf[key],
    videos: videos.filter((v) => v.subject === key),
  })).filter((g) => g.videos.length > 0)
)

const total = computed(() => videos.length)
</script>

<template>
  <section class="page-head">
    <div class="container">
      <p class="sec-label light">Vídeo-aulas</p>
      <h1>Aulas em vídeo por matéria</h1>
      <p class="head-lead">
        Vídeos selecionados do canal Aviadores e Aeronautas, organizados pelas cinco matérias da
        prova teórica da ANAC. Clique em qualquer item da lista para trocar o vídeo em destaque.
      </p>
    </div>
  </section>

  <CourseSections v-if="groups.length" :groups="groups" />

  <section v-else class="empty">
    <div class="container">
      <p>
        Nenhum vídeo carregado ainda. Rode <code>npm run sync:videos</code> para importar as
        playlists do canal.
      </p>
    </div>
  </section>
</template>

<style scoped>
.page-head {
  background: var(--primary);
  padding: 4.5rem 0 4rem;
}

.page-head h1 {
  max-width: none;
}

.sec-label.light {
  color: #8fc7f0;
}

.head-lead {
  color: rgba(255, 255, 255, 0.72);
  font-size: 1.04rem;
  max-width: 64ch;
  line-height: 1.75;
}

.empty {
  padding: 4rem 0;
  text-align: center;
  color: var(--text-soft);
}

.empty code {
  background: var(--accent-soft);
  padding: 0.1rem 0.4rem;
  border-radius: 5px;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .page-head {
    padding: 3rem 0 2.5rem;
  }

  .head-lead {
    font-size: 0.98rem;
  }
}

@media (max-width: 480px) {
  .page-head {
    padding: 2rem 0 1.5rem;
  }

  .head-lead {
    font-size: 0.93rem;
  }
}
</style>
