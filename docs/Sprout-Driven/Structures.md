# Structures

## Visão Geral

O módulo Structures (layout.scss) contém mixins para construir layouts estruturais, incluindo containers, grids, flexbox utilities, espaçamento e posicionamento.

## Funcionalidades Principais

### Sistema de Containers
- **Containers responsivos:** Largura máxima e padding automático
- **Container fluido:** Largura total
- **Container customizado:** Tamanhos específicos

### Sistema de Grid
- **CSS Grid:** Sistema de grid flexível
- **Grid center:** Centralização de conteúdo
- **Grid customizado:** Colunas e espaçamento personalizáveis

### Flexbox Utilities
- **Flex alignments:** Sistema completo de flexbox
- **Flex row/column:** Atalhos para layouts comuns
- **Flex gap:** Espaçamento integrado

### Sistema de Espaçamento
- **Spacing block/inline:** Margens verticais/horizontais
- **Padding block/inline:** Padding consistente
- **Spacing directions:** Controle preciso por lado

### Utilitários de Layout
- **Dimensions:** Largura/altura viewport-based
- **Overflow control:** Controle de overflow
- **Clearfix:** Limpeza de floats

## Estrutura do Módulo

```
layout.scss
├── Containers          # Sistema de containers
├── Sections           # Seções estruturais
├── Grids             # Sistema de grid CSS
├── Flexbox           # Utilitários flexbox
├── Columns           # Sistema de colunas
├── Spacing           # Sistema de espaçamento
└── Helpers           # Utilitários diversos
```

## Uso Básico

```scss
// Container responsivo
.main-content {
  @include sprout-container($size: 'lg', $padding: true, $center: true);
}

// Grid flexível
.grid-layout {
  @include sprout-grid($cols: 12, $gap: 'md');
}

// Flexbox utilities
.flex-row {
  @include sprout-flex-row($gap: 'md', $align: 'center');
}

// Espaçamento consistente
.spaced-element {
  @include sprout-padding-block('lg');
  @include sprout-spacing-inline('md');
}
```

## Integração com Trunks

Os structures são utilizados internamente pelos componentes trunk:

```scss
// Trunk usa structures internamente
.card-component {
  @include sprout-container();        // Structure
  @include sprout-padding('md');      // Structure
  @include sprout-flex-column();      // Structure
  // ... outras funcionalidades
}
```

## Boas Práticas

### Design System
- Use containers para consistência de largura
- Mantenha espaçamento consistente com a escala
- Combine grids e flexbox conforme necessário

### Performance
- Use `sprout-overflow-hidden()` para isolamento
- Minimize layout calculations
- Considere impacto de `sprout-full-width()`

### Responsividade
- Containers são automaticamente responsivos
- Use viewport mixins com cuidado
- Teste layouts em diferentes tamanhos

## Documentação Técnica dos Sprouts

### Containers

#### `sprout-container()`
**Função:** Cria container responsivo com largura máxima e padding.

**Parâmetros:**
- `$size` (String): Tamanho - `'full'`, `'sm'`, `'md'`, `'lg'`, `'xl'` (padrão: `'full'`)
- `$padding` (Boolean): Aplicar padding horizontal (padrão: `true`)
- `$center` (Boolean): Centralizar horizontalmente (padrão: `true`)

**Exemplo:**
```scss
.responsive-container {
  @include sprout-container('lg', true, true);
}
```

#### `sprout-container-fluid()`
**Função:** Container que ocupa toda a largura disponível.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.full-width-section {
  @include sprout-container-fluid();
}
```

### Sections

#### `sprout-section()`
**Função:** Define seção com altura mínima baseada em viewport.

**Parâmetros:**
- `$min-height-size` (String): Altura mínima (padrão: `'full'`)

**Exemplo:**
```scss
.hero-section {
  @include sprout-section('full');
}
```

#### `sprout-section-center()`
**Função:** Centraliza conteúdo vertical e horizontalmente.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.centered-content {
  @include sprout-section-center();
}
```

#### `sprout-section-padding()`
**Função:** Adiciona padding consistente à seção.

**Parâmetros:**
- `$space` (String): Valor do padding (padrão: `'md'`)

**Exemplo:**
```scss
.padded-section {
  @include sprout-section-padding('lg');
}
```

### Grids

#### `sprout-grid()`
**Função:** Sistema de grid CSS com colunas responsivas.

**Parâmetros:**
- `$cols` (Number): Número de colunas (padrão: `12`)
- `$gap` (String): Espaçamento entre itens (padrão: `'md'`)

**Exemplo:**
```scss
.responsive-grid {
  @include sprout-grid(12, 'lg');
}
```

#### `sprout-grid-center()`
**Função:** Centraliza conteúdo no grid.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.centered-grid {
  @include sprout-grid-center();
}
```

### Flexbox Alignments

#### `sprout-flex()`
**Função:** Sistema completo de flexbox.

**Parâmetros:**
- `$justify` (String): Justificação - `'start'`, `'end'`, `'center'`, `'between'`, `'around'` (padrão: `'center'`)
- `$align` (String): Alinhamento - `'start'`, `'end'`, `'center'`, `'stretch'` (padrão: `'center'`)
- `$direction` (String): Direção - `'row'`, `'column'`, `'row-reverse'`, `'column-reverse'` (padrão: `'row'`)
- `$wrap` (String): Quebra - `'nowrap'`, `'wrap'`, `'wrap-reverse'` (padrão: `'nowrap'`)
- `$gap` (String/Null): Espaçamento (padrão: `null`)

**Exemplo:**
```scss
.flex-layout {
  @include sprout-flex('between', 'center', 'row', 'wrap', 'md');
}
```

#### `sprout-flex-row()`
**Função:** Atalho para layout flex horizontal.

**Parâmetros:**
- `$gap` (String/Null): Espaçamento (padrão: `null`)
- `$align` (String): Alinhamento vertical (padrão: `'center'`)
- `$justify` (String): Justificação horizontal (padrão: `'start'`)

**Exemplo:**
```scss
.horizontal-layout {
  @include sprout-flex-row('md', 'center', 'between');
}
```

#### `sprout-flex-column()`
**Função:** Atalho para layout flex vertical.

**Parâmetros:**
- `$gap` (String/Null): Espaçamento (padrão: `null`)
- `$align` (String): Alinhamento horizontal (padrão: `'start'`)
- `$justify` (String): Justificação vertical (padrão: `'start'`)

**Exemplo:**
```scss
.vertical-layout {
  @include sprout-flex-column('lg', 'center', 'center');
}
```

### Columns

#### `sprout-column-flex()`
**Função:** Define propriedades flex para colunas.

**Parâmetros:**
- `$grow` (Number): Flex-grow (padrão: `1`)
- `$basis` (Unit): Flex-basis (padrão: `0`)

**Exemplo:**
```scss
.flex-column {
  @include sprout-column-flex(2, '200px');
}
```

#### `sprout-column-fixed()`
**Função:** Cria coluna com largura fixa baseada em containers.

**Parâmetros:**
- `$size` (String): Tamanho do container - `'sm'`, `'md'`, `'lg'`, `'xl'` (padrão: `'md'`)

**Exemplo:**
```scss
.fixed-sidebar {
  @include sprout-column-fixed('lg');
}
```

### Spacing Utilities

#### `sprout-spacing-block()`
**Função:** Adiciona margem vertical (margin-block).

**Parâmetros:**
- `$space` (String): Valor do espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.vertical-margin {
  @include sprout-spacing-block('lg');
}
```

#### `sprout-spacing-inline()`
**Função:** Adiciona margem horizontal (margin-inline).

**Parâmetros:**
- `$space` (String): Valor do espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.horizontal-margin {
  @include sprout-spacing-inline('sm');
}
```

#### `sprout-spacing-top()`
**Função:** Margem superior.

**Parâmetros:**
- `$space` (String): Valor (padrão: `'md'`)

#### `sprout-spacing-bottom()`
**Função:** Margem inferior.

**Parâmetros:**
- `$space` (String): Valor (padrão: `'md'`)

#### `sprout-spacing-left()`
**Função:** Margem esquerda.

**Parâmetros:**
- `$space` (String): Valor (padrão: `'md'`)

#### `sprout-spacing-right()`
**Função:** Margem direita.

**Parâmetros:**
- `$space` (String): Valor (padrão: `'md'`)

#### `sprout-padding-block()`
**Função:** Padding vertical.

**Parâmetros:**
- `$space` (String): Valor (padrão: `'md'`)

#### `sprout-padding-inline()`
**Função:** Padding horizontal.

**Parâmetros:**
- `$space` (String): Valor (padrão: `'md'`)

#### `sprout-padding()`
**Função:** Padding em todas as direções.

**Parâmetros:**
- `$space` (String): Valor (padrão: `'md'`)

### Dimensions

#### `sprout-full-width()`
**Função:** Largura total do container.

**Parâmetros:** Nenhum

#### `sprout-full-height()`
**Função:** Altura total do container.

**Parâmetros:** Nenhum

#### `sprout-viewport-height()`
**Função:** Altura baseada em viewport height.

**Parâmetros:**
- `$percentage` (Number): Porcentagem da viewport (padrão: `100`)

#### `sprout-viewport-width()`
**Função:** Largura baseada em viewport width.

**Parâmetros:**
- `$percentage` (Number): Porcentagem da viewport (padrão: `100`)

### Helpers

#### `sprout-clearfix()`
**Função:** Limpa floats usando micro-clearfix.

**Parâmetros:** Nenhum

#### `sprout-overflow-hidden()`
**Função:** Define overflow: hidden.

**Parâmetros:** Nenhum

#### `sprout-overflow()`
**Função:** Controla comportamento de overflow.

**Parâmetros:**
- `$type` (String): Tipo de overflow (padrão: `'auto'`)

### Dependências e Variáveis

**Variáveis CSS necessárias:**
- `--container-*`: Tamanhos de containers (sm, md, lg, xl, full)
- `--container-padding-inline`: Padding horizontal
- `--gap-*`: Valores de espaçamento (xs, sm, md, lg, xl)

### Notas de Uso

- **Performance:** Use `sprout-overflow-hidden()` para isolamento
- **Consistência:** Sempre use tokens de espaçamento
- **Flexibilidade:** Mixins podem ser combinados
- **Responsividade:** Containers são automaticamente responsivos

## Documentação Técnica dos Sprouts

Esta seção documenta todos os sprouts (mixins e funções) disponíveis no arquivo `_structures.scss`, com suas funções específicas, parâmetros aceitos e valores esperados.

### Containers

#### `sprout-container()`
**Função:** Cria um container responsivo com largura máxima e padding automático.

**Parâmetros:**
- `$size` (String): Tamanho do container - `'full'`, `'sm'`, `'md'`, `'lg'`, `'xl'` (padrão: `'full'`)
- `$padding` (Boolean): Se deve aplicar padding (padrão: `true`)
- `$center` (Boolean): Se deve centralizar horizontalmente (padrão: `true`)

**Exemplo:**
```scss
.main-container {
  @include sprout-container('lg', true, true);
}
```

#### `sprout-container-fluid()`
**Função:** Cria um container que ocupa toda a largura disponível.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.full-width-section {
  @include sprout-container-fluid();
}
```

#### `sprout-container-spacing()`
**Função:** Adiciona espaçamento inferior a containers.

**Parâmetros:**
- `$space` (String): Valor do espaçamento - `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` (padrão: `'xl'`)

**Exemplo:**
```scss
.section-spacing {
  @include sprout-container-spacing('lg');
}
```

### Sections

#### `sprout-section()`
**Função:** Define uma seção com altura mínima específica.

**Parâmetros:**
- `$min-height-size` (String): Altura mínima baseada em container sizes (padrão: `'full'`)

**Exemplo:**
```scss
.hero-section {
  @include sprout-section('lg');
}
```

#### `sprout-section-spacing()`
**Função:** Adiciona espaçamento consistente a seções.

**Parâmetros:**
- `$space` (String): Valor do espaçamento (padrão: `'xl'`)

**Exemplo:**
```scss
.content-section {
  @include sprout-section-spacing('lg');
}
```

#### `sprout-section-center()`
**Função:** Centraliza conteúdo de seção vertical e horizontalmente.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.centered-section {
  @include sprout-section-center();
}
```

#### `sprout-section-padding()`
**Função:** Adiciona padding consistente a seções.

**Parâmetros:**
- `$space` (String): Valor do padding (padrão: `'md'`)

**Exemplo:**
```scss
.padded-section {
  @include sprout-section-padding('lg');
}
```

### Grids

#### `sprout-grid()`
**Função:** Cria um sistema de grid CSS com colunas responsivas.

**Parâmetros:**
- `$cols` (Number): Número de colunas (padrão: `12`)
- `$gap` (String): Espaçamento entre itens (padrão: `'md'`)

**Exemplo:**
```scss
.responsive-grid {
  @include sprout-grid(12, 'lg');
}
```

#### `sprout-grid-row-gap()`
**Função:** Define apenas o gap entre linhas do grid.

**Parâmetros:**
- `$gap` (String): Espaçamento entre linhas (padrão: `'md'`)

**Exemplo:**
```scss
.row-spaced-grid {
  @include sprout-grid-row-gap('lg');
}
```

#### `sprout-grid-col-gap()`
**Função:** Define apenas o gap entre colunas do grid.

**Parâmetros:**
- `$gap` (String): Espaçamento entre colunas (padrão: `'md'`)

**Exemplo:**
```scss
.column-spaced-grid {
  @include sprout-grid-col-gap('sm');
}
```

#### `sprout-grid-center()`
**Função:** Centraliza itens no grid tanto horizontal quanto verticalmente.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.centered-grid {
  @include sprout-grid-center();
}
```

### Flexbox Alignments

#### `sprout-flex()`
**Função:** Sistema completo de flexbox com todas as propriedades principais.

**Parâmetros:**
- `$justify` (String): Justificação dos itens - `'start'`, `'end'`, `'center'`, `'between'`, `'around'` (padrão: `'center'`)
- `$align` (String): Alinhamento dos itens - `'start'`, `'end'`, `'center'`, `'stretch'` (padrão: `'center'`)
- `$direction` (String): Direção do flex - `'row'`, `'column'`, `'row-reverse'`, `'column-reverse'` (padrão: `'row'`)
- `$wrap` (String): Comportamento de quebra - `'nowrap'`, `'wrap'`, `'wrap-reverse'` (padrão: `'nowrap'`)
- `$gap` (String/Null): Espaçamento entre itens (padrão: `null`)

**Exemplo:**
```scss
.flex-layout {
  @include sprout-flex('between', 'center', 'row', 'wrap', 'md');
}
```

#### `sprout-flex-row()`
**Função:** Atalho para layout flex horizontal.

**Parâmetros:**
- `$gap` (String/Null): Espaçamento entre itens (padrão: `null`)
- `$align` (String): Alinhamento vertical (padrão: `'center'`)
- `$justify` (String): Justificação horizontal (padrão: `'start'`)

**Exemplo:**
```scss
.horizontal-flex {
  @include sprout-flex-row('md', 'stretch', 'between');
}
```

#### `sprout-flex-column()`
**Função:** Atalho para layout flex vertical.

**Parâmetros:**
- `$gap` (String/Null): Espaçamento entre itens (padrão: `null`)
- `$align` (String): Alinhamento horizontal (padrão: `'start'`)
- `$justify` (String): Justificação vertical (padrão: `'start'`)

**Exemplo:**
```scss
.vertical-flex {
  @include sprout-flex-column('lg', 'center', 'center');
}
```

### Columns

#### `sprout-column-flex()`
**Função:** Define propriedades flex para colunas.

**Parâmetros:**
- `$grow` (Number): Flex-grow (padrão: `1`)
- `$basis` (Unit): Flex-basis (padrão: `0`)

**Exemplo:**
```scss
.flex-column {
  @include sprout-column-flex(2, '200px');
}
```

#### `sprout-column-fixed()`
**Função:** Cria coluna com largura fixa baseada em containers.

**Parâmetros:**
- `$size` (String): Tamanho baseado em containers - `'sm'`, `'md'`, `'lg'`, `'xl'` (padrão: `'md'`)

**Exemplo:**
```scss
.fixed-sidebar {
  @include sprout-column-fixed('lg');
}
```

#### `sprout-column-auto()`
**Função:** Cria coluna com largura automática.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.auto-column {
  @include sprout-column-auto();
}
```

#### `sprout-column-spacing()`
**Função:** Adiciona espaçamento horizontal a colunas.

**Parâmetros:**
- `$space` (String): Valor do espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.spaced-column {
  @include sprout-column-spacing('lg');
}
```

#### `sprout-columns-center()`
**Função:** Centraliza múltiplas colunas.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.centered-columns {
  @include sprout-columns-center();
}
```

### Spacing Utilities

#### `sprout-spacing-block()`
**Função:** Adiciona espaçamento vertical (margin-block).

**Parâmetros:**
- `$space` (String): Valor do espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.vertical-spacing {
  @include sprout-spacing-block('lg');
}
```

#### `sprout-spacing-inline()`
**Função:** Adiciona espaçamento horizontal (margin-inline).

**Parâmetros:**
- `$space` (String): Valor do espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.horizontal-spacing {
  @include sprout-spacing-inline('sm');
}
```

#### `sprout-spacing-top()`
**Função:** Adiciona margem superior.

**Parâmetros:**
- `$space` (String): Valor da margem (padrão: `'md'`)

**Exemplo:**
```scss
.top-margin {
  @include sprout-spacing-top('lg');
}
```

#### `sprout-spacing-bottom()`
**Função:** Adiciona margem inferior.

**Parâmetros:**
- `$space` (String): Valor da margem (padrão: `'md'`)

**Exemplo:**
```scss
.bottom-margin {
  @include sprout-spacing-bottom('xl');
}
```

#### `sprout-spacing-left()`
**Função:** Adiciona margem esquerda.

**Parâmetros:**
- `$space` (String): Valor da margem (padrão: `'md'`)

**Exemplo:**
```scss
.left-margin {
  @include sprout-spacing-left('sm');
}
```

#### `sprout-spacing-right()`
**Função:** Adiciona margem direita.

**Parâmetros:**
- `$space` (String): Valor da margem (padrão: `'md'`)

**Exemplo:**
```scss
.right-margin {
  @include sprout-spacing-right('sm');
}
```

#### `sprout-padding-block()`
**Função:** Adiciona padding vertical.

**Parâmetros:**
- `$space` (String): Valor do padding (padrão: `'md'`)

**Exemplo:**
```scss
.vertical-padding {
  @include sprout-padding-block('lg');
}
```

#### `sprout-padding-inline()`
**Função:** Adiciona padding horizontal.

**Parâmetros:**
- `$space` (String): Valor do padding (padrão: `'md'`)

**Exemplo:**
```scss
.horizontal-padding {
  @include sprout-padding-inline('sm');
}
```

#### `sprout-padding()`
**Função:** Adiciona padding em todas as direções.

**Parâmetros:**
- `$space` (String): Valor do padding (padrão: `'md'`)

**Exemplo:**
```scss
.all-padding {
  @include sprout-padding('lg');
}
```

### Helpers

#### `sprout-clearfix()`
**Função:** Limpa floats usando micro-clearfix.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.float-container {
  @include sprout-clearfix();
}
```

#### `sprout-overflow-hidden()`
**Função:** Define overflow hidden.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.hidden-overflow {
  @include sprout-overflow-hidden();
}
```

#### `sprout-full-width()`
**Função:** Define largura total do container.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.full-width-element {
  @include sprout-full-width();
}
```

#### `sprout-full-height()`
**Função:** Define altura mínima total do container.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.full-height-element {
  @include sprout-full-height();
}
```

#### `sprout-height-vh()`
**Função:** Define altura baseada em viewport height.

**Parâmetros:**
- `$size` (Number): Porcentagem da altura da viewport (padrão: `10`)

**Exemplo:**
```scss
.half-screen {
  @include sprout-height-vh(50);
}
```

#### `sprout-min-height-vh()`
**Função:** Define altura mínima baseada em viewport height.

**Parâmetros:**
- `$size` (Number): Porcentagem da altura da viewport (padrão: `10`)

**Exemplo:**
```scss
.at-least-half-screen {
  @include sprout-min-height-vh(50);
}
```

#### `sprout-max-height-vh()`
**Função:** Define altura máxima baseada em viewport height.

**Parâmetros:**
- `$size` (Number): Porcentagem da altura da viewport (padrão: `10`)

**Exemplo:**
```scss
.at-most-half-screen {
  @include sprout-max-height-vh(50);
}
```

#### `sprout-overflow()`
**Função:** Define comportamento de overflow.

**Parâmetros:**
- `$type` (String): Tipo de overflow - `'auto'`, `'hidden'`, `'scroll'`, `'visible'` (padrão: `'auto'`)

**Exemplo:**
```scss
.scrollable-content {
  @include sprout-overflow('scroll');
}
```

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--container-*`: Tamanhos de containers (sm, md, lg, xl, full)
- `--container-padding-inline`: Padding horizontal dos containers
- `--gap-*`: Valores de espaçamento (xs, sm, md, lg, xl)
- `--border-width-1`: Largura padrão da borda
- Todos os valores de padding e margin tokens

### Notas de Uso

- **Performance:** Use `sprout-overflow-hidden()` para isolamento de layout
- **Responsividade:** Combine com media queries para layouts adaptativos
- **Consistência:** Sempre use os tokens de espaçamento do sistema
- **Flexibilidade:** Mixins podem ser combinados para layouts complexos
- **Acessibilidade:** Considere impacto de overflow hidden no conteúdo

## Próximos Passos

- [ ] Implementar CSS Subgrid
- [ ] Adicionar suporte a Masonry layout
- [ ] Criar sistema de layout adaptativo
- [ ] Otimizar para CSS Containment