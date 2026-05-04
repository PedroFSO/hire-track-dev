# HireTrack Dev

![Vue](https://img.shields.io/badge/Vue-3-42b883)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![CI](https://img.shields.io/badge/CI-ready-0f766e)
![License](https://img.shields.io/badge/license-MIT-blue)

Frontend em Vue 3 para gerenciamento profissional de candidaturas em vagas de tecnologia. O app simula uma experiência de produto real com autenticação, rotas privadas, dashboard, filtros, favoritos, pipeline, notas, próxima entrevista, histórico de status, validação de formulários, MSW, testes automatizados e Docker.

## Demonstração

- Deploy: publique na Vercel ou Netlify e coloque a URL aqui.
- E-mail demo: `ana@hiretrack.dev`
- Senha demo: `123456`

## Screenshots

| Login                                | Dashboard                                    | Vagas                               |
| ------------------------------------ | -------------------------------------------- | ----------------------------------- |
| ![Login](docs/screenshots/login.png) | ![Dashboard](docs/screenshots/dashboard.png) | ![Vagas](docs/screenshots/jobs.png) |

## Funcionalidades

- Login e cadastro com sessão JWT mockada em `localStorage`.
- Expiração de sessão após 8 horas.
- Rotas públicas, privadas e página 404.
- Dashboard com métricas e Kanban de candidaturas.
- Listagem de vagas com filtros, busca com debounce e ordenação.
- Favoritos com confirmação de remoção.
- Notas por candidatura, data da próxima entrevista, contato e histórico de status.
- Feedback visual com toasts.
- Validação de formulários com Zod.
- MSW opcional para simular fronteira HTTP em desenvolvimento.
- Testes unitários, E2E e acessibilidade com axe.
- Configuração para Vercel, Netlify, Docker e GitHub Actions.

## Stack

- Vue 3 + Composition API + TypeScript
- Vite
- Tailwind CSS
- Pinia
- Vue Router
- Zod
- MSW
- Vitest + Testing Library
- Playwright + axe
- ESLint + Prettier
- Docker + Nginx

## Como Rodar Localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Acesse `http://localhost:5173`.

## Variáveis De Ambiente

```env
VITE_APP_NAME=HireTrack Dev
VITE_API_URL=
VITE_ENABLE_MSW=false
```

Use `VITE_ENABLE_MSW=true` para ativar os handlers de MSW no navegador durante desenvolvimento.

## Qualidade

```bash
npm run format:check
npm run lint
npm run test
npm run build
npm run test:e2e
npm run screenshots
```

O GitHub Actions roda formatação, lint, testes unitários, build, E2E e captura screenshots como artefato.

## Deploy

Vercel e Netlify já estão configurados:

- `vercel.json`
- `netlify.toml`

Ambos usam `npm run build` e publicam `dist`.

## Docker

```bash
docker compose up
```

Acesse `http://localhost:8080`.

## Documentação

- Arquitetura: [docs/architecture.md](docs/architecture.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
