

![Status](https://img.shields.io/badge/status-development%20v1.0.0--alpha--mygroves-yellow.svg)

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

### Sistema My Groves - Projetos Independentes
O **My Groves** revoluciona o desenvolvimento permitindo **projetos independentes** com builds simultâneos:
- **Projetos Isolados**: Cada projeto com sua própria identidade visual
- **Builds Paralelos**: Múltiplos projetos rodando ao mesmo tempo
- **Core Compartilhado**: Todos usam a mesma arquitetura Growing
- **Escalabilidade**: Fácil adicionar novos projetos
- **Flexibilidade**: Personalização total por projeto

## Funcionalidades
- Base tipográfica e visual neutra
- Seeds visuais adaptáveis para qualquer estilo
- Modularidade e semântica em todos os componentes
- Sistema de variáveis, mixins e agrupadores visuais
- Estrutura para criação de interfaces completas
- Suporte a deploy em múltiplos ambientes
- **Sistema de Sync Inteligente**: Downloads organizados em pastas `grow-sync/` com estratégias específicas por tipo de asset
- **Integração com Nest Grow**: CLI avançado para gerenciamento de componentes e assets
- **My Groves**: Sistema de projetos independentes com builds simultâneos
- **Sistema de Tokens JSON**: Design tokens como fonte única da verdade com geração automática de CSS/SCSS
- **Documentação Completa**: Guias atualizados com exemplos práticos
- **Arquitetura Validada**: Sistema testado e comprovado em produção

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

## Sistema My Groves - Projetos Independentes

O **My Groves** permite criar e gerenciar múltiplos projetos com builds simultâneos e identidades visuais próprias.

### Estrutura My Groves:
```
My Groves/
├── example-project/     # Projeto exemplo (azul/roxo)
│   ├── tree.scss       # Desenvolvimento personalizado
│   ├── foundation/     # Identidade visual própria
│   │   └── palette.scss
│   ├── index.html      # Interface do projeto
│   └── vite.config.js  # Configuração específica
├── test-project/       # Projeto teste (verde/teal)
│   ├── tree.scss
│   ├── foundation/
│   ├── index.html
│   └── vite.config.js
└── [meu-projeto]/      # Novos projetos
```

### Comandos My Groves:
```bash
# Criar novo projeto independente
cp -r My\ Groves/example-project My\ Groves/meu-novo-projeto
cd My\ Groves/meu-novo-projeto

# Personalizar identidade visual
edit foundation/palette.scss

# Executar projeto
npm run dev

# Executar múltiplos projetos simultaneamente
# Terminal 1: cd My\ Groves/project1 && npm run dev
# Terminal 2: cd My\ Groves/project2 && npm run dev
```

### Benefícios My Groves:
- **Desenvolvimento Paralelo**: Múltiplos projetos simultaneamente
- **Isolamento Total**: Sem conflitos entre projetos
- **Identidade Própria**: Cada projeto com paleta de cores própria
- **Core Compartilhado**: Mesma arquitetura em todos os projetos
- **Escalabilidade**: Fácil adicionar novos projetos

## Filosofia visual

Codessa Growing parte de uma **base neutra e tipográfica**, permitindo que cada projeto floresça com identidade própria.
A estrutura Sass é totalmente personalizável, com **seeds visuais** adaptáveis para qualquer estilo, tema ou linguagem.

A composição é orientada por semântica, modularidade e fluidez — cada elemento tem propósito, cada bloco tem função.
O sistema é irrigado por **veins** (variáveis semânticas), agrupados em **soils** (contextos visuais), e instanciado por **sprouts** (mixins construtores) que crescem em **trunks** (componentes e elementos estilizados), se organizam em **groves** (pastas com múltiplas trees - fluxos visuais completos com vários arquivos index, .scss e outros), recebem o **toque final** pelas **leafs** (modificadores visuais que refinam detalhes e dão personalidade única), e agora se expandem através do **My Groves** (sistema de projetos independentes com builds simultâneos).

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

### My Groves (Projetos Independentes)
- **Paralelização Máxima:** Múltiplos projetos desenvolvidos simultaneamente
- **Isolamento Total:** Projetos completamente independentes sem conflitos
- **Core Compartilhado:** Mesma arquitetura e componentes base
- **Identidade Própria:** Cada projeto com paleta de cores e estilo únicos
- **Escalabilidade Infinita:** Fácil adicionar novos projetos ao sistema

## Como começar

### Setup Básico
1.  Instale as dependências do projeto com `npm install`
2.  Inicie o ambiente de desenvolvimento com `npm run dev`
3.  Os estilos são escritos em **Sass** e compilados automaticamente pelo **Vite**
4.  O projeto utiliza **JavaScript puro**, sem frameworks, para garantir leveza e flexibilidade

### Explorando My Groves
1.  Execute os projetos exemplo: `cd My\ Groves/example-project && npm run dev`
2.  Em outro terminal: `cd My\ Groves/test-project && npm run dev`
3.  Veja dois projetos rodando simultaneamente em portas diferentes
4.  Personalize as paletas em `foundation/palette.scss`

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
1. [Foundation](docs/arquitetura/foundation.md) - Camada fundamental, normalização e resets
2. [Seeds](docs/arquitetura/seeds.md) - Valores visuais base: cores, tipografia, espaçamentos
3. [Soils](docs/arquitetura/soils.md) - Agrupadores semânticos das variáveis por domínio
4. [Sprouts](docs/arquitetura/sprouts.md) - Construtores visuais semânticos (mixins)
5. [Trunks](docs/arquitetura/trunks.md) - Classes CSS e elementos estilizados
6. [Leafs](docs/arquitetura/leafs.md) - Modificadores visuais finais
7. [**My Groves**](docs/arquitetura/my-groves.md) - Sistema de projetos independentes
8. [Visão Geral da Arquitetura](docs/arquitetura/visao-geral.md) - Arquitetura completa

### Guias Práticos:
9. [Primeiros Passos](docs/primeiros-passos.md) - Introdução completa ao sistema
10. [Instalação](docs/guias/instalacao.md) - Como instalar e configurar
11. [Desenvolvimento](docs/guias/desenvolvimento.md) - Workflow e melhores práticas
12. [Melhores Práticas](docs/guias/melhores-praticas.md) - Padrões recomendados

### Sistema Grow:
13. [Grow CLI](Nest/Grow/README.md) - Documentação completa do sistema CLI Grow

### Recursos Adicionais:
- **Sistema de Sync Organizado**: Downloads inteligentes em `grow-sync/` por tipo
- **Cache Persistente**: Aprendizado automático de mapeamentos de componentes
- **Integração Automática**: Componentes integrados nas bibliotecas corretas
- **Busca Avançada**: Localização rápida por nome, tipo ou categoria
- **Filosofias do Sistema**: Trunk-first, Hereditary Morph e Leaf Touch
- **Projetos Independentes**: My Groves com builds simultâneos

## Conquistas Recentes

### ✅ Arquitetura My Groves Validada
- Sistema de projetos independentes completamente funcional
- Builds simultâneos sem conflitos
- Projetos exemplo (azul/roxo e verde/teal) rodando perfeitamente
- Estrutura tree.scss padronizada

### Estratégia Multi-Tecnologia Definida
- Análise completa de tecnologias candidatas (Next.js, Laravel, Django, etc.)
- Roadmap claro com fases de implementação
- Critérios objetivos de avaliação
- Base sólida para expansão tecnológica

### Documentação Estratégica Atualizada
- ROADMAP.md e ROADMAP-interno.md atualizados
- Plano de Negócios com projeções otimizadas (+50% crescimento)
- WORK-LOG completo documentando todas as sessões
- Métricas de sucesso ajustadas

### Sistema de Design System Maduro
- Arquitetura modular testada e validada
- Componentes reutilizáveis e consistentes
- Sistema de tokens centralizado
- Integração perfeita com ferramentas modernas

## Próximos Passos

### Fase 1: Expansão My Groves (Out-Nov 2025)
- Criar projetos piloto Next.js e Laravel
- Testar integração completa com Wood core
- Documentar primeiros resultados
- Identificar pontos de melhoria

### Fase 2: Multi-Tecnologia (Dez 2025)
- Implementar adaptadores específicos
- Resolver problemas encontrados nos pilotos
- Otimizar processos de integração
- Criar templates padronizados

### Fase 3: Core Adaptado (2026)
- Sistema adaptado para tecnologias aprovadas
- CLI atualizado para multi-tecnologia
- Documentação específica por stack
- Lançamento de versões beta
- **Projetos Independentes**: My Groves com builds simultâneos

## Autor
Desenvolvido por Rafael Elyah.

**Conquistas Recentes (Setembro 2025):**
- ✅ Sistema My Groves validado e documentado
- ✅ Estratégia multi-tecnologia definida
- ✅ Arquitetura modular completamente testada
- ✅ Documentação estratégica atualizada
- ✅ Base sólida para expansão tecnológica

## Licença
Este módulo está licenciado sob a MIT License. Para termos adicionais sobre plugins pagos, marketplace ou uso comercial, consulte o arquivo TERMS-OF-USE.md.

## Contribuições
Sugestões, melhorias e correções são bem-vindas. Você pode abrir uma issue ou enviar um pull request com suas propostas.

---

**🎉 Codessa Growing v1.0.0-alpha-mygroves - Sistema de Design System Modular com Projetos Independentes**

*Desenvolver interfaces modernas nunca foi tão produtivo e escalável!* 🚀