# Trunk - Grid

O `trunk-grid` define um sistema de layout baseado em CSS Grid, permitindo a criação de layouts responsivos com colunas e espaçamentos controlados.

## Estrutura HTML

```html
<div class="trunk-grid trunk-grid--cols-3">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>
```

## Uso SCSS

```scss
@use '../sprouts' as *;

// ========================================
// TRUNK — GRID
// ========================================
// Define um container de grid responsivo.

.trunk-grid {
  display: grid;
  gap: var(--gap-md); // Default gap

  // --- Column Modifiers ---
  // Default (Desktop-first)
  &--cols-1 { grid-template-columns: repeat(1, 1fr); }
  &--cols-2 { grid-template-columns: repeat(2, 1fr); }
  &--cols-3 { grid-template-columns: repeat(3, 1fr); }
  &--cols-4 { grid-template-columns: repeat(4, 1fr); }

  // Medium screens
  @include sprout-media-down('lg') {
    &--cols-lg-1 { grid-template-columns: repeat(1, 1fr); }
    &--cols-lg-2 { grid-template-columns: repeat(2, 1fr); }
    &--cols-lg-3 { grid-template-columns: repeat(3, 1fr); }
  }

  // Small screens
  @include sprout-media-down('md') {
    &--cols-md-1 { grid-template-columns: repeat(1, 1fr); }
    &--cols-md-2 { grid-template-columns: repeat(2, 1fr); }
  }

  // Extra-small screens
  @include sprout-media-down('sm') {
    &--cols-sm-1 { grid-template-columns: repeat(1, 1fr); }
  }
}
```

## Variações/Modificadores

### Grid Básico de 3 Colunas

Este é o uso padrão do `trunk-grid` para criar um layout de 3 colunas em telas maiores.

**HTML:**

```html
<div class="trunk-grid trunk-grid--cols-3">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>
```

**SCSS (já coberto pelo `_grid.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-grid` e o modificador `--cols-3` já definidos.

### Grid Responsivo (2 colunas em telas médias, 1 em pequenas)

Demonstra como o grid se adapta a diferentes tamanhos de tela.

**HTML:**

```html
<div class="trunk-grid trunk-grid--cols-3 trunk-grid--cols-md-2 trunk-grid--cols-sm-1">
  <div class="grid-item">Item Responsivo 1</div>
  <div class="grid-item">Item Responsivo 2</div>
  <div class="grid-item">Item Responsivo 3</div>
  <div class="grid-item">Item Responsivo 4</div>
</div>
```

**SCSS (já coberto pelo `_grid.scss`):**

Não há SCSS adicional necessário, pois os modificadores de coluna responsivos já estão definidos.

### Grid com Espaçamento Personalizado

Você pode ajustar o espaçamento entre os itens do grid alterando a variável `--gap-md` ou criando um modificador específico.

**HTML:**

```html
<div class="trunk-grid trunk-grid--cols-2" style="--gap-md: var(--gap-lg);">
  <div class="grid-item">Item com Gap Grande 1</div>
  <div class="grid-item">Item com Gap Grande 2</div>
</div>
```

**SCSS (exemplo de como sobrescrever o gap):**

```scss
.my-custom-grid {
  .trunk-grid {
    gap: var(--gap-lg);
  }
}
```
