# Trunk - Tabs

O `trunk-tabs` define a estilização padrão para um componente de abas, permitindo organizar conteúdo em seções navegáveis.

## Estrutura HTML

```html
<div class="trunk-tabs">
  <ul class="tabs-nav">
    <li class="is-active"><a href="#tab1">Aba 1</a></li>
    <li><a href="#tab2">Aba 2</a></li>
    <li><a href="#tab3">Aba 3</a></li>
  </ul>
  <div class="tabs-content">
    <div id="tab1" class="tab-panel is-active">
      <h3>Conteúdo da Aba 1</h3>
      <p>Este é o conteúdo da primeira aba.</p>
    </div>
    <div id="tab2" class="tab-panel">
      <h3>Conteúdo da Aba 2</h3>
      <p>Este é o conteúdo da segunda aba.</p>
    </div>
    <div id="tab3" class="tab-panel">
      <h3>Conteúdo da Aba 3</h3>
      <p>Este é o conteúdo da terceira aba.</p>
    </div>
  </div>
</div>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-tabs {
  // Container principal das abas
  display: flex;
  flex-direction: column; // Abas e conteúdo empilhados

  .tabs-nav {
    @include sprout-list-reset;
    @include sprout-nav-horizontal($gap: 'lg'); // Abas horizontalmente
    border-bottom: var(--border-width-1) solid var(--border-muted);
    margin-bottom: var(--margin-md); // Espaçamento entre nav e conteúdo

    li {
      a {
        @include sprout-link($decoration: none);
        @include sprout-padding-block($space: 'sm');
        @include sprout-padding-inline($space: 'md');
        display: block;
        color: var(--text-secondary);
        border-bottom: var(--border-width-2) solid transparent; // Borda para estado ativo
        transition: all var(--duration-fast) var(--timing-smooth);
        font-weight: var(--font-medium);

        &:hover {
          color: var(--text-primary);
          border-color: var(--border-primary);
        }
      }

      &.is-active {
        a {
          color: var(--interactive-primary);
          border-color: var(--interactive-primary);
          font-weight: var(--font-bold);
        }
      }
    }
  }

  .tabs-content {
    // Container para os painéis de conteúdo
    .tab-panel {
      display: none; // Esconde todos os painéis por padrão
      @include sprout-padding-block($space: 'md');
      @include sprout-padding-inline($space: 'md');
      border: var(--border-width-1) solid var(--border-muted);
      border-radius: var(--border-radius-md);
      background-color: var(--bg-primary);

      &.is-active {
        display: block; // Mostra o painel ativo
      }
    }
  }

  // Modificador para abas verticais
  &--vertical {
    flex-direction: row; // Abas e conteúdo lado a lado

    .tabs-nav {
      @include sprout-nav-vertical($gap: 'md'); // Abas verticalmente
      border-bottom: none; // Remove borda inferior
      border-right: var(--border-width-1) solid var(--border-muted); // Adiciona borda direita
      margin-bottom: 0; // Remove margem inferior
      margin-right: var(--margin-md); // Espaçamento entre nav e conteúdo

      li {
        a {
          border-bottom: none; // Remove borda inferior do link
          border-right: var(--border-width-2) solid transparent; // Adiciona borda direita para estado ativo
          
          &:hover {
            border-right-color: var(--border-primary);
          }
        }

        &.is-active {
          a {
            border-right-color: var(--interactive-primary);
          }
        }
      }
    }

    .tabs-content {
      flex-grow: 1; // Conteúdo ocupa o espaço restante
    }
  }
}
```

## Variações/Modificadores

### Tabs Básicas

Este é o uso padrão do `trunk-tabs` para criar um conjunto de abas horizontais. A funcionalidade de alternar entre as abas é geralmente controlada por JavaScript.

**HTML:**

```html
<div class="trunk-tabs">
  <ul class="tabs-nav">
    <li class="is-active"><a href="#tab1">Aba 1</a></li>
    <li><a href="#tab2">Aba 2</a></li>
    <li><a href="#tab3">Aba 3</a></li>
  </ul>
  <div class="tabs-content">
    <div id="tab1" class="tab-panel is-active">
      <h3>Conteúdo da Aba 1</h3>
      <p>Este é o conteúdo da primeira aba.</p>
    </div>
    <div id="tab2" class="tab-panel">
      <h3>Conteúdo da Aba 2</h3>
      <p>Este é o conteúdo da segunda aba.</p>
    </div>
    <div id="tab3" class="tab-panel">
      <h3>Conteúdo da Aba 3</h3>
      <p>Este é o conteúdo da terceira aba.</p>
    </div>
  </div>
</div>
```

**SCSS (já coberto pelo `_tabs.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-tabs` e seus elementos internos já definidos.

### Tabs Verticais

Este exemplo demonstra um conjunto de abas organizadas verticalmente.

**HTML:**

```html
<div class="trunk-tabs trunk-tabs--vertical">
  <ul class="tabs-nav">
    <li class="is-active"><a href="#vtab1">Aba Vertical 1</a></li>
    <li><a href="#vtab2">Aba Vertical 2</a></li>
    <li><a href="#vtab3">Aba Vertical 3</a></li>
  </ul>
  <div class="tabs-content">
    <div id="vtab1" class="tab-panel is-active">
      <h3>Conteúdo da Aba Vertical 1</h3>
      <p>Este é o conteúdo da primeira aba vertical.</p>
    </div>
    <div id="vtab2" class="tab-panel">
      <h3>Conteúdo da Aba Vertical 2</h3>
      <p>Este é o conteúdo da segunda aba vertical.</p>
    </div>
    <div id="vtab3" class="tab-panel">
      <h3>Conteúdo da Aba Vertical 3</h3>
      <p>Este é o conteúdo da terceira aba vertical.</p>
    </div>
  </div>
</div>
```

**SCSS (já coberto pelo `_tabs.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-tabs--vertical` já definida.

### Tabs com Ícones

Este exemplo demonstra abas que incluem ícones ao lado do texto.

**HTML:**

```html
<div class="trunk-tabs">
  <ul class="tabs-nav">
    <li class="is-active"><a href="#itab1"><i class="tab-icon">🏠</i> Aba 1</a></li>
    <li><a href="#itab2"><i class="tab-icon">⚙️</i> Aba 2</a></li>
    <li><a href="#itab3"><i class="tab-icon">✉️</i> Aba 3</a></li>
  </ul>
  <div class="tabs-content">
    <div id="itab1" class="tab-panel is-active">
      <h3>Conteúdo da Aba 1 com Ícone</h3>
      <p>Este é o conteúdo da primeira aba com ícone.</p>
    </div>
    <div id="itab2" class="tab-panel">
      <h3>Conteúdo da Aba 2 com Ícone</h3>
      <p>Este é o conteúdo da segunda aba com ícone.</p>
    </div>
    <div id="itab3" class="tab-panel">
      <h3>Conteúdo da Aba 3 com Ícone</h3>
      <p>Este é o conteúdo da terceira aba com ícone.</p>
    </div>
  </div>
</div>
```

**SCSS (Exemplo de como estilizar ícones nas abas):**

```scss
.tabs-nav li a .tab-icon {
  margin-right: var(--margin-xs);
  font-size: var(--text-md);
  line-height: 1;
}
```