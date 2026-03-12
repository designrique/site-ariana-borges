# Task Plan: Otimização de Assets — DNA Básico

## Goal
Reduzir o tamanho dos arquivos de imagem e vídeo em `public/dna-basico/` para que possam ser commitados no git e servidos eficientemente pelo Vercel.

## Assets a Otimizar

| Arquivo | Tamanho atual | Meta |
|---------|--------------|------|
| animation-hero-dna/ (frames JPG) | 6.6MB | < 3MB (WebP) |
| ariana-meditando.jpg | 584KB | < 150KB (WebP) |
| theta-ariana-aula.jpg | 8.5MB | < 300KB (WebP) |
| theta-healing-turma.jpg | 6.9MB | < 300KB (WebP) |
| theta-healing-animation.mp4 | 3.1MB | < 1.5MB |
| video-theta.mp4 | 39MB | < 10MB |
| thetha-healing.mp4 | 39MB | < 10MB |
| dna-basico-fotos/ (22 JPGs) | 118MB | < 15MB (WebP) |

## Phases

### Phase 1: Verificar ferramentas disponíveis [ ]
- [ ] Checar ffmpeg (vídeo)
- [ ] Checar cwebp / ImageMagick (imagens)
- [ ] Definir estratégia por tipo de arquivo

### Phase 2: Otimizar imagens JPG → WebP [ ]
- [ ] ariana-meditando.jpg
- [ ] theta-ariana-aula.jpg
- [ ] theta-healing-turma.jpg
- [ ] dna-basico-fotos/ (galeria, 22 arquivos)
- [ ] animation-hero-dna/ (frames da animação)

### Phase 3: Otimizar vídeos MP4 [ ]
- [ ] video-theta.mp4
- [ ] thetha-healing.mp4
- [ ] theta-healing-animation.mp4

### Phase 4: Atualizar referências no código [ ]
- [ ] Verificar onde cada arquivo é referenciado
- [ ] Atualizar extensões JPG → WebP onde aplicável
- [ ] Testar localmente

### Phase 5: Commitar e fazer push [ ]
- [ ] git add public/dna-basico/
- [ ] git commit + push upstream main

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|

## Decisions
- Manter JPGs originais ou substituir por WebP? → Substituir (menos peso, browser support amplo)
- Vídeos: H.264 CRF 28, 1280px max width
- Frames de animação: converter para WebP quality 75
