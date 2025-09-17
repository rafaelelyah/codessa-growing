

![Status](https://img.shields.io/badge/status-development%20v1.0.0--alpha-yellow.svg)

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
- **Sistema de Sync Inteligente**: Downloads organizados em pastas `grow-sync/` com estratégias específicas por tipo de asset
- **Integração com Nest Grow**: CLI avançado para gerenciamento de componentes e assets

## Sistema de Sync Inteligente com Nest Grow

O Codessa Growing integra-se perfeitamente com o **Nest Grow** - um sistema CLI avançado para gerenciamento universal de componentes. Esta integração permite downloads organizados, busca inteligente e integração automática de componentes.

### Estrutura Organizada Grow-Sync:
```
grow-sync/
├── seeds/         # Design tokens (downloads completos)
├── soils/         # Temas & variantes (downloads completos)
├── leafs/         # Utilitários CSS (expansão de biblioteca)
├── sprouts/       # Comportamentos (expansão de biblioteca)
├── trunks/        # Componentes SCSS (expansão de biblioteca)
├── trees/         # Templates completos (downloads de template)
├── grooves/       # Templates multi-arquivo (downloads de template)
├── sparks/        # Componentes JavaScript (expansão de biblioteca)
└── harvest/       # Assets (colocação direta em src/assets/)
```

### Estratégias por Tipo de Asset:
- **Seeds & Soils**: Download completo → `grow-sync/seeds|soils/` - bibliotecas completas
- **Leafs, Sprouts & Trunks**: Expansão → `grow-sync/leafs|sprouts|trunks/` - componentes individuais
- **Trees & Grooves**: Template → `grow-sync/trees|grooves/` - estruturas completas
- **Harvest**: Direto → `src/assets/images|videos|audio|icons|fonts/` - assets no destino final
- **Sparks**: Expansão → `grow-sync/sparks/` - scripts funcionais

### Comandos Grow Disponíveis:

#### Extração e Busca
```bash
# Extrair componentes
npm run grow header-1 nav-simple:navbar

# Buscar componentes
npm run grow search button
npm run grow search header --type=trunks

# Busca online (futuro)
npm run grow trunk-button --online
```

#### Gerenciamento de Assets
```bash
# Listar todos os assets
npm run grow assets --list

# Integrar componente na biblioteca
npm run grow assets --integrate trunk-button --library=trunks

# Copiar asset para local específico
npm run grow assets --copy image-logo --to=src/components/

# Limpar assets baixados
npm run grow assets --clean
```

#### Gerenciamento de Repositórios
```bash
# Adicionar repositório
npm run grow repo --add --name=myrepo --url=https://github.com/user/repo

# Listar repositórios
npm run grow repo --list

# Sincronizar repositório
npm run grow sync --repository=codessa-registry
```

#### Sistema e Cache
```bash
# Validar sistema
npm run grow validate

# Gerenciar cache
npm run grow cache stats
npm run grow cache clear

# Limpar componentes
npm run grow clean header-1 --force
```

### Benefícios da Integração Grow:
- **Organização Inteligente**: Componentes organizados por tipo automaticamente
- **Busca Avançada**: Localização rápida de componentes por nome ou tipo
- **Integração Automática**: Componentes integrados nas bibliotecas corretas
- **Cache Persistente**: Aprendizado automático de mapeamentos
- **Sync Online**: Suporte futuro para downloads de repositórios remotos

## Filosofia visual

Codessa Growing parte de uma **base neutra e tipográfica**, permitindo que cada projeto floresça com identidade própria.
A estrutura Sass é totalmente personalizável, com **seeds visuais** adaptáveis para qualquer estilo, tema ou linguagem.

A composição é orientada por semântica, modularidade e fluidez — cada elemento tem propósito, cada bloco tem função.
O sistema é irrigado por **veins** (variáveis semânticas), agrupados em **soils** (contextos visuais), e instanciado por **sprouts** (mixins construtores) que crescem em **trunks** (componentes e elementos estilizados), se organizam em **groves** (pastas com múltiplas trees - fluxos visuais completos com vários arquivos index, .scss e outros), e recebem o **toque final** pelas **leafs** (modificadores visuais que refinam detalhes e dão personalidade única).

## Filosofias do Sistema

### Trunk-first, Sprout-driven
- **Trunk-first:** Começa pela visão funcional do componente (estrutura e propósito)
- **Sprout-driven:** Os mixins são criados conforme a necessidade semântica de cada parte
- **Soil-fed:** Todos os elementos são irrigados pelas variáveis semânticas dos Soils

### Hereditary Morph (Cascata Inteligente)
- **Herança Inteligente:** Trunks herdam comportamentos via `@extend` para consistência
- **Cascata Controlada:** Sobrescrita mínima, consistência máxima
- **Flexibilidade Modular:** Adaptação sem quebra de estrutura
- **Manutenibilidade:** Mudanças na base afetam automaticamente todas as variants

### Leaf Touch (Toque Final Visual)
- **Toque Final:** As Leafs aplicam o acabamento visual que dá personalidade
- **Detalhes que Importam:** Cuidam dos pequenos ajustes que fazem a diferença
- **Modificadores Especiais:** Refinam cores, tamanhos, efeitos e estados
- **Composição Aditiva:** Múltiplas Leafs podem ser combinadas
- **Separação Clara:** Estrutura (Trunks) vs Aparência (Leafs) vs Comportamento (Sprouts)

## Como começar

### Setup Básico
1.  Instale as dependências do projeto com `npm install`
2.  Inicie o ambiente de desenvolvimento com `npm run dev`
3.  Os estilos são escritos em **Sass** e compilados automaticamente pelo **Vite**
4.  O projeto utiliza **JavaScript puro**, sem frameworks, para garantir leveza e flexibilidade

### Usando o Sistema Grow
1.  Explore os seeds, soils e sprouts para construir interfaces consistentes
2.  Utilize os trunks e groves para estruturar fluxos visuais completos
3.  Use o comando `npm run grow search <termo>` para encontrar componentes disponíveis
4.  Extraia componentes com `npm run grow <componente>` para desenvolvimento
5.  Gerencie assets baixados com `npm run grow assets --list`

### Primeiros Passos com Grow:
```bash
# Ver ajuda completa
npm run grow

# Buscar componentes disponíveis
npm run grow search button

# Extrair um componente para desenvolvimento
npm run grow trunk-button

# Listar assets disponíveis
npm run grow assets --list

# Validar sistema
npm run grow validate
```

> O build final será gerado na pasta `dist/`, pronta para deploy via GitHub Pages, Firebase Hosting ou outro serviço.

## Documentação

Esta documentação está organizada em seções para facilitar o entendimento e a navegação:

### Camadas do Sistema Growing:
1. [Foundation](docs/Foundation.md) - Camada fundamental, normalização e resets
2. [Seeds](docs/Seeds.md) - Valores visuais base: cores, tipografia, espaçamentos
3. [Soils](docs/Soils.md) - Agrupadores semânticos das variáveis por domínio
4. [Sprouts](docs/Sprouts.md) - Construtores visuais semânticos (mixins)
5. [Trunks](docs/Trunks.md) - Classes CSS e elementos estilizados
6. [Leafs](docs/Leafs.md) - Modificadores visuais finais
7. [Trunk Usage Guide](docs/Trunk%20Usage%20Guide/) - Exemplos práticos de uso
8. [Groves](docs/groves.md) - Conjuntos completos de fluxos visuais
9. [Sparks](docs/sparks.md) - Scripts JavaScript para interações
10. [Harvest](docs/harvest.md) - Repositório de assets multimídia

### Sistema Grow:
11. [Grow CLI](Nest/Grow/README.md) - Documentação completa do sistema CLI Grow

### Recursos Adicionais:
- **Sistema de Sync Organizado**: Downloads inteligentes em `grow-sync/` por tipo
- **Cache Persistente**: Aprendizado automático de mapeamentos de componentes
- **Integração Automática**: Componentes integrados nas bibliotecas corretas
- **Busca Avançada**: Localização rápida por nome, tipo ou categoria
- **Filosofias do Sistema**: Trunk-first, Hereditary Morph e Leaf Touch

## Autor
Desenvolvido por Rafael Elyah.

## Licença
Este módulo está licenciado sob a MIT License. Para termos adicionais sobre plugins pagos, marketplace ou uso comercial, consulte o arquivo TERMS-OF-USE.md.

## Contribuições
Sugestões, melhorias e correções são bem-vindas. Você pode abrir uma issue ou enviar um pull request com suas propostas.