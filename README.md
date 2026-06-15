# Estudo PP-A

Site de estudos para a **prova teórica da ANAC de Piloto Privado de Avião (PP-A)**. Em português (pt-BR).

Reúne, por matéria, **vídeo-aulas** (playlists do canal
[Aviadores e Aeronautas](https://www.youtube.com/@aviadoreseaeronautas7439)) e uma **wiki teórica**
com o conteúdo cobrado na banca, compilado de fontes públicas e citado em cada artigo.

## Matérias

1. Regulamentos de Tráfego Aéreo
2. Meteorologia
3. Navegação Aérea
4. Teoria de Voo
5. Conhecimentos Técnicos

## Stack

Vue 3 + Vue Router 4 + Vite. CSS puro (sem framework). Conteúdo em objetos JS (sem CMS/markdown).

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:5173/ppa/
npm run build      # gera dist/
npm run preview    # serve o dist/
```

## Sincronizar vídeos do canal

As vídeo-aulas em `src/data/videos.js` são **geradas** a partir das playlists do canal.
Requer [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) no PATH (ou Python com `pip install -U yt-dlp`).

```bash
npm run sync:videos
```

O script lê as playlists do canal, mapeia cada uma a uma matéria (tabela `playlistMatch` em
`src/data/subjects.js`) e regrava `src/data/videos.js`. Playlists sem correspondência são ignoradas.

## Deploy (GitHub Pages — project page)

`vite.config.js` usa `base: '/ppa/'`. Publique a pasta `dist/` no GitHub Pages do repositório
`caioarantes/ppa`. O `public/404.html` garante o funcionamento das rotas SPA.

> Para domínio próprio, troque `base` para `'/'` e ajuste os caminhos `/ppa/...` em
> `index.html` e nos `<img>` do cabeçalho.

## Login Google + progresso (opcional)

O site rastreia **vídeos assistidos** e **artigos lidos**, com barra de % por matéria.
Sem login, o progresso fica salvo **no aparelho** (localStorage). Com login Google
(Firebase), o progresso é salvo na nuvem e **sincronizado entre dispositivos** — o
progresso local é mesclado na primeira entrada.

Enquanto o Firebase não estiver configurado, o botão de login fica oculto e o progresso
continua funcionando localmente.

### Configurar o Firebase

1. Crie um projeto em <https://console.firebase.google.com>.
2. **Authentication** → Sign-in method → habilite **Google**.
3. **Authentication** → Settings → Authorized domains → adicione `caioarantes.github.io`
   (e `localhost` para desenvolvimento).
4. **Firestore Database** → criar banco (modo produção) → aba **Rules** → cole o conteúdo
   de [`firestore.rules`](./firestore.rules).
5. Project settings → *Your apps* → registre um app Web e copie a config.
6. Local: copie `.env.example` para `.env.local` e preencha as `VITE_FIREBASE_*`.
7. Deploy: em **Settings → Secrets and variables → Actions**, crie os secrets
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
   `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.
   O workflow os injeta no build.

> A config web do Firebase não é segredo (vai no bundle do cliente). A proteção é feita
> pelas regras do Firestore (cada usuário só acessa o próprio documento) e pelos domínios
> autorizados no Auth.

## Créditos

- Vídeo-aulas: canal **Aviadores e Aeronautas** (YouTube).
- Conteúdo teórico: fontes públicas (ANAC/RBAC, DECEA/ICA, FAA PHAK, entre outras), citadas
  discretamente ao final de cada artigo da wiki.

Plataforma independente, **sem afiliação com a ANAC**. Não substitui material oficial.
