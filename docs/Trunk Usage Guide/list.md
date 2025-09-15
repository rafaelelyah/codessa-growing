# Trunk - List

O `trunk-list` define a estilização padrão para listas (`<ul>` e `<ol>`), oferecendo variações para diferentes apresentações.

## Estrutura HTML

```html
<ul class="trunk-list">
  <li>Item da Lista 1</li>
  <li>Item da Lista 2</li>
  <li>Item da Lista 3</li>
</ul>

<ol class="trunk-list">
  <li>Primeiro Item</li>
  <li>Segundo Item</li>
  <li>Terceiro Item</li>
</ol>
```

## Uso SCSS

```scss
@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TRUNK — LIST
// ========================================
// Define a estilização padrão para listas (ul, ol).

.trunk-list {
  // Base styles (lean)
  @include sprout-list-reset; // Remove default browser styles

  // Default style modifier
  &--default-style {
    padding-inline-start: var(--padding-md);
    margin-block: var(--margin-md);
    font-size: var(--text-md);
    color: var(--text-primary);

    li {
      margin-block-end: var(--margin-xs);
    }
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-list--default-style;
  }

  // Visual Style Modifiers
  &--unstyled {
    list-style: none;
    padding-inline-start: 0;
  }

  &--inline {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-sm);
  }

  &--divided {
    li {
      border-bottom: 1px solid var(--border-muted);
      &:last-child {
        border-bottom: none;
      }
    }
  }

  &--numbered {
    list-style: decimal;
  }

  &--bulleted {
    list-style: disc;
  }

  // Responsive behavior for inline lists
  &--inline {
    @include sprout-media-down('sm') {
      flex-direction: column;
    }
  }
}
```

## Variações/Modificadores

### Lista Básica

Este é o uso padrão do `trunk-list`.

**HTML:**

```html
<ul class="trunk-list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**SCSS (já coberto pelo `_list.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-list` já definida.

### Lista Sem Estilo

Remove os marcadores de lista e o padding padrão.

**HTML:**

```html
<ul class="trunk-list trunk-list--unstyled">
  <li>Item Sem Estilo 1</li>
  <li>Item Sem Estilo 2</li>
</ul>
```

**SCSS (já coberto pelo `_list.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-list--unstyled` já está definido.

### Lista Inline

Exibe os itens da lista em uma única linha, com espaçamento entre eles.

**HTML:**

```html
<ul class="trunk-list trunk-list--inline">
  <li>Item Inline 1</li>
  <li>Item Inline 2</li>
  <li>Item Inline 3</li>
</ul>
```

**SCSS (já coberto pelo `_list.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-list--inline` já está definido.

### Lista Dividida

Adiciona uma linha divisória entre os itens da lista.

**HTML:**

```html
<ul class="trunk-list trunk-list--divided">
  <li>Item Dividido 1</li>
  <li>Item Dividido 2</li>
  <li>Item Dividido 3</li>
</ul>
```

**SCSS (já coberto pelo `_list.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-list--divided` já está definido.
