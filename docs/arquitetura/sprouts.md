# Sprouts - Biblioteca de Construtores

Os **Sprouts** são a biblioteca de construtores do sistema Growing, fornecendo mixins, funções e utilitários para construir componentes (trunks) de forma consistente e reutilizável.

## O que são Sprouts?

Sprouts são ferramentas de construção que transformam valores semânticos (soils) em componentes funcionais. Eles atuam como construtores, fornecendo:

- **Mixins** para estilos comuns
- **Funções** para cálculos e manipulações
- **Utilitários** para tarefas repetitivas
- **Padrões** para construção consistente

## Metodologia Sprout-Driven

A metodologia **Sprout-Driven** orienta o desenvolvimento de componentes através de construtores padronizados:

### Princípios Fundamentais

1. **Construção Sistemática**: Use sprouts para construir trunks
2. **Reutilização**: Sprouts são ferramentas reutilizáveis
3. **Consistência**: Padrões garantem uniformidade
4. **Manutenibilidade**: Mudanças em sprouts afetam múltiplos trunks

### Processo de Construção

```
Soils → Sprouts → Trunks
Valores → Construtores → Componentes
Semânticos  Padrões     Finais
```

## Categorias de Sprouts

### Estrutura (Structure)
Sprouts para layout e organização:

```scss
// Flexbox utilities
@mixin sprout-flex-row($gap: 'md', $align: 'center', $justify: 'start') {
  display: flex;
  flex-direction: row;
  align-items: #{$align};
  justify-content: #{$justify};
  gap: var(--gap-#{$gap});
}

// Container responsivo
@mixin sprout-container($max-width: 'lg', $padding: 'md') {
  max-width: var(--container-#{$max-width});
  margin: 0 auto;
  padding-left: var(--space-#{$padding});
  padding-right: var(--space-#{$padding});
}
```

### Comportamento (Behavior)
Sprouts para interações e estados:

```scss
// Estados hover
@mixin sprout-hover-lift($amount: 2px) {
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-#{$amount});
  }
}

// Estados de foco
@mixin sprout-focus-ring($color: 'primary', $offset: 2px) {
  &:focus {
    outline: 2px solid var(--focus-#{$color});
    outline-offset: #{$offset};
  }
}
```

### Aparência (Appearance)
Sprouts para estilos visuais:

```scss
// Sombras
@mixin sprout-shadow($level: 'md') {
  box-shadow: var(--shadow-#{$level});
}

// Bordas arredondadas
@mixin sprout-radius($size: 'md') {
  border-radius: var(--radius-#{$size});
}
```

### Tipografia (Typography)
Sprouts para texto e fontes:

```scss
// Escalas de fonte
@mixin sprout-text-size($size: 'md') {
  font-size: var(--text-#{$size});
  line-height: var(--leading-#{$size});
}

// Pesos de fonte
@mixin sprout-font-weight($weight: 'normal') {
  font-weight: var(--font-weight-#{$weight});
}
```

## Como Usar Sprouts

### Em Trunks

```scss
// Exemplo: Construindo um botão
.trunk-button {
  // Estrutura
  @include sprout-flex-row($align: 'center', $justify: 'center');

  // Aparência
  @include sprout-radius('md');
  @include sprout-shadow('sm');

  // Comportamento
  @include sprout-hover-lift();
  @include sprout-focus-ring();

  // Tipografia
  @include sprout-text-size('sm');
  @include sprout-font-weight('medium');
}
```

### Composição de Sprouts

```scss
// Exemplo: Card complexo
.trunk-card {
  // Base estrutural
  @include sprout-container();
  @include sprout-flex-column($gap: 'md');

  // Aparência
  @include sprout-radius('lg');
  @include sprout-shadow('md');

  // Estados
  @include sprout-hover-lift(4px);

  // Header do card
  .card-header {
    @include sprout-flex-row($justify: 'space-between');
    @include sprout-text-size('lg');
  }

  // Conteúdo
  .card-content {
    @include sprout-flex-column($gap: 'sm');
  }
}
```

## Sprouts por Domínio

### Layout e Grid
- `sprout-flex-*`: Utilitários Flexbox
- `sprout-grid-*`: Sistema de grid
- `sprout-container-*`: Containers responsivos
- `sprout-position-*`: Utilitários de posicionamento

### Componentes de Interface
- `sprout-button-*`: Estilos de botão
- `sprout-input-*`: Campos de formulário
- `sprout-card-*`: Estrutura de cards
- `sprout-nav-*`: Elementos de navegação

### Interação e Estados
- `sprout-hover-*`: Estados de hover
- `sprout-focus-*`: Estados de foco
- `sprout-active-*`: Estados ativos
- `sprout-disabled-*`: Estados desabilitados

### Utilitários Gerais
- `sprout-space-*`: Controle de espaçamento
- `sprout-color-*`: Aplicação de cores
- `sprout-typography-*`: Estilos de texto
- `sprout-animation-*`: Animações e transições

## Boas Práticas

### Organização
- Use nomes descritivos com prefixo `sprout-`
- Agrupe sprouts por categoria
- Documente parâmetros e uso

### Desenvolvimento
- Mantenha sprouts pequenos e focados
- Use parâmetros com valores padrão
- Permita composição de múltiplos sprouts

### Performance
- Evite sprouts muito complexos
- Use apenas os necessários
- Considere impacto no CSS final

## Exemplos Práticos

### Sistema de Botões

```scss
// Sprouts para botões
@mixin sprout-button-base {
  @include sprout-flex-row($align: 'center', $justify: 'center');
  @include sprout-radius('md');
  @include sprout-space-padding('md');
  @include sprout-typography-button();
  border: none;
  cursor: pointer;
}

@mixin sprout-button-primary {
  @include sprout-button-base;
  background-color: var(--interactive-primary);
  color: var(--text-on-primary);

  &:hover {
    @include sprout-hover-lift();
  }
}

// Uso em trunk
.trunk-button-primary {
  @include sprout-button-primary;
}
```

### Sistema de Cards

```scss
// Sprouts para cards
@mixin sprout-card-base {
  @include sprout-radius('lg');
  @include sprout-shadow('md');
  @include sprout-space-padding('lg');
  background-color: var(--surface-primary);
}

@mixin sprout-card-hover {
  @include sprout-hover-lift(4px);
  @include sprout-transition-smooth();
}

// Composição
.trunk-card-interactive {
  @include sprout-card-base;
  @include sprout-card-hover;
}
```

## Integração com Outras Camadas

### Com Soils
```scss
// Sprouts usam variáveis de soils
@mixin sprout-color-primary {
  color: var(--interactive-primary);
  background-color: var(--surface-primary);
}
```

### Com Trunks
```scss
// Trunks compõem múltiplos sprouts
.trunk-component {
  @include sprout-structure();
  @include sprout-appearance();
  @include sprout-behavior();
}
```

### Com Leafs
```scss
// Leafs podem sobrescrever sprouts
.my-component {
  @include sprout-button-primary;
}

// Leaf override
.my-component.leaf-bg-secondary {
  background-color: var(--interactive-secondary) !important;
}
```

## Desenvolvimento de Novos Sprouts

### Padrões de Criação

1. **Identifique necessidade**: Que padrão se repete?
2. **Defina interface**: Parâmetros e valores padrão
3. **Implemente funcionalidade**: Lógica do sprout
4. **Documente uso**: Exemplos e casos de uso
5. **Teste composição**: Como combina com outros sprouts

### Exemplo de Novo Sprout

```scss
// Novo sprout para badges
@mixin sprout-badge($variant: 'primary', $size: 'md') {
  @include sprout-flex-row($align: 'center', $gap: 'xs');
  @include sprout-radius('full');
  @include sprout-typography-caption();

  // Variants
  @if $variant == 'primary' {
    background-color: var(--interactive-primary);
    color: var(--text-on-primary);
  } @else if $variant == 'secondary' {
    background-color: var(--interactive-secondary);
    color: var(--text-on-secondary);
  }

  // Sizes
  @if $size == 'sm' {
    @include sprout-space-padding('xs');
  } @else if $size == 'md' {
    @include sprout-space-padding('sm');
  }
}
```

## Troubleshooting

### Sprout não funciona
- Verifique se soils estão carregados
- Confirme ordem de importação
- Use !important se necessário (com cuidado)

### Conflitos entre sprouts
- Evite sobrescrever propriedades
- Use especificidade adequada
- Considere ordem de aplicação

### Performance
- Minimize número de sprouts por componente
- Use composição inteligente
- Evite sprouts aninhados desnecessariamente

Os sprouts são as ferramentas que tornam o desenvolvimento com Growing eficiente e consistente, permitindo construir componentes complexos a partir de peças reutilizáveis.