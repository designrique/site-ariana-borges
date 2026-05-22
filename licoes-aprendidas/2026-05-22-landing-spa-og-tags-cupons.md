---
status: permanent
tags:
  - licao-aprendida
  - react-spa
  - seo
  - open-graph
  - infinitepay
  - landing-page
data: 2026-05-22
sessao: Landing page Dedo Magnetico + fix de OG tags em SPA + sistema multi-cupom DNA Basico
---

# Licoes Aprendidas — Landing Pages SPA: OG Tags, Widgets de Checkout e Cupons

## Contexto

Sessao no projeto `site-instituto-ariana-borges` (React SPA com Vite, deploy Vercel). Criamos a landing page [[Dedo Magnetico]], corrigimos o preview de compartilhamento social, integramos o widget de checkout do [[Hotmart]], alteramos datas do DNA Basico e implementamos um sistema de multiplos cupons de desconto.

## O que aprendemos

- **Meta tags de [[Open Graph]] geradas via JavaScript sao invisiveis para crawlers sociais.** O `react-helmet-async` so aplica as tags depois que o [[React]] monta. Crawlers de [[Facebook]], WhatsApp e LinkedIn **nao executam JS** — leem o HTML estatico cru. Resultado: o preview puxava as meta tags do `index.html` do site principal, nao da landing.

- **Solucao: shell HTML estatico por landing + rewrite de path no servidor.** Cada landing tem seu proprio `.html` (ex: `dedomagnetico.html`) com as meta tags OG embutidas estaticamente. Rewrites no `netlify.toml` e `vercel.json` servem esse shell quando a URL bate no path da landing — antes do catch-all `/* -> /index.html`. O SPA continua funcionando porque o [[React Router]] le o path normalmente.

- **`og:url` precisa resolver.** O Facebook persegue o `og:url` como URL canonica e re-scrapeia esse endereco. Apontar para um subdominio sem [[DNS]] configurado quebra o scrape. Regra: `og:url` sempre numa URL que ja funciona hoje.

- **Widget de terceiro (Hotmart) deve ser injetado apos o React montar.** Carregar o script no shell HTML pode rodar antes do React renderizar os botoes — o widget escaneia o DOM e nao acha nada. Injetar via `useEffect` (idempotente, checando `getElementById`) garante que o botao `.hotmart-fb` ja existe. Carregar **so o JS**, nunca o CSS do widget — o CSS sobrescreve o estilo custom do botao.

- **InfinitePay classifica o produto pelo VALOR pago no webhook.** O `webhook-infinitepay.ts` usa faixa de preco (`>= R$1.000` = DNA Basico). Abordagem fragil: qualquer cupom de desconto que baixe o valor abaixo do limiar cai no fallback errado (e-mail, tracking de [[Meta CAPI]] e grupo de WhatsApp de outro produto). **Sempre revisar a classificacao do webhook ao criar um cupom.**

- **A API publica do [[InfinitePay]] gera links de checkout** (`POST https://api.infinitepay.io/invoices/public/checkout/links`) com `redirect_url` + `webhook_url` embutidos — garante paridade de tracking server-side com os links existentes.

## Erros evitados / Armadilhas encontradas

- O rewrite de path foi testado cedo demais (cache do deploy anterior). Verificar com `curl -A "facebookexternalhit/1.1" <url>` confirma o que o crawler realmente recebe, sem depender do cache do Facebook Debugger.
- Cupom abaixo do limiar do webhook: o cupom RECONEXAO (R$98) cairia como "Clube do Livro". Descoberto ao ler a logica do webhook ANTES de so mexer no frontend.
- Notado que o cupom ALBANY (R$998) ja caia no fallback errado antes desta sessao — corrigido junto.
- Datas nao-consecutivas (11, 13, 14 de Junho) exigem recalcular o dia da semana: o dia 11 e quinta, nao sexta — labels derivados precisam acompanhar.

## Decisoes tomadas

- Landing como SPA React (e nao HTML estatico puro) — mantem consistencia com as outras landings do projeto (Clube, Encontro das Deusas, Portal).
- `og:image` apontando para o dominio principal `arianaborges.com` (e nao o subdominio sem DNS) para o preview funcionar imediatamente.
- Classificacao de cupom no webhook via `Set` de valores em centavos — escalavel para futuros cupons, melhor que cadeia de `||`.

## Proximos passos

- Configurar DNS do subdominio `dedomagnetico.arianaborges.com` (CNAME + alias no Vercel) — hoje a landing so funciona via path `/dedo-magnetico`.
- Quando o subdominio estiver no ar, trocar `og:url`/`canonical` para o subdominio.
- Verificar o valor real cobrado pelo link do cupom ALBANY (assumido R$998).
- Avaliar code-splitting do bundle (~1,5MB) — warning recorrente no build.
