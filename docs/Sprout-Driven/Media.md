# Media

## Visão Geral

O módulo Media (media.scss) contém mixins para media queries responsivas e aspect ratios, incluindo breakpoints pré-configurados e utilitários de visibilidade.

## Funcionalidades Principais

### Sistema de Breakpoints
- **Breakpoints flexíveis:** min-width, max-width, between
- **Variantes pré-configuradas:** mobile-only, tablet-up, desktop-only
- **Utilitários de visibilidade:** hide/show por breakpoint

### Sistema de Aspect Ratios
- **Proporções pré-definidas:** square, video, photo, card
- **Aspect ratio customizado:** Qualquer proporção numérica
- **Aplicação automática:** Via propriedade CSS aspect-ratio

### Utilitários de Visibilidade
- **Hide utilities:** Esconder elementos por breakpoint
- **Show utilities:** Mostrar elementos condicionalmente
- **Performance otimizada:** Usa CSS eficiente

## Estrutura do Módulo

```
media.scss
├── Breakpoint System    # Sistema de breakpoints
├── Breakpoint Variants  # Variantes pré-configuradas
├── Common Patterns      # Padrões comuns
├── Aspect Ratios        # Sistema de proporções
├── Aspect Variants      # Variantes pré-definidas
└── Visibility Utils     # Utilitários de visibilidade
```

## Uso Básico

```scss
// Breakpoint básico
.responsive-element {
  font-size: 14px;

  @include sprout-media-up('tablet') {
    font-size: 16px;
  }
}

// Aspect ratio
.video-container {
  @include sprout-aspect-video();
}

// Visibilidade
.mobile-menu {
  @include sprout-hide-desktop();
}
```

## Integração com Trunks

Os media queries são utilizados internamente pelos componentes trunk:

```scss
// Component responsivo usa media
.responsive-card {
  @include trunk-card();

  // Media incluídos:
  // - Breakpoints automáticos
  // - Aspect ratios quando necessário
  // - Utilitários de visibilidade
}
```

## Boas Práticas

### Mobile First
- Sempre comece pelo mobile
- Use min-width para escalar
- Teste em dispositivos reais

### Performance
- Minimize media queries excessivas
- Use container queries quando possível
- Considere impacto de reflows

### Acessibilidade
- Mantenha legibilidade em todos os tamanhos
- Garanta navegação adequada
- Teste com zoom do navegador

## Documentação Técnica dos Sprouts

### Sistema de Breakpoints

#### `sprout-media-up()`
**Função:** Aplica estilos para largura mínima.

**Parâmetros:**
- `$breakpoint` (String): Breakpoint - `'sm'`, `'md'`, `'lg'`, `'xl'`

**Exemplo:**
```scss
.tablet-up {
  @include sprout-media-up('sm');
}
```

#### `sprout-media-down()`
**Função:** Aplica estilos para largura máxima.

**Parâmetros:**
- `$breakpoint` (String): Breakpoint - `'sm'`, `'md'`, `'lg'`, `'xl'`

**Exemplo:**
```scss
.mobile-only {
  @include sprout-media-down('sm');
}
```

#### `sprout-media-between()`
**Função:** Aplica estilos entre dois breakpoints.

**Parâmetros:**
- `$min` (String): Breakpoint mínimo
- `$max` (String): Breakpoint máximo

**Exemplo:**
```scss
.tablet-only {
  @include sprout-media-between('sm', 'lg');
}
```

### Variantes Pré-configuradas

#### `sprout-mobile-only`
**Função:** Apenas mobile (max-width: sm).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.mobile-element {
  @include sprout-mobile-only();
}
```

#### `sprout-tablet-up`
**Função:** Tablet e acima (min-width: sm).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.tablet-plus {
  @include sprout-tablet-up();
}
```

#### `sprout-tablet-only`
**Função:** Apenas tablet (sm até lg).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.tablet-only {
  @include sprout-tablet-only();
}
```

#### `sprout-desktop-up`
**Função:** Desktop e acima (min-width: lg).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.desktop-plus {
  @include sprout-desktop-up();
}
```

#### `sprout-desktop-only`
**Função:** Apenas desktop (lg até xl).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.desktop-only {
  @include sprout-desktop-only();
}
```

#### `sprout-large-up`
**Função:** Large e acima (min-width: xl).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.large-plus {
  @include sprout-large-up();
}
```

### Utilitários de Visibilidade

#### `sprout-hide-mobile`
**Função:** Esconde em mobile.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.desktop-nav {
  @include sprout-hide-mobile();
}
```

#### `sprout-hide-tablet`
**Função:** Esconde em tablet.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.mobile-menu {
  @include sprout-hide-tablet();
}
```

#### `sprout-hide-desktop`
**Função:** Esconde em desktop.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.mobile-only {
  @include sprout-hide-desktop();
}
```

### Sistema de Aspect Ratios

#### `sprout-aspect-ratio()`
**Função:** Define proporção de aspecto customizada.

**Parâmetros:**
- `$ratio` (Number): Proporção (ex: 16/9, 4/3, 1)

**Exemplo:**
```scss
.custom-ratio {
  @include sprout-aspect-ratio(21/9);
}
```

### Variantes de Aspect Ratio

#### `sprout-aspect-square`
**Função:** Proporção quadrada (1:1).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.square-element {
  @include sprout-aspect-square();
}
```

#### `sprout-aspect-video`
**Função:** Proporção vídeo (16:9).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.video-element {
  @include sprout-aspect-video();
}
```

#### `sprout-aspect-photo`
**Função:** Proporção foto (4:3).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.photo-element {
  @include sprout-aspect-photo();
}
```

#### `sprout-aspect-card`
**Função:** Proporção card (3:4).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.card-element {
  @include sprout-aspect-card();
}
```

### Dependências e Variáveis

**Variáveis CSS necessárias:**
- `--breakpoint-*`: Breakpoints do sistema (sm, md, lg, xl)

### Notas de Uso

- **Mobile First:** Sempre projete começando pelo mobile
- **Performance:** Use media queries com moderação
- **Testes:** Teste em dispositivos reais
- **Acessibilidade:** Garanta legibilidade em todos os breakpoints
**Função:** Aplica estilos para telas com largura mínima especificada.

**Parâmetros:**
- `$breakpoint` (String): Nome do breakpoint - valores definidos no sistema (ex: `'tablet'`, `'desktop'`)

**Exemplo:**
```scss
.responsive-element {
  font-size: 14px;

  @include sprout-media-up('tablet') {
    font-size: 16px;
  }

  @include sprout-media-up('desktop') {
    font-size: 18px;
  }
}
```

#### `sprout-media-down()`
**Função:** Aplica estilos para telas com largura máxima especificada.

**Parâmetros:**
- `$breakpoint` (String): Nome do breakpoint - valores definidos no sistema

**Exemplo:**
```scss
.mobile-only {
  @include sprout-media-down('tablet') {
    display: block;
  }

  @include sprout-media-up('tablet') {
    display: none;
  }
}
```

#### `sprout-media-between()`
**Função:** Aplica estilos dentro de um range específico de larguras.

**Parâmetros:**
- `$min` (String): Breakpoint mínimo
- `$max` (String): Breakpoint máximo

**Exemplo:**
```scss
.tablet-only {
  @include sprout-media-between('tablet', 'desktop') {
    padding: 2rem;
  }
}
```

### Aspect Ratios

#### `sprout-aspect-ratio()`
**Função:** Define uma proporção de aspecto para elementos de mídia.

**Parâmetros:**
- `$ratio` (Number/String): Proporção de aspecto (ex: `16/9`, `4/3`, `1`)

**Exemplo:**
```scss
.video-container {
  @include sprout-aspect-ratio(16/9);
}

.square-image {
  @include sprout-aspect-ratio(1);
}

.portrait-image {
  @include sprout-aspect-ratio(3/4);
}
```

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--breakpoint-*`: Breakpoints do sistema (mobile, tablet, desktop, large, xlarge)
- Todos os breakpoints são definidos como variáveis CSS customizadas para uso consistente

### Notas de Uso

- **Mobile First:** Sempre projete começando pelo mobile e escalando para cima
- **Performance:** Use media queries com moderação para evitar impacto na performance
- **Container Queries:** Prefira container queries para componentes isolados quando suportado
- **Testes:** Sempre teste em dispositivos reais, não apenas em emuladores
- **Acessibilidade:** Garanta que o conteúdo seja legível e navegável em todos os breakpoints

## Próximos Passos

- [ ] Implementar container queries avançadas
- [ ] Adicionar suporte a foldable devices
- [ ] Criar sistema de grid CSS Grid-first
- [ ] Otimizar para performance em mobile