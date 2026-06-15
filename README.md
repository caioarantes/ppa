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

## Créditos

- Vídeo-aulas: canal **Aviadores e Aeronautas** (YouTube).
- Conteúdo teórico: fontes públicas (ANAC/RBAC, DECEA/ICA, FAA PHAK, entre outras), citadas
  discretamente ao final de cada artigo da wiki.

Plataforma independente, **sem afiliação com a ANAC**. Não substitui material oficial.
