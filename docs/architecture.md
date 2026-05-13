# Arquitetura

## Visao Geral

O HireTrack Dev é um SPA em Vue 3 com TypeScript. A UI conversa com stores Pinia, que centralizam estado, loading e erro. Os stores acessam `src/services/hireTrackService.ts`, uma fronteira fina de domínio que hoje delega para o client mockado em `src/graphql/client.ts`.

Essa separação deixa a troca para um backend real mais simples: telas e stores continuam usando os mesmos métodos, enquanto a implementação do serviço passa a chamar REST, GraphQL, TanStack Query ou outro client HTTP.

## Fluxo De Autenticação

- Login e cadastro passam por validação com Zod.
- O client cria um JWT mockado com `iat`.
- A sessão é salva em `localStorage`.
- O router tenta hidratar o usuário antes de entrar em rotas privadas.
- Tokens com mais de 8 horas são invalidados e o usuário volta para `/login`.

## Dados E API

- `src/services/contracts.ts` define os contratos de auth, vagas, candidaturas e dados demo.
- `src/services/hireTrackService.ts` define a fronteira usada pelos stores.
- `src/graphql/mockData.ts` contém usuários, vagas e candidaturas.
- `src/graphql/client.ts` simula operações assíncronas e persistência local.
- `src/mocks` adiciona MSW para simular uma fronteira HTTP em desenvolvimento.
- Para trocar por API real, preserve os contratos do service e substitua a implementação interna por `fetch`, GraphQL client ou TanStack Query.

## Stores

- `authStore`: sessão, login, cadastro, hidratação e logout.
- `jobsStore`: listagem, filtros, ordenação, vaga selecionada e favoritos.
- `applicationsStore`: métricas, status, notas, próxima entrevista e histórico.

## Configuração E Observabilidade

- `src/config/env.ts` valida variáveis de ambiente com Zod.
- `VITE_ENABLE_MSW=true` ativa MSW apenas em desenvolvimento.
- `VITE_SENTRY_DSN` habilita Sentry em produção.
- Headers de segurança básicos são configurados em `vercel.json`.

## Testes

- Vitest cobre stores, componentes, composables e utilitários.
- `npm run test:coverage` gera relatório em `coverage/` com thresholds mínimos.
- Playwright cobre fluxos reais no navegador.
- Axe roda no E2E para checar violações WCAG básicas nas páginas principais.
- Storybook documenta componentes compartilhados e permite validar tema claro/escuro.

## Deploy

O projeto está preparado para Vercel e Netlify:

- Vercel: `vercel.json`
- Netlify: `netlify.toml`

Ambos apontam para `npm run build` e servem `dist`.
