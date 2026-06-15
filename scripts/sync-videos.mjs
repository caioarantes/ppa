#!/usr/bin/env node
// Gera src/data/videos.js a partir das playlists do canal do YouTube, mapeando
// cada playlist a uma das matérias da prova (src/data/subjects.js).
//
// Requer yt-dlp no PATH (ou Python com o módulo yt_dlp instalado).
//   pip install -U yt-dlp     ou     winget install yt-dlp
//
// Uso: npm run sync:videos
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const CHANNEL = 'https://www.youtube.com/@aviadoreseaeronautas7439/playlists'
const OUT = resolve(ROOT, 'src/data/videos.js')

// ── Resolve a yt-dlp runner ────────────────────────────────────────────────
function resolveRunner() {
  const candidates = [
    { cmd: 'yt-dlp', pre: [] },
    { cmd: 'python', pre: ['-m', 'yt_dlp'] },
    { cmd: 'py', pre: ['-m', 'yt_dlp'] },
  ]
  for (const c of candidates) {
    try {
      execFileSync(c.cmd, [...c.pre, '--version'], { stdio: 'ignore' })
      return c
    } catch {
      /* try next */
    }
  }
  console.error(
    '\n[sync-videos] yt-dlp não encontrado.\n' +
      'Instale com: pip install -U yt-dlp  (ou winget install yt-dlp)\n'
  )
  process.exit(1)
}

const runner = resolveRunner()

function ytdlp(args) {
  return execFileSync(runner.cmd, [...runner.pre, ...args], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
}

// ── Load subjects (for playlist → matéria mapping) ─────────────────────────
const subjectsMod = await import(pathToFileURL(resolve(ROOT, 'src/data/subjects.js')).href)
const subjects = subjectsMod.default

const norm = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

// Playlists fora do escopo PP-A (ex.: trilhas de Piloto Comercial / IFR avançado).
const EXCLUDE = ['comercial', 'pc -', 'linha aerea', 'jato']

function matchSubject(playlistTitle) {
  const t = norm(playlistTitle)
  if (EXCLUDE.some((term) => t.includes(norm(term)))) return null
  for (const s of subjects) {
    if (s.playlistMatch.some((term) => t.includes(norm(term)))) return s.key
  }
  return null
}

// ── Fetch channel playlists, then videos per playlist ──────────────────────
console.log('[sync-videos] Lendo playlists do canal…')
const channelJson = JSON.parse(ytdlp(['--flat-playlist', '-J', CHANNEL]))
const playlistEntries = (channelJson.entries || []).filter((e) => e && (e.id || e.url))

const videos = []
const seen = new Set()
const report = []

for (const pl of playlistEntries) {
  const title = pl.title || ''
  const subject = matchSubject(title)
  if (!subject) {
    report.push(`  ✗ ignorada (sem matéria): ${title}`)
    continue
  }
  const url = pl.url || `https://www.youtube.com/playlist?list=${pl.id}`
  let plJson
  try {
    plJson = JSON.parse(ytdlp(['--flat-playlist', '-J', url]))
  } catch (e) {
    report.push(`  ! erro ao ler playlist "${title}": ${e.message.split('\n')[0]}`)
    continue
  }
  const entries = (plJson.entries || []).filter((v) => v && v.id)
  let added = 0
  for (const v of entries) {
    if (seen.has(v.id)) continue
    seen.add(v.id)
    videos.push({
      id: v.id,
      subject,
      youtubeId: v.id,
      title: (v.title || '').trim(),
      desc: '',
      playlist: title,
    })
    added++
  }
  report.push(`  ✓ ${subject.padEnd(24)} ← "${title}" (${added} vídeos)`)
}

// ── Write src/data/videos.js ───────────────────────────────────────────────
const header =
  '// ⚠️ ARQUIVO GERADO por scripts/sync-videos.mjs — não editar à mão.\n' +
  `// Fonte: ${CHANNEL}\n` +
  '// Shape: { id, subject, youtubeId, title, desc, playlist }\n'

const body = 'const videos = ' + JSON.stringify(videos, null, 2) + '\n\nexport default videos\n'
writeFileSync(OUT, header + body, 'utf8')

console.log('\n[sync-videos] Mapeamento:')
console.log(report.join('\n'))
console.log(`\n[sync-videos] ${videos.length} vídeos gravados em src/data/videos.js`)
