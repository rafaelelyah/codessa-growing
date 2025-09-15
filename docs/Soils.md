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

## Soil Base (`_soil.scss`)

A Soil Base (`_soil.scss`) define o contrato semântico principal do sistema. Ela organiza os Veins visuais derivados dos Seeds em categorias como cor, tipografia, espaçamento, borda, motion, layout e hierarquia. Todas as variantes de Soil herdam e sobrescrevem a partir dela.

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

- Soils são contextos visuais compostos — não devem ser alteradas diretamente, mas sim estendidas ou combinadas conforme a necessidade.
- Use atributos como `data-theme` e `data-density` para aplicar variantes sem modificar a estrutura dos componentes.
- Crie novas Soils a partir da `_soil.scss` base quando precisar de variações específicas para produtos, marcas ou ambientes.
- Evite duplicar Veins — prefira compor a partir das definições já existentes na `_soil.scss` e suas variantes.
- Mantenha nomes semânticos e consistentes para facilitar leitura, manutenção e escalabilidade.
- Soils devem ser tratadas como camadas de contexto — não como estilos isolados ou sobrescritas pontuais.
