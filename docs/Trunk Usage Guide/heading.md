# Trunk - Heading

O `trunk-heading` define a estilização padrão para elementos de título (`<h1>` a `<h6>`), oferecendo variações de tamanho e estilo.

## Estrutura HTML

```html
<h1 class="trunk-heading">Título Principal</h1>
<h2 class="trunk-heading trunk-heading--md">Subtítulo</h2>
```

## Uso SCSS

```scss
@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TRUNK — HEADING
// ========================================
// Define a estilização padrão para elementos de título (h1-h6).

.trunk-heading {
  // Base styles (lean)

  // Default style modifier
  &--default-style {
    color: var(--text-primary);
    font-weight: var(--font-bold);
    line-height: var(--leading-tight);
    margin-block: var(--margin-sm);
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-heading--default-style;
  }

  // Size Modifiers (from base.scss, but can be overridden here)
  &--xs { font-size: var(--text-xs); }
  &--sm { font-size: var(--text-sm); }
  &--md { font-size: var(--text-md); }
  &--lg { font-size: var(--text-lg); }
  &--xl { font-size: var(--text-xl); }
  &--xxl { font-size: var(--text-xxl); }

  // Visual Style Modifiers
  &--display {
    font-size: var(--text-xxl);
    font-weight: var(--font-bold);
    color: var(--text-brand);
  }

  &--subtle {
    color: var(--text-muted);
    font-weight: var(--font-regular);
  }

  &--inverted {
    color: var(--text-inverse);
  }
}
```

## Variações/Modificadores

### Título Básico

Este é o uso padrão do `trunk-heading`.

**HTML:**

```html
<h1 class="trunk-heading">Título da Página</h1>
```

**SCSS (já coberto pelo `_heading.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-heading` já definida.

### Títulos de Tamanho

Você pode controlar o tamanho do título usando os modificadores de tamanho.

**HTML:**

```html
<h2 class="trunk-heading trunk-heading--lg">Título Grande</h2>
<h3 class="trunk-heading trunk-heading--md">Título Médio</h3>
<h4 class="trunk-heading trunk-heading--sm">Título Pequeno</h4>
```

**SCSS (já coberto pelo `_heading.scss`):**

Não há SCSS adicional necessário, pois os modificadores de tamanho já estão definidos.

### Título de Display

Um título extra grande e com cor de destaque, ideal para seções de herói ou chamadas importantes.

**HTML:**

```html
<h1 class="trunk-heading trunk-heading--display">Título Impactante</h1>
```

**SCSS (já coberto pelo `_heading.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-heading--display` já está definido.

### Título Suave (Subtle)

Um título com cor de texto mais suave e fonte regular, para informações secundárias.

**HTML:**

```html
<h2 class="trunk-heading trunk-heading--subtle">Informação Complementar</h2>
```

**SCSS (já coberto pelo `_heading.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-heading--subtle` já está definido.
