# Navigation

## Visão Geral

O módulo Navigation (nav.scss) contém mixins para construir componentes de navegação, incluindo barras, listas, breadcrumbs, tabs, pagination e elementos estruturais.

## Funcionalidades Principais

### Sistema de Barras de Navegação
- **Barra configurável:** Altura e espaçamento flexíveis
- **Layouts flexíveis:** Horizontal e vertical
- **Scroll automático:** Navegação rolável com snap

### Sistema de Listas
- **Listas estruturadas:** Reset automático de estilos
- **Grupos organizados:** Hierarquia visual clara
- **Cabeçalhos de seção:** Destaque para grupos

### Componentes de Navegação
- **Breadcrumbs:** Navegação hierárquica
- **Tabs:** Sistema de abas horizontal/vertical
- **Pagination:** Navegação paginada

### Elementos Auxiliares
- **Dividers:** Separadores horizontal/vertical
- **Estados interativos:** Active, hover, focus
- **Scroll com snap:** Navegação touch-friendly

## Estrutura do Módulo

```
nav.scss
├── Navigation Bars      # Barras de navegação
├── Navigation Layouts   # Layouts horizontal/vertical
├── Navigation Lists     # Listas estruturadas
├── Navigation Groups    # Grupos organizados
├── Navigation Features  # Funcionalidades especiais
├── Navigation Dividers  # Separadores
├── Navigation States    # Estados interativos
├── Specific Components  # Componentes específicos
└── Scrollable Features  # Recursos de rolagem
```

## Uso Básico

```scss
// Barra de navegação
.main-nav {
  @include sprout-nav-bar();
}

// Lista de navegação
.nav-list {
  @include sprout-nav-list();
}

// Breadcrumbs
.breadcrumbs {
  @include sprout-breadcrumbs();
}
```

## Integração com Trunks

Os navigation mixins são utilizados internamente pelos componentes trunk:

```scss
// Nav component usa navigation
.site-nav {
  @include trunk-nav();

  // Navigation incluídos:
  // - sprout-nav-bar()
  // - sprout-nav-list()
  // - Estados interativos
}
```

## Boas Práticas

### Estrutura de Navegação
- Use hierarquia visual clara
- Mantenha consistência de espaçamento
- Considere acessibilidade

### Estados e Feedback
- Sempre indique item ativo
- Forneça feedback visual claro
- Use cores semânticas

### Performance
- Minimize consultas DOM
- Use scroll eficiente
- Considere impacto de animações

## Documentação Técnica dos Sprouts

### Barras de Navegação

#### `sprout-nav-bar()`
**Função:** Cria barra de navegação com altura e layout flex.

**Parâmetros:**
- `$height` (String): Altura da barra (padrão: `'4rem'`)
- `$gap` (String): Espaçamento entre itens (padrão: `'md'`)

**Exemplo:**
```scss
.header-nav {
  @include sprout-nav-bar('3rem', 'lg');
}
```

### Layouts de Navegação

#### `sprout-nav-horizontal()`
**Função:** Layout horizontal usando flexbox.

**Parâmetros:**
- `$gap` (String): Espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.horizontal-nav {
  @include sprout-nav-horizontal('lg');
}
```

#### `sprout-nav-vertical()`
**Função:** Layout vertical usando flexbox.

**Parâmetros:**
- `$gap` (String): Espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.vertical-nav {
  @include sprout-nav-vertical('sm');
}
```

### Listas de Navegação

#### `sprout-nav-list()`
**Função:** Lista estruturada com reset automático.

**Parâmetros:**
- `$style` (String): Estilo da lista (padrão: `'none'`)
- `$gap` (String): Espaçamento (padrão: `'sm'`)

**Exemplo:**
```scss
.nav-menu {
  @include sprout-nav-list('none', 'md');
}
```

### Grupos de Navegação

#### `sprout-nav-group()`
**Função:** Grupo de itens organizados verticalmente.

**Parâmetros:**
- `$gap` (String): Espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.nav-section {
  @include sprout-nav-group('lg');
}
```

#### `sprout-nav-group-heading()`
**Função:** Cabeçalho para grupos de navegação.

**Parâmetros:**
- `$size` (String): Tamanho da fonte (padrão: `'md'`)

**Exemplo:**
```scss
.group-title {
  @include sprout-nav-group-heading('lg');
}
```

### Funcionalidades de Navegação

#### `sprout-nav-scrollable()`
**Função:** Navegação rolável com snap.

**Parâmetros:**
- `$direction` (String): Direção - `'horizontal'`, `'vertical'` (padrão: `'horizontal'`)
- `$gap` (String): Espaçamento (padrão: `'sm'`)

**Exemplo:**
```scss
.scrollable-nav {
  @include sprout-nav-scrollable('horizontal', 'md');
}
```

### Separadores

#### `sprout-divider-horizontal()`
**Função:** Separador horizontal.

**Parâmetros:**
- `$color` (String): Cor (padrão: `'muted'`)
- `$height` (String): Altura (padrão: `'1px'`)

**Exemplo:**
```scss
.section-divider {
  @include sprout-divider-horizontal('primary', '2px');
}
```

#### `sprout-divider-vertical()`
**Função:** Separador vertical.

**Parâmetros:**
- `$color` (String): Cor (padrão: `'muted'`)
- `$width` (String): Largura (padrão: `'1px'`)

**Exemplo:**
```scss
.sidebar-divider {
  @include sprout-divider-vertical('primary', '2px');
}
```

### Estados de Navegação

#### `sprout-interactive-active()`
**Função:** Estado ativo com destaque visual.

**Parâmetros:**
- `$color` (String): Cor (padrão: `'primary'`)

**Exemplo:**
```scss
.active-item {
  @include sprout-interactive-active('accent');
}
```

#### `sprout-interactive-hover()`
**Função:** Estado hover com sublinhado.

**Parâmetros:**
- `$color` (String): Cor (padrão: `'hover'`)

**Exemplo:**
```scss
.hover-item {
  @include sprout-interactive-hover('primary');
}
```

### Componentes Específicos

#### `sprout-breadcrumbs()`
**Função:** Navegação hierárquica com separadores.

**Parâmetros:**
- `$separator` (String): Separador (padrão: `'/'`)
- `$gap` (String): Espaçamento (padrão: `'xs'`)

**Exemplo:**
```scss
.page-breadcrumbs {
  @include sprout-breadcrumbs('>', 'sm');
}
```

#### `sprout-tabs-horizontal()`
**Função:** Sistema de abas horizontal.

**Parâmetros:**
- `$gap` (String): Espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.horizontal-tabs {
  @include sprout-tabs-horizontal('lg');
}
```

#### `sprout-tabs-vertical()`
**Função:** Sistema de abas vertical.

**Parâmetros:**
- `$gap` (String): Espaçamento (padrão: `'md'`)

**Exemplo:**
```scss
.vertical-tabs {
  @include sprout-tabs-vertical('sm');
}
```

#### `sprout-pagination()`
**Função:** Sistema de paginação.

**Parâmetros:**
- `$gap` (String): Espaçamento (padrão: `'sm'`)

**Exemplo:**
```scss
.page-nav {
  @include sprout-pagination('md');
}
```

### Dependências e Variáveis

**Variáveis CSS necessárias:**
- `--gap-*`: Espaçamentos (xs, sm, md, lg)
- `--border-width-*`: Larguras de borda (1, 2)
- `--interactive-*`: Cores interativas (primary, hover, accent)
- `--font-*`: Pesos de fonte (bold, medium)
- `--text-*`: Tamanhos de fonte (xs, sm, md, lg, xl)
- `--container-full`: Largura total

### Notas de Uso

- **Acessibilidade:** Sempre use labels apropriados
- **Estados:** Indique claramente item ativo
- **Performance:** Use scroll eficiente
- **Consistência:** Mantenha padrões visuais
- **Responsividade:** Considere layouts móveis
**Função:** Cria uma barra de navegação com altura e espaçamento pré-definidos.

**Parâmetros:**
- `$height` (String): Altura da barra de navegação (padrão: `'4rem'`)
- `$gap` (String): Espaçamento entre itens (padrão: `'md'`)

**Exemplo:**
```scss
.main-nav {
  @include sprout-nav-bar('3rem', 'lg');
}
```

#### `sprout-nav-responsive()`
**Função:** Torna a navegação responsiva, mudando para layout vertical em telas menores.

**Parâmetros:**
- `$breakpoint` (String): Breakpoint para mudança de layout (padrão: `'md'`)

**Exemplo:**
```scss
.responsive-nav {
  @include sprout-nav-responsive('lg');
}
```

### List Styles

#### `sprout-list-style()`
**Função:** Aplica estilos de lista com marcadores customizados.

**Parâmetros:**
- `$style` (String): Estilo do marcador - `'disc'`, `'circle'`, `'square'`, `'decimal'` (padrão: `'disc'`)
- `$indent` (String): Indentação da lista - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)

**Exemplo:**
```scss
.custom-list {
  @include sprout-list-style('square', 'lg');
}
```

### Breadcrumbs

#### `sprout-breadcrumbs()`
**Função:** Cria navegação hierárquica com separadores automáticos.

**Parâmetros:**
- `$separator` (String): Separador entre itens (padrão: `'/'`)
- `$gap` (String): Espaçamento entre itens (padrão: `'xs'`)

**Exemplo:**
```scss
.page-breadcrumbs {
  @include sprout-breadcrumbs('>', 'sm');
}
```

### Tabs

#### `sprout-tabs-horizontal()`
**Função:** Cria sistema de abas horizontal com borda inferior.

**Parâmetros:**
- `$gap` (String): Espaçamento entre abas (padrão: `'md'`)

**Exemplo:**
```scss
.horizontal-tabs {
  @include sprout-tabs-horizontal('lg');
}
```

#### `sprout-tabs-vertical()`
**Função:** Cria sistema de abas vertical com borda lateral.

**Parâmetros:**
- `$gap` (String): Espaçamento entre abas (padrão: `'md'`)

**Exemplo:**
```scss
.vertical-tabs {
  @include sprout-tabs-vertical('sm');
}
```

### Pagination

#### `sprout-pagination()`
**Função:** Cria sistema de paginação com alinhamento central.

**Parâmetros:**
- `$gap` (String): Espaçamento entre itens de página (padrão: `'sm'`)

**Exemplo:**
```scss
.page-navigation {
  @include sprout-pagination('md');
}
```

### Navigation Groups

#### `sprout-nav-group()`
**Função:** Organiza itens de navegação em grupos verticais.

**Parâmetros:**
- `$gap` (String): Espaçamento entre itens do grupo (padrão: `'md'`)

**Exemplo:**
```scss
.nav-section {
  @include sprout-nav-group('lg');
}
```

#### `sprout-nav-group-heading()`
**Função:** Estiliza cabeçalhos para grupos de navegação.

**Parâmetros:**
- `$size` (String): Tamanho do texto do cabeçalho (padrão: `'md'`)

**Exemplo:**
```scss
.group-title {
  @include sprout-nav-group-heading('lg');
}
```

### Navigation Dividers

#### `sprout-nav-divider-horizontal()`
**Função:** Cria divisores horizontais para separar seções de navegação.

**Parâmetros:**
- `$color` (String): Cor do divisor (padrão: `'muted'`)

**Exemplo:**
```scss
.section-divider {
  @include sprout-nav-divider-horizontal('primary');
}
```

#### `sprout-nav-divider-vertical()`
**Função:** Cria divisores verticais para separar seções de navegação.

**Parâmetros:**
- `$color` (String): Cor do divisor (padrão: `'muted'`)

**Exemplo:**
```scss
.sidebar-divider {
  @include sprout-nav-divider-vertical('primary');
}
```

### Navigation States

#### `sprout-nav-active()`
**Função:** Aplica estilos para itens de navegação ativos.

**Parâmetros:**
- `$color` (String): Cor do estado ativo (padrão: `'primary'`)

**Exemplo:**
```scss
.active-nav-item {
  @include sprout-nav-active('accent');
}
```

#### `sprout-nav-hover()`
**Função:** Aplica estilos para estados hover de navegação.

**Parâmetros:**
- `$color` (String): Cor do estado hover (padrão: `'hover'`)

**Exemplo:**
```scss
.hover-nav-item {
  @include sprout-nav-hover('primary');
}
```

### Navigation Scrollable

#### `sprout-nav-scrollable()`
**Função:** Torna a navegação rolável horizontalmente com snap.

**Parâmetros:**
- `$gap` (String): Espaçamento entre itens roláveis (padrão: `'sm'`)

**Exemplo:**
```scss
.scrollable-nav {
  @include sprout-nav-scrollable('md');
}
```

### Flexbox Navigation (moved from navigation.scss)

#### `sprout-nav-horizontal()`
**Função:** Cria layout horizontal usando flexbox.

**Parâmetros:**
- `$gap` (String): Espaçamento entre itens (padrão: `'md'`)

**Exemplo:**
```scss
.horizontal-nav {
  @include sprout-nav-horizontal('lg');
}
```

#### `sprout-nav-vertical()`
**Função:** Cria layout vertical usando flexbox.

**Parâmetros:**
- `$gap` (String): Espaçamento entre itens (padrão: `'md'`)

**Exemplo:**
```scss
.vertical-nav {
  @include sprout-nav-vertical('sm');
}
```

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--gap-*`: Valores de espaçamento (xs, sm, md, lg, xl)
- `--border-width-1`: Largura padrão da borda
- `--border-width-2`: Largura da borda ativa
- `--interactive-*`: Cores interativas (primary, hover, accent)
- `--font-bold`: Peso da fonte bold
- `--text-*`: Tamanhos de texto (xs, sm, md, lg, xl)
- `--container-full`: Largura total do container

### Notas de Uso

- **Acessibilidade:** Sempre inclua atributos ARIA apropriados para navegação
- **Estados:** Use estados visuais consistentes para feedback do usuário
- **Responsividade:** Considere layouts alternativos para dispositivos móveis
- **Performance:** Minimize consultas DOM complexas em navegação dinâmica
- **Consistência:** Mantenha padrões visuais consistentes em toda a navegação

## Próximos Passos

- [ ] Implementar navegação por voz
- [ ] Adicionar suporte a gestos
- [ ] Criar sistema de navegação adaptativa
- [ ] Otimizar para performance em mobile