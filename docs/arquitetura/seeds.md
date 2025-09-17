# Codessa Growing — Seeds

Este documento descreve os **Seeds**, os fundamentos visuais e funcionais do Codessa Growing. Os Seeds representam os pilares do sistema de design, organizados por função e propósito. Cada Seed define um **token de design bruto e atômico**, que serve como base para a construção de interfaces consistentes, escaláveis e elegantes.

---

## Índice

- [Visão Geral](#visão-geral)
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

Os Seeds são as menores unidades de design do sistema. Eles são valores abstratos e reutilizáveis que definem as características visuais fundamentais, como cores, tamanhos, espaçamentos, tempos de animação, etc. Eles são a "fonte da verdade" para todos os valores numéricos e literais do seu design.

## Convenções

- Os Seeds seguem a estrutura `--nome-funcional-nível`, com níveis de `0` a `7` (ou mais, conforme a necessidade).
- Os valores são derivados de escalas matemáticas e semânticas.
- Espelhos Sass (`$map`) são utilizados para lógica condicional e geração de utilitários (embora os `soils` e `sprouts` sejam os principais consumidores).

## `Scale`

O Seed `Scale` define a base matemática do sistema de design do Codessa Growing. Ele estabelece proporções modulares que servem como referência para todas as outras variáveis — como tamanhos, espaçamentos, containers, tipografia e animações.

### Propósito

- Criar uma escala visual coerente e progressiva.
- Permitir consistência entre componentes e seções da interface.
- Servir como fundamento para variáveis derivados, como `size`, `macro`, `micro`, `medium`, etc.

### Estrutura

A escala é dividida em blocos semânticos:
- `scale-granular`: para elementos muito pequenos (ex: 1px).
- `scale-micro`: para elementos pequenos e detalhes visuais.
- `scale-medium`: para componentes e seções médias.
- `scale-macro`: para containers, grids e layouts amplos.

Cada bloco possui níveis (`1` a `8`) que representam variações proporcionais, geralmente baseadas em `rem`, derivadas de uma razão modular.

### Aplicações

- Definição de valores em `soils` como `spacing`, `layout`, `type`, `motion`, etc.
- Geração de `sprouts` para media queries e adaptação visual.
- Criação de temas com escalas adaptativas.

## `Palette`

O Seed `Palette` define o sistema cromático do Codessa Growing. Ele organiza cores em grupos semânticos que orientam o uso visual em componentes, temas e estados de interface. Além das cores base, também define níveis de opacidade, elevação e gradientes, que contribuem para a construção de profundidade, transparência e variações temáticas.

### Propósito

- Estabelecer uma identidade visual clara e consistente.
- Permitir variações temáticas e garantir acessibilidade por contraste e hierarquia.
- Servir como base para interações visuais, profundidade e transparência.

### Estrutura

A `Palette` é composta por grupos funcionais:
- `brand`: núcleo da identidade visual. Possui três variações:
  - `color-standard`: cor principal da marca.
  - `color-deep`: versão mais intensa, usada em estados ativos ou hovers.
  - `color-soft`: versão mais suave, usada em fundos ou estados passivos.
  - `color-auxiliary`: escala complementar à marca, usada para variações temáticas, feedback positivo ou componentes secundários, compatíveis com a paleta institucional, aplicáveis em textos, fundos, bordas e estados visuais.
  Cada variação possui sete níveis (`1` a `7`), permitindo granularidade semântica.
- `neutrals`: tons de cinza para superfícies, bordas, textos e separações.
- `contextual`: cores para estados como `success`, `error`, `warning` e `info`.
- `opacity`: níveis de transparência aplicáveis a qualquer cor, usados para sobreposição e feedback visual.
- `elevation`: camadas de profundidade que simulam distância entre elementos, geralmente aplicadas com sombra e cor de fundo.
- `gradients`: composições cromáticas construídas a partir das variações `soft`, `standard` e `deep` do grupo `brand`. São sete gradientes (`1` a `7`), cada um combinando as três variações de um mesmo nível.

### Aplicações

- Definição de cor base para componentes, temas e estados.
- Construção de interações visuais com variações semânticas.
- Aplicação de profundidade e hierarquia com `elevation`.
- Uso de transparência controlada com `opacity`.
- Criação de fundos temáticos e transições visuais com `gradients`.
- Suporte à acessibilidade visual e à coerência cromática.

## `Layout`

O Seed `Layout` define os parâmetros estruturais do Codessa Growing. Ele estabelece larguras máximas para containers e **pontos de quebra (breakpoints) em valores absolutos (pixels)** que orientam o comportamento responsivo da interface.

### Propósito

- Garantir consistência na construção de seções e componentes.
- Definir limites visuais e espaciais para diferentes contextos de tela.
- Servir como base para lógica responsiva e adaptação de conteúdo.

### Estrutura

O `Layout` é composto por dois grupos principais:
- `containers`: larguras máximas utilizadas para delimitar áreas de conteúdo. São escalonadas em níveis (`1` a `7`) e derivadas da escala macro, permitindo modularidade e controle visual.
- `breakpoints`: pontos de quebra utilizados para adaptar o layout em diferentes tamanhos de tela. **São definidos em pixels absolutos** e representam os limites mínimos para transições responsivas.

### Aplicações

- Definição de grids, seções e áreas de conteúdo.
- Controle de responsividade em componentes e utilitários.
- Geração de `sprouts` para media queries e adaptação visual.

## `Motion`

O Seed `Motion` define os parâmetros de animação e transição do Codessa Growing. Ele organiza valores semânticos que orientam o comportamento visual de elementos em movimento, garantindo fluidez, intenção e consistência.

### Propósito

- Criar uma linguagem de movimento coerente e funcional.
- Garantir previsibilidade e controle em transições e feedbacks visuais.
- Servir como base para construção de efeitos com intenção e hierarquia perceptiva.

### Estrutura

O `Motion` é composto por quatro grupos principais:
- `duration`: tempo de execução da animação. Os níveis (`1` a `7`) representam variações progressivas, geralmente em milissegundos, aplicadas em transições, entradas e saídas.
- `delay`: tempo de espera antes do início da animação. Usado para sequenciamento, escalonamento ou feedback visual com ritmo.
- `timing`: curva de aceleração do movimento. Os valores são semânticos (`ease-in`, `ease-out`, `ease-in-out`, `linear`, etc.) e podem incluir funções `cubic-bezier` personalizadas.
- `distance`: deslocamento físico ou visual aplicado em efeitos como `fade`, `slide`, `scale` ou `parallax`. Os níveis são derivados da escala micro e medium, garantindo coerência espacial.

### Aplicações

- Definição de transições e animações em componentes interativos.
- Controle de tempo, ritmo e fluidez em feedbacks visuais.
- Criação de efeitos animados com `sprouts`.
- Suporte à hierarquia de atenção e acessibilidade perceptiva.

## `Outline`

O Seed `Outline` define os parâmetros de borda e curvatura do Codessa Growing. Ele organiza valores semânticos para espessura, estilo e raio, permitindo consistência visual na construção de componentes, containers e elementos interativos.

### Propósito

- Estabelecer padrões de contorno e curvatura com base modular.
- Garantir coerência visual entre componentes e seções.
- Servir como base para estilização de bordas e formas geométricas.

### Estrutura

O `Outline` é composto por três grupos principais:
- `border`: escala de espessura de borda, com níveis de `0` a `7`, derivados da escala micro e medium. Usado para definir limites visuais em componentes e containers.
- `border-style`: tipos de traço aplicáveis às bordas. Inclui estilos como `none`, `solid`, `dashed`, `dotted` e `double`, permitindo variações visuais semânticas.
- `radius`: escala de curvatura aplicada a cantos e formas. Os níveis de `0` a `7` são derivados da escala micro, com o nível `7` representando o estilo `pill`. Inclui também o valor especial `radius-circle`, utilizado para formas circulares com 50%.

### Aplicações

- Definição de bordas e curvaturas em componentes visuais.
- Criação de formas geométricas como círculos e pills.
- Estilização de containers, cards, botões e campos de entrada.
- Geração de `sprouts` para controle de borda e raio.

## `Spacing`

O Seed `Spacing` define os parâmetros de espaçamento e estrutura de grid do Codessa Growing. Ele organiza valores semânticos para preenchimento interno, margens externas, espaçamento entre elementos, deslocamentos visuais e número de colunas padrão.

### Propósito

- Estabelecer uma escala modular para espaçamentos internos e externos.
- Garantir consistência visual entre componentes, seções e layouts.
- Servir como base para construção de grids, alinhamentos e deslocamentos.

### Estrutura

O `Spacing` é composto por cinco grupos principais:
- `space`: **nova escala genérica de espaçamento**, que serve como a fonte da verdade para todos os valores de espaçamento.
- `padding`: escala de espaço interno aplicada a componentes e containers, referenciando a escala `space`.
- `margin`: escala de espaço externo entre elementos, referenciando a escala `space`.
- `gap`: espaçamento entre colunas e linhas em estruturas de grid, referenciando a escala `space`.
- `columns`: define o número padrão de colunas para construção de grids. Os níveis vão de `1` a `12`, permitindo variações semânticas e estruturais.
- `offset`: escala de deslocamento visual aplicada em alinhamentos, animações ou posicionamentos, referenciando a escala `space`.

### Aplicações

- Definição de espaçamentos internos e externos em componentes.
- Construção de grids e layouts responsivos.
- Controle de alinhamento e separação entre elementos.

## `Type`

O Seed `Type` define os parâmetros tipográficos do Codessa Growing. Ele organiza valores semânticos para família de fonte, tamanho, altura de linha e espessura, permitindo consistência visual e hierarquia textual em todos os níveis da interface.

### Propósito

- Estabelecer uma escala tipográfica modular e semântica.
- Garantir legibilidade, ritmo e hierarquia em títulos, textos e elementos funcionais.
- Servir como base para estilização textual em componentes e layouts.

### Estrutura

O `Type` é composto por quatro grupos principais:
- `font-family`: define as famílias tipográficas utilizadas no sistema.
  Os grupos são:
  - `font-base`: fonte principal, geralmente aplicada em títulos e elementos de marca.
  - `font-aux`: fonte secundária, utilizada em textos corridos e descrições.
  - `font-mono`: fonte monoespaçada, aplicada em trechos de código, tabelas ou elementos técnicos.
- `font-size`: escala de tamanho tipográfico, com níveis de `1` a `7`, derivados da escala micro e medium. Aplicável a títulos, parágrafos, legendas e elementos funcionais.
- `line-height`: escala de altura de linha, com valores que variam de `1.2` a `3.`. Permite controle de ritmo vertical e legibilidade em diferentes contextos.
- `font-weight`: escala de espessura tipográfica, com níveis de `300` a `900`. Usada para definir ênfase, contraste e hierarquia textual.

### Aplicações

- Definição de estilos tipográficos em componentes e seções.
- Criação de hierarquia visual entre títulos, textos e descrições.
- Controle de ritmo e legibilidade em blocos de conteúdo.
- Geração de `sprouts` para estilização textual semântica.

## Boas Práticas

- Seeds são fundamentos semânticos, não estilos prontos — devem ser usados como base para construir `soils`, `sprouts` e `trunks`.
- Evite aplicar seeds diretamente em componentes — prefira compor variáveis intermediárias nos `soils` ou usar `sprouts`.
- Seeds podem ser combinados livremente — a arquitetura do Codessa Growing permite personalização extrema, inclusive a criação de novos seeds.
- Use os espelhos Sass (`$map`) para lógica condicional, geração de utilitários e adaptação visual.
- Mantenha a nomenclatura funcional e progressiva (`--nome-funcional-nível`) para garantir legibilidade e escalabilidade.
- Seeds não são imutáveis — podem ser estendidos, adaptados ou substituídos conforme o contexto do produto ou marca.
