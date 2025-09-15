# Trunk - Canvas

O `trunk-canvas` define a estilização padrão para o elemento `<canvas>`, permitindo controle de responsividade e proporção.

## Estrutura HTML

```html
<canvas class="trunk-canvas" width="400" height="200"></canvas>
```

## Uso SCSS

```scss
@use 'sass:math';
@use '../sprouts/media';
@use '../soils' as *;

// ========================================
// TRUNK — CANVAS
// ========================================
// Define a estilização padrão para o elemento <canvas>.

.trunk-canvas {
  // Base styles (lean)
  display: block; // Canvas is inline by default

  // Default style modifier
  &--default-style {
    max-width: 100%;
    height: auto;
    background-color: var(--bg-secondary); // Placeholder background
    border: 1px solid var(--border-muted);
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-canvas--default-style;
  }

  // Responsive Modifiers
  &--responsive {
    max-width: 100%;
    height: auto;
  }

  // Aspect Ratio Modifiers (useful for consistent sizing)
  &--aspect-ratio-16x9 {
    @include media.sprout-aspect-ratio(math.div(16, 9));
  }
  &--aspect-ratio-4x3 {
    @include media.sprout-aspect-ratio(math.div(4, 3));
  }
  &--aspect-ratio-1x1 {
    @include media.sprout-aspect-ratio(1);
  }
}
```

## Variações/Modificadores

### Canvas Básico

Este é o uso padrão do `trunk-canvas` com o estilo padrão.

**HTML:**

```html
<canvas class="trunk-canvas" width="400" height="200"></canvas>
```

**SCSS (já coberto pelo `_canvas.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-canvas` já definida.

### Canvas Responsivo

Garanta que o canvas se ajuste à largura do seu contêiner.

**HTML:**

```html
<canvas class="trunk-canvas trunk-canvas--responsive" width="400" height="200"></canvas>
```

**SCSS (já coberto pelo `_canvas.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-canvas--responsive` já está definido.

### Canvas com Proporção 16:9

Define uma proporção de 16:9 para o canvas, útil para manter a consistência visual.

**HTML:**

```html
<canvas class="trunk-canvas trunk-canvas--aspect-ratio-16x9" width="400" height="200"></canvas>
```

**SCSS (já coberto pelo `_canvas.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-canvas--aspect-ratio-16x9` já está definido.
