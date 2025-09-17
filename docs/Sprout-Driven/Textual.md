# Textual

## Visão Geral

O módulo Textual (textual.scss) contém mixins para elementos tipográficos consistentes, incluindo headings, paragraphs, links, fluid typography e utilitários de texto.

## Funcionalidades Principais

### Sistema de Headings
- **Headings configuráveis:** Tamanhos, pesos e margens flexíveis
- **Headings maiúsculos:** Com letter-spacing otimizado
- **Variantes pré-configuradas:** H1 a H6

### Sistema de Paragraphs
- **Paragraphs responsivos:** Tamanhos e margens configuráveis
- **Paragraphs muted:** Aparência sutil
- **Variantes pré-configuradas:** Lead, body, small

### Sistema de Links
- **Links primários/secundários:** Cores semânticas
- **Estados integrados:** Hover, focus, visited

### Utilitários de Texto
- **Fluid typography:** Escala automática
- **Truncation:** Texto cortado com reticências
- **Text helpers:** Alinhamento, transformações
- **Code blocks:** Blocos e inline code

## Estrutura do Módulo

```
textual.scss
├── Headings System      # Sistema de cabeçalhos
├── Paragraphs System    # Sistema de parágrafos
├── Links System         # Sistema de links
├── Fluid Type           # Tipografia fluida
├── Truncation           # Utilitários de truncagem
├── Text Helpers         # Auxiliares de texto
└── Code Blocks          # Blocos de código
```

## Uso Básico

```scss
// Heading básico
.main-title {
  @include sprout-heading();
}

// Parágrafo
.article-text {
  @include sprout-paragraph();
}

// Link
.primary-link {
  @include sprout-link-primary();
}
```

## Integração com Trunks

Os textual mixins são utilizados internamente pelos componentes trunk:

```scss
// Heading component usa textual
.page-title {
  @include trunk-heading();

  // Textual incluídos:
  // - sprout-heading()
  // - Tamanhos e pesos apropriados
  // - Espaçamento consistente
}
```

## Boas Práticas

### Hierarquia Tipográfica
- Use headings em ordem decrescente
- Mantenha proporções harmoniosas
- Considere ritmo vertical

### Acessibilidade
- Garanta contraste adequado
- Use tamanhos mínimos acessíveis
- Considere usuários com dislexia

### Performance
- Use fluid type com moderação
- Minimize cálculos complexos
- Considere impacto de loading

## Documentação Técnica dos Sprouts

### Sistema de Headings

#### `sprout-heading()`
**Função:** Cria heading com tamanho, peso e margem configuráveis.

**Parâmetros:**
- `$size` (String): Tamanho - `'xl'`, `'lg'`, `'md'`, `'sm'` (padrão: `'xl'`)
- `$weight` (String): Peso - `'bold'`, `'semibold'`, `'medium'` (padrão: `'bold'`)
- `$margin-bottom` (String): Margem inferior - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)

**Exemplo:**
```scss
.page-title {
  @include sprout-heading('2xl', 'bold', 'md');
}
```

#### `sprout-heading-uppercase()`
**Função:** Heading maiúsculo com letter-spacing.

**Parâmetros:**
- `$size` (String): Tamanho (padrão: `'md'`)
- `$margin-bottom` (String): Margem (padrão: `'sm'`)

**Exemplo:**
```scss
.section-title {
  @include sprout-heading-uppercase('lg', 'md');
}
```

### Variantes Pré-configuradas

#### `sprout-heading-h1`
**Função:** Heading nível 1.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.h1-title {
  @include sprout-heading-h1();
}
```

#### `sprout-heading-h2`
**Função:** Heading nível 2.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.h2-title {
  @include sprout-heading-h2();
}
```

#### `sprout-heading-h3`
**Função:** Heading nível 3.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.h3-title {
  @include sprout-heading-h3();
}
```

#### `sprout-heading-h4`
**Função:** Heading nível 4.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.h4-title {
  @include sprout-heading-h4();
}
```

#### `sprout-heading-h5`
**Função:** Heading nível 5.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.h5-title {
  @include sprout-heading-h5();
}
```

#### `sprout-heading-h6`
**Função:** Heading nível 6.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.h6-title {
  @include sprout-heading-h6();
}
```

### Sistema de Paragraphs

#### `sprout-paragraph()`
**Função:** Parágrafo com line-height otimizado.

**Parâmetros:**
- `$size` (String): Tamanho - `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$margin-bottom` (String): Margem - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)

**Exemplo:**
```scss
.article-text {
  @include sprout-paragraph('md', 'lg');
}
```

#### `sprout-paragraph-muted()`
**Função:** Parágrafo com cor sutil.

**Parâmetros:**
- `$size` (String): Tamanho (padrão: `'md'`)
- `$margin-bottom` (String): Margem (padrão: `'md'`)

**Exemplo:**
```scss
.caption {
  @include sprout-paragraph-muted('sm', 'sm');
}
```

### Variantes Pré-configuradas

#### `sprout-paragraph-lead`
**Função:** Parágrafo de destaque (maior).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.intro-text {
  @include sprout-paragraph-lead();
}
```

#### `sprout-paragraph-body`
**Função:** Parágrafo corpo padrão.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.body-text {
  @include sprout-paragraph-body();
}
```

#### `sprout-paragraph-small`
**Função:** Parágrafo pequeno.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.caption-text {
  @include sprout-paragraph-small();
}
```

### Sistema de Links

#### `sprout-link-primary`
**Função:** Link primário.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.primary-link {
  @include sprout-link-primary();
}
```

#### `sprout-link-secondary`
**Função:** Link secundário.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.secondary-link {
  @include sprout-link-secondary();
}
```

### Fluid Typography

#### `sprout-fluid-type()`
**Função:** Tipografia que escala com viewport.

**Parâmetros:**
- `$min-size` (Unit): Tamanho mínimo (padrão: `1rem`)
- `$max-size` (Unit): Tamanho máximo (padrão: `2rem`)
- `$viewport-width` (Unit): Unidade viewport (padrão: `2vw`)

**Exemplo:**
```scss
.fluid-title {
  @include sprout-fluid-type(1.5rem, 3rem, 3vw);
}
```

### Utilitários de Truncation

#### `sprout-text-truncate`
**Função:** Trunca texto em uma linha.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.truncated-title {
  @include sprout-text-truncate();
}
```

#### `sprout-text-multiline()`
**Função:** Trunca texto em múltiplas linhas.

**Parâmetros:**
- `$lines` (Number): Número de linhas (padrão: `3`)

**Exemplo:**
```scss
.excerpt {
  @include sprout-text-multiline(2);
}
```

### Text Helpers

#### `sprout-text-center`
**Função:** Centraliza texto.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.centered-text {
  @include sprout-text-center();
}
```

#### `sprout-text-uppercase`
**Função:** Texto maiúsculo com letter-spacing.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.uppercase-label {
  @include sprout-text-uppercase();
}
```

#### `sprout-text-muted`
**Função:** Texto com cor sutil.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.secondary-text {
  @include sprout-text-muted();
}
```

### Code Blocks

#### `sprout-code-block()`
**Função:** Bloco de código com fundo e fonte mono.

**Parâmetros:**
- `$padding` (String): Padding - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)

**Exemplo:**
```scss
.code-example {
  @include sprout-code-block('md');
}
```

#### `sprout-inline-code()`
**Função:** Código inline.

**Parâmetros:**
- `$padding-x` (String): Padding horizontal (padrão: `'xs'`)
- `$padding-y` (String): Padding vertical (padrão: `'2px'`)

**Exemplo:**
```scss
.inline-code {
  @include sprout-inline-code('sm', '1px');
}
```

### Dependências e Variáveis

**Variáveis CSS necessárias:**
- `--font-base`: Família base
- `--font-mono`: Família monoespaçada
- `--text-*`: Tamanhos (xs, sm, md, lg, xl, 2xl, etc.)
- `--leading-*`: Line heights (tight, snug, normal, relaxed, loose)
- `--letter-*`: Letter spacing (wide, wider, widest)
- `--text-*`: Cores (primary, secondary, muted)
- `--bg-muted`: Fundo sutil
- `--border-radius-sm`: Raio de borda
- `--padding-*`: Valores de padding (xs, sm, md, lg)
- `--gap-*`: Espaçamentos (xs, sm, md, lg)

### Notas de Uso

- **Hierarquia:** Use headings em ordem decrescente
- **Acessibilidade:** Garanta contraste adequado
- **Performance:** Use fluid type com moderação
- **Consistência:** Mantenha tokens tipográficos consistentes
**Função:** Cria estilos consistentes para cabeçalhos com tamanhos e pesos apropriados.

**Parâmetros:**
- `$size` (String): Tamanho do cabeçalho - `'xl'`, `'lg'`, `'md'`, `'sm'` (padrão: `'xl'`)
- `$weight` (String): Peso da fonte - `'bold'`, `'semibold'`, `'medium'` (padrão: `'bold'`)
- `$margin-bottom` (String): Margem inferior - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)

**Exemplo:**
```scss
.main-title {
  @include sprout-heading('2xl', 'bold', 'md');
}

.subtitle {
  @include sprout-heading('lg', 'semibold', 'sm');
}
```

#### `sprout-heading-uppercase()`
**Função:** Cria cabeçalhos em maiúsculo com letter-spacing otimizado.

**Parâmetros:**
- `$size` (String): Tamanho do cabeçalho (padrão: `'md'`)
- `$margin-bottom` (String): Margem inferior (padrão: `'sm'`)

**Exemplo:**
```scss
.section-title {
  @include sprout-heading-uppercase('lg', 'md');
}
```

### Paragraphs

#### `sprout-paragraph()`
**Função:** Estiliza parágrafos com line-height e espaçamento otimizados.

**Parâmetros:**
- `$size` (String): Tamanho do texto - `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)
- `$margin-bottom` (String): Margem inferior - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'md'`)

**Exemplo:**
```scss
.article-text {
  @include sprout-paragraph('md', 'lg');
}
```

#### `sprout-paragraph-muted()`
**Função:** Cria parágrafos com aparência sutil (cor mais clara).

**Parâmetros:**
- `$size` (String): Tamanho do texto (padrão: `'md'`)
- `$margin-bottom` (String): Margem inferior (padrão: `'md'`)

**Exemplo:**
```scss
.caption-text {
  @include sprout-paragraph-muted('sm', 'sm');
}
```

### Links

#### `sprout-link()`
**Função:** Sistema completo de links com estados hover, focus e visited.

**Parâmetros:**
- `$color` (String): Cor base do link - `'color'`, `'primary'`, `'secondary'` (padrão: `'color'`)
- `$decoration` (String): Decoração do texto - `'underline'`, `'none'` (padrão: `'underline'`)
- `$reset` (Boolean): Modo reset (remove estilos) (padrão: `false`)

**Exemplo:**
```scss
.primary-link {
  @include sprout-link('primary', 'underline', false);
}

.reset-link {
  @include sprout-link('inherit', 'none', true);
}
```

### Fluid Type

#### `sprout-fluid-type()`
**Função:** Implementa tipografia fluida usando clamp() para escalabilidade.

**Parâmetros:**
- `$min-size` (Unit): Tamanho mínimo (padrão: `1rem`)
- `$max-size` (Unit): Tamanho máximo (padrão: `2rem`)
- `$viewport-width` (Unit): Unidade de viewport para escalabilidade (padrão: `2vw`)

**Exemplo:**
```scss
.fluid-heading {
  @include sprout-fluid-type(1.5rem, 3rem, 3vw);
}
```

### Truncation

#### `sprout-text-truncate()`
**Função:** Trunca texto com reticências em uma linha.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.truncated-title {
  @include sprout-text-truncate();
}
```

#### `sprout-text-multiline()`
**Função:** Trunca texto em múltiplas linhas usando line-clamp.

**Parâmetros:**
- `$lines` (Number): Número de linhas antes da truncagem (padrão: `3`)

**Exemplo:**
```scss
.excerpt-text {
  @include sprout-text-multiline(2);
}
```

### Text Helpers

#### `sprout-text-center()`
**Função:** Centraliza texto horizontalmente.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.centered-text {
  @include sprout-text-center();
}
```

#### `sprout-text-uppercase()`
**Função:** Converte texto para maiúsculo com letter-spacing.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.uppercase-label {
  @include sprout-text-uppercase();
}
```

#### `sprout-text-muted()`
**Função:** Aplica cor sutil ao texto.

**Parâmetros:**
- Nenhum parâmetro específico

**Exemplo:**
```scss
.secondary-text {
  @include sprout-text-muted();
}
```

### Code Blocks

#### `sprout-code-block()`
**Função:** Estiliza blocos de código com fonte monoespaçada e fundo.

**Parâmetros:**
- `$padding` (String): Padding interno - `'xs'`, `'sm'`, `'md'`, `'lg'` (padrão: `'sm'`)

**Exemplo:**
```scss
.code-example {
  @include sprout-code-block('md');
}
```

#### `sprout-inline-code()`
**Função:** Estiliza código inline com fonte monoespaçada.

**Parâmetros:**
- `$padding-x` (String): Padding horizontal (padrão: `'xs'`)
- `$padding-y` (String): Padding vertical (padrão: `'2px'`)

**Exemplo:**
```scss
.inline-code {
  @include sprout-inline-code('sm', '1px');
}
```

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--font-base`: Família de fonte base
- `--font-mono`: Família de fonte monoespaçada
- `--text-*`: Tamanhos de texto (xs, sm, md, lg, xl, 2xl, etc.)
- `--leading-*`: Alturas de linha (tight, snug, normal, relaxed, loose)
- `--letter-*`: Espaçamentos de letra (wide, wider, widest)
- `--link-*`: Cores de links (color, hover, visited, active)
- `--text-*`: Cores de texto (primary, secondary, muted)
- `--bg-muted`: Cor de fundo sutil
- `--border-radius-sm`: Raio de borda pequeno
- `--padding-*`: Valores de padding (xs, sm, md, lg)
- `--gap-*`: Valores de espaçamento (xs, sm, md, lg)
- `--focus-ring-width`: Largura do anel de foco
- `--focus-ring`: Cor do anel de foco
- `--focus-ring-offset`: Offset do anel de foco

### Notas de Uso

- **Hierarquia:** Use tamanhos de heading em ordem decrescente para boa hierarquia
- **Acessibilidade:** Sempre teste contraste de cores em texto
- **Performance:** Use `sprout-fluid-type()` com moderação para evitar cálculos excessivos
- **Responsividade:** Combine com media queries para ajustes específicos
- **Consistência:** Mantenha uso consistente dos tokens tipográficos

## Próximos Passos

- [ ] Implementar variable fonts
- [ ] Adicionar suporte a dark mode typography
- [ ] Criar sistema de reading modes
- [ ] Otimizar para performance de loading