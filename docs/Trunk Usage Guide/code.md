# Trunk - Code

O `trunk-code` define a estilização padrão para o elemento `<code>`, usado para exibir código inline.

## Estrutura HTML

```html
<p>Para exibir código inline, use a tag <code>&lt;code&gt;</code> com a classe <code class="trunk-code">trunk-code</code>.</p>
```

## Uso SCSS

```scss
@use '../soils' as *;

// ========================================
// TRUNK — CODE
// ========================================
// Define a estilização padrão para o elemento <code> (código inline).

.trunk-code {
  // Base styles (lean)
  font-family: var(--font-mono);
  font-size: var(--text-sm);

  // Default style modifier
  &--default-style {
    background-color: var(--bg-muted);
    color: var(--text-primary);
    border-radius: var(--border-radius-sm);
    padding: 0.2em 0.4em; // Small padding around code
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-code--default-style;
  }

  // Visual style modifiers
  &--block {
    display: block;
    padding: var(--padding-md);
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-muted);
    border-radius: var(--border-radius-md);
    overflow-x: auto;
  }

  &--inverted {
    background-color: var(--bg-primary);
    color: var(--text-inverse);
  }
}
```

## Variações/Modificadores

### Código Inline Básico

Este é o uso padrão do `trunk-code` para exibir código dentro de um parágrafo ou outro elemento de texto.

**HTML:**

```html
<p>A função <code>console.log()</code> é usada para depuração.</p>
```

**SCSS (já coberto pelo `_code.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-code` já definida.

### Bloco de Código (com `display: block`)

Embora o `trunk-pre` seja mais adequado para blocos de código, você pode usar `trunk-code--block` para forçar um `<code>` a se comportar como um bloco.

**HTML:**

```html
<code class="trunk-code trunk-code--block">
  function example() {
    return "Hello";
  }
</code>
```

**SCSS (já coberto pelo `_code.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-code--block` já está definido.

### Código Invertido

Altera as cores de fundo e texto para um esquema invertido, útil para temas escuros.

**HTML:**

```html
<p>Código em modo escuro: <code class="trunk-code trunk-code--inverted">dark_mode = true</code></p>
```

**SCSS (já coberto pelo `_code.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-code--inverted` já está definido.
