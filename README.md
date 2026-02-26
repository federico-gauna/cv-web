# Mi primera aplicación web profesional (SPA)

## Stack
- HTML + CSS + JavaScript (vanilla)
- GitHub Pages (frontend)
- Node/Express (API eSports) — deploy separado

## Deploy (GitHub Pages)
1) Settings → Pages
2) Source: Deploy from a branch
3) Branch: main / root

## API requerida
Base URL configurada en: `js/api.js`

Endpoints mínimos:
- GET /health -> { "ok": true }
- GET /api/juegos -> []
- GET /api/competidores -> []
- GET /api/torneos -> []

## CORS
La API debe permitir el origen de GitHub Pages:
https://TU_USUARIO.github.io