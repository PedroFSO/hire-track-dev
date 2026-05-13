# Arquitetura

## Visao Geral

O HireTrack Dev e um SPA em Vue 3 com TypeScript. A UI conversa com stores Pinia, que centralizam estado, loading e erro. Os stores acessam `src/services/hireTrackService.ts`, uma fronteira fina de dominio que hoje delega para o client mockado em `src/graphql/client.ts`.

Essa separacao deixa a troca para um backend real mais simples: telas e stores continuam usando os mesmos metodos, enquanto a implementacao do servico passa a chamar REST, GraphQL ou outro client HTTP.

## Fluxo De Autenticacao

- Login e cadastro passam por validacao com Zod.
- O client cria um JWT mockado com `iat`.
- A sessao e salva em `localStorage`.
- O router tenta hidratar o usuario antes de entrar em rotas privadas.
- Tokens com mais de 8 horas sao invalidados e o usuario volta para `/login`.

## Dados E API

- `src/services/hireTrackService.ts` define a fronteira usada pelos stores.
- `src/graphql/mockData.ts` contem usuarios, vagas e candidaturas.
- `src/graphql/client.ts` simula operacoes assincronas e persistencia local.
- `src/mocks` adiciona MSW para simular uma fronteira HTTP em desenvolvimento.
- Para trocar por API real, preserve os contratos do service e substitua a implementacao interna por `fetch`, GraphQL client ou TanStack Query.

## Stores

- `authStore`: sessao, login, cadastro, hidratacao e logout.
- `jobsStore`: listagem, filtros, ordenacao, vaga selecionada e favoritos.
- `applicationsStore`: metricas, status, notas, proxima entrevista e historico.

## Testes

- Vitest cobre stores, componentes, composables e utilitarios.
- Playwright cobre fluxos reais no navegador.
- Axe roda no E2E para checar violacoes WCAG basicas nas paginas principais.
- Storybook documenta componentes compartilhados e permite validar tema claro/escuro.

## Deploy

O projeto esta preparado para Vercel e Netlify:

- Vercel: `vercel.json`
- Netlify: `netlify.toml`

Ambos apontam para `npm run build` e servem `dist`.
