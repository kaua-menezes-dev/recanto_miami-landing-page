# Recanto Miami — Landing Page

Landing page do **Recanto Miami**, espaço para casamentos, festas e eventos. O objetivo do site é apresentar o espaço real — filme, fotos, casamentos e depoimentos autênticos — e transformar visitantes interessados em **conversas qualificadas no WhatsApp**, com mensagem pré-preenchida e editável.

> **Status atual:** a Seção 01 (Hero + barra de navegação + vídeo de fundo), a Seção 02 (depoimento + revelação da foto no scroll), a Seção 03 (galeria panorâmica dos espaços) a Seção 04 (histórias reais — galeria vertical + álbuns dos casamentos) a Seção 06 (depoimentos em mosaico com movimento sutil das colunas) e a Seção 07 (planeje seu evento — formulário que abre o WhatsApp com a mensagem pronta) estão implementadas; a Seção 05 está implementada em um pull request aguardando revisão. As demais seções estão em fase de design no Figma e **ainda não foram implementadas**. Veja [Status da implementação](#status-da-implementação).

## Objetivo de negócio

- Causar uma primeira impressão memorável com o filme real do espaço.
- Levar o visitante da inspiração a uma mensagem de orçamento pronta no WhatsApp — sem formulários longos e sem prometer disponibilidade.
- Abrir o WhatsApp **não** é enviar a mensagem: o visitante revisa e confirma o envio dentro do próprio WhatsApp.

## Stack

| Camada | Escolha | Motivo |
|---|---|---|
| UI | React 19 + TypeScript (strict) | Componentes reutilizáveis e tipagem segura |
| Build | Vite 8 | Build rápido, saída estática leve |
| Estilos | Tailwind CSS 4 (`@theme` com os tokens do Design System) | Tokens do Figma como fonte única de cores, tipografia e movimento |
| Ícones | Lucide React (traço 1.5, igual ao Design System) | Ícones de interface com tree-shaking |
| Fontes | Bodoni Moda + Hanken Grotesk via Fontsource (auto-hospedadas) | Sem requisições a terceiros; só o subconjunto latino é baixado |
| Testes | Vitest | Testes unitários da montagem da URL do WhatsApp |
| Qualidade | ESLint (typescript-eslint, react-hooks) | Padrões de código e regras de hooks |

**Motion for React não foi instalado:** as animações de entrada do Hero são simples (opacity + transform) e foram feitas em CSS, sem custo de JavaScript. A biblioteca pode ser adicionada quando uma seção realmente precisar (ex.: galerias).

## Como rodar localmente

Requisitos: Node.js 20.19+ (ou 22.12+) e npm.

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build de produção em http://localhost:4173
npm run typecheck
npm run lint
npm test
```

Configuração opcional: copie `.env.example` para `.env` para sobrescrever o número do WhatsApp por ambiente (`VITE_WHATSAPP_PHONE`).

## Estrutura do projeto

```text
├── docs/                       # Documentação aprovada (marca, design, conversão, workflow)
├── public/media/hero/          # Renditions web do filme + pôster (gerados do original)
├── public/media/intro/         # Foto real da Seção 02 em WebP (16:9, 3:2, 4:5)
├── public/media/stories/       # 40 fotos reais dos 5 casamentos (WebP 384/828/1280)
├── src/
│   ├── config/
│   │   ├── site.ts             # Âncoras das seções (ordem do site map)
│   │   └── contact.ts          # Número e mensagem do WhatsApp (isolados para confirmação)
│   ├── lib/whatsapp.ts         # Montagem segura da URL wa.me (+ testes)
│   ├── lib/easing.ts           # Curvas cubic-bezier do Design System para animações no scroll (+ testes)
│   ├── components/
│   │   ├── layout/             # Navbar, MobileMenu (menu em <dialog> nativo)
│   │   └── ui/                 # ButtonLink, WhatsAppCta, WhatsAppIcon
│   ├── sections/hero/          # Hero, HeroVideo, useHeroVideo
│   ├── sections/intro/         # Intro (Seção 02), useScrollReveal
│   ├── sections/spaces/        # Spaces (Seção 03), useHorizontalGallery
│   ├── sections/stories/       # Stories (Seção 04), StoryAlbum, useStoriesGallery, dados dos casamentos
│   ├── sections/testimonials/  # Testimonials (Seção 06), deriva das colunas, revelação dos cards, depoimentos reais
│   ├── sections/plan/          # PlanEvent (Seção 07), InquiryForm, opções e mensagem do WhatsApp (+ testes)
│   └── styles/index.css        # Tokens do Design System, tipografia, overlay e animações
├── CLAUDE.md                   # Regras do projeto para o Claude Code
└── PRODUCT.md                  # Contexto de produto
```

## Fluxo de design para desenvolvimento

1. **Documentação primeiro:** identidade visual, direção criativa, site map, fluxo de conversão e decisões ficam em `docs/`.
2. **Design System no Figma:** cores (modos Day/Evening), tipografia, grid, espaçamentos, movimento e componentes — aprovado pelo responsável pelo projeto.
3. **Uma seção por vez no Figma:** cada seção é desenhada em desktop, tablet e mobile e só avança com aprovação explícita (registrada em `docs/workflow/figma-section-prototyping.md`).
4. **Implementação fiel:** os valores (tamanhos, espaçamentos, cores, estados) são lidos diretamente dos frames e variáveis do Figma e convertidos em tokens CSS.
5. **Validação no navegador:** o resultado renderizado é comparado com os frames aprovados antes do merge.

## Desenvolvimento assistido por IA

Este projeto também é um estudo de caso de desenvolvimento assistido por IA. A IA acelera a pesquisa, o design e a implementação; **direção, requisitos, aprovação de design e aceite final são decisões humanas.**

Como o trabalho foi conduzido:

- **Claude Code** como agente de desenvolvimento: leitura da documentação, implementação, testes, validação no navegador e operações Git — sempre dentro de permissões e portões de aprovação definidos pelo responsável.
- **Figma MCP** para criar o Design System e as seções como frames editáveis no Figma, e depois para **ler** os valores exatos (variáveis, estilos de texto, componentes) durante a implementação.
- **Skills do projeto** (`.claude/skills/`): `prototype-section` e `critique-section` para o fluxo de design seção por seção; o hook do **Impeccable** verifica automaticamente cada arquivo de UI editado.
- **Engenharia de contexto:** `CLAUDE.md` enxuto, documentação por tema e um registro de decisões evitam que a IA trate ideias como requisitos aprovados ou invente conteúdo (depoimentos, números, preços).
- **Human-in-the-loop:** cada seção do Figma exigiu aprovação explícita; silêncio ou elogio não contam como aprovação. Fatos não confirmados (ex.: número do WhatsApp) ficam isolados em configuração e sinalizados como pendentes.

Competências demonstradas: engenharia de prompt, desenvolvimento frontend assistido por IA, engenharia de contexto e documentação técnica, fluxo design-to-code, orquestração de ferramentas de IA (Claude Code + Figma MCP + skills), validação com humano no circuito, versionamento com Git/GitHub e validação de performance e acessibilidade.

## Garantia de qualidade

Verificações executadas na implementação do Hero:

- `npm run typecheck`, `npm run lint`, `npm test` (5 testes da URL do WhatsApp) e `npm run build` — sem erros.
- `npm audit` — 0 vulnerabilidades conhecidas.
- Inspeção no navegador do build de produção em 1440×900, 1280×800, 1024×768, 768×1024, 390×844 e 360×740, comparando com os frames do Figma: navegação centralizada no viewport (desktop), quebra do título em 3 linhas, sem overflow horizontal.
- Vídeo: reprodução automática (mudo), rendition correta por breakpoint e botão pausar/reproduzir funcionando.
- Menu mobile: abre como modal, foco vai para "Fechar", Esc fecha e o foco volta para "Menu"; rolagem da página bloqueada enquanto aberto.
- Teclado: link "Pular para o conteúdo" primeiro na ordem de tabulação; anel de foco dourado de 2px.
- Performance local: CLS 0 e nenhuma long task durante o carregamento.

Verificações executadas na implementação da Seção 02:

- `npm run typecheck`, `npm run lint`, `npm test` (8 testes: WhatsApp + curvas de easing) e `npm run build` — sem erros.
- Build de produção no navegador em 1440×900, 1280×800, 768×1024, 390×844, 375×812 e 360×740: citação com 5 linhas (≥1280) e 6 linhas (abaixo), sem overflow horizontal, CLS 0 durante a rolagem, sem erros no console.
- Revelação medida pela variável `--reveal-progress`: 0 → ~0,5 → 1 ao descer e retorno aos mesmos valores ao subir (desktop e celular); trecho de ≈ 83vh no desktop e ≈ 63vh no celular.
- Imagem: a fonte correta é escolhida por breakpoint (16:9, 3:2, 4:5).

Ainda **não** verificado: comportamento com `prefers-reduced-motion` e Save-Data em navegador real (implementado no código, não emulado), testes em dispositivos físicos iOS/Android e auditoria Lighthouse em ambiente de produção.

## Acessibilidade e performance (Hero)

- HTML semântico (`header`, `nav`, `main`, `section` com `h1`), link para pular navegação, rótulos acessíveis e alvos de toque ≥ 44px.
- Vídeo decorativo (`aria-hidden`), mudo, em loop, sem controles nativos, com controle próprio sempre visível (WCAG 2.2.2).
- `prefers-reduced-motion` ou Save-Data: sem autoplay e sem animações de entrada; o pôster aparece e o visitante pode iniciar o filme.
- O filme pausa quando o Hero sai da tela (exceto se o visitante pausou manualmente) e volta ao reaparecer.
- Overlay de contraste ancorado ao bloco de texto, garantindo legibilidade sobre qualquer quadro do vídeo.
- Vídeo em posição absoluta com pôster pré-carregado: sem layout shift.

### Mídia do Hero

| Arquivo | Resolução | Codec | Bitrate | Tamanho |
|---|---|---|---|---|
| Original (local, fora do Git) | 1920×1080, 29,97 fps, 29,5 s | H.264 High | 3,2 Mbps | 11,9 MB |
| `hero-1080p.mp4` (≥1024px) | 1920×1080 | H.264 High, faststart, sem áudio | 2,2 Mbps (2 passes) | 8,2 MB |
| `hero-720p.mp4` (<1024px) | 1280×720 | H.264 High, faststart, sem áudio | 1,1 Mbps (2 passes) | 4,1 MB |
| `hero-poster.webp` | 1280×720 (primeiro quadro) | WebP | — | 77 KB |

## Seção 02 — O Recanto (depoimento + foto)

- **Composição:** pausa editorial em modo Day (marfim) logo após o Hero noturno, sem divisória: eyebrow, citação centralizada da noiva, atribuição, foto e CTA discreto "Conheça nossos espaços" (âncora para a Seção 03).
- **Citação:** Bodoni Moda 80 px (≥1280), 56 px (tablet) e 30 px fluido (celular), com as quebras de linha aprovadas no Figma (5 linhas no desktop, 6 abaixo). "É como se unisse tudo." fica sempre em linha própria, em itálico e `text-accent` (gold-deep, AA sobre marfim).
- **Revelação no scroll:** a foto começa numa janela central (560×315 de 1280×720 no desktop; 440×293 no tablet; 280×350 no celular) e abre até o quadro inteiro enquanto a imagem interna volta de 1,15 → 1,0 — revela mais do lugar em vez de dar zoom. O progresso é função pura da posição de rolagem (volta ao rolar para cima), sem pin nem scroll-jacking.
- **Técnica:** `useScrollReveal` lê o `getBoundingClientRect` uma vez por frame (rAF, listener passivo ativo só perto da viewport via IntersectionObserver) e escreve uma única variável CSS `--reveal-progress`; o CSS converte em `clip-path: inset()` + `transform: scale()`. Nenhum re-render do React durante o scroll; o tamanho de layout não muda (CLS 0).
- **Curva:** o progresso usa a curva "Drift" do Design System (ease-in-out), em vez da "Settle" citada nas notas do Figma — com o scroll controlando a animação, a Settle concentrava quase toda a abertura no início; a Drift deixa a expansão perceptível ao longo de todo o trecho.
- **Movimento reduzido:** sem crescimento nem escala — a foto aparece no estado final e os textos sem animação de entrada.
- **Foto:** `cerimonia-altar` (foto profissional do site atual, também usada nos frames do Figma), com recortes por breakpoint via `<picture>` — 16:9 (1280/1920 px), 3:2 (960/1376 px) e 4:5 (640/864 px), WebP de 93 a 258 KB, `loading="lazy"` e `decoding="async"`.

## Seção 04 — Histórias Reais (galeria vertical + álbuns)

- **Referência:** Codrops *Infinite Scroll Gallery with Page Transitions using GSAP* (código estudado). Reproduzido: coluna de fotos de larguras variadas, deslocadas para os lados; revelação da foto (1 s) e da legenda letra a letra (25 ms) ao entrar na tela, repetindo ao voltar; velocidades diferentes por foto suavizadas como o "playhead" da referência; clique isola a foto (as outras somem em 0,5 s) e ela se transforma no álbum (1,2 s, power4.inOut); fechar faz o caminho de volta (1 s).
- **Adaptação aprovada:** a referência captura a roda do mouse para girar a galeria sem fim. Aqui a página rola normalmente (sem scroll-jacking): o início da sequência reaparece sob um degradê ("costura do loop") e se dissolve no CTA final. As velocidades são por coluna (direita 1,12×, esquerda 0,975×) porque, na composição aprovada, fotos da mesma coluna ficam a até 3 px uma da outra — velocidades individuais as fariam se sobrepor (teste em `storiesMotion.test.ts`).
- **Composição (Figma):** 10 fotos (2 por casamento) com quadros de 400 px de altura e larguras de 300 a 440 px, posições exatas do frame de 1440; no celular, coluna única escalonada com 7 fotos (todos os casamentos presentes) a cada 477 px.
- **Interações:** cursor próprio "Ver história" (disco marfim de 104 px que segue o ponteiro com ~120 ms de atraso), foto 1,04 dentro da máscara, véu de 10% e legenda trocando "8 fotos" por "Ver história" em dourado; foco por teclado com anel + selo "Ver história"; toque com o selo sempre visível; pressionado 0,97.
- **Álbum:** `<dialog>` nativo em modo Evening — foto à esquerda (58%) e painel verde à direita no desktop; tela cheia rolável no celular. Anterior/próxima, miniaturas, ← → no teclado, deslizar no toque, "Próxima história". Fecha por "Voltar às histórias", ×, Esc ou Voltar do navegador; a rolagem da página fica intacta e o foco volta ao card que abriu o álbum.
- **CTA:** "Agende uma visita" abre o WhatsApp com a mesma mensagem de visita do site atual ("Olá! Gostaria de agendar uma visita ao Recanto Miami.").
- **Performance:** WebP 384/828/1280 com `srcset`/`sizes`, `loading="lazy"` (exceto as 2 primeiras), dimensões reservadas (sem CLS); profundidade e cursor só com ponteiro fino, ≥768 px e movimento permitido; um único loop rAF que dorme quando estabiliza e só escuta o scroll perto da galeria; medidas apenas no resize; nenhum re-render do React durante o scroll. Movimento reduzido: sem profundidade, escala ou cursor; fotos e legendas já visíveis; álbum com fades de 200 ms.

## Seção 06 — Depoimentos (mosaico)

- **Referência:** 21st.dev *Testimonial V2* — colunas independentes, cards de alturas diferentes e colunas que se movem em ritmos diferentes. Adaptação: o loop infinito virou um deslocamento ligado à rolagem (sem loop, sem autoplay, sem pin), com o visual Botanical Luxury do Figma (rev. 2).
- **Composição (Figma rev. 2):** fundo areia (Natural Sand), cards marfim de 338 px com cantos de 12 px, sem borda nem sombra, padding de 32 px; título em Bodoni Moda Medium 24, depoimento em 15 px (16 px no tablet/celular), nome e evento. Grade de 1062 px com 3 colunas (gutter 24) e inícios escalonados (+64 / 0 / +32 px) a partir de 1280 px; 2 colunas (até 800 px) a partir de 768 px; 1 coluna no celular. O card da Marcella (verde Forest) tem o mesmo tamanho dos outros. Sem CTA.
- **Movimento das colunas:** `useColumnDrift` escreve uma única variável `--drift` (−1 → 1, zero com a seção centralizada) e cada coluna a converte em `translateY` pela sua amplitude: desktop A ±12 px, B 0 (acompanha a página), C ±6 px; tablet só a coluna B, ±8 px, com ponteiro fino; celular sem deslocamento. Linear na rolagem, só `transform`, listener passivo ativo apenas perto da seção (IntersectionObserver) e uma leitura de layout por frame. Enquanto a Seção 06 for a última da página, o fim do trecho é limitado à última posição alcançável, para o movimento completo acontecer.
- **Entrada:** título com a mesma entrada das outras seções (traço → eyebrow → título → texto, 80 ms). Cards: um único IntersectionObserver marca cada card uma vez (opacidade + 12 px, 600 ms Settle), escalonando os que entram juntos linha a linha; ao mudar de breakpoint a entrada não se repete. Deslocamento e entrada ficam em elementos diferentes (coluna × card), sem conflito de `transform`.
- **Acessibilidade:** `section` com `h2`; cada card é `figure` + `blockquote` + `figcaption`; nada é interativo. Movimento reduzido: sem deslocamento e cards visíveis sem animação.

## Status da implementação

| Seção | Design (Figma) | Implementação |
|---|---|---|
| 01 — Hero + navegação | Aprovado (rev. 2) | **Implementado** |
| 02 — O Recanto (depoimento) | Aprovado (rev. 1) | **Implementado** |
| 03 — Nossos Espaços (galeria panorâmica) | Aprovado (rev. 1) | **Implementado** |
| 04 — Histórias Reais (galeria + álbuns) | Aprovado (rev. 1) | **Implementado** |
| 05 — Experiências e Serviços | Aprovado (rev. 1) | Implementado no PR #2 (aguardando revisão) |
| 06 — Depoimentos (mosaico) | Aprovado (rev. 2) | **Implementado** |
| 07 — Planeje seu evento (formulário + WhatsApp) | Aprovado (rev. 1) | **Implementado** |
| 08 — CTA final e rodapé | Em revisão | Não iniciado |

Pendências conhecidas:

- **Seção 02:** confirmar que o depoimento é de um evento do Recanto Miami e que a noiva autorizou o uso; confirmar os direitos da foto `cerimonia-altar`. O CTA "Conheça nossos espaços" aponta para `#espacos` (Seção 03).
- **Seção 03:** confirmar os direitos das fotos `jardim-vista`, `cerimonia-corredor`, `piscina` e `salao` (cópias WebP do site atual; originais em alta resolução seriam preferíveis).
- **Seção 04:** confirmar a licença das 40 fotos (crédito @NairobiComunicacao no site atual) e a autorização dos casais; as iniciais (J + M, G + L, N + W, A + I, T + G) são os rótulos já publicados. O relato opcional de cada casal (marcador no Figma) não é exibido até existir texto real autorizado.
- **Seção 06:** confirmar a autorização de cada depoimento e nome e que todos se referem ao Recanto Miami; o título do card da Marcella é um trecho literal do próprio depoimento; o rótulo "Casamento" vem do título "Nas palavras das noivas" do site atual. Não há fotos autorizadas das clientes (o espaço opcional para foto do Figma não é exibido) nem depoimento de outros tipos de evento.
- **Seção 07:** os campos, opções e o modelo da mensagem repetem o formulário do site atual (auditado em 23/10/2026); "Ainda não tenho data" foi acrescentado no design. Nome e tipo de evento são obrigatórios (decisão do design; o site atual não exige nenhum campo). A foto `salao` é a mesma da Seção 03 (direitos a confirmar; uma foto dedicada seria preferível). O número do WhatsApp vem de `src/config/contact.ts` (a confirmar com o proprietário). Os valores digitados ficam só no `sessionStorage` da visita; nada é enviado a servidor.

- **WhatsApp:** número (`+55 11 98946-4713`) e mensagem de orçamento foram copiados do site oficial atual e aguardam confirmação do proprietário (`src/config/contact.ts`).
- **Logo oficial:** ainda não fornecido; a navegação usa o nome "Recanto Miami" em Bodoni Moda.
- **Crédito do filme:** espaço previsto no rodapé do Hero, oculto até o texto ser confirmado.
- **Âncoras de navegação** (`#o-recanto`, `#espacos`, …) passam a funcionar à medida que cada seção for implementada.
- A navegação "Solid" (após o Hero) e o CTA flutuante mobile serão implementados com as próximas seções.
