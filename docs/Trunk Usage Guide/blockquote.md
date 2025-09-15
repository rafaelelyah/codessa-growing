# Trunk - Blockquote

O `trunk-blockquote` define a estilização padrão para o elemento `<blockquote>`, usado para citações de bloco.

## Estrutura HTML

```html
<blockquote class="trunk-blockquote">
  <p>"A única maneira de fazer um excelente trabalho é amar o que você faz."</p>
  <footer>— Steve Jobs</footer>
</blockquote>
```

## Uso SCSS

```scss
@use '../soils' as *;

// ========================================
// TRUNK — BLOCKQUOTE
// ========================================
// Define a estilização padrão para o elemento <blockquote>.

.trunk-blockquote {
  // Base styles (lean)

  // Default style modifier
  &--default-style {
    margin-block: var(--margin-md);
    padding-inline-start: var(--padding-md);
    border-left: 4px solid var(--border-muted);
    color: var(--text-muted);
    font-style: italic;
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-blockquote--default-style;
  }

  // Visual style modifiers
  &--primary {
    border-left-color: var(--interactive-primary);
    color: var(--text-primary);
  }

  &--inverted {
    border-left-color: var(--text-inverse);
    color: var(--text-inverse);
  }
}
```

## Variações/Modificadores

### Citação de Bloco Básica

Este é o uso padrão do `trunk-blockquote` com o estilo padrão.

**HTML:**

```html
<blockquote class="trunk-blockquote">
  <p>"A única maneira de fazer um excelente trabalho é amar o que você faz."</p>
  <footer>— Steve Jobs</footer>
</blockquote>
```

**SCSS (já coberto pelo `_blockquote.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-blockquote` já definida.

### Citação de Bloco Primária

Destaca a citação com a cor primária do tema.

**HTML:**

```html
<blockquote class="trunk-blockquote trunk-blockquote--primary">
  <p>"A imaginação é mais importante que o conhecimento."</p>
  <footer>— Albert Einstein</footer>
</blockquote>
```

**SCSS (já coberto pelo `_blockquote.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-blockquote--primary` já está definido.
