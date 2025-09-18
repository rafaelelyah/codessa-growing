# Codessa Growing — Seeds

Este documento descreve os **Seeds**, os fundamentos visuais e funcionais do Codessa Growing. Os Seeds representam os pilares do sistema de design, organizados por função e propósito. Cada Seed define um **mapa Sass estruturado** que serve como base para a construção de interfaces consistentes, escaláveis e elegantes.

---

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura Atual](#arquitetura-atual)
- [Convenções](#convenções)
- [Scale](#scale)
- [Palette](#palette)
- [Layout](#layout)
- [Motion](#motion)
- [Outline](#outline)
- [Spacing](#spacing)
- [Type](#type)
- [Boas Práticas](#boas-práticas)

---

## Visão Geral

Os Seeds são as menores unidades de design do sistema. Eles são **mapas Sass estruturados** e reutilizáveis que definem as características visuais fundamentais, como cores, tamanhos, espaçamentos, tempos de animação, etc. Eles são a "fonte da verdade" para todos os valores numéricos e literais do seu design.

## Arquitetura Atual

Após a reestruturação arquitetural de Setembro 2025, os Seeds foram convertidos para **mapas Sass aninhados** com a seguinte estrutura:

```scss
// Exemplo: _palette.scss
$palette-seeds: (
  brand: (
    standard: (
      1: #hex-color,
      2: #hex-color,
      // ...
    ),
    // ...
  ),
  neutral: (
    1: #hex-color,
    // ...
  ),
  // ...
);
```

### Benefícios da Nova Arquitetura
- **Centralização de dados** em estruturas hierárquicas
- **Consumo direto** pelo Soil via `map-get()`
- **Manutenibilidade** aprimorada
- **Escalabilidade** para novos valores
- **Consistência** na organização de dados

## Convenções

- Os Seeds seguem a estrutura `$nome-seeds` (ex: `$palette-seeds`, `$layout-seeds`)
- Mapas aninhados organizam dados por categoria e subcategorias
- Valores são acessados via `map-get()` no Soil
- Níveis seguem escalas de `1` a `7` (ou mais, conforme necessidade)
- Valores são derivados de escalas matemáticas e semânticas

## `Scale`

O Seed `Scale` define a base matemática do sistema de design do Codessa Growing. Ele estabelece proporções modulares que servem como referência para todas as outras variáveis — como tamanhos, espaçamentos, containers, tipografia e animações.

### Estrutura Atual

```scss
// src/terrain/seeds/_scale.scss
$scale-seeds: (
  base: (
    granular: 1px,
    micro: 0.25rem,
    medium: 1rem,
    macro: 4rem,
    duration: 200ms
  ),
  letter: (
    xs: 0.75rem,
    sm: 0.875rem,
    // ...
  ),
  sizes: (
    icon: (
      1: 1rem,
      2: 1.25rem,
      // ...
    ),
    // ...
  ),
  durations: (
    1: 100ms,
    2: 150ms,
    // ...
  ),
  z-index: (
    0: 0,
    1: 10,
    max: 9999
  )
);
```

### Propósito

- Criar uma escala visual coerente e progressiva.
- Permitir consistência entre componentes e seções da interface.
- Servir como fundamento para variáveis derivados, como `size`, `macro`, `micro`, `medium`, etc.

### Aplicações

- Definição de valores em `soils` como `spacing`, `layout`, `type`, `motion`, etc.
- Geração de `sprouts` para media queries e adaptação visual.
- Criação de temas com escalas adaptativas.

## `Palette`

O Seed `Palette` define o sistema cromático do Codessa Growing. Ele organiza cores em grupos semânticos que orientam o uso visual em componentes, temas e estados de interface. Além das cores base, também define níveis de opacidade, elevação e gradientes, que contribuem para a construção de profundidade, transparência e variações temáticas.

### Estrutura Atual

```scss
// src/terrain/seeds/_palette.scss
$palette-seeds: (
  brand: (
    standard: (
      1: #hex-color,
      2: #hex-color,
      // ...
    ),
    deep: (
      1: #hex-color,
      // ...
    ),
    soft: (
      1: #hex-color,
      // ...
    )
  ),
  neutral: (
    1: #hex-color,
    2: #hex-color,
    // ...
  ),
  context: (
    1: #hex-color, // error
    2: #hex-color, // info
    3: #hex-color, // warning
    4: #hex-color, // success
    // ...
  ),
  gradients: (
    1: linear-gradient(...),
    // ...
  ),
  elevation: (
    1: 0 1px 3px rgba(0,0,0,0.1),
    // ...
  ),
  opacity: (
    1: 0.1,
    // ...
  )
);
```

### Propósito

- Estabelecer uma identidade visual clara e consistente.
- Permitir variações temáticas e garantir acessibilidade por contraste e hierarquia.
- Servir como base para interações visuais, profundidade e transparência.

### Aplicações

- Definição de cor base para componentes, temas e estados.
- Construção de interações visuais com variações semânticas.
- Aplicação de profundidade e hierarquia com `elevation`.
- Uso de transparência controlada com `opacity`.
- Criação de fundos temáticos e transições visuais com `gradients`.
- Suporte à acessibilidade visual e à coerência cromática.

## `Layout`

O Seed `Layout` define os parâmetros estruturais do Codessa Growing. Ele estabelece larguras máximas para containers e **pontos de quebra (breakpoints) em valores absolutos (pixels)** que orientam o comportamento responsivo da interface.

### Estrutura Atual

```scss
// src/terrain/seeds/_layout.scss
$layout-seeds: (
  containers: (
    1: 20rem,    // 320px
    2: 24rem,    // 384px
    // ...
    7: 80rem     // 1280px
  ),
  breakpoints: (
    1: 640px,    // sm
    2: 768px,    // md
    3: 1024px,   // lg
    4: 1280px,   // xl
    5: 1536px    // 2xl
  )
);
```

### Aplicações

- Definição de grids, seções e áreas de conteúdo.
- Controle de responsividade em componentes e utilitários.
- Geração de `sprouts` para media queries e adaptação visual.

## `Motion`

O Seed `Motion` define os parâmetros de animação e transição do Codessa Growing.

### Estrutura Atual

```scss
// src/terrain/seeds/_motion.scss
$motion-seeds: (
  durations: (
    1: 100ms,
    2: 150ms,
    // ...
  ),
  delays: (
    1: 50ms,
    2: 100ms,
    // ...
  ),
  timings: (
    1: ease-in,
    2: ease-out,
    // ...
  ),
  distances: (
    1: 0.25rem,
    2: 0.5rem,
    // ...
  )
);
```

## `Outline`

O Seed `Outline` define os parâmetros de borda e curvatura do Codessa Growing.

### Estrutura Atual

```scss
// src/terrain/seeds/_outline.scss
$outline-seeds: (
  widths: (
    1: 1px,
    2: 2px,
    // ...
  ),
  styles: (
    1: solid,
    2: dashed,
    // ...
  ),
  radii: (
    1: 0.125rem,
    2: 0.25rem,
    circle: 50%
    // ...
  )
);
```

## `Spacing`

O Seed `Spacing` define os parâmetros de espaçamento e estrutura de grid do Codessa Growing.

### Estrutura Atual

```scss
// src/terrain/seeds/_spacing.scss
$spacing-seeds: (
  generic: (
    1: 0.25rem,
    2: 0.5rem,
    // ...
  ),
  padding: (
    1: 0.25rem,
    // ...
  ),
  margin: (
    1: 0.25rem,
    // ...
  ),
  gap: (
    1: 0.25rem,
    // ...
  ),
  columns: (
    1: 1,
    2: 2,
    // ...
  ),
  offset: (
    1: 0.25rem,
    // ...
  )
);
```

## `Type`

O Seed `Type` define os parâmetros tipográficos do Codessa Growing.

### Estrutura Atual

```scss
// src/terrain/seeds/_type.scss
$type-seeds: (
  families: (
    base: ('Inter', sans-serif),
    aux: ('Inter', sans-serif),
    mono: ('JetBrains Mono', monospace)
  ),
  sizes: (
    1: 0.75rem,
    2: 0.875rem,
    // ...
  ),
  line-heights: (
    1: 1.2,
    2: 1.4,
    // ...
  ),
  weights: (
    1: 300,
    2: 400,
    // ...
  )
);
```

## Boas Práticas

- Seeds são fundamentos semânticos, não estilos prontos — devem ser usados como base para construir `soils`, `sprouts` e `trunks`.
- Evite aplicar seeds diretamente em componentes — prefira compor variáveis intermediárias nos `soils` ou usar `sprouts`.
- Seeds podem ser combinados livremente — a arquitetura do Codessa Growing permite personalização extrema, inclusive a criação de novos seeds.
- Use os espelhos Sass (`$map`) para lógica condicional, geração de utilitários e adaptação visual.
- Mantenha a nomenclatura funcional e progressiva (`--nome-funcional-nível`) para garantir legibilidade e escalabilidade.
- Seeds não são imutáveis — podem ser estendidos, adaptados ou substituídos conforme o contexto do produto ou marca.
