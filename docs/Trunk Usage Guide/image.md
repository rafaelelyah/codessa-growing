# Trunk - Image

O `trunk-image` define a estilização padrão para elementos de imagem, permitindo controle de responsividade, forma e proporção.

## Estrutura HTML

```html
<img class="trunk-image" src="/assets/placeholder.jpg" alt="Descrição da Imagem" />
```

## Uso SCSS

```scss
@use '../soils' as *;
@use 'sass:math';
@use '../sprouts/media';

// ========================================
// TRUNK — IMAGE
// ========================================
// Define a estilização padrão para elementos de imagem.

.trunk-image {
  // Base styles (lean)
  display: block;

  // Default style modifier
  &--default-style {
    max-width: 100%;
    height: auto;
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-image--default-style;
  }

  // Visual Style Modifiers
  &--responsive {
    max-width: 100%;
    height: auto;
  }

  &--circle {
    border-radius: 50%;
    object-fit: cover;
  }

  &--rounded {
    border-radius: var(--border-radius-md);
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

### Imagem Básica

Este é o uso padrão do `trunk-image` com o estilo padrão.

**HTML:**

```html
<img class="trunk-image" src="/assets/placeholder.jpg" alt="Descrição da Imagem" />
```

**SCSS (já coberto pelo `_image.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-image` já definida.

### Imagem Responsiva

Garanta que a imagem se ajuste à largura do seu contêiner.

**HTML:**

```html
<img class="trunk-image trunk-image--responsive" src="/assets/placeholder.jpg" alt="Descrição da Imagem" />
```

**SCSS (já coberto pelo `_image.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-image--responsive` já está definido.

### Imagem Circular

Transforma a imagem em um círculo, ideal para avatares ou perfis.

**HTML:**

```html
<img class="trunk-image trunk-image--circle" src="/assets/placeholder.jpg" alt="Descrição da Imagem" />
```

**SCSS (já coberto pelo `_image.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-image--circle` já está definido.

### Imagem com Cantos Arredondados

Aplica um raio de borda padrão à imagem.

**HTML:**

```html
<img class="trunk-image trunk-image--rounded" src="/assets/placeholder.jpg" alt="Descrição da Imagem" />
```

**SCSS (já coberto pelo `_image.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-image--rounded` já está definido.

### Imagem com Proporção 16:9

Define uma proporção de 16:9 para a imagem, útil para manter a consistência visual em galerias ou cards.

**HTML:**

```html
<img class="trunk-image trunk-image--aspect-ratio-16x9" src="/assets/placeholder.jpg" alt="Descrição da Imagem" />
```

**SCSS (já coberto pelo `_image.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-image--aspect-ratio-16x9` já está definido.
