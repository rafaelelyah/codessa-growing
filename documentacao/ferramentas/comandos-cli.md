# Comandos Disponíveis

O sistema Growing atualmente oferece ferramentas básicas de desenvolvimento através de scripts NPM que utilizam Vite como servidor de desenvolvimento e ferramenta de build.

## Scripts NPM Principais

### npm run dev

Inicia o servidor de desenvolvimento com Vite.

```bash
npm run dev
```

**Recursos:**
- Servidor de desenvolvimento local
- Hot reload automático para mudanças em SCSS/HTML
- Servidor na porta 5173 (padrão do Vite)
- Recarregamento automático da página

### npm run build

Compila o projeto para produção.

```bash
npm run build
```

**Recursos:**
- Otimização automática de CSS
- Minificação de arquivos
- Geração de source maps para debug
- Output na pasta `dist/`

### npm run preview

Visualiza a versão de produção localmente.

```bash
npm run preview
```

**Recursos:**
- Servidor local simulando produção
- Teste dos arquivos otimizados
- Verificação final antes do deploy

## Estrutura de Scripts

### package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Desenvolvimento com Vite

### Configuração Básica

O projeto usa a configuração padrão do Vite, que já está otimizada para desenvolvimento com SCSS. O arquivo `vite.config.js` contém:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // Configuração para SCSS
  css: {
    preprocessorOptions: {
      scss: {
        // Opções do SCSS
      }
    }
  }
})
```

### Hot Reload

O Vite oferece hot reload automático para:
- Mudanças em arquivos `.scss`
- Modificações em `index.html`
- Atualizações em `vite.config.js`

### Otimização de Build

Durante o build, o Vite automaticamente:
- Processa e otimiza arquivos SCSS
- Remove código não utilizado
- Minifica CSS final
- Gera source maps para desenvolvimento

## Workflow de Desenvolvimento

### Processo Básico

1. **Desenvolvimento**: Execute `npm run dev` para iniciar o servidor
2. **Modificação**: Faça mudanças nos arquivos SCSS/HTML
3. **Visualização**: Veja as mudanças automaticamente no navegador
4. **Build**: Execute `npm run build` para gerar versão de produção
5. **Teste**: Use `npm run preview` para verificar a build final

### Exemplo de Workflow

```bash
# 1. Iniciar desenvolvimento
npm run dev

# 2. Modificar estilos em src/my-trunks.scss
# 3. Ver mudanças automaticamente no navegador

# 4. Build para produção
npm run build

# 5. Preview da versão final
npm run preview
```

## Configuração Avançada

### Personalização do Vite

Para configurações avançadas, edite o arquivo `vite.config.js`:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // Porta customizada
  server: {
    port: 3000
  },

  // Configuração CSS
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/variables.scss";`
      }
    }
  },

  // Build personalizado
  build: {
    outDir: 'build',
    sourcemap: true
  }
})
```

### Variáveis de Ambiente

O Vite suporta variáveis de ambiente através de arquivos `.env`:

```bash
# .env
VITE_APP_TITLE=Codessa Growing

# .env.local (desenvolvimento)
VITE_DEV_PORT=3001
```

## Integração com VS Code

### Extensões Recomendadas

Para melhor experiência de desenvolvimento:

- **SCSS IntelliSense**: Autocompletar para SCSS
- **Live Server**: Preview alternativo
- **Prettier**: Formatação de código

### Configurações do VS Code

```json
// .vscode/settings.json
{
  "scss.validate": true,
  "scss.format.enabled": true,
  "emmet.includeLanguages": {
    "scss": "css"
  }
}
```

## Troubleshooting

### Problemas Comuns

#### Porta Ocupada

```bash
# Mudar porta no vite.config.js
export default defineConfig({
  server: {
    port: 3001
  }
})
```

#### CSS não Carregando

```bash
# Verificar imports no index.html
<link rel="stylesheet" href="/src/my-trunks.scss">
```

#### Build Falhando

```bash
# Limpar cache e node_modules
rm -rf node_modules/.vite
npm install
```

## Limitações Atuais

O sistema Growing atualmente foca em:
- Desenvolvimento de estilos SCSS
- Componentes CSS modulares
- Arquitetura Sprout-Trunk-Leaf
- Build otimizado com Vite

**Não inclui:**
- CLI avançada de gerenciamento de componentes
- Sistema de testes automatizados
- Ferramentas de deploy integradas
- Gerenciamento de estado complexo

## Futuras Expansões

Conforme o roadmap do projeto, futuras versões podem incluir:
- CLI mais avançada para gerenciamento de componentes
- Sistema de testes integrado
- Ferramentas de deploy automatizadas
- Integração com frameworks JavaScript

A documentação será atualizada conforme essas funcionalidades forem implementadas.

## Instalação

### Instalação Global

```bash
# Via NPM
npm install -g @growing/cli

# Via Yarn
yarn global add @growing/cli

# Verificar instalação
growing --version
```

### Instalação Local

```bash
# No projeto
npm install --save-dev @growing/cli

# Adicionar aos scripts
{
  "scripts": {
    "growing": "growing",
    "dev": "growing dev",
    "build": "growing build",
    "test": "growing test"
  }
}
```

## Comandos Principais

### growing init

Inicializa um novo projeto Growing.

```bash
# Inicialização básica
growing init

# Inicialização com template
growing init --template react

# Inicialização avançada
growing init --name "Meu Projeto" --template vue --typescript
```

**Opções:**
- `--template, -t`: Template base (react, vue, angular, vanilla)
- `--name, -n`: Nome do projeto
- `--typescript, -ts`: Usar TypeScript
- `--git`: Inicializar repositório Git
- `--yes, -y`: Aceitar todas as configurações padrão

### growing dev

Inicia o servidor de desenvolvimento.

```bash
# Desenvolvimento básico
growing dev

# Com opções específicas
growing dev --port 3001 --host 0.0.0.0

# Com hot reload avançado
growing dev --hmr --open
```

**Opções:**
- `--port, -p`: Porta do servidor (padrão: 3000)
- `--host, -h`: Host do servidor (padrão: localhost)
- `--hmr`: Habilitar Hot Module Replacement
- `--open, -o`: Abrir navegador automaticamente
- `--https`: Usar HTTPS
- `--verbose, -v`: Log detalhado

### growing build

Compila o projeto para produção.

```bash
# Build básico
growing build

# Build otimizado
growing build --optimize

# Build com análise
growing build --analyze

# Build específico
growing build --target production --format esm,cjs
```

**Opções:**
- `--optimize, -o`: Otimizar para produção
- `--analyze, -a`: Analisar bundle
- `--target, -t`: Ambiente alvo
- `--format, -f`: Formatos de saída (esm, cjs, umd)
- `--sourcemap, -s`: Gerar source maps
- `--minify, -m`: Minificar código
- `--watch, -w`: Modo watch

### growing test

Executa os testes do projeto.

```bash
# Executar todos os testes
growing test

# Executar testes específicos
growing test --grep "button"

# Executar testes de componente
growing test components/Button

# Com cobertura
growing test --coverage
```

**Opções:**
- `--grep, -g`: Filtrar testes por padrão
- `--coverage, -c`: Gerar relatório de cobertura
- `--watch, -w`: Modo watch
- `--verbose, -v`: Output detalhado
- `--bail, -b`: Parar no primeiro erro
- `--timeout, -t`: Timeout dos testes

### growing lint

Executa análise de código e formatação.

```bash
# Lint básico
growing lint

# Lint e correção automática
growing lint --fix

# Lint específico
growing lint src/components/

# Com formatação
growing lint --format
```

**Opções:**
- `--fix, -f`: Corrigir problemas automaticamente
- `--format`: Formatar código
- `--ext`: Extensões de arquivo
- `--ignore-path`: Arquivo de ignore
- `--max-warnings`: Máximo de warnings permitidos

## Comandos de Componentes

### growing component

Gerencia componentes do projeto.

```bash
# Criar novo componente
growing component create Button

# Extrair componente da biblioteca
growing component extract trunk-button

# Listar componentes
growing component list

# Remover componente
growing component remove Button
```

**Subcomandos:**
- `create <name>`: Criar novo componente
- `extract <name>`: Extrair da biblioteca
- `list`: Listar componentes
- `remove <name>`: Remover componente
- `update <name>`: Atualizar componente

### growing sprout

Gerencia Sprouts (construtores).

```bash
# Criar novo Sprout
growing sprout create button-sprite

# Listar Sprouts disponíveis
growing sprout list

# Usar Sprout em componente
growing sprout apply button-sprite Button

# Modificar Sprout
growing sprout edit button-sprite
```

### growing trunk

Gerencia Trunks (componentes finais).

```bash
# Promover Sprout para Trunk
growing trunk promote button-sprite

# Listar Trunks
growing trunk list

# Modificar Trunk
growing trunk edit trunk-button

# Publicar Trunk
growing trunk publish trunk-button
```

### growing leaf

Gerencia Leafs (ajustes pontuais).

```bash
# Criar novo Leaf
growing leaf create button-primary

# Aplicar Leaf a componente
growing leaf apply button-primary Button

# Listar Leafs
growing leaf list

# Remover Leaf
growing leaf remove button-primary
```

## Comandos de Assets

### growing assets

Gerencia assets do projeto.

```bash
# Otimizar imagens
growing assets optimize

# Gerar sprites
growing assets sprite

# Comprimir assets
growing assets compress

# Copiar assets
growing assets copy
```

### growing icon

Gerencia sistema de ícones.

```bash
# Adicionar ícones
growing icon add user.svg delete.svg

# Gerar sprite de ícones
growing icon sprite

# Otimizar ícones
growing icon optimize

# Listar ícones
growing icon list
```

## Comandos de Deploy

### growing deploy

Faz deploy do projeto.

```bash
# Deploy para staging
growing deploy staging

# Deploy para produção
growing deploy production

# Deploy com confirmação
growing deploy production --confirm

# Preview de deploy
growing deploy production --dry-run
```

**Ambientes suportados:**
- `staging`: Ambiente de testes
- `production`: Ambiente de produção
- `preview`: Deploy temporário

### growing preview

Cria preview do projeto.

```bash
# Preview local
growing preview

# Preview com porta específica
growing preview --port 8080

# Preview de branch específica
growing preview --branch feature/new-button
```

## Comandos de Configuração

### growing config

Gerencia configurações do projeto.

```bash
# Ver configuração atual
growing config list

# Definir configuração
growing config set build.optimize true

# Obter valor específico
growing config get build.optimize

# Resetar configuração
growing config reset
```

### growing theme

Gerencia temas do projeto.

```bash
# Criar novo tema
growing theme create dark-theme

# Aplicar tema
growing theme apply dark-theme

# Listar temas
growing theme list

# Modificar tema
growing theme edit dark-theme
```

## Comandos de Análise

### growing analyze

Analisa o projeto.

```bash
# Análise completa
growing analyze

# Análise de bundle
growing analyze bundle

# Análise de performance
growing analyze performance

# Análise de acessibilidade
growing analyze accessibility
```

### growing audit

Audita o projeto.

```bash
# Auditoria de segurança
growing audit security

# Auditoria de performance
growing audit performance

# Auditoria de acessibilidade
growing audit accessibility

# Relatório completo
growing audit --report
```

## Comandos de Desenvolvimento

### growing scaffold

Gera estrutura de código.

```bash
# Scaffold de componente completo
growing scaffold component Button

# Scaffold de página
growing scaffold page Dashboard

# Scaffold de layout
growing scaffold layout MainLayout

# Scaffold de utilitário
growing scaffold util formatDate
```

### growing generate

Gera código automaticamente.

```bash
# Gerar tipos TypeScript
growing generate types

# Gerar documentação
growing generate docs

# Gerar testes
growing generate tests

# Gerar stories (Storybook)
growing generate stories
```

### growing watch

Monitora mudanças no projeto.

```bash
# Watch básico
growing watch

# Watch com comandos específicos
growing watch --exec "npm run test"

# Watch de arquivos específicos
growing watch src/components/

# Watch com debounce
growing watch --debounce 500
```

## Comandos Avançados

### growing pipeline

Executa pipeline personalizado.

```bash
# Executar pipeline padrão
growing pipeline

# Executar pipeline específico
growing pipeline build-deploy

# Criar novo pipeline
growing pipeline create my-pipeline

# Listar pipelines
growing pipeline list
```

### growing plugin

Gerencia plugins.

```bash
# Instalar plugin
growing plugin install @growing/plugin-tailwind

# Listar plugins
growing plugin list

# Remover plugin
growing plugin remove @growing/plugin-tailwind

# Criar plugin
growing plugin create my-plugin
```

### growing cache

Gerencia cache do sistema.

```bash
# Limpar cache
growing cache clean

# Ver tamanho do cache
growing cache size

# Listar conteúdo do cache
growing cache list

# Cache específico
growing cache clean components
```

## Integração com CI/CD

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
      run: growing test --coverage

    - name: Build
      run: growing build

    - name: Deploy preview
      if: github.event_name == 'pull_request'
      run: growing deploy preview
```

### Scripts NPM

```json
// package.json
{
  "scripts": {
    "dev": "growing dev",
    "build": "growing build --optimize",
    "test": "growing test",
    "test:watch": "growing test --watch",
    "lint": "growing lint",
    "lint:fix": "growing lint --fix",
    "preview": "growing preview",
    "deploy:staging": "growing deploy staging",
    "deploy:prod": "growing deploy production",
    "analyze": "growing analyze",
    "scaffold": "growing scaffold",
    "clean": "growing cache clean"
  }
}
```

## Configuração Avançada

### Arquivo growing.config.js

```javascript
module.exports = {
  // Configurações gerais
  name: 'Meu Projeto',
  version: '1.0.0',

  // Servidor de desenvolvimento
  devServer: {
    port: 3000,
    host: 'localhost',
    https: false,
    open: true
  },

  // Configurações de build
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: true
  },

  // Configurações de teste
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  },

  // Plugins
  plugins: [
    '@growing/plugin-vue',
    '@growing/plugin-typescript'
  ],

  // Hooks personalizados
  hooks: {
    'build:before': () => {
      console.log('Iniciando build...');
    },
    'build:after': () => {
      console.log('Build concluído!');
    }
  }
};
```

### Variáveis de Ambiente

```bash
# .env
GROWING_API_KEY=your_api_key
GROWING_REGISTRY=https://registry.growing.dev
GROWING_DEPLOY_TOKEN=your_deploy_token

# .env.local (desenvolvimento)
GROWING_DEV_PORT=3001
GROWING_DEV_HTTPS=true
```

## Troubleshooting

### Problemas Comuns

#### Erro de Porta Ocupada

```bash
# Verificar porta
lsof -i :3000

# Matar processo
kill -9 $(lsof -t -i :3000)

# Ou usar porta alternativa
growing dev --port 3001
```

#### Erro de Memória

```bash
# Aumentar limite de memória
NODE_OPTIONS="--max-old-space-size=4096" growing build

# Ou configurar no package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' growing build"
  }
}
```

#### Erro de Dependências

```bash
# Limpar node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Verificar dependências
npm audit

# Corrigir vulnerabilidades
npm audit fix
```

### Debug Mode

```bash
# Debug detalhado
DEBUG=growing:* growing dev

# Debug de componente específico
DEBUG=growing:component growing component create Button

# Salvar logs
growing dev 2>&1 | tee growing.log
```

## Boas Práticas

### Organização de Scripts

```json
// package.json
{
  "scripts": {
    "dev": "growing dev",
    "dev:debug": "growing dev --verbose",
    "build": "growing build --optimize",
    "build:analyze": "growing build --analyze",
    "test": "growing test",
    "test:coverage": "growing test --coverage",
    "lint": "growing lint",
    "lint:fix": "growing lint --fix",
    "preview": "growing preview",
    "clean": "growing cache clean && rm -rf dist",
    "deploy:staging": "growing deploy staging",
    "deploy:prod": "growing deploy production --confirm"
  }
}
```

### Configuração por Ambiente

```javascript
// growing.config.js
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  build: {
    minify: isProduction,
    sourcemap: !isProduction
  },

  plugins: isProduction
    ? ['@growing/plugin-optimize']
    : ['@growing/plugin-devtools']
};
```

### Automação com Husky

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "growing lint && growing test",
      "pre-push": "growing build"
    }
  }
}
```

A CLI do Growing oferece uma interface poderosa e intuitiva para gerenciar todo o ciclo de desenvolvimento, desde a criação até o deploy, mantendo consistência e eficiência no processo.