# Codessa Growing — Soils

Este documento descreve a arquitetura visual do Codessa Growing a partir das **Soils**. Soils representam **contextos visuais compostos por Veins semânticos** derivados dos Seeds. Elas definem como a interface se comporta em diferentes temas, densidades e ambientes, garantindo consistência, adaptabilidade e elegância.

**Veins** são as variáveis semânticas que irrigam os componentes visuais com os valores definidos nos Seeds. Elas são aplicadas em Trunks, Sprouts e outros elementos para garantir consistência e flexibilidade.

---

## Índice de Soils

- [O que são Soils e Veins?](#o-que-são-soils-e-veins)
- [Soil Base (_soil.scss)](#soil-base-_soilscss)
- [Temas](#temas)
- [Densidades](#densidades)
- [Composição](#composição)
- [Importação](#importação)
- [Boas Práticas](#boas-práticas)

---

## O que são Soils e Veins?

As **Soils** são a camada que traduz os **Seeds** (tokens brutos) em **Veins** (variáveis semânticas). Elas criam um vocabulário de design que é independente dos valores brutos, permitindo que o sistema seja temático e adaptável.

*   **Seeds:** `--color-neutral-7`, `--text-size-4` (valores brutos)
*   **Soils (Veins):** `--bg-primary`, `--text-md` (variáveis semânticas)

Essa abstração permite que você mude o tema (ex: de claro para escuro) ou a densidade (ex: de espaçoso para compacto) alterando apenas os valores das Veins, sem precisar modificar os componentes que as utilizam.

### Consumo dos Seeds

O Soil consome os Seeds através de mapas Sass estruturados. Cada Seed é um mapa que contém sub-mapas organizados por categoria:

- **Palette Seeds**: `$palette-seeds` com sub-mapas `brand`, `neutral`, `context`, etc.
- **Spacing Seeds**: `$spacing-seeds` com sub-mapas `generic`, `padding`, `margin`, etc.
- **Type Seeds**: `$type-seeds` com sub-mapas `families`, `sizes`, `weights`, etc.

O Soil usa `map-get` para acessar esses valores e gerar as variáveis CSS diretamente, garantindo uma arquitetura limpa e modular.

## Soil Base (`_soil.scss`)

A Soil Base (`_soil.scss`) define o contrato semântico principal do sistema. Ela importa os Seeds e gera as Veins (variáveis CSS) diretamente dos mapas de Seeds usando `map-get`. Todas as variantes de Soil herdam e sobrescrevem a partir dela.

### Estrutura Atual

```scss
// src/terrain/soils/_soil.scss
@use '../seeds' as seeds;

// Geração de variáveis CSS diretamente dos Seeds
:root {
  // Raw veins (variáveis brutas)
  --color-neutral-1: #{map-get(seeds.$palette-seeds, neutral, 1)};
  --color-neutral-2: #{map-get(seeds.$palette-seeds, neutral, 2)};
  // ...

  // Semantic veins (variáveis semânticas)
  --bg-primary: var(--color-neutral-1);
  --bg-secondary: var(--color-neutral-2);
  --text-primary: var(--color-neutral-9);
  // ...
}
```

## Temas

Soils temáticas definem o comportamento visual da interface em contextos claros ou escuros. Elas sobrescrevem Veins como `bg-*`, `text-*`, `border-*`, `interactive-*` e `gradient-*`.

#### `soil.dark` (`_soil.dark.scss`)

Visual escuro, com fundo neutro escuro e texto claro. Ideal para ambientes noturnos, interfaces focadas ou contextos de contraste elevado.

**Aplicação:**

```html
<body data-theme="dark">
```

*(Nota: O tema `soil.light` não possui um arquivo dedicado, pois o `_soil.scss` base já representa o tema claro padrão.)*

## Densidades

Soils de densidade definem o espaçamento e tamanho tipográfico da interface. Elas sobrescrevem Veins como `padding-*`, `margin-*`, `gap-*`, `text-*`, `leading-*` e `container-*`.

#### `soil.compact` (`_soil.compact.scss`)

Interface densa, com espaçamentos reduzidos e tipografia menor. Indicada para dashboards, ambientes produtivos ou contextos com alta concentração de informação.

**Aplicação:**

```html
<body data-density="compact">
```

#### `soil.spacious` (`_soil.spacious.scss`)

Interface ampla, com espaçamentos generosos e tipografia relaxada. Indicada para ambientes de leitura, interfaces desktop ou experiências visuais abertas.

**Aplicação:**

```html
<body data-density="spacious">
```

## Composição

Soils podem ser combinadas dinamicamente para adaptar a interface ao contexto do usuário:

```html
<body data-theme="dark" data-density="compact">
```

Essa composição permite que a interface se adapte ao contexto do usuário sem alterar os componentes diretamente.

## Importação

Todas as Soils são encaminhadas via `soils/_index.scss`. Para consumir Veins em Sprouts ou Trunks, importe o índice:

```scss
@use '../soils' as *;
```

## Boas Práticas

- **Seeds como fonte da verdade**: Mantenha os valores base nos Seeds e use o Soil apenas para gerar as variáveis semânticas via `map-get`.
- **Sem mapas intermediários**: O Soil deve gerar variáveis CSS diretamente dos Seeds, evitando mapas intermediários para manter a arquitetura limpa.
- **Nomes consistentes**: Use convenções claras para nomes de mapas nos Seeds (ex: `$palette-seeds`, `$spacing-seeds`) e variáveis CSS (ex: `--color-neutral-1`, `--bg-primary`).
- **Composição dinâmica**: Use atributos como `data-theme` e `data-density` para aplicar variantes sem modificar a estrutura dos componentes.
- **Extensibilidade**: Crie novas Soils a partir da `_soil.scss` base quando precisar de variações específicas, sobrescrevendo apenas as Veins necessárias.
- **Manutenção**: Alterações nos Seeds se propagam automaticamente para as Veins através do `map-get`, facilitando atualizações consistentes.
