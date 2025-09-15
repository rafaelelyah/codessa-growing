# Trunk - Icon

O `trunk-icon` define a estilização padrão para elementos de ícone, permitindo controlar tamanho, cor e alinhamento.

## Estrutura HTML

```html
<i class="trunk-icon">⭐</i>
<!-- Ou com uma classe de ícone de biblioteca externa -->
<i class="trunk-icon fa-solid fa-star"></i>
```

## Uso SCSS

```scss
@use '../../soils' as *;

// ========================================
// TRUNK — ICON
// ========================================
// Define a estilização padrão para elementos de ícone.

.trunk-icon {
  // Base styles (lean)
  display: inline-block;
  line-height: 1;
  vertical-align: middle; // Align with text

  // Default style modifier
  &--default-style {
    font-size: var(--text-md);
    color: var(--text-primary);
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-icon--default-style;
  }

  // Size Modifiers
  &--xs { font-size: var(--text-xs); }
  &--sm { font-size: var(--text-sm); }
  &--md { font-size: var(--text-md); }
  &--lg { font-size: var(--text-lg); }
  &--xl { font-size: var(--text-xl); }
  &--xxl { font-size: var(--text-xxl); }

  // Color Modifiers
  &--primary { color: var(--interactive-primary); }
  &--secondary { color: var(--interactive-secondary); }
  &--success { color: var(--text-success); }
  &--error { color: var(--text-error); }
  &--warning { color: var(--text-warning); }
  &--info { color: var(--text-info); }
  &--muted { color: var(--text-muted); }
  &--inverse { color: var(--text-inverse); }

  // Alignment Modifiers
  &--align-top { vertical-align: top; }
  &--align-bottom { vertical-align: bottom; }
  &--align-text-top { vertical-align: text-top; }
  &--align-text-bottom { vertical-align: text-bottom; }
}
```

## Variações/Modificadores

### Ícone Básico

Este é o uso padrão do `trunk-icon` com o estilo e tamanho padrão.

**HTML:**

```html
<i class="trunk-icon">⭐</i>
```

**SCSS (já coberto pelo `_icon.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-icon` já definida.

### Ícones de Tamanho

Você pode controlar o tamanho do ícone usando os modificadores de tamanho.

**HTML:**

```html
<i class="trunk-icon trunk-icon--sm">⭐</i>
<i class="trunk-icon trunk-icon--md">⭐</i>
<i class="trunk-icon trunk-icon--lg">⭐</i>
```

**SCSS (já coberto pelo `_icon.scss`):**

Não há SCSS adicional necessário, pois os modificadores de tamanho já estão definidos.

### Ícones Coloridos

Você pode aplicar diferentes cores ao ícone usando os modificadores de cor.

**HTML:**

```html
<i class="trunk-icon trunk-icon--primary">⭐</i>
<i class="trunk-icon trunk-icon--success">⭐</i>
<i class="trunk-icon trunk-icon--error">⭐</i>
```

**SCSS (já coberto pelo `_icon.scss`):**

Não há SCSS adicional necessário, pois os modificadores de cor já estão definidos.

### Ícones Alinhados

Você pode ajustar o alinhamento vertical do ícone.

**HTML:**

```html
Texto <i class="trunk-icon trunk-icon--align-top">⭐</i>
Texto <i class="trunk-icon trunk-icon--align-middle">⭐</i>
Texto <i class="trunk-icon trunk-icon--align-bottom">⭐</i>
```

**SCSS (já coberto pelo `_icon.scss`):**

Não há SCSS adicional necessário, pois os modificadores de alinhamento já estão definidos.
