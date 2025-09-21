# Tree - Ambiente de Desenvolvimento

O **Tree** é o ambiente de desenvolvimento direto do sistema Growing, onde componentes (trunks) são promovidos e adaptados para uso específico em projetos.

## O que é o Tree?

O Tree representa o espaço de trabalho onde você desenvolve suas páginas e aplicações, utilizando componentes da biblioteca Trunks adaptados para seu contexto específico.

### Características Principais

- **Ambiente direto**: Desenvolvimento sem intermediações
- **Adaptação específica**: Componentes moldados para seu projeto
- **Flexibilidade total**: Modificações conforme necessidades
- **Integração perfeita**: Trabalha diretamente com HTML e CSS

## Estrutura do Tree

```
src/terrain/trees/
├── _index.scss      # Ponto de entrada
├── _tree.scss       # Componentes promovidos e adaptados
└── _custom.scss     # Customizações específicas (opcional)
```

### Arquivo _tree.scss

Este é o arquivo principal onde componentes são promovidos e adaptados:

```scss
// ========================================
// TREE — COMPONENTES DE DESENVOLVIMENTO
// ========================================

@use '../soils' as *;

// Header adaptado para o projeto
.site-header {
  @extend .trunk-header;
  background: linear-gradient(45deg, var(--brand-primary), var(--brand-secondary));
  position: fixed;
  width: 100%;
  z-index: 1000;
}

// Navegação principal
.main-nav {
  @extend .trunk-nav;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
}

// Botão personalizado
.btn-primary {
  @extend .trunk-button;
  background-color: var(--brand-primary);
  border: 2px solid var(--brand-primary);
  font-weight: 600;

  &:hover {
    background-color: transparent;
    color: var(--brand-primary);
  }
}

// Card de produto
.product-card {
  @extend .trunk-card;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  .product-image {
    height: 200px;
    background-size: cover;
    background-position: center;
  }

  .product-info {
    padding: var(--space-lg);
  }
}
```

## Conceito de Bibliotecas Independentes

### Arquitetura Sprout → Trunk → Leaf

O sistema Growing segue uma arquitetura hierárquica clara:

#### 🌱 Sprouts (Construtores/Mixins)
São **mixins genéricos e adaptáveis** que servem como blocos de construção fundamentais:

```scss
// Exemplo de sprout (construtor genérico)
@mixin sprout-container($size: 'full', $padding: true, $center: true) {
  width: 100%;
  @if $size != 'fluid' {
    max-width: var(--container-#{$size});
  }
  @if $center {
    margin-inline: auto;
  }
  @if $padding {
    padding-inline: var(--container-padding-inline);
  }
}

@mixin sprout-flex($justify: 'center', $align: 'center', $direction: 'row') {
  display: flex;
  flex-direction: #{$direction};
  justify-content: #{$justify};
  align-items: #{$align};
}
```

**Características dos Sprouts:**
- São **construtores genéricos** reutilizáveis
- **Vários trunks podem usar o mesmo sprout**
- Definem **comportamentos funcionais** (layout, posicionamento, etc.)
- Não contêm estilizações visuais específicas

#### 🌳 Trunks (Componentes Estruturais)
São **componentes funcionais** que usam os sprouts através de `@include`:

```scss
// Exemplo de trunk usando sprouts
.nav-sidebar {
  // Usa sprouts para funcionalidades
  @include sprout-fixed($position: left);
  @include sprout-height-vh(100);
  @include sprout-flex-column($gap: 'md');
  @include sprout-padding-inline('md');
  
  // Estrutura específica do componente
  overflow-y: auto;
  
  .nav-item {
    @include sprout-flex-row($gap: 'sm', $align: 'center');
    @include sprout-padding-block('sm');
  }
}
```

**Características dos Trunks:**
- Usam **sprouts como base** (`@include sprout-*`)
- Definem **estrutura e layout** específicos
- Podem ter **múltiplas variantes** (left, right, top, bottom)
- Contêm **lógica funcional** mas não visual

#### 🍃 Leafs (Ajustes Pontuais)
São **classes utilitárias** para customizações visuais finais:

```scss
// Exemplo de leafs (ajustes pontuais)
.leaf-bg--primary { background-color: var(--bg-primary); }
.leaf-text-color--brand { color: var(--text-brand); }
.leaf-border-w--2 { border-width: var(--border-width-2); }
.leaf-radius--lg { border-radius: var(--border-radius-lg); }
```

**Características dos Leafs:**
- São **ajustes CSS pontuais** e específicos
- Aplicados **no final** para sobrescrever se necessário
- Seguem **convenção de nomenclatura** (.leaf-*--*)
- Usam **variáveis semânticas** de soils

## Processo de Desenvolvimento

### 1. Promoção de Componentes

Promova componentes diretamente da biblioteca Trunks. Tanto Sprouts quanto Trunks e Leafs são bibliotecas independentes:

```scss
// src/terrain/trees/_tree.scss
@use '../soils' as *;

// Promova um trunk da biblioteca
.my-header {
  @extend .trunk-header;
  background-color: var(--brand-primary);
}

// Adapte conforme necessário
.my-header {
  position: fixed;
  width: 100%;
  z-index: 1000;
}
```

### 2. Promoção Automática de Dependências

Ao promover um trunk, o Grow pode automaticamente promover os sprouts de dependência **no início do arquivo**, tornando-os disponíveis para uso geral em toda a tree:

```scss
// O usuário promove apenas o trunk
.my-card {
  @extend .trunk-card;
  border-radius: var(--radius-lg);
}

// O Grow automaticamente adiciona no início do arquivo (se solicitado):
// .sprout-flex { ... }        // Sprouts de dependência
// .sprout-container { ... }   // para uso geral
// .sprout-spacing { ... }     // em toda a tree
//
// .my-card {
//   @extend .trunk-card;      // Seu trunk promovido
//   border-radius: var(--radius-lg);
// }
```

**Vantagens da promoção automática:**
- **Sprouts ficam disponíveis globalmente** na tree
- **Reutilização**: outros componentes podem usar os mesmos sprouts
- **Consistência**: todos os componentes usam as mesmas bases
- **Manutenibilidade**: mudanças nos sprouts afetam toda a tree

### 3. Promoção Manual de Leafs

Como alternativa, promova as leafs manualmente no final do documento:

```scss
// No final do _tree.scss
.my-button {
  @extend .trunk-button;
  @extend .leaf-bg-primary;
  @extend .leaf-text-on-primary;
  @extend .leaf-shadow-md;
}
```

### 4. Uso no HTML

No HTML, use apenas as classes da tree:

```html
<!-- Use apenas classes da tree -->
<header class="my-header">
  <nav class="my-nav">
    <a href="/">Home</a>
  </nav>
</header>

<!-- Com leafs integradas -->
<button class="my-button">Clique aqui</button>
```

## Estratégias de Adaptação

### Promoção Direta (Direct Promotion)

Promova componentes diretamente da biblioteca Trunks (sem importações):

```scss
// Promoção direta de um trunk
.my-button {
  @extend .trunk-button;
  background-color: var(--brand-primary);
}

// Promoção com customizações imediatas
.my-card {
  @extend .trunk-card;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
```

### Composição (Composition)

Combine múltiplos componentes promovidos:

```scss
// Composição de componentes
.article-card {
  @extend .trunk-card;
  @extend .trunk-article;
  @extend .trunk-interactive;

  // Customizações adicionais
  border-left: 4px solid var(--brand-primary);
}
```

### Adaptação Hierárquica (Hierarchical Adaptation)

Entenda como os trunks usam os sprouts internamente e como o Grow promove dependências:

```scss
// Como funciona internamente nos trunks:

// Trunk usa sprouts através de @include
.nav-sidebar {
  // Sprouts fornecendo funcionalidades base
  @include sprout-fixed($position: left);    // Posicionamento
  @include sprout-height-vh(100);            // Altura
  @include sprout-flex-column($gap: 'md');   // Layout flex
  @include sprout-padding-inline('md');      // Espaçamento
  
  // Estrutura específica do trunk
  overflow-y: auto;
  
  // Elementos internos também usam sprouts
  .nav-item {
    @include sprout-flex-row($gap: 'sm', $align: 'center');
    @include sprout-padding-block('sm');
  }
}

// Na tree, o Grow promove os sprouts no início para uso geral:
.my-sidebar {
  @extend .nav-sidebar;  // Promove o trunk completo
  
  // Suas customizações
  background-color: var(--brand-primary);
  border-radius: var(--radius-lg);
}

// Outros componentes podem reutilizar os mesmos sprouts:
.my-header {
  @extend .sprout-flex-row;  // Reutiliza sprout promovido
  @extend .sprout-full-width;
  justify-content: space-between;
}
```

## Organização por Seções

### Estrutura Recomendada

```scss
// ========================================
// TREE — COMPONENTES DE DESENVOLVIMENTO
// ========================================

// 1. SOILS (única importação necessária)
// 2. VARIÁVEIS DO PROJETO
// 3. LAYOUT E ESTRUTURA
// 4. COMPONENTES PRINCIPAIS
// 5. UTILITÁRIOS ESPECÍFICOS
// 6. OVERRIDES E AJUSTES

// ========================================
// 1. SOILS (única importação necessária)
// ========================================

@use '../soils' as *;

// ========================================
// 2. VARIÁVEIS DO PROJETO
// ========================================

:root {
  --brand-primary: #6366f1;
  --brand-secondary: #10b981;
  --brand-accent: #f59e0b;
}

// ========================================
// 3. LAYOUT E ESTRUTURA
// ========================================

.site-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  @extend .trunk-header;
  // Customizações...
}

.site-main {
  flex: 1;
  // Customizações...
}

.site-footer {
  @extend .trunk-footer;
  // Customizações...
}

// ========================================
// 4. COMPONENTES PRINCIPAIS
// ========================================

// Headers
.page-header {
  @extend .trunk-header;
  // Customizações...
}

// Navegação
.main-nav {
  @extend .trunk-nav;
  // Customizações...
}

// Conteúdo
.article-content {
  @extend .trunk-article;
  // Customizações...
}

// ========================================
// 5. UTILITÁRIOS ESPECÍFICOS
// ========================================

// Classes helper do projeto
.text-brand { color: var(--brand-primary); }
.bg-brand { background-color: var(--brand-primary); }
.border-brand { border-color: var(--brand-primary); }

// ========================================
// 6. OVERRIDES E AJUSTES
// ========================================

// Ajustes específicos
@media (max-width: 768px) {
  .site-header {
    position: static;
  }
}
```

## Integração com Leafs

### Bibliotecas Independentes

Sprouts, Trunks e Leafs são bibliotecas independentes. A Tree importa apenas Soils:

```scss
// Apenas soils é importado
@use '../soils' as *;

// Sprouts, Trunks e Leafs são promovidos diretamente
.my-component {
  @extend .trunk-card;      // Da biblioteca Trunks
  @extend .leaf-bg-primary; // Da biblioteca Leafs
}
```

### Promoção Automática (Recomendada)

Ao promover um trunk, o Grow pode automaticamente promover os sprouts e leafs necessários:

```scss
// Você promove apenas o trunk
.my-button {
  @extend .trunk-button;
  background-color: var(--brand-primary);
}

// O Grow automaticamente adiciona:
// 1. Sprouts no início (para uso geral):
// .sprout-flex { display: flex; }
// .sprout-transition { transition: all 0.3s ease; }
//
// 2. Seu componente com dependências:
// .my-button {
//   @extend .trunk-button;
//   @extend .sprout-flex;        // Sprout promovido
//   @extend .leaf-interactive;   // Leaf promovido
//   background-color: var(--brand-primary);
// }
```

**Benefícios:**
- **Sprouts globais**: ficam disponíveis para toda a tree
- **Reutilização**: outros componentes podem usar os mesmos sprouts
- **Consistência**: padronização automática das dependências

### Promoção Manual

Como alternativa, promova manualmente as leafs no final do documento:

```scss
// Componentes principais
.my-card {
  @extend .trunk-card;
  border-radius: var(--radius-lg);
}

// Leafs no final do documento
.my-card {
  @extend .leaf-bg-surface;
  @extend .leaf-shadow-md;
  @extend .leaf-border-primary;
}
```

### Uso no HTML

No HTML, use apenas as classes da tree (que contêm todas as promoções):

```html
<!-- Use apenas classes da tree -->
<div class="my-card">
  <h3>Título do Card</h3>
  <p>Conteúdo do card</p>
</div>

<!-- Com leafs integradas -->
<button class="my-button">Ação</button>
```

## Boas Práticas

### Organização
- Mantenha `_tree.scss` focado em promoções e adaptações
- Use comentários para separar seções lógicas
- Agrupe componentes relacionados por funcionalidade

### Desenvolvimento
- Comece promovendo componentes da biblioteca Trunks
- Faça adaptações seguindo a ordem Sprout → Trunk → Leaf
- Teste mudanças em diferentes contextos

### Manutenibilidade
- Documente customizações importantes
- Use variáveis para valores reutilizáveis
- Evite modificações desnecessárias na estrutura base

### Workflow Recomendado

1. **Identifique** o componente necessário na biblioteca Trunks
2. **Promova** o trunk diretamente no `_tree.scss` (sem importações)
3. **Entenda** que os sprouts já estão incluídos nos trunks via `@include`
4. **Adapte** as propriedades conforme seu projeto
5. **Aplique** leafs apenas para ajustes visuais pontuais
6. **Use** apenas classes da tree no HTML

```scss
// Exemplo de workflow recomendado

// 1. Apenas soils é importado
@use '../soils' as *;

// 2. Promoção direta (sprouts já estão nos trunks)
.my-button {
  @extend .trunk-button;
}

// 3. Adaptação específica (seus estilos)
.my-button {
  background-color: var(--brand-primary);
  border-radius: var(--radius-md);
  font-weight: 600;
}

// 4. Estados e interações
.my-button {
  &:hover {
    background-color: var(--brand-primary-dark);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

// 5. Leafs apenas para ajustes pontuais (opcional)
.my-button {
  @extend .leaf-shadow-sm;
}
```

### Site Institucional

```scss
// Layout institucional
.institutional-layout {
  font-family: var(--font-serif);
  color: var(--text-primary);
}

// Header institucional
.institutional-header {
  @extend .trunk-header;
  background-color: var(--neutral-900);
  color: white;
  padding: var(--space-xl) 0;
}

// Navegação institucional
.institutional-nav {
  @extend .trunk-nav;

  a {
    color: white;
    font-weight: 500;

    &:hover {
      color: var(--brand-primary);
    }
  }
}
```

### Aplicação Web

```scss
// Layout de app
.app-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

// Sidebar do app
.app-sidebar {
  @extend .trunk-nav;
  background-color: var(--surface-secondary);
  border-right: 1px solid var(--border-light);
  padding: var(--space-lg);
}

// Área principal
.app-main {
  padding: var(--space-xl);
  background-color: var(--surface-primary);
}
```

### Landing Page

```scss
// Seções da landing
.hero-section {
  @extend .trunk-section;
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
  color: white;
  text-align: center;
  padding: var(--space-3xl) 0;
}

.features-section {
  @extend .trunk-section;
  background-color: var(--surface-secondary);
  padding: var(--space-3xl) 0;
}

.cta-section {
  @extend .trunk-section;
  background-color: var(--brand-primary);
  color: white;
  text-align: center;
  padding: var(--space-3xl) 0;
}
```

## Organização Atual do _tree.scss

Baseado na estrutura atual do sistema, o `_tree.scss` segue uma organização clara:

```scss
@use '../soils' as *;

// ========================================
// TREE — DEVELOPMENT COMPONENTS
// ========================================
// Components organized by type for better maintainability

// ========================================
// 🌱 SPROUTS SECTION (Dependencies & Behaviors)
// ========================================
// Sprouts are placed at the top so they can be used by any trunk below
// This section contains mixins, functions, and utility behaviors

// ========================================
// 🌳 TRUNKS SECTION (Main Components)
// ========================================
// Trunks are the main structural components of your design system
// They can use any sprout from above

// ========================================
// 🍃 LEAFS SECTION (Utilities & Overrides)
// ========================================
// Leafs are placed at the bottom for final styling adjustments
// They can override any trunk or sprout above
```

### Como Funciona na Prática

1. **Você não importa sprouts ou leafs** - eles já estão incluídos nos trunks
2. **Você apenas promove trunks** usando `@extend .trunk-*`
3. **O Grow promove sprouts automaticamente** no início do arquivo para uso geral
4. **Você customiza apenas o necessário** na sua tree
5. **Leafs são opcionais** para ajustes pontuais finais

### Exemplo Real

```scss
@use '../soils' as *;

// Grow promove sprouts no início (automático):
// .sprout-flex-row { display: flex; flex-direction: row; }
// .sprout-full-width { width: 100%; }
// .sprout-fixed-top { position: fixed; top: 0; }

// Você escreve apenas:
.my-header {
  @extend .trunk-header;
  background-color: var(--brand-primary);
}

// Sistema entende:
// .my-header {
//   // Sprouts já incluídos no trunk-header:
//   @include sprout-fixed($position: top);
//   @include sprout-full-width;
//   @include sprout-flex-row($justify: 'space-between');
//   
//   // Trunk base:
//   @extend .trunk-header;
//   
//   // Suas customizações:
//   background-color: var(--brand-primary);
// }

// Outros componentes reutilizam os sprouts promovidos:
.my-nav {
  @extend .sprout-flex-row;  // Reutiliza sprout global
  justify-content: center;
}
```

## Troubleshooting

### Componente não aparece
- Verifique se o trunk foi promovido corretamente no `_tree.scss`
- Confirme que apenas soils está sendo importado
- Use ferramentas de desenvolvimento para inspecionar as classes aplicadas

### Estilos não aplicam
- Lembre-se: os sprouts já estão incluídos nos trunks via `@include`
- Verifique se suas customizações estão sobrescrevendo corretamente
- Confirme especificidade CSS dos seletores

### Conflitos de nomes
- Use prefixos específicos do projeto para classes customizadas
- Evite sobrescrever classes da biblioteca diretamente
- Prefira composição em vez de modificação direta

### Sprouts não funcionam
- **Lembre-se**: você não precisa incluir sprouts manualmente
- Os trunks já incluem os sprouts necessários via `@include`
- Se usar promoção automática: verifique se o Grow está ativado
- Foque apenas em promover trunks e fazer customizações

### Promoção automática não funciona
- Verifique se o Grow está configurado para promover dependências
- Confirme que o trunk selecionado tem sprouts de dependência
- Teste promovendo o trunk manualmente primeiro

### Sprouts globais não estão disponíveis
- Sprouts são promovidos no início do arquivo automaticamente
- Verifique se a promoção automática está ativada no Grow
- Outros componentes podem reutilizar os sprouts promovidos

### Bundle muito grande
- Apenas soils é importado na tree (otimização de bundle)
- Sprouts, trunks e leafs são promovidos diretamente
- Não há importações desnecessárias

### Componente não se comporta como esperado
- Verifique quais sprouts estão sendo usados no trunk original
- Consulte a documentação do trunk específico
- Teste o trunk base antes de fazer customizações