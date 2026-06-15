// Progresso de estudo: vídeos assistidos e artigos lidos.
// - Sempre persiste em localStorage (funciona sem login, por aparelho).
// - Com login (Firebase), carrega o doc do usuário, MESCLA com o local (união)
//   e mantém sincronizado a cada mudança.
import { reactive, ref, watch, computed } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, firebaseEnabled } from '../lib/firebase'
import { useAuth } from './useAuth'
import videos from '../data/videos'
import subjects from '../data/subjects'

const LS_KEY = 'ppaProgress'

// state.videos / state.articles são mapas { id: true }
const state = reactive({ videos: {}, articles: {} })
const syncing = ref(false)
let cloudLoaded = false
let saveTimer = null

// ── localStorage ────────────────────────────────────────────────────────────
function loadLocal() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    for (const id of raw.videos || []) state.videos[id] = true
    for (const slug of raw.articles || []) state.articles[slug] = true
  } catch {
    /* ignora storage corrompido */
  }
}

function saveLocal() {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify({
      videos: Object.keys(state.videos),
      articles: Object.keys(state.articles),
    })
  )
}

// ── Firestore ────────────────────────────────────────────────────────────────
function docRef(uid) {
  return doc(db, 'progress', uid)
}

async function saveCloud(uid) {
  await setDoc(
    docRef(uid),
    { videos: { ...state.videos }, articles: { ...state.articles }, updatedAt: Date.now() },
    { merge: true }
  )
}

async function loadAndMergeCloud(uid) {
  syncing.value = true
  try {
    const snap = await getDoc(docRef(uid))
    if (snap.exists()) {
      const data = snap.data()
      for (const id of Object.keys(data.videos || {})) state.videos[id] = true
      for (const slug of Object.keys(data.articles || {})) state.articles[slug] = true
    }
    cloudLoaded = true
    await saveCloud(uid) // grava a união de volta
    saveLocal()
  } finally {
    syncing.value = false
  }
}

// ── Inicialização (uma vez por carga de página) ──────────────────────────────
let initialized = false
function init() {
  if (initialized) return
  initialized = true
  loadLocal()

  const { user } = useAuth()
  watch(
    user,
    (u) => {
      if (u) {
        loadAndMergeCloud(u.uid)
      } else {
        cloudLoaded = false
      }
    },
    { immediate: true }
  )

  // Persiste a cada mudança (debounce leve).
  watch(
    state,
    () => {
      clearTimeout(saveTimer)
      saveTimer = setTimeout(() => {
        saveLocal()
        const u = user.value
        if (firebaseEnabled && u && cloudLoaded) saveCloud(u.uid).catch(() => {})
      }, 400)
    },
    { deep: true }
  )
}

// ── API ──────────────────────────────────────────────────────────────────────
function toggle(map, key) {
  if (map[key]) delete map[key]
  else map[key] = true
}

function videosOfSubject(subjectKey) {
  return videos.filter((v) => v.subject === subjectKey)
}

export function useProgress() {
  init()

  const isVideoDone = (id) => !!state.videos[id]
  const isArticleDone = (slug) => !!state.articles[slug]
  const toggleVideo = (id) => toggle(state.videos, id)
  const toggleArticle = (slug) => toggle(state.articles, slug)

  // Estatística por matéria: vídeos assistidos + artigo lido, sobre o total.
  function subjectStats(subjectKey) {
    const subjVideos = videosOfSubject(subjectKey)
    const totalVideos = subjVideos.length
    const doneVideos = subjVideos.filter((v) => state.videos[v.id]).length
    const totalArticles = 1
    const doneArticles = state.articles[subjectKey] ? 1 : 0
    const total = totalVideos + totalArticles
    const done = doneVideos + doneArticles
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
  }

  const overall = computed(() => {
    let done = 0
    let total = 0
    for (const s of subjects) {
      const st = subjectStats(s.key)
      done += st.done
      total += st.total
    }
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
  })

  return {
    state,
    syncing,
    isVideoDone,
    isArticleDone,
    toggleVideo,
    toggleArticle,
    subjectStats,
    overall,
  }
}
