# Recanto Miami — Landing Page

Landing page do **Recanto Miami**, espaço para casamentos, festas e eventos. O objetivo do site é apresentar o espaço real — filme, fotos, casamentos e depoimentos autênticos — e transformar visitantes interessados em **conversas qualificadas no WhatsApp**, com mensagem pré-preenchida e editável.

> **Status atual:** a Seção 01 (Hero + barra de navegação + vídeo de fundo) está implementada. As demais seções estão em fase de design no Figma e **ainda não foram implementadas**. Veja [Status da implementação](#status-da-implementação).

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
├── src/
│   ├── config/
│   │   ├── site.ts             # Âncoras das seções (ordem do site map)
│   │   └── contact.ts          # Número e mensagem do WhatsApp (isolados para confirmação)
│   ├── lib/whatsapp.ts         # Montagem segura da URL wa.me (+ testes)
│   ├── components/
│   │   ├── layout/             # Navbar, MobileMenu (menu em <dialog> nativo)
│   │   └── ui/                 # ButtonLink, WhatsAppCta, WhatsAppIcon
│   ├── sections/hero/          # Hero, HeroVideo, useHeroVideo
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

## Status da implementação

| Seção | Design (Figma) | Implementação |
|---|---|---|
| 01 — Hero + navegação | Aprovado (rev. 2) | **Implementado** |
| 02 a 08 | Em andamento / não iniciado | Não iniciado |

Pendências conhecidas:

- **WhatsApp:** número (`+55 11 98946-4713`) e mensagem de orçamento foram copiados do site oficial atual e aguardam confirmação do proprietário (`src/config/contact.ts`).
- **Logo oficial:** ainda não fornecido; a navegação usa o nome "Recanto Miami" em Bodoni Moda.
- **Crédito do filme:** espaço previsto no rodapé do Hero, oculto até o texto ser confirmado.
- **Âncoras de navegação** (`#o-recanto`, `#espacos`, …) passam a funcionar à medida que cada seção for implementada.
- A navegação "Solid" (após o Hero) e o CTA flutuante mobile serão implementados com as próximas seções.
