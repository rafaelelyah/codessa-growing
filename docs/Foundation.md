# Codessa Growing — Foundation

Este documento descreve o papel da **Foundation** no Codessa Growing. A Foundation é a camada mais fundamental do sistema, responsável por estabelecer uma base neutra e consistente para todos os elementos HTML, garantindo normalização, resets e acessibilidade mínima, sem aplicar estilos visuais opinativos.

---

## O que é a Foundation?

A Foundation atua como um **reset e normalizador de CSS puro**. Seu objetivo principal é:

*   **Neutralizar inconsistências:** Remover diferenças de estilo padrão entre navegadores.
*   **Resetar margens e paddings:** Eliminar espaçamentos padrão de elementos para um controle total via `soils` e `sprouts`.
*   **Garantir `box-sizing`:** Definir `box-sizing: border-box` globalmente para um modelo de caixa previsível.
*   **Acessibilidade:** Incluir helpers essenciais para navegação e interação acessível.

**A Foundation NÃO aplica estilos visuais.** Ela não define cores, fontes, tamanhos ou layouts para elementos como botões, títulos ou parágrafos. Sua função é preparar o terreno para que as camadas `soils`, `sprouts` e `trunks` construam a interface com design e intenção.

## Estrutura Base

Define comportamentos essenciais para o `html` e elementos globais.

*   `html`: Garante que `1rem` seja consistente (`font-size: 100%`), define `scroll-behavior: smooth` e o `box-sizing` herdável.
*   `*, *::before, *::after`: Garante que todos os elementos herdem o `box-sizing`.

## Resets e Normalização

Remove estilos padrão de navegadores que podem interferir na composição visual e estrutural.

*   **Reset de Margens:** Remove `margin` e `padding` padrão de elementos como `body`, `h1-h6`, `p`, `ul`, `ol`, `blockquote`, `fieldset`, etc.
*   **Normalização de Mídia:** Garante que imagens, vídeos e SVGs sejam responsivos por padrão (`max-width: 100%`, `height: auto`, `display: block`).
*   **Reset de Elementos de Formulário:** Neutraliza estilos padrão de `input`, `button`, `textarea`, `select`, `fieldset` e `legend`, permitindo que sejam estilizados do zero.

## Acessibilidade

Inclui helpers e regras para garantir uma experiência acessível.

*   `:focus-visible`: Garante que o foco do teclado seja sempre visível, com um `outline` básico que será sobrescrito pelos `trunks`.
*   `.visually-hidden`: Classe utilitária para ocultar conteúdo visualmente, mas mantê-lo disponível para leitores de tela.

## Boas Práticas

*   **Mantenha a Foundation neutra:** Ela não deve conter cores, tipografia, espaçamentos ou qualquer estilo visual. Sua função é puramente estrutural e de normalização.
*   **Sem dependências:** A Foundation não deve importar ou depender de outras camadas (seeds, soils, sprouts, trunks).
*   **Foco na consistência:** Seu objetivo é eliminar inconsistências entre navegadores e fornecer uma base limpa para o desenvolvimento.
*   **Comentários claros:** Mantenha os comentários concisos e focados no *porquê* da regra, não no *o quê*.