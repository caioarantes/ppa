<script setup>
import { computed } from 'vue'

const props = defineProps({
  video: { type: Object, required: true },
})

const embedUrl = computed(() => {
  if (!props.video.youtubeId) return null
  const start = props.video.start ? `?start=${props.video.start}` : ''
  return `https://www.youtube.com/embed/${props.video.youtubeId}${start}`
})
</script>

<template>
  <article class="card video-card">
    <div class="video-wrap">
      <iframe
        v-if="embedUrl"
        :src="embedUrl"
        :title="video.title"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      ></iframe>
      <div v-else class="video-placeholder">
        <span class="play-badge" aria-hidden="true">▶</span>
        <span>Em breve</span>
      </div>
    </div>
    <h3>{{ video.title }}</h3>
    <p v-if="video.desc">{{ video.desc }}</p>
  </article>
</template>

<style scoped>
.video-card {
  display: flex;
  flex-direction: column;
}

.video-wrap {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: var(--r-sm);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #cfe7fa, #a9d2f3);
}

.video-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: var(--primary);
  font-size: 0.86rem;
  font-weight: 600;
}

.play-badge {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding-left: 4px;
  box-shadow: var(--sh-sm);
}
</style>
