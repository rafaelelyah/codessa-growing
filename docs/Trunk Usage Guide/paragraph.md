# Trunk - Paragraph

O `trunk-paragraph` define a estilização padrão para elementos de parágrafo (`<p>`), oferecendo variações de tamanho e cor.

## Estrutura HTML

```html
<p class="trunk-paragraph">Este é um parágrafo de exemplo.</p>
```

## Uso SCSS

```scss
@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TRUNK — PARAGRAPH
// ========================================
// Define a estilização padrão para elementos de parágrafo.

.trunk-paragraph {
  // Base styles (lean)

  // Default style modifier
  &--default-style {
    color: var(--text-primary);
    font-size: var(--text-md);
    line-height: var(--leading-base);
    margin-block: var(--margin-sm);
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-paragraph--default-style;
  }

  // Visual Style Modifiers
  &--lead {
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
  }

  &--muted {
    color: var(--text-muted);
  }

  &--small {
    font-size: var(--text-sm);
  }

  &--inverted {
    color: var(--text-inverse);
  }
}
```

## Variações/Modificadores

### Parágrafo Básico

Este é o uso padrão do `trunk-paragraph`.

**HTML:**

```html
<p class="trunk-paragraph">Este é um parágrafo de exemplo com o estilo padrão.</p>
```

**SCSS (já coberto pelo `_paragraph.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-paragraph` já definida.

### Parágrafo de Destaque (Lead)

Um parágrafo maior e com fonte mais pesada para dar destaque.

**HTML:**

```html
<p class="trunk-paragraph trunk-paragraph--lead">Este é um parágrafo de destaque, ideal para introduções.</p>
```

**SCSS (já coberto pelo `_paragraph.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-paragraph--lead` já está definido.

### Parágrafo Suave (Muted)

Um parágrafo com cor de texto mais suave, para informações secundárias.

**HTML:**

```html
<p class="trunk-paragraph trunk-paragraph--muted">Esta é uma informação adicional em um tom mais suave.</p>
```

**SCSS (já coberto pelo `_paragraph.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-paragraph--muted` já está definido.

### Parágrafo Pequeno

Um parágrafo com tamanho de fonte reduzido.

**HTML:**

```html
<p class="trunk-paragraph trunk-paragraph--small">Este é um parágrafo com texto menor.</p>
```

**SCSS (já coberto pelo `_paragraph.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-paragraph--small` já está definido.
