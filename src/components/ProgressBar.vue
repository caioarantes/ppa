<script setup>
defineProps({
  pct: { type: Number, default: 0 },
  done: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  label: { type: String, default: '' },
})
</script>

<template>
  <div class="pb">
    <div class="pb-top">
      <span v-if="label" class="pb-label">{{ label }}</span>
      <span class="pb-num">{{ done }}/{{ total }} · {{ pct }}%</span>
    </div>
    <div class="pb-track" role="progressbar" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100">
      <div class="pb-fill" :style="{ width: pct + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.pb {
  width: 100%;
}

.pb-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.pb-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
}

.pb-num {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-left: auto;
}

.pb-track {
  height: 7px;
  border-radius: var(--r-full);
  background: var(--border);
  overflow: hidden;
}

.pb-fill {
  height: 100%;
  border-radius: var(--r-full);
  background: linear-gradient(90deg, var(--accent), var(--primary-h));
  transition: width 0.4s ease;
}
</style>
