# Primeiros Passos com Codessa Growing

Bem-vindo ao **Codessa Growing**! Este guia irá ajudá-lo a dar os primeiros passos no sistema de design system modular.

## O que é o Growing?

O Growing é uma arquitetura organizada em camadas que transforma design tokens em componentes finais, permitindo desenvolvimento visual consistente e escalável.

### Sistema My Groves 🏗️

O **My Groves** é o sistema de projetos independentes do Growing, permitindo:

- **Projetos Independentes**: Cada projeto com sua própria identidade visual
- **Builds Simultâneos**: Múltiplos projetos rodando ao mesmo tempo
- **Estrutura Compartilhada**: Todos usam o mesmo core Growing
- **Customização Total**: Paletas de cores e configurações próprias
- **Escalabilidade**: Fácil adicionar novos projetos

## Conceitos Básicos

### As Camadas do Sistema

1. **Seeds**: Valores fundamentais (cores, espaçamentos, tipografia)
2. **Soils**: Contexto semântico dos valores
3. **Sprouts**: Construtores de componentes (mixins e utilitários)
4. **Trunks**: Componentes finais prontos para uso
5. **Leafs**: Ajustes pontuais e modificadores visuais
6. **Tree**: Ambiente onde você desenvolve suas páginas

### Fluxo de Trabalho

```
Seeds → Soils → Sprouts → Trunks → Tree
Design → Contexto → Construção → Componente → Página
```

## Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM
- Python 3.x (para o sistema Nest)
- Conhecimento básico de SCSS/Sass

### Configuração Inicial

1. **Clone o projeto Growing:**
   ```bash
   git clone https://github.com/rafaelelyah/codessa.git
   cd codessa/Apps/Growing
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Verifique o sistema:**
   ```bash
   # Verificar status do sistema Nest
   npm run nest:status

   # Verificar sistema Grow
   npm run grow:help
   ```

4. **Inicie o desenvolvimento:**
   ```bash
   npm run dev
   ```

## Estrutura Atual do Projeto

Após a instalação, você terá esta estrutura:

```
Growing/
├── src/
│   ├── main.scss          # Arquivo principal SCSS (core compartilhado)
│   ├── groves/            # Componentes estruturais
│   ├── harvest/           # Sistema de colheita
│   ├── sparks/            # Utilitários e mixins
│   └── terrain/           # Layout e grids
├── My Groves/             # 🆕 Sistema de projetos independentes
│   ├── example-project/   # Projeto exemplo (azul/roxo)
│   │   ├── tree.scss      # Ponto de entrada personalizado
│   │   ├── foundation/    # Paleta e identidade visual
│   │   ├── index.html     # Página do projeto
│   │   └── vite.config.js # Configuração específica
│   └── test-project/      # Projeto teste (verde/teal)
│       ├── tree.scss      # Ponto de entrada personalizado
│       ├── foundation/    # Paleta e identidade visual
│       ├── index.html     # Página do projeto
│       └── vite.config.js # Configuração específica
├── Nest/
│   ├── cli.py            # CLI Python para gerenciamento
│   ├── Grow/
│   │   └── grow.js       # Sistema de crescimento
│   └── Tools/            # Ferramentas auxiliares
├── docs/                 # Esta documentação
└── package.json          # Configuração do projeto
```

## Seu Primeiro Projeto

### 1. Explorar o Sistema

Verifique o que está disponível:

```bash
# Status do sistema Nest
npm run nest:status

# Ferramentas disponíveis
npm run nest:tools

# Ajuda do sistema Grow
npm run grow:help
```

### 2. Usar Componentes Existentes

O sistema já vem com componentes estruturais. Veja o arquivo `src/main.scss`:

```scss
// src/main.scss - Arquivo principal
@use 'seeds/index' as seeds;
@use 'soils/index' as soils;
@use 'sprouts/index' as sprouts;
@use 'trunks/index' as trunks;
@use 'leafs/index' as leafs;

// Seus estilos personalizados
.my-component {
  // Use as ferramentas disponíveis
  color: seeds.$color-primary;
  @include soils.spacing-standard();
}
```

### 3. Criar sua Primeira Página

Crie um arquivo HTML simples:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Projeto Growing</title>
  <link rel="stylesheet" href="src/main.scss">
</head>
<body>
  <header class="header">
    <h1>Meu Primeiro Projeto</h1>
  </header>

  <main class="main-content">
    <p>Olá, Growing!</p>
  </main>

  <script src="src/main.js"></script>
</body>
</html>
```

### 4. Explorar Projetos My Groves

O sistema já vem com projetos exemplo no My Groves:

```bash
# Executar projeto exemplo
cd My\ Groves/example-project
npm run dev

# Em outro terminal, executar projeto teste
cd My\ Groves/test-project
npm run dev
```

**Resultado:** Dois projetos rodando simultaneamente em portas diferentes!

## Desenvolvimento Básico

### Trabalhando com SCSS

O Growing usa SCSS como linguagem principal. Aqui estão os conceitos básicos:

```scss
// 1. Usando Seeds (valores base)
.my-element {
  color: seeds.$color-primary;
  font-size: seeds.$font-size-base;
  padding: seeds.$spacing-md;
}

// 2. Usando Soils (contexto semântico)
.my-button {
  @include soils.button-base();
  @include soils.interactive-states();
}

// 3. Usando Sprouts (construtores)
.my-card {
  @include sprouts.card-structure();
  @include sprouts.shadow-standard();
}

// 4. Usando Trunks (componentes prontos)
.my-header {
  @extend %trunk-header;
}

// 5. Usando Leafs (ajustes pontuais)
.my-special-button {
  @extend %trunk-button;
  @include leafs.background-primary();
  @include leafs.text-on-primary();
}
```

### Trabalhando com My Groves

Para desenvolvimento em projetos independentes:

```scss
// My Groves/meu-projeto/tree.scss
@use '../../src/soils' as *;
@use 'foundation/palette' as palette;

// Componente com identidade visual própria
.my-brand-button {
  @include sprout-button();
  background-color: palette.$primary;
  color: palette.$on-primary;
  border-radius: palette.$border-radius;
}

// Layout personalizado
.my-brand-layout {
  @include layout-grid();
  background-color: palette.$background;
  color: palette.$on-background;
}
```

### Sistema de Build

O projeto usa Vite para desenvolvimento e build:

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Próximos Passos

### Aprenda Mais

1. **Entenda a arquitetura completa** em [Visão Geral da Arquitetura](arquitetura/visao-geral.md)
2. **Explore projetos My Groves** em [My Groves](arquitetura/my-groves.md)
3. **Veja exemplos práticos** dos projetos exemplo em `My Groves/`
4. **Crie seu primeiro projeto independente** seguindo os exemplos
5. **Explore componentes específicos** nos [Guias de Uso](componentes/guias-uso/)
6. **Aprenda sobre ferramentas** em [Grow Manager](ferramentas/grow-manager.md)

### Desenvolvimento Avançado

- [Sistema de Temas](guias/temas.md) - Como criar temas personalizados
- [Melhores Práticas](guias/melhores-praticas.md) - Padrões recomendadas
- [ROADMAP](../../project-docs/ROADMAP.md) - Funcionalidades futuras

## Dicas para Iniciantes

### Comece Pequeno
- Explore primeiro os arquivos em `src/`
- Use o sistema Nest para entender a estrutura
- Faça modificações graduais

### Organize Seu Trabalho
- Mantenha seus arquivos organizados
- Documente suas customizações
- Use nomes descritivos para suas classes

### Aprenda Progressivamente
- Comece entendendo Seeds e Soils
- Gradualmente explore Sprouts e Trunks
- Consulte a documentação conforme necessário

## Suporte

Se encontrar dificuldades:

1. Verifique a [Solução de Problemas](referencia/solucao-problemas.md)
2. Consulte os [Guias de Uso](componentes/guias-uso/) específicos
3. Explore exemplos na documentação
4. Use os comandos de ajuda: `npm run grow:help`

---

**Dica:** O Growing foi projetado para ser intuitivo. Comece explorando a estrutura existente e gradualmente adicione suas próprias modificações conforme sua confiança aumenta.