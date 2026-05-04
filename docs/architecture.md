# Arquitetura

## Visão Geral

O HireTrack Dev é um SPA em Vue 3 com TypeScript. A UI conversa com stores Pinia, que centralizam estado, loading e erro. Os stores acessam `src/graphql/client.ts`, uma camada mockada que preserva contratos próximos de uma API real.

## Fluxo De Autenticação

- Login e cadastro passam por validação com Zod.
- O client cria um JWT mockado com `iat`.
- A sessão é salva em `localStorage`.
- O router tenta hidratar o usuário antes de entrar em rotas privadas.
- Tokens com mais de 8 horas são invalidados e o usuário volta para `/login`.

## Dados E API

- `src/graphql/mockData.ts` contém usuários, vagas e candidaturas.
- `src/graphql/client.ts` simula operações assíncronas e persistência local.
- `src/mocks` adiciona MSW para simular uma fronteira HTTP em desenvolvimento.
- Para trocar por API real, mantenha os contratos dos stores e substitua as funções do client por `fetch` ou por um GraphQL client.

## Stores

- `authStore`: sessão, login, cadastro, hidratação e logout.
- `jobsStore`: listagem, filtros, ordenação, vaga selecionada e favoritos.
- `applicationsStore`: métricas, status, notas, próxima entrevista e histórico.

## Testes

- Vitest cobre stores, componentes e composables.
- Playwright cobre fluxos reais no navegador.
- Axe roda no E2E para checar violações WCAG básicas nas páginas principais.

## Deploy

O projeto está preparado para Vercel e Netlify:

- Vercel: `vercel.json`
- Netlify: `netlify.toml`

Ambos apontam para `npm run build` e servem `dist`.
