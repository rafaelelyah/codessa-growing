# Desenvolvimento com Vite

O sistema Growing utiliza Vite como ferramenta principal de desenvolvimento, oferecendo uma experiência moderna e eficiente para trabalhar com SCSS e componentes CSS.

## Visão Geral

Vite é um servidor de desenvolvimento rápido e uma ferramenta de build que otimiza o desenvolvimento de projetos modernos. No contexto do Growing, ele é usado para:

- Servir arquivos de desenvolvimento com hot reload
- Processar arquivos SCSS automaticamente
- Gerar builds otimizados para produção
- Fornecer uma experiência de desenvolvimento fluida

## Funcionalidades Principais

### Servidor de Desenvolvimento

O Vite oferece um servidor de desenvolvimento com as seguintes características:

- **Hot Module Replacement (HMR)**: Atualização instantânea de mudanças
- **Fast Refresh**: Recarregamento rápido de componentes
- **ES Modules**: Suporte nativo a módulos ES
- **SCSS Processing**: Processamento automático de arquivos SCSS

### Build Otimizado

Para produção, o Vite gera builds otimizados com:

- **Tree Shaking**: Remoção de código não utilizado
- **Code Splitting**: Divisão inteligente de bundles
- **Minificação**: Compressão de CSS e assets
- **Source Maps**: Mapeamento para debugging

## Uso Básico

### Iniciando o Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Este comando:
- Inicia o servidor na porta 5173
- Habilita hot reload automático
- Processa arquivos SCSS em tempo real
- Abre o navegador automaticamente (opcional)

### Build para Produção

```bash
# Gerar build otimizado
npm run build
```

Este comando:
- Processa todos os arquivos SCSS
- Otimiza e minifica o CSS
- Gera arquivos na pasta `dist/`
- Cria source maps para debugging

### Preview da Build

```bash
# Visualizar build localmente
npm run preview
```

Este comando:
- Serve os arquivos da pasta `dist/`
- Simula o ambiente de produção
- Permite testar a versão final

## Configuração

### vite.config.js

O arquivo de configuração do Vite permite personalizar o comportamento:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // Configurações do servidor
  server: {
    port: 3000,
    host: true,
    open: true
  },

  // Configurações de CSS/SCSS
  css: {
    preprocessorOptions: {
      scss: {
        // Variáveis globais
        additionalData: `@import "src/variables.scss";`
      }
    }
  },

  // Configurações de build
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild'
  }
})
```

### Configurações Comuns

#### Porta Customizada

```javascript
export default defineConfig({
  server: {
    port: 3001
  }
})
```

#### HTTPS em Desenvolvimento

```javascript
export default defineConfig({
  server: {
    https: true
  }
})
```

#### Proxy para APIs

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
```

## Desenvolvimento com SCSS

### Hot Reload para SCSS

O Vite oferece hot reload automático para mudanças em arquivos SCSS:

```scss
/* src/my-trunks.scss */
@use 'terrain/trunks' as *;

// Mudanças aqui são refletidas instantaneamente
.my-custom-component {
  @extend .trunk-button;
  background-color: var(--brand-primary);
}
```

### Source Maps

Durante o desenvolvimento, source maps são gerados automaticamente:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

### Variáveis de Ambiente

O Vite suporta variáveis de ambiente:

```bash
# .env
VITE_APP_TITLE=Codessa Growing
VITE_API_URL=https://api.example.com

# .env.local (desenvolvimento)
VITE_DEV_MODE=true
```

Uso no código:

```javascript
// Em JavaScript (se usado)
const appTitle = import.meta.env.VITE_APP_TITLE;

// Em SCSS (através de variáveis CSS)
:root {
  --app-title: env(VITE_APP_TITLE);
}
```

## Otimização de Performance

### Build Análise

Para analisar o tamanho do bundle:

```bash
# Instalar plugin de análise
npm install --save-dev rollup-plugin-visualizer

# Adicionar ao vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
})
```

### Lazy Loading

Para otimizar carregamento:

```javascript
// Em JavaScript (se usado)
const module = await import('./heavy-component.js');
```

### Code Splitting

Configuração automática no Vite:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lodash'],
          ui: ['@growing/ui']
        }
      }
    }
  }
})
```

## Integração com VS Code

### Extensões Recomendadas

- **Vite**: Suporte oficial do Vite
- **SCSS IntelliSense**: Autocompletar para SCSS
- **Prettier**: Formatação de código
- **ESLint**: Linting de código

### Configurações do VS Code

```json
// .vscode/settings.json
{
  "scss.validate": true,
  "scss.format.enabled": true,
  "emmet.includeLanguages": {
    "scss": "css"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Troubleshooting

### Problemas Comuns

#### Porta Já em Uso

```bash
# Mudar porta
export default defineConfig({
  server: {
    port: 3001
  }
})
```

#### CSS Não Carregando

```html
<!-- Verificar link no index.html -->
<link rel="stylesheet" href="/src/my-trunks.scss">
```

#### Build Lent

```javascript
// Otimizar build
export default defineConfig({
  build: {
    minify: 'esbuild', // Mais rápido que 'terser'
    sourcemap: false   // Desabilitar em produção
  }
})
```

#### Hot Reload Não Funcionando

```javascript
// Verificar configuração
export default defineConfig({
  server: {
    hmr: {
      overlay: true
    }
  }
})
```

## Limitações Atuais

O sistema Growing atualmente foca em:

- **Desenvolvimento SCSS**: Processamento e otimização de estilos
- **Componentes CSS**: Sistema de componentes modulares
- **Build Otimizado**: Geração de CSS para produção
- **Hot Reload**: Desenvolvimento com feedback instantâneo

**Não inclui:**
- Sistema de testes automatizados
- CLI avançada de gerenciamento
- Ferramentas de deploy integradas
- Integração com frameworks JavaScript

## Futuras Expansões

Conforme o roadmap, futuras versões podem incluir:

- **CLI Avançada**: Ferramentas de gerenciamento de componentes
- **Sistema de Testes**: Testes automatizados para estilos
- **Deploy Integrado**: Ferramentas de publicação automatizadas
- **Framework Integration**: Suporte a React, Vue, etc.

A documentação será atualizada conforme essas funcionalidades forem implementadas.

## Instalação

### Pré-requisitos

```bash
# Node.js 16+
node --version

# NPM ou Yarn
npm --version

# Git
git --version
```

### Instalação Global

```bash
# Via NPM
npm install -g @growing/grow-manager

# Via Yarn
yarn global add @growing/grow-manager

# Verificar instalação
grow --version
```

### Instalação Local (Recomendado)

```bash
# No diretório do projeto
npm install --save-dev @growing/grow-manager

# Adicionar aos scripts do package.json
{
  "scripts": {
    "grow": "grow",
    "grow:extract": "grow extract",
    "grow:promote": "grow promote"
  }
}
```

## Comandos Principais

### grow extract

Extrai componentes da biblioteca de Sprouts para uso no projeto.

```bash
# Extrair componente específico
grow extract trunk-button

# Extrair múltiplos componentes
grow extract trunk-button trunk-card trunk-nav

# Extrair com opções
grow extract trunk-button --output src/components --force

# Extrair todos os componentes de uma categoria
grow extract --category forms

# Extrair com configuração customizada
grow extract trunk-button --config grow.config.js
```

**Opções:**
- `--output, -o`: Diretório de saída (padrão: src/components)
- `--force, -f`: Sobrescrever arquivos existentes
- `--category, -c`: Filtrar por categoria
- `--config`: Arquivo de configuração customizado
- `--dry-run`: Mostrar o que seria feito sem executar

### grow promote

Promove componentes do desenvolvimento para produção.

```bash
# Promover componente específico
grow promote trunk-button

# Promover múltiplos componentes
grow promote trunk-button trunk-card

# Promover todos os componentes modificados
grow promote --all

# Promover com tag específica
grow promote trunk-button --tag v1.2.0

# Promover para ambiente específico
grow promote trunk-button --env production
```

**Opções:**
- `--all, -a`: Promover todos os componentes
- `--tag, -t`: Tag/version específica
- `--env, -e`: Ambiente de destino
- `--force`: Forçar promoção mesmo com conflitos
- `--dry-run`: Mostrar o que seria feito sem executar

### grow status

Verifica o status dos componentes no projeto.

```bash
# Status geral
grow status

# Status de componente específico
grow status trunk-button

# Status detalhado
grow status --verbose

# Status por categoria
grow status --category forms
```

### grow update

Atualiza componentes para as versões mais recentes.

```bash
# Atualizar todos os componentes
grow update

# Atualizar componente específico
grow update trunk-button

# Atualizar para versão específica
grow update trunk-button --version 2.1.0

# Verificar atualizações disponíveis
grow update --check
```

### grow clean

Remove componentes não utilizados e limpa arquivos temporários.

```bash
# Limpeza geral
grow clean

# Limpar componente específico
grow clean trunk-button

# Limpar apenas arquivos temporários
grow clean --temp

# Limpar com confirmação
grow clean --interactive
```

## Configuração

### Arquivo grow.config.js

```javascript
module.exports = {
  // Diretórios do projeto
  paths: {
    components: 'src/components',
    styles: 'src/styles',
    assets: 'src/assets',
    temp: '.grow-temp'
  },

  // Configurações de extração
  extract: {
    // Prefixo para classes CSS
    prefix: 'app-',

    // Formato de saída
    format: 'scss', // 'scss', 'css', 'json'

    // Incluir dependências automaticamente
    includeDependencies: true,

    // Estratégia de resolução de conflitos
    conflictStrategy: 'merge', // 'merge', 'overwrite', 'skip'
  },

  // Configurações de promoção
  promote: {
    // Ambiente padrão
    defaultEnv: 'staging',

    // Estratégias de promoção por ambiente
    environments: {
      development: {
        autoTag: false,
        requireTests: false
      },
      staging: {
        autoTag: true,
        requireTests: true
      },
      production: {
        autoTag: true,
        requireTests: true,
        requireApproval: true
      }
    }
  },

  // Configurações de build
  build: {
    // Otimizações
    optimize: {
      minify: true,
      compress: true,
      removeUnused: true
    },

    // Source maps
    sourceMaps: true,

    // Análise de bundle
    analyzeBundle: false
  },

  // Hooks personalizados
  hooks: {
    preExtract: (component) => {
      console.log(`Extraindo ${component}...`);
    },
    postExtract: (component, files) => {
      console.log(`Extraído ${component}: ${files.length} arquivos`);
    },
    prePromote: (component, targetEnv) => {
      console.log(`Promovendo ${component} para ${targetEnv}...`);
    },
    postPromote: (component, targetEnv) => {
      console.log(`Promovido ${component} para ${targetEnv}`);
    }
  }
};
```

### Arquivo .growrc

```json
{
  "paths": {
    "components": "src/components",
    "styles": "src/styles"
  },
  "extract": {
    "prefix": "my-app-",
    "format": "scss"
  }
}
```

### Variáveis de Ambiente

```bash
# Configurações via environment
GROW_API_KEY=your_api_key
GROW_REGISTRY=https://registry.growing.dev
GROW_CACHE_DIR=/tmp/grow-cache
GROW_LOG_LEVEL=info
```

## Fluxo de Trabalho

### Desenvolvimento Básico

```bash
# 1. Extrair componente
grow extract trunk-button

# 2. Adaptar no Tree
# Editar src/styles/tree.scss

# 3. Testar localmente
npm run dev

# 4. Promover para staging
grow promote trunk-button --env staging

# 5. Testar em staging
# Verificar aplicação em staging

# 6. Promover para produção
grow promote trunk-button --env production
```

### Desenvolvimento Avançado

```bash
# 1. Verificar status
grow status

# 2. Atualizar componentes desatualizados
grow update

# 3. Extrair novos componentes
grow extract trunk-modal trunk-tooltip

# 4. Desenvolver customizações
# Editar arquivos em src/components/

# 5. Limpar componentes não utilizados
grow clean --interactive

# 6. Build otimizado
grow build --optimize

# 7. Promover tudo
grow promote --all --env production
```

## Integração com CI/CD

### GitHub Actions

```yaml
# .github/workflows/grow-deploy.yml
name: Deploy with Grow

on:
  push:
    branches: [main]

jobs:
  deploy:
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

    - name: Install Grow Manager
      run: npm install -g @growing/grow-manager

    - name: Extract components
      run: grow extract --all

    - name: Run tests
      run: npm test

    - name: Promote to staging
      run: grow promote --all --env staging
      env:
        GROW_API_KEY: ${{ secrets.GROW_API_KEY }}

    - name: Deploy to staging
      run: npm run deploy:staging

    - name: Promote to production
      run: grow promote --all --env production
      env:
        GROW_API_KEY: ${{ secrets.GROW_API_KEY }}

    - name: Deploy to production
      run: npm run deploy:production
```

### Jenkins Pipeline

```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        GROW_API_KEY = credentials('grow-api-key')
    }

    stages {
        stage('Setup') {
            steps {
                sh 'npm ci'
                sh 'npm install -g @growing/grow-manager'
            }
        }

        stage('Extract') {
            steps {
                sh 'grow extract --all'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy Staging') {
            steps {
                sh 'grow promote --all --env staging'
                sh 'npm run deploy:staging'
            }
        }

        stage('Deploy Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'grow promote --all --env production'
                sh 'npm run deploy:production'
            }
        }
    }
}
```

## Estratégias de Extração

### Estratégia Básica

```javascript
// grow.config.js
module.exports = {
  extract: {
    strategy: 'basic',
    // Extrai apenas o componente solicitado
    includeDependencies: false
  }
};
```

### Estratégia Completa

```javascript
// grow.config.js
module.exports = {
  extract: {
    strategy: 'complete',
    // Extrai componente + dependências + documentação
    includeDependencies: true,
    includeDocs: true,
    includeTests: true
  }
};
```

### Estratégia Modular

```javascript
// grow.config.js
module.exports = {
  extract: {
    strategy: 'modular',
    // Extrai em módulos separados
    modularize: true,
    modules: {
      core: ['trunk-button', 'trunk-input'],
      forms: ['trunk-form', 'trunk-select'],
      navigation: ['trunk-nav', 'trunk-breadcrumbs']
    }
  }
};
```

## Resolução de Conflitos

### Estratégias de Merge

```javascript
// grow.config.js
module.exports = {
  extract: {
    conflictResolution: {
      // Estratégia para arquivos conflitantes
      strategy: 'merge', // 'merge', 'overwrite', 'skip', 'backup'

      // Função customizada de merge
      mergeFunction: (existing, incoming, path) => {
        if (path.endsWith('.scss')) {
          return mergeScss(existing, incoming);
        }
        return incoming;
      },

      // Padrões de backup
      backupPattern: '.backup.{timestamp}',

      // Notificar sobre conflitos
      notifyConflicts: true
    }
  }
};
```

## Monitoramento e Analytics

### Métricas de Uso

```bash
# Ver métricas de componentes
grow analytics usage

# Ver métricas de performance
grow analytics performance

# Exportar métricas
grow analytics export --format json --output metrics.json
```

### Logs e Debugging

```bash
# Ver logs detalhados
grow --verbose

# Salvar logs em arquivo
grow --log-file grow.log

# Debug específico
grow extract trunk-button --debug
```

## Plugins e Extensões

### Instalação de Plugins

```bash
# Plugin de otimização
grow plugin install @growing/plugin-optimize

# Plugin de testes
grow plugin install @growing/plugin-testing

# Plugin customizado
grow plugin install ./plugins/my-custom-plugin
```

### Desenvolvimento de Plugins

```javascript
// plugins/my-custom-plugin/index.js
module.exports = {
  name: 'my-custom-plugin',
  version: '1.0.0',

  hooks: {
    preExtract: (component) => {
      console.log(`Custom: Pre-extracting ${component}`);
    },

    postExtract: (component, files) => {
      // Processamento customizado
      files.forEach(file => {
        // Modificar arquivos conforme necessário
      });
    }
  },

  commands: {
    'custom-command': {
      description: 'Comando customizado',
      action: (args) => {
        console.log('Executando comando customizado');
      }
    }
  }
};
```

## Troubleshooting

### Problemas Comuns

#### Erro de Permissões

```bash
# Verificar permissões
ls -la src/components/

# Corrigir permissões
chmod -R 755 src/components/

# Executar como sudo se necessário
sudo grow extract trunk-button
```

#### Conflitos de Versão

```bash
# Verificar versões
grow --version
npm list @growing/grow-manager

# Atualizar para versão específica
npm install @growing/grow-manager@latest

# Limpar cache
grow clean --cache
```

#### Problemas de Rede

```bash
# Verificar conectividade
curl https://registry.growing.dev

# Configurar proxy
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080

# Usar registry alternativo
grow extract trunk-button --registry https://registry.backup.com
```

### Debug Mode

```bash
# Ativar debug detalhado
DEBUG=grow:* grow extract trunk-button

# Debug específico de componente
DEBUG=grow:extract grow extract trunk-button

# Salvar debug em arquivo
DEBUG=grow:* grow extract trunk-button 2>&1 | tee debug.log
```

## Boas Práticas

### Organização do Projeto

```
project/
├── src/
│   ├── components/     # Componentes extraídos
│   ├── styles/
│   │   ├── tree.scss   # Customizações
│   │   └── themes/     # Temas específicos
│   └── assets/
├── grow.config.js      # Configuração
├── .growrc            # Configuração alternativa
└── package.json
```

### Versionamento

```json
// package.json
{
  "dependencies": {
    "@growing/grow-manager": "^2.1.0"
  },
  "grow": {
    "version": "1.0.0",
    "components": {
      "trunk-button": "2.1.0",
      "trunk-card": "1.8.0"
    }
  }
}
```

### Segurança

```javascript
// grow.config.js
module.exports = {
  security: {
    // Verificar checksums
    verifyChecksums: true,

    // Assinar commits
    signCommits: true,

    // Auditar dependências
    auditDependencies: true,

    // Políticas de acesso
    accessPolicies: {
      production: ['admin', 'lead-dev'],
      staging: ['developer']
    }
  }
};
```

O Grow Manager é uma ferramenta poderosa que simplifica o desenvolvimento com o sistema Growing, garantindo consistência, eficiência e qualidade no processo de criação de interfaces.