# Trunk - Breadcrumbs

O `trunk-breadcrumbs` define a estilização padrão para o componente de breadcrumbs, usado para indicar a localização atual do usuário dentro de uma hierarquia de navegação.

## Estrutura HTML

```html
<nav class="trunk-breadcrumbs">
  <ul>
    <li><a href="#">Início</a></li>
    <li><span class="separator">/</span><a href="#">Categoria</a></li>
    <li><span class="separator">/</span>Página Atual</li>
  </ul>
</nav>
```

## Uso SCSS

```scss
@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TRUNK — BREADCRUMBS
// ========================================
// Define a estilização padrão para o componente de breadcrumbs.

.trunk-breadcrumbs {
  // Base styles (lean)
  @include sprout-list-reset;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-xs);

  // Default style modifier
  &--default-style {
    font-size: var(--text-sm);
    color: var(--text-muted);

    li {
      display: flex;
      align-items: center;
    }

    a {
      color: var(--link-color);
      text-decoration: none;
      &:hover {
        color: var(--link-hover);
        text-decoration: underline;
      }
    }

    .separator {
      margin-inline: var(--margin-xs);
      color: var(--text-subtle);
    }

    li:last-child {
      color: var(--text-primary);
      font-weight: var(--font-medium);
    }
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-breadcrumbs--default-style;
  }

  // Modifiers for alignment
  &--align-center { justify-content: center; }
  &--align-right { justify-content: flex-end; }

  // Responsive behavior
  @include sprout-media-down('sm') {
    font-size: var(--text-xs);
    gap: var(--gap-xxs);
  }
}
```

## Variações/Modificadores

### Breadcrumbs Básicos

Este é o uso padrão do `trunk-breadcrumbs`.

**HTML:**

```html
<nav class="trunk-breadcrumbs">
  <ul>
    <li><a href="#">Início</a></li>
    <li><span class="separator">/</span><a href="#">Categoria</a></li>
    <li><span class="separator">/</span>Página Atual</li>
  </ul>
</nav>
```

**SCSS (já coberto pelo `_breadcrumbs.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-breadcrumbs` já definida.

### Breadcrumbs Alinhados ao Centro

Alinha os itens de breadcrumbs ao centro.

**HTML:**

```html
<nav class="trunk-breadcrumbs trunk-breadcrumbs--align-center">
  <ul>
    <li><a href="#">Início</a></li>
    <li><span class="separator">/</span><a href="#">Categoria</a></li>
    <li><span class="separator">/</span>Página Atual</li>
  </ul>
</nav>
```

**SCSS (já coberto pelo `_breadcrumbs.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-breadcrumbs--align-center` já está definido.
