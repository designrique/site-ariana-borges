# Instagram Design System — Instituto Ariana Borges
**Versão 1.0 · Design System Architect · Design Squad**

---

## 1. Tokens Fundacionais

> Tokens são a fonte única de verdade. Toda decisão visual deriva daqui.
> Base: `tailwind.config.ts` já existente no repositório.

### 1.1 Paleta de Cores — Instagram

#### Cores Primárias (do `brand.*`)
| Token | Hex | Uso no Instagram |
|-------|-----|-----------------|
| `brand-beige` | `#F9F7F2` | Fundo de posts educativos, backgrounds de carrossel |
| `brand-gold` | `#D4AF37` | Acentos, linha de destaque, ícones CTAs |
| `brand-goldDark` | `#8C6D1F` | Texto sobre fundo claro, subtítulos |
| `brand-goldLight` | `#F3E5AB` | Fundo de depoimentos, slides de citações |
| `brand-lilac` | `#E6E6FA` | Badges, tags de categoria, fundo de stories suaves |
| `brand-lilacDark` | `#6A4BB8` | Títulos principais, CTAs, elementos de autoridade |
| `brand-dark` | `#2C2C2C` | Texto corrido, copy principal |

#### Cores de Suporte Instagram (do `goddess.*`)
| Token | Hex | Uso no Instagram |
|-------|-----|-----------------|
| `goddess-moonlight` | `#F0EDF8` | Fundo de slides de reflexão |
| `goddess-sunset` | `#C67C3A` | Acentos quentes, emojis visuais, bordas de depoimento |
| `goddess-purple` | `#6A4BB8` | Mesmo que `brand-lilacDark` — consistência |

#### Cores Proibidas no Instagram
- ❌ `state-error` (`#dc3545`) — dissonante com o posicionamento premium
- ❌ Qualquer cor neon ou saturada além da paleta definida
- ❌ Branco puro `#FFFFFF` como background principal (use `brand-beige`)

---

### 1.2 Tipografia

| Papel | Família | Peso | Tamanho típico | Uso |
|-------|---------|------|----------------|-----|
| **Display** | Playfair Display | 700 | 48–64px | Headline do post, primeira frase do carrossel |
| **Body** | Inter | 400/500 | 16–20px | Copy corrido, legendas internas |
| **Accent** | Dancing Script | 400 | 24–36px | Citações, assinatura, "Instituto Ariana Borges" em posts especiais |
| **Label** | Inter | 700 | 11–13px | Tags, categorias, badges uppercase |

#### Regras Tipográficas para Instagram
1. **Nunca mais de 2 famílias em um post** — Playfair + Inter é o par padrão
2. **Hierarquia clara**: Display → Body → Label (nunca inverter)
3. **Contraste mínimo**: 4.5:1 para texto sobre qualquer fundo
4. **Tamanho mínimo legível em mobile**: 14px equivalente

---

### 1.3 Espaçamento e Grid

Base: escala de 8px (já definida no `tailwind.config.ts`)

| Token | Valor | Uso |
|-------|-------|-----|
| `space-4` | 16px | Padding mínimo de post |
| `space-6` | 24px | Espaçamento interno de elementos |
| `space-8` | 32px | Separação entre blocos visuais |
| `space-12` | 48px | Margem de segurança de bordas do post |

**Safe zone Instagram:** 80px de cada lado para Stories (área de interação da UI)

---

## 2. Componentes Visuais — Templates por Formato

### 2.1 Post Estático Quadrado (1080×1080px)

#### Variante A — "Reflexão" (fundo claro)
```
┌─────────────────────────────────┐
│ ← padding 48px →                │
│                                  │
│  [badge categoria — uppercase]   │ ← Inter 11px / brand-lilacDark / brand-lilac bg
│                                  │
│  Headline em                     │ ← Playfair Display 700 / 52px / brand-dark
│  Playfair                        │
│                                  │
│  ────────── [linha gold 2px] ──  │ ← brand-gold
│                                  │
│  Subcopy em Inter               │ ← Inter 400 / 18px / brand-dark / opacity 0.75
│  máximo 2 linhas                │
│                                  │
│                    @instituto    │ ← Inter 500 / 13px / brand-goldDark
└─────────────────────────────────┘
Background: brand-beige (#F9F7F2)
```

#### Variante B — "Autoridade" (fundo escuro)
```
┌─────────────────────────────────┐
│                                  │
│  [textura sutil ou gradient]    │ ← brand-dark → #1a1625
│                                  │
│  Headline em                     │ ← Playfair Display 700 / 52px / brand-goldLight
│  Playfair ouro                   │
│                                  │
│  Subcopy em Inter               │ ← Inter 400 / 18px / white / opacity 0.80
│                                  │
│                    @instituto    │ ← Inter 500 / 13px / brand-gold
└─────────────────────────────────┘
Background: radial-gradient(brand-dark, #1a1625)
```

#### Variante C — "Depoimento"
```
┌─────────────────────────────────┐
│  ← borda left 6px goddess-sunset│
│                                  │
│  [aspas grandes Playfair]       │ ← 96px / brand-gold / opacity 0.3
│                                  │
│  "Texto do depoimento em        │ ← Playfair 400 italic / 24px / brand-dark
│   Dancing Script ou Playfair    │
│   italic..."                    │
│                                  │
│  — Nome da mulher               │ ← Inter 500 / 14px / brand-goldDark
│    Clube do Livro / Encontro    │ ← Inter 400 / 12px / brand-dark / opacity 0.6
│                                  │
│                    @instituto    │
└─────────────────────────────────┘
Background: brand-goldLight (#F3E5AB)
```

---

### 2.2 Carrossel (1080×1080px — múltiplos slides)

#### Estrutura Obrigatória
| Slide | Função | Componente |
|-------|--------|-----------|
| **Slide 1 — Capa** | Para o scroll | Headline forte + categoria |
| **Slides 2–N** | Entrega de valor | Conteúdo estruturado |
| **Slide final — CTA** | Conversão | CTA único + @handle |

#### Sistema de Cores por Tema
| Tema | Cor dominante | Acento |
|------|--------------|--------|
| Educativo | `brand-beige` | `brand-lilacDark` |
| Reflexivo | `goddess-moonlight` | `brand-gold` |
| Urgência/CTA | `brand-goldLight` | `brand-dark` |
| Depoimento | `brand-goldLight` | `goddess-sunset` |

#### Regra de Progressão Visual
- Slide 1: 100% impacto — Playfair grande, uma ideia
- Slides 2–N: 60% espaço branco, texto centralizado, respira
- Slide final: cor diferente dos demais (sinaliza "fim")

#### Elemento de Continuidade
Seta `→` ou linha visual na borda direita de cada slide (exceto o último)
Cor: `brand-gold` / opacidade 60%

---

### 2.3 Reels — Cover (1080×1920px)

> O cover do Reel é visto no feed 1:1 (cropped no centro). Conteúdo crítico deve estar nos 1080×1080px centrais.

#### Zona segura
```
┌─────────────────────────────────┐ ← 1080px
│         [zona decorativa]       │
├─────────────────────────────────┤ ← 420px do topo
│                                  │
│  ZONA SEGURA (1080×1080px)      │
│                                  │
│  Hook visual + texto principal  │ ← Playfair 700 / 56px / white com sombra
│                                  │
│  Máximo 6 palavras no centro    │
│                                  │
├─────────────────────────────────┤ ← 420px do rodapé
│    [zona decorativa/UI overlay] │
└─────────────────────────────────┘
```

#### 3 Templates de Cover
**T1 — Talking Head:** Foto da Ariana à direita, texto à esquerda sobre overlay dark
**T2 — Text Only:** Fundo `brand-dark` com headline `brand-goldLight`, linha `brand-gold`
**T3 — Bastidor:** Foto ambiental com overlay gradiente, texto centralizado

---

### 2.4 Stories (1080×1920px)

#### Zonas de Interação (não colocar conteúdo crítico)
- Top 250px: área do @handle e ícones da UI
- Bottom 400px: área de resposta/swipe

#### Templates de Story

**Story Educativo**
- Background: `brand-beige`
- Título: Playfair 700 / 36px / `brand-dark`
- Corpo: Inter 400 / 18px / `brand-dark`
- Enquete/CTA no rodapé: fundo `brand-lilac`

**Story de Bastidor**
- Foto full-bleed com overlay `brand-dark` / 40% opacidade
- Texto: Inter 500 / 20px / white
- Handle: `brand-gold`

**Story de Urgência**
- Background: `brand-goldLight`
- Linha acentual: `brand-dark` / 4px
- CTA: `brand-lilacDark` / bold

---

## 3. Estratégia de Grid — Feed Instagram

### 3.1 Padrão de Alternância (9-grid view)

```
┌────┬────┬────┐
│ Ed │ Re │ Ed │  ← Linha 1: Educativo / Reel cover / Educativo
├────┼────┼────┤
│ De │ Ed │ Cit│  ← Linha 2: Depoimento / Educativo / Citação
├────┼────┼────┤
│ Reel│Ed │ De │  ← Linha 3: Reel / Educativo / Depoimento
└────┴────┴────┘

Ed = Educativo (brand-beige bg)
Re = Reel cover (dark bg)
De = Depoimento (brand-goldLight bg)
Cit = Citação (goddess-moonlight bg)
```

### 3.2 Regras do Grid
1. **Nunca 2 posts escuros adjacentes** (linha ou coluna)
2. **Reels na coluna central** sempre que possível (maior destaque)
3. **Depoimentos distantes**: mínimo 3 posts entre depoimentos
4. **Sequência de cores**: claro → escuro → claro (nunca 3 claros seguidos)

### 3.3 Proporção de Conteúdo (regra 70/20/10)
| Tipo | % | Descrição |
|------|---|-----------|
| Educativo/Reflexivo | 70% | Valor direto — posts que ganham seguidores |
| Depoimento/Prova | 20% | Confiança — posts que convertem |
| CTA/Produto | 10% | Conversão — posts que vendem |

---

## 4. Elementos de Identidade

### 4.1 Assinatura Visual
Todo post deve ter **exatamente um** desses elementos de assinatura:
- Handle `@institutoarianaborges` — Inter 500 / 13px / `brand-goldDark`
- Logo do Instituto (se existir) — canto inferior direito / 120px max
- Linha dourada 2px — como separador visual interno

**Posição padrão**: canto inferior direito, padding 32px

### 4.2 Badge de Categoria
Elemento obrigatório em posts educativos e carrosséis:
```
[ ✦ DESENVOLVIMENTO PESSOAL ]
```
- Fonte: Inter 700 / 11px / uppercase / letter-spacing: 2px
- Cor: `brand-lilacDark` sobre `brand-lilac` com opacidade 30%
- Border-radius: full (pill)
- Padding: 6px 16px

**Categorias estabelecidas:**
- ✦ DESENVOLVIMENTO PESSOAL
- ✦ CLUBE DO LIVRO
- ✦ ENCONTRO DAS DEUSAS
- ✦ AUTOCONHECIMENTO
- ✦ BASTIDORES

### 4.3 Linha de Acento
Elemento de assinatura visual do Instituto:
- Largura: 48px
- Espessura: 3px
- Cor: `brand-gold` (`#D4AF37`)
- Sempre horizontal
- Posição: abaixo do badge, acima do headline

### 4.4 Textura de Fundo (opcional)
Para posts premium (Encontro das Deusas):
- Grain texture sutil / opacidade 5–8%
- Não usar em posts educativos simples

---

## 5. Regras de Composição

### 5.1 Hierarquia Visual (ordem de leitura)
```
1. Badge categoria (posiciona contexto)
2. Headline (razão de parar o scroll)
3. Linha de acento dourada
4. Subcopy ou imagem
5. Assinatura @handle
```

### 5.2 Proporção Áurea Aplicada
- Headline: ocupa ~60% da área útil
- Subcopy: ~25%
- Elementos de marca: ~15%

### 5.3 Uso de Fotografia
**Quando usar foto:**
- Reels cover: sempre
- Depoimentos: foto da aluna (com autorização)
- Bastidores: foto ambiente do Instituto

**Tratamento fotográfico:**
- Preset de cor: warm tone (+temperatura +15, +amarelo +10)
- Contraste: levemente elevado (+10)
- Grain: sutil (para coerência com textura da marca)
- Nunca: filtros de redes sociais, efeitos de câmera vintage artificial

---

## 6. Acessibilidade

| Requisito | Especificação |
|-----------|--------------|
| Contraste mínimo (texto) | 4.5:1 (WCAG AA) |
| Contraste mínimo (grande) | 3:1 (texto ≥ 24px bold) |
| Texto sobre foto | Sempre com overlay / shadow |
| Alt text | Obrigatório em todos os posts |
| Legenda automática | Ativar nos Reels |

### Pares de Contraste Validados
| Texto | Fundo | Ratio | Status |
|-------|-------|-------|--------|
| `brand-dark` `#2C2C2C` | `brand-beige` `#F9F7F2` | 12.5:1 | ✅ AAA |
| `brand-lilacDark` `#6A4BB8` | `brand-beige` `#F9F7F2` | 5.8:1 | ✅ AA |
| `brand-goldLight` `#F3E5AB` | `brand-dark` `#2C2C2C` | 8.2:1 | ✅ AAA |
| `brand-gold` `#D4AF37` | `brand-dark` `#2C2C2C` | 5.1:1 | ✅ AA |
| white `#FFFFFF` | `brand-lilacDark` `#6A4BB8` | 5.6:1 | ✅ AA |

---

## 7. O que NUNCA fazer

| Proibido | Razão |
|----------|-------|
| Fontes decorativas além das 3 definidas | Fragmenta a identidade |
| Mais de 3 cores por post | Reduz legibilidade e autoridade |
| Texto sobre foto sem overlay | Falha de contraste e acessibilidade |
| Capitalização inconsistente | Destrói hierarquia tipográfica |
| 2 CTAs no mesmo post | Dilui a ação esperada |
| Emojis no corpo do texto de posts visuais | Diminui percepção premium |
| Fundo branco puro `#FFFFFF` | Fora da paleta — usa `brand-beige` |
| Degradê de cores fora da paleta | Sinaliza falta de sistema |
| Templates genéricos de Canva sem adaptação | Dilui identidade única |

---

## 8. Checklist de Aprovação — Por Post

Antes de publicar qualquer post, verificar:

**Identidade**
- [ ] Badge de categoria presente
- [ ] Linha de acento dourada presente
- [ ] Handle @institutoarianaborges visível
- [ ] Máximo 2 famílias tipográficas

**Hierarquia**
- [ ] Headline legível em 3 segundos
- [ ] Ordem de leitura: badge → headline → body → CTA
- [ ] Espaço em branco suficiente (mínimo 20% da área)

**Qualidade Técnica**
- [ ] Resolução: 1080×1080px (post) / 1080×1920px (story/reel)
- [ ] Contraste validado (4.5:1 mínimo)
- [ ] Alt text escrito antes de publicar
- [ ] Paleta restrita aos tokens definidos

**Copywriting**
- [ ] Um único CTA por post
- [ ] Máximo 3 hashtags
- [ ] Tom alinhado com a plataforma (ver `calendario-ig-tiktok-ogilvy.md`)

---

## 9. Evolução do Sistema

### Quando atualizar tokens
- Novo produto lançado → criar token de cor específico (ex: `event-xyz`)
- Feedback consistente de audiência → documentar e versionar
- Rebrand completo → bump de versão major (v2.0)

### Versionamento
- **v1.0** (atual): Sistema base + Instagram
- **v1.1**: Extensão para TikTok (adaptação de ratios)
- **v1.2**: Extensão para LinkedIn (paleta corporativa)
- **v2.0**: Rebrand completo — se identidade mudar substantivamente

---

*Design System Architect · Design Squad · Instituto Ariana Borges*
*Base: `tailwind.config.ts` · Referência: `socialmedia/calendario-ig-tiktok-ogilvy.md`*
