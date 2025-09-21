# Interactions

## Visão Geral

O módulo Interactions (interactions.scss) contém mixins para criar elementos interativos como botões e campos, com estados integrados de hover, focus, active e disabled.

## Funcionalidades Principais

### Sistema de Botões
- **Botão configurável:** Parâmetros flexíveis para cores, tamanhos, transições
- **Estados integrados:** Hover, active, focus, disabled
- **Variantes pré-configuradas:** Primary, secondary, ghost, danger, success

### Sistema de Campos Interativos
- **Estados visuais:** Hover, focus, disabled
- **Transições suaves:** Animações consistentes
- **Feedback visual:** Bordas, sombras, cores

### Estados de Interação
- **Focus acessível:** Ring de foco para navegação por teclado
- **Estados funcionais:** Disabled com pointer-events
- **Transições otimizadas:** Performance com will-change

## Estrutura do Módulo

```
interactions.scss
├── Button System        # Sistema de botões
├── Button Variants      # Variantes pré-configuradas
├── Button Sizes         # Tamanhos de botão
├── Interactive Fields   # Campos interativos
├── Interactive States   # Estados de interação
└── Focus Management     # Gerenciamento de foco
```

## Uso Básico

```scss
// Botão básico
.primary-btn {
  @include sprout-button();
}

// Botão primário
.primary-button {
  @include sprout-button-primary();
}

// Campo interativo
.interactive-field {
  @include sprout-field-interactive();
}
```

## Integração com Trunks

Os interactions são utilizados internamente pelos componentes trunk:

```scss
// Button component usa interactions
.custom-button {
  @include trunk-button();

  // Interactions incluídos:
  // - sprout-button()
  // - Estados hover/active/focus
  // - Transições suaves
}
```

## Boas Práticas

### Design de Interação
- Use transições consistentes
- Mantenha feedback visual claro
- Considere acessibilidade (focus rings)

### Estados e Feedback
- Sempre inclua estados disabled
- Forneça feedback visual imediato
- Use cores semânticas apropriadas

### Performance
- Minimize transições complexas
- Use will-change quando necessário
- Considere prefers-reduced-motion

## Documentação Técnica dos Sprouts

### Sistema de Botões

#### `sprout-button()`
**Função:** Cria botão interativo com todos os estados.

**Parâmetros:**
- `$bg` (String): Fundo - `'primary'`, `'secondary'`, `'error'`, `'success'`, `'transparent'` (padrão: `'primary'`)
- `$color` (String): Texto - `'inverse'`, `'primary'` (padrão: `'inverse'`)
- `$radius` (String): Raio da borda - `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)
- `$padding-y` (String): Padding vertical - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)
- `$padding-x` (String): Padding horizontal - `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$font-size` (String): Tamanho da fonte - `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$transition` (String): Transição - `'fast'`, `'base'`, `'slow'` (padrão: `'fast'`)

**Exemplo:**
```scss
.custom-button {
  @include sprout-button('secondary', 'primary', 'md', 'md', 'lg', 'lg', 'fast');
}
```

### Variantes Pré-configuradas

#### `sprout-button-primary`
**Função:** Botão primário padrão.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.primary-btn {
  @include sprout-button-primary();
}
```

#### `sprout-button-secondary`
**Função:** Botão secundário.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.secondary-btn {
  @include sprout-button-secondary();
}
```

#### `sprout-button-ghost`
**Função:** Botão fantasma (transparente com borda).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.ghost-btn {
  @include sprout-button-ghost();
}
```

#### `sprout-button-danger`
**Função:** Botão de perigo/erro.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.danger-btn {
  @include sprout-button-danger();
}
```

#### `sprout-button-success`
**Função:** Botão de sucesso.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.success-btn {
  @include sprout-button-success();
}
```

### Tamanhos de Botão

#### `sprout-button-sm`
**Função:** Botão pequeno.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.small-btn {
  @include sprout-button-sm();
}
```

#### `sprout-button-lg`
**Função:** Botão grande.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.large-btn {
  @include sprout-button-lg();
}
```

### Campos Interativos

#### `sprout-field-interactive`
**Função:** Adiciona interatividade a campos.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.interactive-input {
  @include sprout-field-interactive();
}
```

### Estados de Interação

#### `sprout-interactive-focus`
**Função:** Estado de foco acessível.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.focusable-element {
  @include sprout-interactive-focus();
}
```

#### `sprout-interactive-disabled`
**Função:** Estado desabilitado.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.disabled-element {
  @include sprout-interactive-disabled();
}
```

### Dependências e Variáveis

**Variáveis CSS necessárias:**
- `--interactive-*`: Cores interativas (primary, secondary, hover, active, error, success)
- `--text-*`: Cores de texto (inverse, primary, muted)
- `--border-radius-*`: Raios de borda (sm, md, lg)
- `--border-width-*`: Larguras de borda (0, 1)
- `--padding-*`: Valores de padding (xs, sm, md, lg)
- `--text-*`: Tamanhos de fonte (sm, md, lg)
- `--duration-*`: Durações (fast, base, slow)
- `--timing-smooth`: Função de temporização
- `--bg-muted`: Fundo muted
- `--text-muted`: Texto muted
- `--opacity-disabled`: Opacidade desabilitado
- `--focus-ring-*`: Propriedades do ring de foco (width, color, offset)

### Notas de Uso

- **Estados Automáticos:** Hover, active, focus aplicados automaticamente
- **Acessibilidade:** Focus rings sempre incluídos
- **Performance:** Transições otimizadas
- **Consistência:** Use tokens CSS do sistema
- **Combinação:** Mixins podem ser combinados
**Função:** Cria botões interativos com estados hover, active e focus integrados.

**Parâmetros:**
- `$bg` (String): Cor de fundo - `'primary'`, `'secondary'`, `'muted'` (padrão: `'primary'`)
- `$color` (String): Cor do texto - `'inverse'`, `'primary'`, `'secondary'` (padrão: `'inverse'`)
- `$radius` (String): Raio da borda - `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)
- `$padding-y` (String): Padding vertical - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)
- `$padding-x` (String): Padding horizontal - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$font-size` (String): Tamanho da fonte - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$transition` (String): Duração da transição - `'fast'`, `'base'`, `'slow'` (padrão: `'fast'`)

**Exemplo:**
```scss
.primary-button {
  @include sprout-button(
    $bg: 'primary',
    $color: 'inverse',
    $radius: 'md'
  );
}

.secondary-button {
  @include sprout-button(
    $bg: 'secondary',
    $color: 'primary',
    $radius: 'sm'
  );
}
```

### Interactive Fields

#### `sprout-field-interactive()`
**Função:** Adiciona interatividade aos campos de formulário com hover, focus e disabled states.

**Parâmetros:**
- Nenhum parâmetro específico - usa valores padrão do sistema

**Exemplo:**
```scss
.interactive-input {
  @include sprout-field-interactive();
}

// Estados aplicados automaticamente:
// - Hover: border-color muda
// - Focus: border-color e box-shadow aplicados
// - Disabled: opacity reduzida e pointer-events none
```

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--font-medium`: Peso da fonte medium
- `--text-*`: Tamanhos de texto (xs, sm, md, lg)
- `--interactive-*`: Cores interativas (primary, hover, active)
- `--border-radius-*`: Raios de borda (sm, md, lg)
- `--border-width-0`: Largura zero para bordas
- `--padding-*`: Valores de padding (xs, sm, md, lg)
- `--duration-*`: Durações de transição (fast, base, slow)
- `--timing-smooth`: Função de temporização suave
- `--bg-muted`: Cor de fundo muted
- `--text-muted`: Cor de texto muted
- `--opacity-disabled`: Opacidade para estados disabled
- `--focus-ring-width`: Largura do anel de foco
- `--focus-ring`: Cor do anel de foco
- `--focus-ring-offset`: Offset do anel de foco

### Notas de Uso

- **Estados Automáticos:** Os mixins aplicam automaticamente hover, focus, active e disabled states
- **Acessibilidade:** Focus rings são sempre incluídos para navegação por teclado
- **Performance:** Transições são otimizadas com `will-change` quando apropriado
- **Consistência:** Use sempre os tokens CSS do sistema para manter consistência visual
- **Combinação:** Sprouts podem ser combinados para criar interações complexas

## Próximos Passos

- [ ] Implementar sistema de micro-interações
- [ ] Adicionar suporte a gestos avançados
- [ ] Criar biblioteca de feedback patterns
- [ ] Otimizar para performance em dispositivos móveis