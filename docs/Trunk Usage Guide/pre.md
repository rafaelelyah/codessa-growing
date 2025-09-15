# Trunk - Pre

O `trunk-pre` define a estilização padrão para o elemento `<pre>`, usado para exibir texto pré-formatado, como blocos de código.

## Estrutura HTML

```html
<pre class="trunk-pre">
  <code>
    function greet() {
      console.log("Hello, World!");
    }
    greet();
  </code>
</pre>
```

## Uso SCSS

```scss
@use '../soils' as *;

// ========================================
// TRUNK — PRE
// ========================================
// Define a estilização padrão para o elemento <pre> (texto pré-formatado).

.trunk-pre {
  // Base styles (lean)
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-base);
  white-space: pre-wrap; // Preserve whitespace and wrap text
  word-break: break-all; // Break long words

  // Default style modifier
  &--default-style {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border-radius: var(--border-radius-md);
    padding: var(--padding-md);
    border: 1px solid var(--border-muted);
    overflow-x: auto; // Enable horizontal scrolling for long lines
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-pre--default-style;
  }

  // Visual style modifiers
  &--inverted {
    background-color: var(--bg-primary);
    color: var(--text-inverse);
  }

  // Styling for nested <code> within <pre>
  code {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
  }
}
```

## Variações/Modificadores

### Bloco de Código Básico

Este é o uso padrão do `trunk-pre` para exibir um bloco de código.

**HTML:**

```html
<pre class="trunk-pre">
  <code>
    console.log("Hello, World!");
  </code>
</pre>
```

**SCSS (já coberto pelo `_pre.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-pre` já definida.

### Bloco de Código Invertido

Altera as cores de fundo e texto para um esquema invertido, útil para temas escuros.

**HTML:**

```html
<pre class="trunk-pre trunk-pre--inverted">
  <code>
    console.log("Hello, Dark Mode!");
  </code>
</pre>
```

**SCSS (já coberto pelo `_pre.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-pre--inverted` já está definido.
