# Trunk - Link

O `trunk-link` define a estilização padrão para elementos de link (`<a>`), oferecendo variações para diferentes contextos visuais.

## Estrutura HTML

```html
<a href="#" class="trunk-link">Meu Link</a>
```

## Uso SCSS

```scss
@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TRUNK — LINK
// ========================================
// Define a estilização padrão para elementos de link.

.trunk-link {
  // Base styles (lean)
  @include sprout-link($decoration: none);

  // Default style modifier
  &--default-style {
    color: var(--link-color);
    font-weight: var(--font-regular);
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-link--default-style;
  }

  // Visual Style Modifiers
  &--button-like {
    @extend .trunk-button !optional; // Inherit button styles
    // Override specific button styles if needed
  }

  &--external {
    // Add icon or specific styling for external links
    &::after {
      content: '\2197'; // Unicode for top-right arrow
      margin-left: 0.25em;
      font-size: 0.8em;
      vertical-align: super;
    }
  }

  &--inverted {
    color: var(--text-inverse);
    &:hover {
      color: var(--link-hover);
    }
  }

  &--subtle {
    color: var(--text-muted);
    &:hover {
      color: var(--text-primary);
    }
  }
}
```

## Variações/Modificadores

### Link Básico

Este é o uso padrão do `trunk-link`.

**HTML:**

```html
<a href="#" class="trunk-link">Link Padrão</a>
```

**SCSS (já coberto pelo `_link.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-link` já definida.

### Link com Estilo de Botão

Transforma o link para que ele se pareça com um botão, herdando os estilos do `trunk-button`.

**HTML:**

```html
<a href="#" class="trunk-link trunk-link--button-like trunk-button--primary">Link como Botão</a>
```

**SCSS (já coberto pelo `_link.scss` e `_button.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-link--button-like` já está definido e estende o `trunk-button`.

### Link Externo

Adiciona um ícone visual para indicar que o link leva a um recurso externo.

**HTML:**

```html
<a href="https://example.com" class="trunk-link trunk-link--external" target="_blank">Visitar Exemplo</a>
```

**SCSS (já coberto pelo `_link.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-link--external` já está definido.
