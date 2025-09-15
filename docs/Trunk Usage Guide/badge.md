# Trunk - Badge

O `trunk-badge` define a estilização padrão para um componente de badge/tag, usado para exibir pequenos rótulos informativos.

## Estrutura HTML

```html
<span class="trunk-badge">Novo</span>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-badge {
  display: inline-flex; // Para alinhar texto e ícone
  align-items: center;
  @include sprout-padding-block($space: 'xs');
  @include sprout-padding-inline($space: 'sm');
  border-radius: var(--border-radius-pill); // Cantos arredondados
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: 1; // Garante alinhamento vertical
  text-transform: uppercase; // Opcional: texto em maiúsculas
  white-space: nowrap; // Evita quebra de linha

  // Estado padrão (neutro/info)
  background-color: var(--bg-muted);
  color: var(--text-primary);

  // Modificadores de estado/cor
  &--primary {
    background-color: var(--interactive-primary);
    color: var(--text-inverse);
  }

  &--secondary {
    background-color: var(--interactive-secondary);
    color: var(--text-primary);
  }

  &--success {
    background-color: var(--bg-success);
    color: var(--text-inverse);
  }

  &--error {
    background-color: var(--bg-error);
    color: var(--text-inverse);
  }

  &--warning {
    background-color: var(--bg-warning);
    color: var(--text-inverse);
  }

  // Estilo para ícone dentro do badge
  .badge-icon {
    margin-right: var(--margin-xs);
    // Adicione estilos para o ícone aqui, se for um SVG ou fonte de ícones
  }

  // Estilo para botão de fechar (dismissible)
  .badge-close-button {
    margin-left: var(--margin-xs);
    background: none;
    border: none;
    color: inherit; // Herda a cor do texto do badge
    font-size: var(--text-sm);
    cursor: pointer;
    line-height: 1;
    padding: 0;
    opacity: var(--opacity-7);
    &:hover {
      opacity: 1;
    }
  }
}
```

## Variações/Modificadores

### Badge Básico

Este é o uso padrão do `trunk-badge` para um rótulo simples.

**HTML:**

```html
<span class="trunk-badge">Básico</span>
```

**SCSS (já coberto pelo `_badge.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-badge` já definida.

### Badges de Estado/Cor

Você pode aplicar diferentes cores ao badge usando as classes modificadoras.

**HTML:**

```html
<span class="trunk-badge trunk-badge--primary">Primário</span>
<span class="trunk-badge trunk-badge--secondary">Secundário</span>
<span class="trunk-badge trunk-badge--success">Sucesso</span>
<span class="trunk-badge trunk-badge--error">Erro</span>
<span class="trunk-badge trunk-badge--warning">Aviso</span>
```

**SCSS (já coberto pelo `_badge.scss`):**

Não há SCSS adicional necessário, pois os modificadores de estado já estão definidos.

### Badge com Ícone

Você pode incluir um ícone dentro do badge.

**HTML:**

```html
<span class="trunk-badge">
  <i class="badge-icon">⭐</i> <!-- Exemplo de ícone -->
  Destaque
</span>
```

**SCSS (já coberto pelo `_badge.scss`):**

Não há SCSS adicional necessário, pois o estilo para `.badge-icon` já está definido.

### Badge Dispensável (Dismissible)

Um badge que pode ser fechado pelo usuário.

**HTML:**

```html
<span class="trunk-badge">
  Item
  <button class="badge-close-button">&times;</button>
</span>
```

**SCSS (já coberto pelo `_badge.scss`):**

Não há SCSS adicional necessário, pois o estilo para `.badge-close-button` já está definido.
