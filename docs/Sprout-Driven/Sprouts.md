# Codessa Growing — Sprouts

Este documento descreve os **Sprouts**, os **construtores visuais semânticos** do Codessa Growing.
Os Sprouts representam blocos funcionais que orientam a construção de interfaces modulares, responsivas e elegantes.
Cada Sprout define um conjunto de **mixins semânticos** organizados por domínio visual e estrutural, prontos para serem instanciados nos Trunks.

---

## Índice

- [Visão Geral](#visão-geral)
- [Structures](#structures)
- [Navigation](#navigation)
- [Textual](#textual)
- [Fields](#fields)
- [Media](#media)
- [Behaviors](#behaviors)
- [Interactions](#interactions)
- [Utils](#utils)

---

## Visão Geral

Os Sprouts são mixins Sass que encapsulam padrões de estilo reutilizáveis. Eles consomem as **Veins** (variáveis semânticas) definidas nos **Soils** para aplicar estilos de forma consistente. Ao usar Sprouts, você garante que seus componentes sigam o vocabulário de design do Codessa Growing e se adaptem automaticamente a diferentes temas e densidades.

## `Structures`

**Arquivo:** `_structures.scss`
Construtores voltados para composição estrutural da interface. Definem containers, seções, grids, alinhamentos flexbox, colunas e espaçamentos.

**Blocos:**
- Containers
- Sections
- Grids
- Flex Alignments
- Columns
- Spacings (Mixins Auxiliares)
- Helpers

**Veins envolvidos:**
- `container.*`
- `gap.*`
- `padding.*`
- `breakpoint.*` (para mixins como `sprout-grid`)
- `container-padding-inline`

## `Navigation`

**Arquivo:** `_navigation.scss`
Construtores voltados para composição de elementos de navegação. Definem menus, breadcrumbs, tabs, paginação, grupos, divisores e navegação scrollável.

**Blocos:**
- Menus & Lists
- Breadcrumbs
- Tabs
- Pagination
- Navigation Groups
- Navigation Dividers
- Navigation Scrollable

**Veins envolvidos:**
- `gap.*`
- `breakpoint.*`
- `container.*`
- `font.*`
- `border.*`
- `text.*` (para `sprout-nav-group-heading`)

## `Textual`

**Arquivo:** `_textual.scss`
Construtores voltados para composição tipográfica da interface. Definem estilos para headings, parágrafos, links, truncamento, tipografia fluida e blocos de código.

**Blocos:**
- Headings
- Paragraphs
- Links
- Fluid Type
- Truncation
- Text Helpers
- Code Blocks

**Veins envolvidos:**
- `text.*`
- `font.*`
- `leading.*`
- `letter-spacing.*`
- `link.*`
- `border-radius.*`
- `focus-ring.*`
- `type.mono` (do Seed `Type`)
- `padding.*`
- `margin.*`
- `bg.*`

## `Fields`

**Arquivo:** `_fields.scss`
Construtores voltados para composição de campos de formulário. Definem estilos base para inputs, labels, hints, estados visuais e agrupamentos semânticos.

**Blocos:**
- Field Base
- Field Sizes
- Field States
- Labels & Hints
- Field Groups

**Veins envolvidos:**
- `bg.*`, `text.*`, `border.*`
- `font.*`, `leading.*`
- `border-radius.*`, `opacity.*`
- `focus-ring.*`
- `gap.*`, `padding.*`

## `Media`

**Arquivo:** `_media.scss`
Construtores voltados para composição responsiva e elementos de mídia. Definem breakpoints semânticos, containers fluidos e proporções visuais.

**Blocos:**
- Breakpoints
- Media Containers
- Aspect Ratios

**Veins envolvidos:**
- `breakpoint.*`
- `container.*`
- `container-padding-inline`

## `Behaviors`

**Arquivo:** `_behaviors.scss`
Construtores voltados para transições, animações e efeitos visuais. Definem comportamentos que dão fluidez e expressão à interface.

**Blocos:**
- Transitions
- Animations
- Effects

**Veins envolvidos:**
- `duration.*`
- `timing.*`
- `opacity.*`
- `filter.*`

## `Interactions`

**Arquivo:** `_interactions.scss`
Construtores voltados para elementos interativos da interface. Definem estilos para botões, campos com feedback visual e estados de navegação.

**Blocos:**
- Buttons
- Interactive Fields
- Navigation States

**Veins envolvidos:**
- `interactive.*`
- `text.*`, `font.*`
- `border.*`, `border-radius.*`
- `duration.*`, `timing.*`
- `focus-ring.*`
- `opacity.*`
- `padding.*`

## `Utils`

**Arquivo:** `_utils.scss`
Construtores utilitários voltados para resets específicos e helpers funcionais.

**Blocos:**
- Unstyled Elements
- Debug Helpers

**Veins envolvidos:**
- `inherit` (para `color`, `text-decoration`, `font`)
- `opacity.*`
- `outline` (para `sprout-debug-outline`)