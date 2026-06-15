// As cinco matérias da prova teórica da ANAC para Piloto Privado de Avião (PP-A).
// `key` é usada como slug da wiki e como agrupador dos vídeos.
// `playlistMatch` lista termos (minúsculos, sem acento) usados pelo
// scripts/sync-videos.mjs para mapear playlists do canal a cada matéria.
const subjects = [
  {
    key: 'regulamentos',
    label: 'Regulamentos de Tráfego Aéreo',
    icon: '📋',
    desc: 'RBAC, ICA e regras do DECEA: espaço aéreo, regras de voo, licenças e fatores humanos.',
    playlistMatch: ['regulament', 'rbac', 'trafego aereo', 'fraseologia', 'legislacao'],
  },
  {
    key: 'meteorologia',
    label: 'Meteorologia',
    icon: '🌦️',
    desc: 'Atmosfera, pressão, vento, nuvens, frentes, METAR/TAF e fenômenos perigosos ao voo.',
    playlistMatch: ['meteorolog', 'meteoro', 'tempo', 'metar', 'nuvens'],
  },
  {
    key: 'navegacao',
    label: 'Navegação Aérea',
    icon: '🧭',
    desc: 'Cartas, rumo e proa, declinação magnética, navegação estimada e auxílios (VOR, NDB, GPS).',
    playlistMatch: ['navegac', 'navega'],
  },
  {
    key: 'teoria-de-voo',
    label: 'Teoria de Voo',
    icon: '✈️',
    desc: 'Aerodinâmica: sustentação, arrasto, estol, eixos e comandos, estabilidade e manobras.',
    playlistMatch: ['teoria de voo', 'aerodinam'],
  },
  {
    key: 'conhecimentos-tecnicos',
    label: 'Conhecimentos Técnicos',
    icon: '🛠️',
    desc: 'Célula, motor a pistão, hélice, sistemas, instrumentos, performance e peso e balanceamento.',
    playlistMatch: ['conhecimentos tecnicos', 'conhecimentos tecnico'],
  },
]

export const SUBJECT_ORDER = subjects.map((s) => s.key)
export const SUBJECT_LABELS = Object.fromEntries(subjects.map((s) => [s.key, s.label]))

export default subjects
