# Guia de Instalação

Este guia apresenta como instalar e configurar o sistema Growing em seu ambiente de desenvolvimento.

## Pré-requisitos

### Requisitos do Sistema

- **Node.js**: Versão 18.0 ou superior
- **Python**: Versão 3.6 ou superior (para o sistema Nest)
- **Git**: Para controle de versão
- **Editor**: VS Code recomendado

### Verificação de Pré-requisitos

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do Python
python --version

# Verificar Git
git --version
```

## Instalação

### Clonando o Repositório

```bash
# Clone o repositório principal
git clone https://github.com/rafaelelyah/codessa.git

# Entre no diretório do Growing
cd codessa/Apps/Growing
```

### Instalando Dependências

```bash
# Instale as dependências do Node.js
npm install
```

### Verificando a Instalação

```bash
# Verifique o status do sistema Nest
npm run nest:status

# Verifique o sistema Grow
npm run grow:help

# Inicie o servidor de desenvolvimento
npm run dev
```

## Estrutura Após Instalação

Após a instalação, você terá esta estrutura de arquivos:

```
Growing/
├── src/
│   ├── main.scss          # Arquivo principal SCSS
│   ├── groves/            # Componentes estruturais
│   ├── harvest/           # Sistema de colheita
│   ├── sparks/            # Utilitários e mixins
│   └── terrain/           # Layout e grids
├── Nest/
│   ├── cli.py            # Sistema de gerenciamento Python
│   ├── Grow/
│   │   └── grow.js       # Sistema de crescimento JavaScript
│   └── Tools/            # Ferramentas auxiliares
├── docs/                 # Documentação completa
├── project-docs/         # Documentação do projeto
└── package.json          # Configuração do projeto
```

## Configuração do Ambiente

### Arquivo package.json

O projeto já vem configurado com os seguintes scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:lib": "vite build --config vite.config.js --mode library",
    "preview": "vite preview",
    "clean": "if exist dist rmdir /s /q dist && if exist public rmdir /s /q public",
    "nest": "python Nest/cli.py",
    "nest:grow": "python Nest/cli.py grow",
    "nest:status": "python Nest/cli.py status",
    "nest:tools": "python Nest/cli.py tools",
    "grow": "node Nest/Grow/grow.js",
    "grow:help": "node Nest/Grow/grow.js --help",
    "grow:validate": "node Nest/Grow/grow.js validate"
  }
}
```

### Arquivo vite.config.js

O Vite já está configurado para trabalhar com SCSS:

```javascript
import { defineConfig } from 'vite'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig({
  plugins: [
    purgecss({
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      safelist: ['trunk-', 'sprout-', 'leaf-']
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/seeds/index" as *;'
      }
    }
  }
})
```

## Primeiro Uso

### Iniciando o Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

Isso irá:
- Iniciar o servidor Vite
- Abrir o navegador automaticamente
- Habilitar hot reload para mudanças em SCSS

### Explorando o Sistema

```bash
# Ver status do sistema Nest
npm run nest:status

# Ver ferramentas disponíveis
npm run nest:tools

# Ver ajuda do sistema Grow
npm run grow:help
```

### Trabalhando com SCSS

O arquivo principal `src/main.scss` já importa todas as camadas:

```scss
// src/main.scss
@use 'seeds/index' as seeds;
@use 'soils/index' as soils;
@use 'sprouts/index' as sprouts;
@use 'trunks/index' as trunks;
@use 'leafs/index' as leafs;
```

## Desenvolvimento Básico

### Modificando Estilos

1. **Edite o arquivo `src/main.scss`**
2. **Use as camadas disponíveis:**
   ```scss
   .my-component {
     // Usando Seeds (valores base)
     color: seeds.$color-primary;

     // Usando Soils (contexto)
     @include soils.spacing-standard();

     // Usando Sprouts (construtores)
     @include sprouts.button-base();

     // Usando Trunks (componentes)
     @extend %trunk-button;

     // Usando Leafs (ajustes)
     @include leafs.background-primary();
   }
   ```

3. **As mudanças aparecem automaticamente** no navegador devido ao hot reload

### Usando o Sistema Nest

```bash
# Executar operações de crescimento
npm run nest:grow

# Ver status detalhado
npm run nest:status

# Acessar ferramentas
npm run nest:tools
```

### Usando o Sistema Grow

```bash
# Interface principal
npm run grow

# Ver ajuda
npm run grow:help

# Validar sistema
npm run grow:validate
```

## Build para Produção

### Gerando Build Otimizado

```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

### Arquivos Gerados

O build gera:
- `dist/` - Arquivos otimizados
- CSS minificado com PurgeCSS
- Source maps (se configurado)

## Configuração Avançada

### Personalizando Vite

Edite `vite.config.js` para configurações avançadas:

```javascript
import { defineConfig } from 'vite'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig({
  plugins: [
    purgecss({
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      safelist: ['trunk-', 'sprout-', 'leaf-', 'custom-']
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/seeds/index" as *;'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

### Configurações do Sistema Nest

O sistema Nest pode ser configurado através dos arquivos em `Nest/Config/`.

### Sistema Grow

O sistema Grow pode ser estendido através dos módulos em `Nest/Grow/modules/`.

## Solução de Problemas

### Problemas Comuns

#### Erro de Dependências

```bash
# Limpar cache e reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Erro no Sistema Nest

```bash
# Verificar Python
python --version

# Verificar se arquivos existem
ls -la Nest/
```

#### Erro no Sistema Grow

```bash
# Verificar Node.js
node --version

# Verificar arquivo
ls -la Nest/Grow/grow.js
```

#### Problemas de Build

```bash
# Limpar build anterior
npm run clean

# Tentar novamente
npm run build
```

### Verificações

```bash
# Verificar se tudo está funcionando
npm run dev

# Verificar sistemas
npm run nest:status
npm run grow:validate
```

## Próximos Passos

Após a instalação, você pode:

1. **Explorar a Estrutura**: Ver os arquivos em `src/`
2. **Ler a Documentação**: Começar por `docs/primeiros-passos.md`
3. **Entender a Arquitetura**: Ver `docs/arquitetura/`
4. **Ver o Roadmap**: Ver `project-docs/ROADMAP.md`

## Suporte

- **Documentação Completa**: `docs/` - Esta documentação
- **Project Docs**: `project-docs/` - Documentação do projeto
- **GitHub Issues**: Para reportar problemas
- **Comunidade**: Participe das discussões

A instalação está completa! Você agora tem um ambiente Growing totalmente funcional para desenvolvimento.

```bash
# Instalar CLI globalmente
npm install -g @growing/cli

# Criar novo projeto
growing create my-project

# Entrar no diretório
cd my-project

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

### Via Yarn

```bash
# Instalar CLI globalmente
yarn global add @growing/cli

# Criar novo projeto
growing create my-project

# Entrar no diretório
cd my-project

# Instalar dependências
yarn install

# Iniciar desenvolvimento
yarn dev
```

### Via PNPM

```bash
# Instalar CLI globalmente
pnpm add -g @growing/cli

# Criar novo projeto
growing create my-project

# Entrar no diretório
cd my-project

# Instalar dependências
pnpm install

# Iniciar desenvolvimento
pnpm dev
```

## Instalação Manual

### Passo 1: Criar Diretório do Projeto

```bash
# Criar diretório
mkdir my-growing-project
cd my-growing-project

# Inicializar Git (opcional)
git init
```

### Passo 2: Inicializar Package.json

```bash
# Criar package.json básico
npm init -y

# Ou com Yarn
yarn init -y

# Ou com PNPM
pnpm init
```

### Passo 3: Instalar Dependências Core

```bash
# Instalar dependências principais
npm install @growing/core @growing/components @growing/utils

# Instalar dependências de desenvolvimento
npm install --save-dev @growing/cli @growing/build-tools @growing/testing

# Instalar TypeScript (opcional)
npm install --save-dev typescript @types/node
```

### Passo 4: Criar Estrutura Básica

```bash
# Criar diretórios principais
mkdir -p src/{components,pages,styles,utils}
mkdir -p public/assets
mkdir docs

# Criar arquivos básicos
touch src/main.js
touch src/styles/main.scss
touch src/index.html
```

### Passo 5: Configurar Growing

```bash
# Inicializar configuração
npx growing init

# Ou criar manualmente
touch growing.config.js
```

## Configuração do Projeto

### Arquivo growing.config.js

```javascript
// growing.config.js
module.exports = {
  // Configurações básicas
  name: 'My Growing Project',
  version: '1.0.0',

  // Estrutura de diretórios
  paths: {
    src: 'src',
    dist: 'dist',
    components: 'src/components',
    styles: 'src/styles',
    public: 'public'
  },

  // Servidor de desenvolvimento
  devServer: {
    port: 3000,
    host: 'localhost',
    open: true,
    https: false
  },

  // Configurações de build
  build: {
    target: 'es2015',
    minify: true,
    sourcemap: true,
    optimize: true
  },

  // Componentes
  components: {
    prefix: 'app',
    extract: true,
    optimize: true
  },

  // Temas
  theme: {
    default: 'light',
    variants: ['light', 'dark']
  }
};
```

### Arquivo package.json

```json
{
  "name": "my-growing-project",
  "version": "1.0.0",
  "description": "Projeto Growing",
  "main": "src/main.js",
  "scripts": {
    "dev": "growing dev",
    "build": "growing build",
    "preview": "growing preview",
    "test": "growing test",
    "lint": "growing lint",
    "clean": "growing clean"
  },
  "dependencies": {
    "@growing/core": "^2.0.0",
    "@growing/components": "^2.0.0",
    "@growing/utils": "^1.5.0"
  },
  "devDependencies": {
    "@growing/cli": "^2.0.0",
    "@growing/build-tools": "^1.8.0",
    "@growing/testing": "^1.2.0"
  },
  "growing": {
    "version": "2.0.0",
    "theme": "light",
    "components": []
  }
}
```

## Instalação com Templates

### Template Básico

```bash
# Template vanilla JavaScript
npx create-growing-app my-project --template vanilla

# Template com Vue.js
npx create-growing-app my-project --template vue

# Template com React
npx create-growing-app my-project --template react

# Template com Svelte
npx create-growing-app my-project --template svelte
```

### Template Avançado

```bash
# Template completo com TypeScript
npx create-growing-app my-project --template advanced --typescript

# Template com Storybook
npx create-growing-app my-project --template storybook

# Template para biblioteca
npx create-growing-app my-project --template library
```

## Instalação em Projetos Existentes

### Projeto JavaScript Existente

```bash
# Entrar no projeto
cd existing-project

# Instalar Growing
npm install @growing/core @growing/components

# Inicializar configuração
npx growing init --existing

# Adaptar arquivos existentes
# Modificar src/main.js para importar Growing
```

### Projeto React Existente

```bash
# Entrar no projeto
cd existing-react-project

# Instalar dependências
npm install @growing/react @growing/components

# Modificar src/index.js
import { GrowingProvider } from '@growing/react';
import '@growing/components/dist/styles.css';

ReactDOM.render(
  <GrowingProvider>
    <App />
  </GrowingProvider>,
  document.getElementById('root')
);
```

### Projeto Vue Existente

```bash
# Entrar no projeto
cd existing-vue-project

# Instalar dependências
npm install @growing/vue @growing/components

# Modificar src/main.js
import { createApp } from 'vue';
import { GrowingPlugin } from '@growing/vue';
import '@growing/components/dist/styles.css';

const app = createApp(App);
app.use(GrowingPlugin);
app.mount('#app');
```

## Configuração do Ambiente de Desenvolvimento

### VS Code (Recomendado)

```bash
# Instalar extensão Growing
code --install-extension growing.growing-extension

# Ou instalar via marketplace
# Procurar por "Growing" no marketplace do VS Code
```

#### Configurações da Extensão

```json
// .vscode/settings.json
{
  "growing.enable": true,
  "growing.theme": "auto",
  "growing.autoExtract": true,
  "growing.lintOnSave": true,
  "growing.formatOnSave": true
}
```

### Outros Editores

#### WebStorm/IntelliJ

```xml
<!-- .idea/growing.xml -->
<project version="4">
  <component name="GrowingSettings">
    <option name="enabled" value="true" />
    <option name="theme" value="light" />
    <option name="autoExtract" value="true" />
  </component>
</project>
```

#### Sublime Text

```json
// Growing.sublime-settings
{
  "enabled": true,
  "theme": "light",
  "auto_extract": true,
  "format_on_save": true
}
```

## Configuração de Build Tools

### Webpack

```javascript
// webpack.config.js
const { GrowingWebpackPlugin } = require('@growing/webpack-plugin');

module.exports = {
  // ... outras configurações

  plugins: [
    new GrowingWebpackPlugin({
      extractComponents: true,
      optimize: true,
      theme: 'auto'
    })
  ],

  module: {
    rules: [
      {
        test: /\.growing$/,
        use: ['growing-loader']
      }
    ]
  }
};
```

### Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { growing } from '@growing/vite-plugin';

export default defineConfig({
  plugins: [
    growing({
      extractComponents: true,
      optimize: true,
      theme: 'auto'
    })
  ]
});
```

### Rollup

```javascript
// rollup.config.js
import { growing } from '@growing/rollup-plugin';

export default {
  // ... outras configurações

  plugins: [
    growing({
      extractComponents: true,
      optimize: true
    })
  ]
};
```

## Configuração de Testes

### Jest

```javascript
// jest.config.js
module.exports = {
  // ... outras configurações

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@growing/(.*)$': '<rootDir>/node_modules/@growing/$1'
  }
};
```

```javascript
// src/setupTests.js
import '@growing/testing/setup';
```

### Vitest

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import { growing } from '@growing/vite-plugin';

export default defineConfig({
  plugins: [growing()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js']
  }
});
```

## Configuração de CI/CD

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Install Growing CLI
      run: npm install -g @growing/cli

    - name: Lint
      run: growing lint

    - name: Test
      run: growing test

    - name: Build
      run: growing build
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm install -g @growing/cli
    - growing lint
    - growing test

build:
  stage: build
  script:
    - npm ci
    - growing build
  artifacts:
    paths:
      - dist/

deploy_staging:
  stage: deploy
  script:
    - growing deploy staging
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - growing deploy production
  only:
    - main
```

## Verificação da Instalação

### Verificar Instalação Básica

```bash
# Verificar versão
growing --version

# Verificar status
growing status

# Listar componentes disponíveis
growing component list
```

### Teste Básico

```javascript
// src/main.js
import { Growing } from '@growing/core';
import '@growing/components/dist/styles.css';

const app = new Growing({
  target: '#app',
  theme: 'light'
});

app.init();
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Growing App</title>
</head>
<body>
  <div id="app">
    <trunk-button>Olá Growing!</trunk-button>
  </div>
  <script src="src/main.js"></script>
</body>
</html>
```

### Executar Projeto

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir navegador em http://localhost:3000
# Deve aparecer um botão com "Olá Growing!"
```

## Solução de Problemas

### Problemas Comuns

#### Erro de Versão do Node.js

```bash
# Verificar versão
node --version

# Se versão antiga, atualizar
# Via NVM
nvm install 18
nvm use 18

# Ou baixar diretamente do site
```

#### Erro de Dependências

```bash
# Limpar cache
npm cache clean --force

# Remover node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

#### Erro de Build

```bash
# Verificar configuração
growing config list

# Limpar build
npm run clean

# Tentar novamente
npm run build
```

#### Erro de Componentes

```bash
# Verificar componentes
growing component list

# Reinstalar componentes
growing component reinstall

# Limpar cache de componentes
growing cache clean components
```

### Suporte

- **Documentação**: https://growing.dev/docs
- **Issues**: https://github.com/growing/growing/issues
- **Discord**: https://discord.gg/growing
- **Forum**: https://forum.growing.dev

## Próximos Passos

Após a instalação, você pode:

1. **Explorar Componentes**: Ver `docs/componentes/`
2. **Criar Primeiro Componente**: Seguir `docs/primeiros-passos.md`
3. **Configurar Tema**: Ver `docs/guias/temas.md`
4. **Deploy**: Ver `docs/guias/deploy.md`

A instalação está completa! Você agora tem um ambiente Growing totalmente funcional.