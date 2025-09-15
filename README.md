

![Status](https://img.shields.io/badge/status-development%20v0.0.1--alpha-yellow.svg)

# Codessa Growing — Design System Modular

## Sumário
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Filosofia visual](#filosofia-visual)
- [Como começar](#como-começar)
- [Documentação](#documentação)
- [Autor](#autor)
- [Licença](#licença)
- [Contribuições](#contribuições)

## Visão Geral
Codessa Growing é um design system visual, modular e altamente personalizável, que serve como base para todos os projetos Codessa. Permite criar interfaces consistentes, flexíveis e com identidade própria, utilizando Sass, JavaScript puro e Vite.

## Funcionalidades
- Base tipográfica e visual neutra
- Seeds visuais adaptáveis para qualquer estilo
- Modularidade e semântica em todos os componentes
- Sistema de variáveis, mixins e agrupadores visuais
- Estrutura para criação de interfaces completas
- Suporte a deploy em múltiplos ambientes

## Filosofia visual

Codessa Growing parte de uma **base neutra e tipográfica**, permitindo que cada projeto floresça com identidade própria.
A estrutura Sass é totalmente personalizável, com **seeds visuais** adaptáveis para qualquer estilo, tema ou linguagem.

A composição é orientada por semântica, modularidade e fluidez — cada elemento tem propósito, cada bloco tem função.
O sistema é irrigado por **veins** (variáveis semânticas), agrupados em **soils** (contextos visuais), e instanciado por **sprouts** (mixins construtores) que crescem em **trunks** (componentes e elementos estilizados) e se organizam em **groves** (fluxos visuais completos).

## Como começar

1.  Instale as dependências do projeto com `npm install`
2.  Inicie o ambiente de desenvolvimento com `npm run dev`
3.  Os estilos são escritos em **Sass** e compilados automaticamente pelo **Vite**
4.  O projeto utiliza **JavaScript puro**, sem frameworks, para garantir leveza e flexibilidade
5.  Explore os seeds, soils e sprouts para construir interfaces consistentes
6.  Utilize os trunks e groves para estruturar fluxos visuais completos

> O build final será gerado na pasta `dist/`, pronta para deploy via GitHub Pages, Firebase Hosting ou outro serviço.

## Documentação

Esta documentação está organizada em seções para facilitar o entendimento e a navegação:

1. [Foundation](docs/Foundation.md)
A camada mais fundamental, responsável por normalização e resets de CSS.
2. [Seeds](docs/Seeds.md)
Valores visuais base do sistema: cores, tipografia, espaçamentos, radius, etc.
3. [Soils](docs/Soils.md)
Agrupadores semânticos que organizam os `veins` (variáveis semânticas) por domínio funcional.
4. [Sprouts](docs/Sprouts.md)
Construtores visuais semânticos (mixins) organizados por propósito: estrutura, texto, navegação, etc.
5. [Trunks](docs/Trunks.md)
Classes CSS e elementos estilizados que compõem a interface final.
6. [Trunk Usage Guide](docs/Trunk%20Usage%20Guide/)
Exemplos práticos de como utilizar cada Trunk.
7. [Groves](docs/groves.md)
Conjuntos completos de fluxos visuais agrupados por propósito. São vendidos separadamente e não fazem parte do pacote gratuito.
8. [Sparks](docs/sparks.md)
Scripts JavaScript que ativam interações, transições, lógica dinâmica e comportamento visual.
9. [Harvest](docs/harvest.md)
Repositório de assets do sistema: imagens, ícones, fontes, vídeos e documentos.

## Autor
Desenvolvido por Rafael Elyah.

## Licença
Este módulo está licenciado sob a MIT License. Para termos adicionais sobre plugins pagos, marketplace ou uso comercial, consulte o arquivo TERMS-OF-USE.md.

## Contribuições
Sugestões, melhorias e correções são bem-vindas. Você pode abrir uma issue ou enviar um pull request com suas propostas.