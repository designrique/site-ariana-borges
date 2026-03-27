# Estratégia de Anúncio — Clube do Livro Mulher Maravilha
**Campanha:** Confraria da Lua · Abertura 25/03/2026  
**Criado em:** 21/03/2026  
**Revisado em:** 21/03/2026 — metodologia Pedro Sobral aplicada  
**Agente:** 🥷 Pedro Sobral — O Ninja Supremo do Tráfego  
**Status:** APTO — credenciais validadas, subir hoje

> 🥷 **Nota do Ninja:** R$150 em 4 dias não é budget pra ficar testando. É budget pra executar com precisão. Uma campanha. Um conjunto. Um criativo. Tudo no carrossel que já está pronto. **Vai lá e faz.**

---

## 1. Credenciais Técnicas

| Parâmetro | Valor |
|-----------|-------|
| Conta de Anúncios | `act_127633088624150` — Instituto Ariana Borges |
| Pixel | `1414964383316703` |
| App | ariana_ads (`1284794087086158`) |
| Sistema de usuário | ads-admin — token permanente |
| URL da landing | `clubelivromulhermaravilha.arianaborges.com` |

> ⚠️ Token exposto em sessão de diagnóstico — **rotacionar antes de produção** via Business Manager → Usuários do Sistema → ads-admin → Gerar novo token.

---

## 2. Estrutura da Campanha

> 🥷 **Sobral:** Com R$150 você tem UMA bala. Não dá pra ficar dividindo budget entre várias campanhas, vários conjuntos e vários criativos. A metodologia de 3 tipos de campanha existe, mas nesse sprint só tem tempo e dinheiro pra uma coisa: **captação de leads**. O criativo já está pronto e é forte. O pixel está validado. ABO dá controle real sobre onde cada centavo vai. Advantage+ audience porque o Meta em 2026 acha o público melhor do que você com interesse manual. **Criativo é o novo público — e o criativo tá feito.**

### Premissa de budget real (2026)

```
Budget bruto disponível:    R$ 150,00
Repasse fiscal Meta (12,15%): R$  18,23
Budget líquido real:        R$ 131,77
```

A campanha deve ser configurada com o **bruto** de R$150. O Meta vai cobrar o repasse em cima.

### Estrutura única (1-1-1)

```
CAMPANHA
└── [CDL] Confraria da Lua - MAR26
    Objetivo: OUTCOME_LEADS
    Tipo: Captação de Leads (3 tipos Sobral)
    is_adset_budget_sharing_enabled: false  ← OBRIGATÓRIO nessa conta
    special_ad_categories: []
    Status: ATIVO

    CONJUNTO (ABO — controle total)
    └── [CDL] Adv+ - Lead - BR - 21-25mar
        Audience: Advantage+ aberto (sem interesses manuais)
        Geo: Brasil
        Placements: Advantage+ Placements (automático)
        Evento de otimização: LEAD
        Pixel: 1414964383316703
        Bid: Menor custo (automático — não alterar)
        Orçamento diário: variável por dia (ver seção 6)
        Início: 01/04/2026
        Fim: 25/03/2026 às 23h59

        ANÚNCIO
        └── [CDL] Carrossel 8 slides - V1
            Formato: Carrossel
            Criativos: slide-01.png → slide-08.png
            Texto primário: Variante A (única — sem A/B)
            CTA: "Cadastre-se"
            URL: clubelivromulhermaravilha.arianaborges.com
            Evento pixel: Lead
```

> 🥷 **Por que ABO e não CBO?** Com uma campanha de um conjunto só, CBO e ABO são equivalentes. Mas ABO dá controle explícito de quanto gastar por dia — crítico quando você tem R$150 contados. Cada centavo é um teste. Não deixa o algoritmo brincar com o que não tem.

---

## 3. Criativos — Carrossel 8 Slides

Pasta: `guias/dna-basico/ads/criativos/clube-livros-mar26/`

| Slide | Arquivo | Label | Headline | Função |
|-------|---------|-------|----------|--------|
| 1/8 | `slide-01.png` | VOCÊ TAMBÉM FAZ ISSO... | Compra o livro cheia de intenção. Para no capítulo 2. E a vida segue. | Hook — espelho da dor |
| 2/8 | `slide-02.png` | A ROTINA REAL | Não é falta de vontade. É que o dia acaba antes de você terminar. | Agravamento — identificação |
| 3/8 | `slide-03.png` | *(sem label)* | E no final do dia, bate aquela sensação: mais um dia sem fazer algo só por mim. | Amplificação emocional |
| 4/8 | `slide-04.png` | A VIRADA | E se ler fosse leve? Com dia marcado, grupo te esperando e alguém pra guiar o caminho? | Transição dor → solução |
| 5/8 | `slide-05.png` | CONFRARIA DA LUA | Seu compromisso leve e intencional com você mesma, uma vez por mês. | Apresentação da oferta |
| 6/8 | `slide-06.png` | LIVRO DO MÊS | A Psicologia da Mulher-Maravilha — Travis Langley & Mara Wood | Prova de curadoria / desejo |
| 7/8 | `slide-07.png` | COMO FUNCIONA | Simples, leve e com data no calendário. | Redução de fricção |
| 8/8 | `slide-08.png` | VAGAS LIMITADAS · ABRE 25/03 | As inscrições abrem dia 25 de março. | CTA + urgência |

### Narrativa do carrossel (framework Enter → Transition → CTA)

- **Enter (slides 1–3):** Entrada pela dor conhecida — a mulher que compra livros e não termina. Linguagem espelho: "Você também faz isso?". Valida a realidade sem culpar.
- **Transition (slides 4–6):** A virada pelo mecanismo único — não é mais força de vontade sozinha, é estrutura (grupo, data marcada, Ariana ao vivo). Apresenta o produto + o livro do mês como prova de curadoria.
- **CTA (slides 7–8):** Remove fricção com os 4 passos simples + urgência de vagas limitadas abrindo em 25/03. CTA visual forte: "Garantir Minha Vaga VIP".

---

## 4. Copy do Anúncio (Texto Primário)
> 🥷 **Sobral:** Com R$150, você **não faz teste A/B**. Teste A/B exige volume estatístico — mínimo R$50 por variante antes de comparar. Vai tudo na Variante A. É a mais direta, entra pela dor real, e o carrossel já faz a transição. Criativo é o novo público — confie no criativo.

### ✅ Variante A — USO OBRIGATÓRIO (única variante desta campanha)
```
Você compra o livro cheia de intenção. Chega no capítulo 2. Fecha. Promete terminar na semana que vem.

Semanas depois — o livro ainda lá.

Não é falta de vontade. É que ler sozinha, sem data marcada, sem ninguém te esperando… o dia engole.

A Confraria da Lua existe pra isso: uma noite por semana só pra você, com o grupo te esperando e a Ariana guiando.

Próxima turma abre dia 25/03 — vagas limitadas.
Desliza e entra na lista VIP. 🌙
```

### Variante B — Curiosidade/livro do mês (teste A/B)
> As variantes B e C ficam documentadas abaixo para campanhas futuras com mais budget. **Não usar agora.**

### Variante B — reserva (próxima campanha, warm audience)
```
O livro de abril já foi escolhido: A Psicologia da Mulher-Maravilha.

20 ensaios sobre força, identidade e poder feminino — lidos em grupo, com data marcada, guiados pela Ariana Borges.

Sem ler sozinha sem saber o que fazer com o que sentiu.

Inscrições abrem 25/03 · Vagas limitadas.
Desliza e garante sua vaga VIP. 🌙
```

### Variante C — Prova social implícita (teste futuro, warm)
### Variante C — reserva (remarketing, quem já viu a página)
```
"Tenho 4 livros começados. Todos marcados no capítulo 2 ou 3."

Isso não é você sendo preguiçosa. É você tentando ler sozinha num dia que não sobra energia.

A Confraria da Lua coloca estrutura nisso: grupo, ao vivo, com intenção.

Abertura: 25/03. Vagas limitadas.
Entre na lista VIP agora. 🌙
```

---

## 5. Headlines e Descrições (para testes)
> 🥷 **Sobral:** Não fica testando headline com R$150. Uma headline. Uma descrição. Vai com o que é mais direto.

### ✅ Headline escolhida (usar esta)
`Vagas limitadas · Abre 25/03`

### ✅ Descrição escolhida (usar esta)
`Curadoria + encontro ao vivo + círculo de mulheres reais`

### Banco de opções futuras
- `Entre na lista VIP agora`
- `Leia com intenção. Uma vez por mês.`
- `Ariana Borges guia cada encontro. Data marcada no seu calendário.`

---

## 6. Sprint de Veiculação (21/03 → 25/03)
> 🥷 **Sobral:** 4 dias, R$150 contados. Distribuição progressiva — começa conservador, escala SÓ se tiver sinal verde depois de gastar R$20 ou 24h. Nunca muda campanha antes disso. Modo ninja de monitoramento: **olha o número, decide, não mexe antes da hora.**

### Distribuição de budget (R$150 bruto total)

| Dia | Data | Budget diário | Ação | Critério de ajuste |
|-----|------|--------------|------|-------------------|
| D0 | 21/03 (hoje) | **R$30** | Subir campanha AGORA. Variante A. Não tocar até gastar R$20. | — |
| D1 | 22/03 | **R$35** | Conferir métricas. Se verde → mantém R$35. Se amarelo → mantém e observa. Se vermelho → pausa e analisa criativo. | Checar após R$20 gastos |
| D2 | 23/03 | **R$45** | Se verde em D1: sobe pra R$45. Se amarelo: mantém R$35. Nunca desce budget de campanha ativa — pausa e cria novo conjunto. | Verde em D1 |
| D3 | 24/03 | **R$40** | Push de urgência nas stories orgânicas. **Não alterar campanha paga.** Campanha já sabe quem converter. | — |
| Total | — | **R$150 bruto** | ~R$131,77 líquido após repasse 12,15% | — |

> ⚠️ **Regra de ouro Sobral:** Não mexe em nada antes de gastar R$20 ou completar 24h — o que vier primeiro. Isso vale mesmo que esteja vermelho na primeira hora. Algoritmo precisa de dados.

> 🥷 **Escalar em D2 (R$45) só se VERDE em D1.** Se amarelo, mantém R$35 e só vai pra R$45 em D3. Não tem budget pra errar aqui.

---

## 7. KPIs e Semáforo de Decisão
> 🥷 **Sobral:** Com R$150 você vai ter poucos dados. Respeita o semáforo, mas não entra em pânico com número baixo. Tráfego frio em produto novo precisa de pelo menos R$20–30 pra sair do aprendizado. **Paciência é parte da estratégia.**

| Métrica | 🟢 Verde — escala | 🟡 Amarelo — observa | 🔴 Vermelho — pausa e analisa |
|---------|-----------------|---------------------|------------------------------|
| CTR (link) | ≥ 1,5% | 0,8–1,5% | < 0,8% |
| CPL (custo/lead) | ≤ R$10 | R$10–20 | > R$20 |
| Frequência/dia | ≤ 1,5 | 1,5–2,5 | > 2,5 |
| CPM | ≤ R$25 | R$25–45 | > R$45 |

### Árvore de decisão diária

```
Gastou R$20 ou 24h?
├── NÃO → Não mexe. Fecha o Gerenciador.
└── SIM → Avalia:
    ├── CPL ≤ R$10 e CTR ≥ 1,5% → 🟢 Escala budget conforme tabela D2/D3
    ├── CPL R$10–20 ou CTR 0,8–1,5% → 🟡 Mantém budget. Não mexe. Observa mais 24h.
    └── CPL > R$20 e CTR < 0,8% → 🔴 Pausa. Verifica: landing está funcionando? Pixel disparando?
        ├── Técnico OK → Criativo pode não estar ressonando. Sem budget pra novo criativo agora.
        └── Técnico com problema → Corrige e reactive.
```

> 🥷 **Se vermelho em D0/D1:** Antes de culpar o criativo, confere a landing page. Pixel disparando? URL correta? Formulário abrindo no mobile? O problema mais comum não é o anúncio — é o destino.

---

## 8. Configuração Técnica do Anúncio

### Evento de conversão
- **Pixel:** `1414964383316703`
- **Evento:** `Lead`
- **Disparo:** clique no botão "Garantir Minha Vaga VIP" na landing page
- **CAPI validado:** ✅ `events_received: 1` em 21/03/2026

### Parâmetros UTM sugeridos
```
utm_source=facebook
utm_medium=paid_social
utm_campaign=clube-livro-mar26
utm_content=carrossel-8slides-v1
utm_term=interesse-dev-pessoal
```

### Checklist antes de publicar

- [ ] Imagens carregadas em qualidade original (PNG, ratio 1:1 ou 4:5)
- [ ] URL de destino: `clubelivromulhermaravilha.arianaborges.com` — testada e funcionando
- [ ] Pixel disparando `Lead` na página de obrigado/formulário
- [ ] Parâmetros UTM adicionados à URL de destino
- [ ] Texto primário: V.A selecionada
- [ ] CTA do anúncio: "Saiba mais" ou "Cadastre-se"
- [ ] `is_adset_budget_sharing_enabled: false`
- [ ] `special_ad_categories: []`
- [ ] Status inicial do conjunto: ATIVO
- [ ] Data de término: 25/03/2026 23:59

---

## 9. Pós-Campanha — O que registrar

Ao encerrar em 25/03, documentar aqui:

| Métrica | Realizado |
|---------|-----------|
| Leads gerados | — |
| CPL final | — |
| Budget gasto | — |
| CTR médio | — |

---

## 10. Checkpoint de Performance — 22/03/2026 (D1 manhã)

> Auditoria via Ads Analyst (Ads Analyst Agent) às ~14h de D1. Campanha com ~17h de veiculação.

### Dados coletados via Meta Graph API v23.0

| Métrica | Lifetime (21–22/03) | Hoje (22/03) | Semáforo |
|---------|--------------------|----|---------|
| Impressões | 194 | 21 | — |
| Alcance | 193 | 21 | — |
| Cliques (total) | 14 | 4 | — |
| CTR | **7,22%** | **19,05%** | 🟢 Verde (meta: ≥1,5%) |
| CPC | R$0,35 | R$0,26 | 🟢 Verde |
| CPM | R$25,57 | R$50,00 | 🟡 Amarelo (limite verde: ≤R$25) |
| Gasto | R$4,96 | R$1,05 | — |
| LPVs (Landing Page Views) | 10 | 1 | — |
| Leads registrados | **0** | **0** | 🔴 Crítico |
| Frequência | 1,005 | 1,00 | 🟢 Verde |
| Quality Ranking | UNKNOWN | UNKNOWN | Normal (<1.000 impr.) |

### Análise forense

**🟢 Sinal fortíssimo de criativo:**
- CTR de 7,22% com 17h de tráfego frio é excepcional. Benchmark Sobral ≥1,5% = meta mínima. Estamos **5x acima**.
- 100% dos link clicks viram LPVs (10/10) — landing page carrega sem fricção, URL e criativos alinhados.
- Frequência 1,005 = campanha atingindo pessoas novas a cada impressão. Zero fatiga por enquanto.
- CPC de R$0,35 = extraordinário para captação de leads Brasil 2026.

**🔴 ALERTA CRÍTICO — Zero conversões com 10 LPVs:**
- 10 pessoas chegaram na landing page. 0 leads. CVR de landing = 0%.
- Benchmark mínimo para produto de entrada com captura nome/email: **10–20% de CVR**.
- Isso NÃO é falha do anúncio. O anúncio está performando excepcionalmente.
- Hipóteses (em ordem de probabilidade):
  1. **Formulário com problema técnico** — botão não enviando, campo quebrado, JS com erro
  2. **Pixel Lead não disparando no submit** — formulário envia mas o evento não é registrado
  3. **Pouco volume estatístico** — 10 visitas é ruído. Com n=10 é matematicamente possível ter CVR=0% mesmo com landing funcional (probabilidade ~20% se CVR real fosse 15%)
  4. **Experiência mobile ruim** — Advantage+ entrega mobile-first; testar formulário no celular

**✅ Ação imediata recomendada:**
```
1. Abrir clubelivromulhermaravilha.arianaborges.com no celular agora
2. Preencher o formulário do zero (nome + email falsos)
3. Verificar: a página de obrigado/confirmação aparece?
4. No Events Manager do Meta: o evento Lead aparece em tempo real?
```

**🟡 Watchlist técnico:**
- `attribution_spec`: apenas 7-day click, sem view-through window — pode subestimar conversões de quem viu e converteu depois
- `end_time` não retornado pela API no ad set ativo — confirmar se data de encerramento 25/03 está configurada no Gerenciador
- `balance API` = R$4,96 = igual a `amount_spent` — comportamento normal em conta pós-paga (PayPal primário); PIX R$175 aumenta threshold de pagamento, não aparece como saldo

### Decisão de budget D1 → D2

**Status do gatilho:** Spend R$4,96 < R$20 → **Regra Sobral: NÃO mexer ainda.**

Quando spend chegar em R$20:
- Se CPL chegar (ex: 1 lead a R$20): 🟡 Observar
- Se ainda 0 leads com R$20 gasto: investigar pixel antes de qualquer decisão de budget
- CTR está verde → **manter R$35 para D1 conforme cronograma**

### IDs de campanha (registro permanente)

| Objeto | ID | Status |
|--------|-----|--------|
| Campanha | `120244359833560528` | ACTIVE |
| Ad Set ativo (feminino) | `120244359889580528` | ACTIVE |
| Ad ativo | `120244359889930528` | ACTIVE |
| Creative | `1836647317045591` | ACTIVE |
| Ad Set pausado (broad, erro inicial) | `120244359839490528` | PAUSED |
| Ad pausado (broad) | `120244359844560528` | ADSET_PAUSED |
| Pixel | `1414964383316703` | — |
| Conta | `act_127633088624150` | ACTIVE |
| Melhor variante | — |
| Observações | — |

---

## 11. Plano Sobral (execucao imediata) — IG 365d + criativos da agencia

> 🥷 Se o publico ja te conhece no Instagram, usa isso como alavanca. Jedi nao complica: estrutura simples, teste limpo, corte rapido.

### 11.1 Estrutura recomendada (7 dias)

Objetivo: `OUTCOME_SALES` com otimizacao em `Purchase`.

Modelo recomendado: **ABO** no inicio para controlar verba por publico.

```
CAMPANHA
└── [CDL] Purchase | IG365 + Broad | MAR26
     ├── ADSET 1: [IG365] Engajados Instagram 365d | Purchase
     └── ADSET 2: [Broad] Advantage+ BR Mulheres 25-65 | Purchase
```

Exclusoes nos 2 adsets:
- Compradoras ultimos 180 dias
- Lista de clientes pagas (se houver)
- Quem ja entrou no grupo (se houver base)

### 11.2 Distribuicao de verba (7 dias)

- D1-D2: IG365 60% | Broad 40%
- D3-D4: manter se CPA estiver dentro da meta
- D5-D7: mover 70% para o vencedor (menor CPA Purchase com volume)

Regra de ajuste:
- Escala apenas em incrementos de 20%-30% por vez
- Nunca editar publico, criativo e budget no mesmo dia

### 11.3 Matriz de criativos (pasta anexa)

Arquivos validados:
- Feed 4:5 (1080x1350):
  - `FEED IAB .png`
  - `FEED IAB  (1).png`
  - `FEED IAB  (2).png`
  - `FEED IAB  (3).png`
- Story 9:16 (1080x1920):
  - `Story Ariana (1).png`
  - `Story Ariana (2).png`
  - `Story Ariana (3).png`

Uso recomendado:
- Feed/Reels feed: 4 pecas FEED IAB
- Stories/Reels: 3 pecas Story Ariana

Configuracao pratica:
- 1 anuncio por arquivo (nao agrupar tudo em um unico anuncio)
- Nomear com sufixo do arquivo para leitura rapida de performance

### 11.4 Copy pronta (estilo Sobral, curta e direta)

Variacao A (dor real):
```
Voce comeca o livro e para no capitulo 2?
Nao e falta de vontade. E falta de estrutura.
No Clube do Livro da Ariana, voce tem grupo, data e conducao ao vivo.
Vagas abertas. Entre agora.
```

Variacao B (mecanismo):
```
Ler sozinha cansa. Ler com metodo transforma.
Encontros guiados + grupo feminino + livro do mes.
Clique e garanta sua vaga no Clube do Livro.
```

Variacao C (urgencia):
```
Turma com vagas limitadas.
Se voce quer voltar a ler com constancia, esse e o momento.
Entre no Clube do Livro e participe da proxima roda.
```

Headlines sugeridas:
- `Vagas limitadas para a proxima turma`
- `Clube do Livro com Ariana Borges`
- `Participe do grupo feminino de leitura`

CTA: `Saiba mais` ou `Cadastre-se`.

### 11.5 Regras de otimizacao (sem achismo)

Pausar criativo se, apos gasto minimo de R$20 por anuncio:
- CTR link < 0,8% e
- Sem `InitiateCheckout` ou sem `Purchase`

Manter criativo se:
- CTR >= 1,5% e
- Gera `InitiateCheckout` com CPM aceitavel

Escalar criativo/adset se:
- Menor CPA de `Purchase` por 2 dias consecutivos e
- Frequencia < 2,5

### 11.6 Checklist obrigatorio de rastreamento (Pixel ativo)

Pixel ativo: `1414964383316703`

Eventos esperados no funil atual do codigo:
1. `ViewContent`
    - Disparo: ao carregar a landing do Clube
2. `Lead`
    - Disparo: clique no CTA de checkout (`pricing_cta`)
    - Observacao: trava por sessao para evitar duplicidade local
3. `InitiateCheckout`
    - Disparo: mesmo clique do CTA que abre o checkout
4. `Purchase`
    - Browser: pagina de obrigado apos confirmacao do pagamento
    - Server: webhook InfinitePay (CAPI)

Deduplicacao de compra (obrigatoria):
- `event_id` padrao: `clube-purchase-{order_nsu}-{transaction_nsu}`
- Browser e server enviam o mesmo `event_id`

Validacao em Test Events:
- Verificar chegada de `ViewContent`, `Lead`, `InitiateCheckout`, `Purchase`
- Confirmar `Purchase` browser + server com mesmo `event_id`
- Se faltar server event, revisar `META_ACCESS_TOKEN` e logs do webhook

### 11.7 Regra de decisao final (quem fica)

Ao fim da janela de teste:
- Manter IG365 se tiver menor CPA Purchase com volume minimo
- Manter Broad se CPA semelhante e maior escala potencial
- Manter ambos se IG365 ganha em eficiencia e Broad ganha em volume

> 🥷 Regra Sobral final: cada centavo e teste. Mantem o que vende, corta o que so gasta.

---

## 12. Plano de guerra D-2 (faltam 2 dias)

> 🥷 Agora e execucao curta: 48h para aquecer, converter e chegar na abertura com sinal claro de compra.

### 12.1 Objetivo das proximas 48h

- Prioridade unica: `Purchase`
- Meta operacional: aumentar volume de `InitiateCheckout` e `Purchase` antes da abertura
- Decisao ate D-0: manter IG365, Broad, ou ambos

### 12.2 Cronograma rapido (D-2 ate D-0)

**D-2 (hoje):**
- Subir adset IG365 + Broad em paralelo (ABO)
- Publicar todos os 7 criativos ja validados (4 feed + 3 story)
- Validar Test Events em tempo real (ViewContent, Lead, InitiateCheckout, Purchase)

**D-1 (amanha):**
- Primeira rodada de corte: pausar anuncios com CTR baixo e sem checkout
- Concentrar verba nos 2 melhores anuncios por CPA de Purchase ou por sinal de checkout
- Ajustar copy para urgencia explicita: "abre amanha" / "ultimas vagas"

**D-0 (dia da abertura):**
- Push de verba no vencedor (incremento de 20%-30%)
- Manter apenas criativos com tracao real
- Reforcar stories com CTA direto para checkout

### 12.3 Regras de corte acelerado (48h)

Com gasto minimo de R$15-R$20 por anuncio:
- Pausar se CTR link < 0,8% e zero `InitiateCheckout`
- Pausar se CPM alto e sem progresso de funil
- Manter se gera checkout mesmo sem compra inicial
- Escalar so quem mostra menor custo por `InitiateCheckout`/`Purchase`

### 12.4 Copy de urgencia (usar na janela curta)

V1:
```
Faltam 2 dias para a abertura da turma.
Se voce quer voltar a ler com constancia, essa e a hora.
Entre no Clube do Livro agora.
```

V2:
```
Abertura em 48h.
Grupo feminino, encontros guiados e vagas limitadas.
Clique e garanta sua vaga.
```

V3:
```
Abre em 2 dias.
Nao deixa para depois o que pode transformar seu ano de leitura.
Participe da proxima turma.
```

### 12.5 Travas tecnicas obrigatorias (nao negociar)

- Pixel ativo: `1414964383316703`
- `Purchase` deduplicado com mesmo `event_id` no browser e no webhook
- Conferir `META_ACCESS_TOKEN` valido no ambiente
- Se `Purchase` server-side falhar, nao escalar budget ate corrigir

---

## 13. Playbook operacional rapido (D-2, verba curta)

> Uso pratico para decisoes em janela curta com orcamento apertado.

### 13.1 Pre-check obrigatorio (antes de qualquer comparacao)

1. Confirmar token com permissao de `read` e `update`.
2. Confirmar cada adset com pelo menos 1 anuncio `ACTIVE`.
3. Confirmar insights no periodo (se vier vazio, nao comparar performance).
4. Confirmar eventos minimos de funil chegando (`landing_page_view` e sinal de checkout).

### 13.2 Regra de alocacao imediata de budget

Se um adset estiver com tracao real e outro sem entrega:
- concentrar 100% da verba no adset com tracao
- pausar o adset sem entrega ate corrigir estrutura

Aplicacao feita nesta rodada:
- IG365: `ACTIVE` com R$65/dia
- Broad: `PAUSED` (sem anuncios ativos no momento da comparacao)

### 13.3 Condicao para reabrir Broad (sem achismo)

Reabrir somente quando:
1. houver ao menos 1 criativo vencedor do IG replicado no Broad
2. anuncio estiver `ACTIVE` e entregando
3. reteste iniciar com split controlado (80/20) por janela curta

### 13.4 Checklist pos-alteracao (sempre executar)

1. Ler status e budget dos adsets via API apos update.
2. Verificar se mudanca foi aplicada (nao assumir por resposta de sucesso).
3. Registrar horario da mudanca para leitura correta da proxima janela.
4. Reavaliar em checkpoint objetivo (ex.: apos R$15-R$20 por anuncio).
