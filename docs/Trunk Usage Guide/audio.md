# Trunk - Audio

O `trunk-audio` define a estilização padrão para o elemento `<audio>`, permitindo controle de responsividade e aparência.

## Estrutura HTML

```html
<audio class="trunk-audio" controls src="/assets/sample.mp3"></audio>
```

## Uso SCSS

```scss
@use '../soils' as *;

// ========================================
// TRUNK — AUDIO
// ========================================
// Define a estilização padrão para o elemento <audio>.

.trunk-audio {
  // Base styles (lean)
  display: block;
  width: 100%;

  // Default style modifier
  &--default-style {
    background-color: var(--bg-secondary);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--border-muted);
    padding: var(--padding-sm);
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-audio--default-style;
  }

  // Responsive modifier
  &--responsive {
    max-width: 100%;
    height: auto;
  }

  // Visual style modifiers
  &--minimal {
    background-color: transparent;
    border: none;
    padding: 0;
  }

  &--inverted {
    background-color: var(--bg-primary);
    color: var(--text-inverse);
  }
}
```

## Variações/Modificadores

### Áudio Básico

Este é o uso padrão do `trunk-audio` com o estilo padrão.

**HTML:**

```html
<audio class="trunk-audio" controls src="/assets/sample.mp3"></audio>
```

**SCSS (já coberto pelo `_audio.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-audio` já definida.

### Áudio Responsivo

Garanta que o player de áudio se ajuste à largura do seu contêiner.

**HTML:**

```html
<audio class="trunk-audio trunk-audio--responsive" controls src="/assets/sample.mp3"></audio>
```

**SCSS (já coberto pelo `_audio.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-audio--responsive` já está definido.

### Áudio Minimalista

Remove o fundo e a borda, deixando apenas os controles do navegador.

**HTML:**

```html
<audio class="trunk-audio trunk-audio--minimal" controls src="/assets/sample.mp3"></audio>
```

**SCSS (já coberto pelo `_audio.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-audio--minimal` já está definido.
