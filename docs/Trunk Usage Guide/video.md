# Trunk - Video

O `trunk-video` define a estilização padrão para o elemento `<video>`, permitindo controle de responsividade e proporção.

## Estrutura HTML

```html
<video class="trunk-video" controls src="/assets/sample.mp4"></video>
```

## Uso SCSS

```scss
@use 'sass:math';
@use '../soils' as *;
@use '../sprouts/media';

// ========================================
// TRUNK — VIDEO
// ========================================
// Define a estilização padrão para o elemento <video>.

.trunk-video {
  // Base styles (lean)
  display: block;
  width: 100%;

  // Default style modifier
  &--default-style {
    background-color: var(--bg-secondary);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--border-muted);
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-video--default-style;
  }

  // Responsive modifier
  &--responsive {
    max-width: 100%;
    height: auto;
  }

  // Aspect Ratio Modifiers
  &--aspect-ratio-16x9 {
    @include media.sprout-aspect-ratio(math.div(16, 9));
    object-fit: cover;
  }

  &--aspect-ratio-4x3 {
    @include media.sprout-aspect-ratio(math.div(4, 3));
    object-fit: cover;
  }

  &--aspect-ratio-1x1 {
    @include media.sprout-aspect-ratio(1);
    object-fit: cover;
  }
}
```

## Variações/Modificadores

### Vídeo Básico

Este é o uso padrão do `trunk-video` com o estilo padrão.

**HTML:**

```html
<video class="trunk-video" controls src="/assets/sample.mp4"></video>
```

**SCSS (já coberto pelo `_video.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-video` já definida.

### Vídeo Responsivo

Garanta que o vídeo se ajuste à largura do seu contêiner.

**HTML:**

```html
<video class="trunk-video trunk-video--responsive" controls src="/assets/sample.mp4"></video>
```

**SCSS (já coberto pelo `_video.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-video--responsive` já está definido.

### Vídeo com Proporção 16:9

Define uma proporção de 16:9 para o vídeo, útil para manter a consistência visual.

**HTML:**

```html
<video class="trunk-video trunk-video--aspect-ratio-16x9" controls src="/assets/sample.mp4"></video>
```

**SCSS (já coberto pelo `_video.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-video--aspect-ratio-16x9` já está definido.
