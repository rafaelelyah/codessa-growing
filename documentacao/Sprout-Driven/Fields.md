# Fields

## Visão Geral

O módulo Fields (fields.scss) contém mixins para construir campos de formulário consistentes, incluindo inputs, textareas, selects e seus elementos auxiliares.

## Funcionalidades Principais

### Sistema de Campos Base
- **Campo base configurável:** Parâmetros flexíveis para padding, fonte, bordas
- **Reset automático:** Remove estilos padrão do navegador
- **Estados integrados:** Focus, hover, placeholder, transições

### Tipos de Campo Pré-configurados
- **Input text:** Campo de texto padrão
- **Input email:** Campo de email
- **Input password:** Campo de senha com fonte mono
- **Textarea:** Área de texto redimensionável
- **Select:** Campo de seleção

### Sistema de Estados
- **Estados de validação:** Error, success, disabled
- **Estados visuais:** Hover, focus, active
- **Estados funcionais:** Disabled, readonly

### Elementos Auxiliares
- **Labels:** Rótulos com tamanhos configuráveis
- **Hints:** Dicas e mensagens de erro
- **Field groups:** Agrupamento de campos

## Estrutura do Módulo

```
fields.scss
├── Base Field System    # Sistema base de campos
├── Field Variants       # Variantes pré-configuradas
├── Size Variants        # Tamanhos de campo
├── State Variants       # Estados de campo
├── Labels & Hints       # Elementos auxiliares
└── Field Groups         # Agrupamento de campos
```

## Uso Básico

```scss
// Campo básico
.input-field {
  @include sprout-field-base();
}

// Campo de email
.email-field {
  @include sprout-input-email();
}

// Campo com estado de erro
.error-field {
  @include sprout-field-error();
}

// Grupo de campos
.field-group {
  @include sprout-field-group('stack');
}
```

## Integração com Trunks

Os fields são utilizados internamente pelos componentes trunk:

```scss
// Form component usa fields
.form-input {
  @include trunk-input();

  // Fields incluídos:
  // - sprout-field-base()
  // - sprout-field-interactive()
  // - Estados de validação
}
```

## Boas Práticas

### Design System
- Use tamanhos consistentes (sm, md, lg)
- Mantenha espaçamento harmonioso
- Considere acessibilidade (focus, labels)

### Estados e Validação
- Sempre use estados de validação
- Forneça feedback visual claro
- Considere mensagens de erro contextuais

### Performance
- Minimize transições desnecessárias
- Use CSS variables para temas
- Considere impacto de re-renders

## Documentação Técnica dos Sprouts

### Campo Base

#### `sprout-field-base()`
**Função:** Cria campo base com todos os estilos fundamentais.

**Parâmetros:**
- `$padding-y` (String): Padding vertical - `'xs'`, `'sm'`, `'md'` (padrão: `'sm'`)
- `$padding-x` (String): Padding horizontal - `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$font-size` (String): Tamanho da fonte - `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$border-radius` (String): Raio da borda - `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)
- `$border-width` (String): Largura da borda - `'1'`, `'2'` (padrão: `'1'`)

**Exemplo:**
```scss
.custom-field {
  @include sprout-field-base('md', 'lg', 'lg', 'md', '2');
}
```

### Variantes Pré-configuradas

#### `sprout-input-text`
**Função:** Campo de texto padrão.

**Parâmetros:** Nenhum (usa valores padrão)

**Exemplo:**
```scss
.text-input {
  @include sprout-input-text();
}
```

#### `sprout-input-email`
**Função:** Campo de email.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.email-input {
  @include sprout-input-email();
}
```

#### `sprout-input-password`
**Função:** Campo de senha com fonte mono.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.password-input {
  @include sprout-input-password();
}
```

#### `sprout-textarea`
**Função:** Área de texto redimensionável.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.text-area {
  @include sprout-textarea();
}
```

#### `sprout-select`
**Função:** Campo de seleção.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.select-field {
  @include sprout-select();
}
```

### Tamanhos de Campo

#### `sprout-field-sm`
**Função:** Campo pequeno.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.small-field {
  @include sprout-field-sm();
}
```

#### `sprout-field-lg`
**Função:** Campo grande.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.large-field {
  @include sprout-field-lg();
}
```

#### `sprout-field-size()`
**Função:** Campo com tamanho customizado.

**Parâmetros:**
- `$size` (String): Tamanho - `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` (padrão: `'md'`)

**Exemplo:**
```scss
.custom-size-field {
  @include sprout-field-size('lg');
}
```

### Estados de Campo

#### `sprout-field-error`
**Função:** Estado de erro.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.error-input {
  @include sprout-field-error();
}
```

#### `sprout-field-success`
**Função:** Estado de sucesso.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.success-input {
  @include sprout-field-success();
}
```

#### `sprout-field-disabled`
**Função:** Estado desabilitado.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.disabled-input {
  @include sprout-field-disabled();
}
```

#### `sprout-field-state()`
**Função:** Estado customizado.

**Parâmetros:**
- `$status` (String): Estado - `'error'`, `'success'`, `'disabled'`

**Exemplo:**
```scss
.custom-state-field {
  @include sprout-field-state('success');
}
```

### Labels e Hints

#### `sprout-field-label()`
**Função:** Rótulo do campo.

**Parâmetros:**
- `$size` (String): Tamanho da fonte - `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)

**Exemplo:**
```scss
.field-label {
  @include sprout-field-label('lg');
}
```

#### `sprout-field-hint()`
**Função:** Dica ou mensagem auxiliar.

**Parâmetros:**
- `$muted` (Boolean): Cor muted (padrão: `true`)

**Exemplo:**
```scss
.field-hint {
  @include sprout-field-hint(true);
}

.error-message {
  @include sprout-field-hint(false);
}
```

### Grupos de Campo

#### `sprout-field-group()`
**Função:** Agrupamento de campos.

**Parâmetros:**
- `$layout` (String): Layout - `'stack'`, `'inline'`, `'grid'` (padrão: `'stack'`)

**Exemplo:**
```scss
// Campos empilhados
.stack-group {
  @include sprout-field-group('stack');
}

// Campos em linha
.inline-group {
  @include sprout-field-group('inline');
}

// Campos em grid
.grid-group {
  @include sprout-field-group('grid');
}
```

### Dependências e Variáveis

**Variáveis CSS necessárias:**
- `--padding-*`: Valores de padding (xs, sm, md, lg)
- `--text-*`: Tamanhos de fonte (xs, sm, md, lg)
- `--border-*`: Cores de borda (default, focus, hover, error, success)
- `--bg-*`: Cores de fundo (input, error, success)
- `--text-*`: Cores de texto (primary, muted, error, success)
- `--border-radius-*`: Raios de borda (sm, md, lg)
- `--border-width-*`: Larguras de borda (1, 2)
- `--gap-*`: Espaçamentos (xs, sm, md)
- `--shadow-focus`: Sombra de foco
- `--duration-fast`: Duração de transição
- `--opacity-disabled`: Opacidade para desabilitado

### Notas de Uso

- **Acessibilidade:** Sempre use labels associados
- **Estados:** Combine múltiplos estados quando necessário
- **Validação:** Use estados para feedback visual
- **Consistência:** Mantenha tamanhos harmoniosos
- **Performance:** Minimize transições complexas
**Função:** Estiliza textos de ajuda ou dicas para campos.

**Parâmetros:**
- `$muted` (Boolean): Define se o texto deve ter aparência sutil (padrão: `true`)

**Exemplo:**
```scss
.help-text {
  @include sprout-field-hint(true);
}

.error-hint {
  @include sprout-field-hint(false);
}
```

### Field Groups

#### `sprout-field-group()`
**Função:** Organiza múltiplos campos em grupos com diferentes layouts.

**Parâmetros:**
- `$layout` (String): Tipo de layout - `'stack'`, `'inline'`, `'grid'` (padrão: `'stack'`)

**Exemplo:**
```scss
// Campos empilhados verticalmente
.stacked-fields {
  @include sprout-field-group('stack');
}

// Campos lado a lado
.inline-fields {
  @include sprout-field-group('inline');
}

// Campos em grid
.grid-fields {
  @include sprout-field-group('grid');
}
```

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--font-base`: Família de fonte base
- `--text-*`: Tamanhos de texto (xs, sm, md, lg, xl)
- `--leading-base`: Altura de linha base
- `--bg-*`: Cores de fundo (secondary, primary, muted)
- `--text-*`: Cores de texto (primary, secondary, muted)
- `--border-*`: Cores de borda (muted, primary, error, success)
- `--border-radius-*`: Raios de borda (sm, md, lg)
- `--padding-*`: Valores de padding (xs, sm, md, lg)
- `--border-width-1`: Largura padrão da borda
- `--duration-*`: Durações de transição (fast, base, slow)
- `--timing-smooth`: Função de temporização suave
- `--opacity-*`: Valores de opacidade (6, disabled)
- `--focus-ring`: Cor do anel de foco
- `--gap-*`: Valores de espaçamento (xs, sm, md)

### Notas de Uso

- **Consistência:** Use sempre os tokens CSS do sistema para manter consistência
- **Estados:** Combine múltiplos estados quando necessário (ex: error + disabled)
- **Acessibilidade:** Sempre associe labels com atributos `for` e `id`
- **Responsividade:** Considere tamanhos de toque adequados para mobile
- **Validação:** Use estados visuais para feedback imediato ao usuário

## Próximos Passos

- [ ] Implementar sistema de validação em tempo real
- [ ] Adicionar suporte a campos customizados
- [ ] Criar biblioteca de ícones integrada
- [ ] Otimizar para performance em formulários grandes