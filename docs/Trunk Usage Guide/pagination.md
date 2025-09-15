# Trunk - Pagination

O `trunk-pagination` define a estilização padrão para o componente de paginação, usado para navegar entre páginas de conteúdo.

## Estrutura HTML

```html
<nav class="trunk-pagination">
  <ul>
    <li class="disabled"><a href="#">Anterior</a></li>
    <li><a href="#">1</a></li>
    <li class="is-active"><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">Próxima</a></li>
  </ul>
</nav>
```

## Uso SCSS

```scss
@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TRUNK — PAGINATION
// ========================================
// Define a estilização padrão para o componente de paginação.

.trunk-pagination {
  // Base styles (lean)
  @include sprout-list-reset;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--gap-xs);

  // Default style modifier
  &--default-style {
    font-size: var(--text-md);

    li {
      a,
      span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: var(--size-micro-8); // 2rem (32px)
        height: var(--size-micro-8);
        border-radius: var(--border-radius-sm);
        text-decoration: none;
        color: var(--text-primary);
        background-color: var(--bg-secondary);
        transition: all var(--duration-fast) var(--timing-smooth);

        &:hover {
          background-color: var(--bg-muted);
        }
      }

      &.is-active {
        a,
        span {
          background-color: var(--interactive-primary);
          color: var(--text-inverse);
          font-weight: var(--font-medium);
        }
      }

      &.disabled {
        a,
        span {
          opacity: var(--opacity-disabled);
          cursor: not-allowed;
        }
      }
    }
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-pagination--default-style;
  }

  // Modifiers for alignment
  &--align-left { justify-content: flex-start; }
  &--align-right { justify-content: flex-end; }

  // Size Modifiers
  &--sm {
    font-size: var(--text-sm);
    li {
      a, span {
        min-width: var(--size-micro-6);
        height: var(--size-micro-6);
      }
    }
  }

  &--lg {
    font-size: var(--text-lg);
    li {
      a, span {
        min-width: var(--size-medium-1);
        height: var(--size-medium-1);
      }
    }
  }

  // Responsive behavior
  @include sprout-media-down('sm') {
    font-size: var(--text-sm);
    gap: var(--gap-xxs);
  }
}
```

## Variações/Modificadores

### Paginação Básica

Este é o uso padrão do `trunk-pagination`.

**HTML:**

```html
<nav class="trunk-pagination">
  <ul>
    <li class="disabled"><a href="#">Anterior</a></li>
    <li><a href="#">1</a></li>
    <li class="is-active"><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">Próxima</a></li>
  </ul>
</nav>
```

**SCSS (já coberto pelo `_pagination.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-pagination` já definida.

### Paginação Alinhada à Esquerda

Alinha os itens de paginação à esquerda.

**HTML:**

```html
<nav class="trunk-pagination trunk-pagination--align-left">
  <ul>
    <li class="disabled"><a href="#">Anterior</a></li>
    <li><a href="#">1</a></li>
    <li class="is-active"><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">Próxima</a></li>
  </ul>
</nav>
```

**SCSS (já coberto pelo `_pagination.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-pagination--align-left` já está definido.

### Paginação Pequena

Reduz o tamanho dos botões de paginação.

**HTML:**

```html
<nav class="trunk-pagination trunk-pagination--sm">
  <ul>
    <li class="disabled"><a href="#">Anterior</a></li>
    <li><a href="#">1</a></li>
    <li class="is-active"><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">Próxima</a></li>
  </ul>
</nav>
```

**SCSS (já coberto pelo `_pagination.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-pagination--sm` já está definido.
