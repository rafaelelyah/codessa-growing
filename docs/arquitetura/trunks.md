# Codessa Growing — Trunks

Este documento descreve os **Trunks**, a camada final de estilização no Codessa Growing. Os Trunks são as **classes CSS e elementos HTML estilizados** que compõem a interface final, utilizando os mixins dos `Sprouts` e as variáveis semânticas dos `Soils`.

---

## Índice

- [O que são Trunks?](#o-que-são-trunks)
- [Filosofia Trunk-first, Sprout-driven](#filosofia-trunk-first-sprout-driven)
- [Padrão Codessa para Personalização de Trunks](#padrão-codessa-para-personalização-de-trunks)
- [Trunk Base (`_base.scss`)](#trunk-base-_basescss)
- [Trunks de Componentes](#trunks-de-componentes)
- [Boas Práticas](#boas-práticas)
- [Guia de Uso](#guia-de-uso)

---

## O que são Trunks?

Os Trunks são a materialização do design. Eles são as classes CSS que você aplica diretamente no seu HTML para construir a interface. Cada Trunk é um componente ou um padrão de layout que encapsula estilos complexos, mas que é fácil de usar. Eles são construídos a partir dos `Sprouts` (mixins) e consomem as `Veins` (variáveis semânticas) dos `Soils`.

## Filosofia Trunk-first, Sprout-driven

Esta filosofia orienta a construção de componentes no Codessa Growing:

*   **Trunk-first:** Começa pela visão funcional do componente (ex: um `header` com navegação, logo e busca). O foco é na estrutura e no propósito do elemento no HTML.
*   **Sprout-driven:** Os mixins (`Sprouts`) são criados conforme a necessidade semântica de cada parte do Trunk. Isso garante que os estilos sejam modulares e reutilizáveis.
*   **Soil-fed:** Todos os `Sprouts` são "irrigados" pelas `Veins` definidas nos `Soils`. Isso assegura que os componentes se adaptem automaticamente a diferentes temas e densidades.
*   **Composição Modular:** Cada parte do Trunk pode ser reutilizada em outros contextos, promovendo a consistência e a eficiência.

## Extend Cascade (Herança Inteligente)

A filosofia **Extend Cascade** implementa herança inteligente entre componentes:

*   **Base Funcional:** A classe base contém apenas sprouts funcionais (estrutura, layout, comportamento)
*   **Herança Automática:** Variants herdam tudo da base via `@extend`, garantindo consistência
*   **Sobrescrita Mínima:** Apenas as diferenças específicas são adicionadas em cada variant
*   **Manutenibilidade:** Mudanças na base se propagam automaticamente para todas as variants
*   **Separação Clara:** Funcional (base) vs Visual (variants) vs Customização (Leafs)

## Leaf-first Customization (Personalização Visual)

A filosofia **Leaf-first Customization** orienta a aplicação de customizações visuais:

*   **Visual Overrides:** As Leafs sobrescrevem apenas propriedades visuais após os Trunks
*   **Composição Aditiva:** Múltiplas Leafs podem ser combinadas no mesmo elemento
*   **Separação de Responsabilidades:** Estrutura (Trunks) vs Aparência (Leafs) vs Comportamento (Sprouts)
*   **Reutilização Máxima:** Uma Leaf pode ser aplicada a qualquer componente compatível
*   **Flexibilidade:** Customizações específicas sem alterar a estrutura base

## Padrão Codessa para Personalização de Trunks

O "Padrão Codessa" para a criação e personalização de Trunks é uma abordagem que visa maximizar a **flexibilidade**, a **modularidade** e a **manutenibilidade** de componentes de UI. Ele permite que os desenvolvedores componham layouts e estilos diretamente no HTML, sem a necessidade de modificar arquivos SCSS da biblioteca principal.

Ele se baseia em três pilares principais:

1.  **Trunks Enxutos e Semânticos (Base):**
    *   **Propósito:** Cada arquivo de Trunk (`_header.scss`, `_footer.scss`, `_nav.scss`, etc.) define apenas os estilos **essenciais e semânticos** do componente. Isso inclui padding, margens básicas, bordas, cores de fundo e texto que são inerentes à sua função.
    *   **Sem Layouts Fixos:** A base do Trunk **não impõe layouts específicos** (como `display: flex`, `justify-content`, `align-items`, ou orientação horizontal/vertical) a menos que seja absolutamente fundamental para a natureza do componente (e mesmo assim, com a intenção de ser sobrescrito por modificadores).
    *   **Dependência de Soils:** Utiliza extensivamente as variáveis semânticas (`var(--...)`) definidas na camada `Soils` para cores, espaçamentos, tipografia, etc. Isso garante que o componente se adapte automaticamente ao tema global do projeto.

2.  **Modificadores Composíveis (Classes Utilitárias de Layout/Estilo):**
    *   **Propósito:** Para cada variação comum de layout, alinhamento, tamanho, estado ou cor, são criadas **classes modificadoras** específicas dentro do próprio arquivo SCSS do Trunk (ex: `&--flex`, `&--justify-center`, `&--horizontal`, `&--primary`).
    *   **Granularidade:** Esses modificadores são granulares, permitindo que o desenvolvedor combine-os como blocos de construção no HTML. Por exemplo, em vez de um `header--centered-nav`, temos `header--flex`, `header--justify-center`, `nav--horizontal`.
    *   **Reutilização de Sprouts:** Os modificadores devem, sempre que possível, alavancar os mixins da camada `Sprouts` (`@include sprout-flex`, `@include sprout-nav-horizontal`, etc.) para garantir consistência e evitar duplicação de código.
    *   **Layouts Padrão (Opcional):** Para combinações de modificadores muito comuns, pode-se criar um modificador de conveniência (ex: `&--default-layout`) que `@extend` os modificadores granulares. Isso simplifica o HTML para cenários típicos.

3.  **Ponto de Entrada de Personalização Centralizado (`my-trunks.scss`):**
    *   **Propósito:** Este arquivo serve como o **único local** onde o desenvolvedor do projeto deve adicionar suas personalizações.
    *   **Importação de Camadas:** Ele `@use` todas as camadas da biblioteca (Foundation, Seeds, Soils, Sprouts, Trunks) para ter acesso a todas as ferramentas.
    *   **Sobrescrita de Soils:** Permite a sobrescrita de variáveis `Soils` (via `:root` para CSS Custom Properties) para alterar o tema global do projeto.
    *   **Extensão de Trunks:** Permite a criação de novos componentes ou variações que `@extend` os Trunks existentes, adicionando estilos específicos sem tocar nos arquivos da biblioteca.
    *   **Sem Modificação da Biblioteca:** A regra de ouro é **nunca modificar diretamente os arquivos SCSS da biblioteca** (`src/terrain/trunks/`, `src/terrain/sprouts/`, etc.). Isso garante que o projeto possa ser atualizado para novas versões da biblioteca sem quebrar as personalizações.

**Benefícios do Padrão Codessa:**

*   **Flexibilidade Extrema:** O desenvolvedor tem controle total sobre o layout e o estilo, combinando classes no HTML.
*   **Manutenibilidade:** A biblioteca principal permanece intocada, facilitando atualizações e reduzindo a dívida técnica.
*   **Composição Clara:** O HTML se torna mais legível, pois as classes descrevem o comportamento e o estilo do componente.
*   **Consistência:** O uso de `Soils` e `Sprouts` garante que as personalizações sigam o vocabulário de design do sistema.
*   **Arquivos Enxutos:** Cada arquivo SCSS tem uma responsabilidade clara e limitada, tornando o código mais fácil de entender e gerenciar.

## Trunk Base (`_base.scss`)

O `_base.scss` é um Trunk especial. Ele é responsável por aplicar o tema visual padrão (definido nos `Soils`) diretamente nas tags HTML básicas (`body`, `h1`, `p`, `a`, `button`, `input`, etc.). Ele serve como a aparência base para todo o site, garantindo que os elementos nativos já tenham um estilo consistente antes mesmo de qualquer classe ser aplicada.

## Trunks de Componentes

Além do `_base.scss`, cada arquivo `trunk` individual (como `_header.scss`, `_footer.scss`, `_nav.scss`, etc.) define a estilização para um componente ou seção específica da interface. Eles utilizam os `Sprouts` para construir seus estilos, garantindo que sigam o vocabulário de design do sistema.

**Exemplos:**

*   `_header.scss`: Define a classe `.trunk-header` para o cabeçalho do site.
*   `_nav.scss`: Define a classe `.trunk-nav` para menus de navegação.
*   `_container.scss`: Define classes como `.trunk-container` para delimitar o conteúdo.
*   `_logo.scss`: Define a classe `.trunk-logo` para o componente de logo.
*   `_card.scss`: Define a classe `.trunk-card` para o componente de card.
*   `_form.scss`: Define a classe `.trunk-form` para o componente de formulário.
*   `_alert.scss`: Define a classe `.trunk-alert` para o componente de alerta.
*   `_modal.scss`: Define a classe `.trunk-modal` para o componente de modal.
*   `_badge.scss`: Define a classe `.trunk-badge` para o componente de badge.
*   `_tabs.scss`: Define a classe `.trunk-tabs` para o componente de abas.
*   `_icon.scss`: Define a classe `.trunk-icon` para elementos de ícone.
*   `_video.scss`: Define a classe `.trunk-video` para elementos de vídeo.
*   `_image.scss`: Define a classe `.trunk-image` para elementos de imagem.
*   `_canvas.scss`: Define a classe `.trunk-canvas` para elementos de canvas.
*   `_blockquote.scss`: Define a classe `.trunk-blockquote` para citações de bloco.
*   `_pre.scss`: Define a classe `.trunk-pre` para texto pré-formatado.
*   `_code.scss`: Define a classe `.trunk-code` para código inline.
*   `_audio.scss`: Define a classe `.trunk-audio` para elementos de áudio.
*   `_pagination.scss`: Define a classe `.trunk-pagination` para o componente de paginação.
*   `_breadcrumbs.scss`: Define a classe `.trunk-breadcrumbs` para o componente de breadcrumbs.
*   `_link.scss`: Define a classe `.trunk-link` para elementos de link.
*   `_table.scss`: Define a classe `.trunk-table` para tabelas.
*   `_list.scss`: Define a classe `.trunk-list` para listas.
*   `_paragraph.scss`: Define a classe `.trunk-paragraph` para parágrafos.
*   `_heading.scss`: Define a classe `.trunk-heading` para títulos.
*   `_grid.scss`: Define a classe `.trunk-grid` para layouts de grid.

## Boas Práticas

*   **Use Trunks diretamente no HTML:** Aplique as classes `trunk-*` diretamente nas suas tags HTML.
*   **Combine com Sprouts:** Se precisar de variações ou comportamentos específicos, utilize os `Sprouts` dentro dos seus próprios arquivos Sass/SCSS.
*   **Respeite a Hierarquia:** Lembre-se que os Trunks consomem `Sprouts` que consomem `Soils` que consomem `Seeds`. Mantenha essa ordem para garantir a flexibilidade e manutenibilidade.
*   **Evite Hardcoding:** Sempre que possível, utilize as `Veins` dos `Soils` ou os `Sprouts` em vez de valores fixos.
*   **Documente:** Mantenha a documentação dos seus Trunks atualizada com exemplos de uso.

## Guia de Uso

Para exemplos práticos de como utilizar cada Trunk, consulte os seguintes guias:

*   [Alert](Trunk%20Usage%20Guide/alert.md)
*   [Aside](Trunk%20Usage%20Guide/aside.md)
*   [Audio](Trunk%20Usage%20Guide/audio.md)
*   [Badge](Trunk%20Usage%20Guide/badge.md)
*   [Blockquote](Trunk%20Usage%20Guide/blockquote.md)
*   [Breadcrumbs](Trunk%20Usage%20Guide/breadcrumbs.md)
*   [Button](Trunk%20Usage%20Guide/button.md)
*   [Canvas](Trunk%20Usage%20Guide/canvas.md)
*   [Card](Trunk%20Usage%20Guide/card.md)
*   [Code](Trunk%20Usage%20Guide/code.md)
*   [Container](Trunk%20Usage%20Guide/container.md)
*   [Form](Trunk%20Usage%20Guide/form.md)
*   [Footer](Trunk%20Usage%20Guide/footer.md)
*   [Grid](Trunk%20Usage%20Guide/grid.md)
*   [Header](Trunk%20Usage%20Guide/header.md)
*   [Heading](Trunk%20Usage%20Guide/heading.md)
*   [Hero](Trunk%20Usage%20Guide/hero.md)
*   [Icon](Trunk%20Usage%20Guide/icon.md)
*   [Image](Trunk%20Usage%20Guide/image.md)
*   [Image Text Section](Trunk%20Usage%20Guide/image_text_section.md)
*   [Link](Trunk%20Usage%20Guide/link.md)
*   [List](Trunk%20Usage%20Guide/list.md)
*   [Logo](Trunk%20Usage%20Guide/logo.md)
*   [Main](Trunk%20Usage%20Guide/main.md)
*   [Modal](Trunk%20Usage%20Guide/modal.md)
*   [Nav](Trunk%20Usage%20Guide/nav.md)
*   [Pagination](Trunk%20Usage%20Guide/pagination.md)
*   [Paragraph](Trunk%20Usage%20Guide/paragraph.md)
*   [Pre](Trunk%20Usage%20Guide/pre.md)
*   [Search](Trunk%20Usage%20Guide/search.md)
*   [Section](Trunk%20Usage%20Guide/section.md)
*   [Social Links](Trunk%20Usage%20Guide/social_links.md)
*   [Table](Trunk%20Usage%20Guide/table.md)
*   [Tabs](Trunk%20Usage%20Guide/tabs.md)
*   [Video](Trunk%20Usage%20Guide/video.md)
