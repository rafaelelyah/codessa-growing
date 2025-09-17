# Configuração

Este guia detalha todas as opções de configuração disponíveis no sistema Growing, desde configurações básicas até avançadas.

## Estrutura de Configuração

### Arquivos de Configuração

O Growing suporta múltiplos arquivos de configuração:

```
growing.config.js      # Configuração principal (JavaScript)
growing.config.json    # Configuração alternativa (JSON)
.growingrc            # Configuração local (JSON)
package.json          # Configuração via package.json
```

### Ordem de Precedência

1. `growing.config.js` (maior prioridade)
2. `growing.config.json`
3. `.growingrc`
4. `package.json` (menor prioridade)

## Configuração Básica

### growing.config.js

```javascript
// growing.config.js
module.exports = {
  // Configurações básicas
  name: 'my-growing-app',
  version: '1.0.0',
  description: 'Minha aplicação Growing',

  // Ambiente
  env: 'development',

  // Portas
  devServer: {
    port: 3000,
    host: 'localhost',
    open: true
  },

  // Build
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: true
  }
};
```

### growing.config.json

```json
{
  "name": "my-growing-app",
  "version": "1.0.0",
  "description": "Minha aplicação Growing",
  "env": "development",
  "devServer": {
    "port": 3000,
    "host": "localhost",
    "open": true
  },
  "build": {
    "outDir": "dist",
    "sourcemap": true,
    "minify": true
  }
}
```

### package.json

```json
{
  "name": "my-growing-app",
  "version": "1.0.0",
  "description": "Minha aplicação Growing",
  "growing": {
    "env": "development",
    "devServer": {
      "port": 3000
    },
    "build": {
      "outDir": "dist"
    }
  }
}
```

## Configurações de Desenvolvimento

### Servidor de Desenvolvimento

```javascript
// growing.config.js
module.exports = {
  devServer: {
    // Porta do servidor
    port: 3000,

    // Host do servidor
    host: 'localhost',

    // Abrir navegador automaticamente
    open: true,

    // Diretório base
    base: '/',

    // Configurações HTTPS
    https: false,

    // Certificado SSL (se https: true)
    ssl: {
      key: './ssl/key.pem',
      cert: './ssl/cert.pem'
    },

    // Proxy para APIs
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    },

    // Headers CORS
    cors: true,

    // Configurações de cache
    cache: {
      maxAge: 0,
      etag: true
    }
  }
};
```

### Hot Module Replacement (HMR)

```javascript
// growing.config.js
module.exports = {
  hmr: {
    // Habilitar HMR
    enabled: true,

    // Porta do HMR
    port: 24678,

    // Host do HMR
    host: 'localhost',

    // Protocolo
    protocol: 'ws',

    // Timeout
    timeout: 30000,

    // Overlay de erros
    overlay: true,

    // Excluir arquivos do HMR
    exclude: [
      /node_modules/,
      /\.git/
    ]
  }
};
```

## Configurações de Build

### Build Básico

```javascript
// growing.config.js
module.exports = {
  build: {
    // Diretório de saída
    outDir: 'dist',

    // Arquivo de entrada
    entry: 'src/main.js',

    // Arquivos de entrada múltiplos
    rollupOptions: {
      input: {
        main: 'src/main.js',
        admin: 'src/admin.js'
      }
    },

    // Assets
    assetsDir: 'assets',

    // Inline assets limit (bytes)
    assetsInlineLimit: 4096,

    // Source maps
    sourcemap: true,

    // Minificação
    minify: 'esbuild',

    // Target do build
    target: 'es2015',

    // CSS
    css: {
      devSourcemap: true
    },

    // HTML
    html: {
      title: 'My App',
      favicon: 'public/favicon.ico'
    }
  }
};
```

### Otimizações de Build

```javascript
// growing.config.js
module.exports = {
  build: {
    // Otimizações
    optimizeDeps: {
      include: ['@growing/core', 'lodash'],
      exclude: ['some-large-lib']
    },

    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'react'],
          utils: ['lodash', 'moment']
        }
      }
    },

    // Compressão
    compression: {
      enabled: true,
      algorithm: 'gzip',
      level: 6
    },

    // Bundle analyzer
    analyzer: {
      enabled: false,
      open: false,
      filename: 'bundle-analyzer.html'
    },

    // Progressive Web App
    pwa: {
      enabled: false,
      manifest: './public/manifest.json',
      workbox: {
        swDest: 'dist/sw.js'
      }
    }
  }
};
```

## Configurações de CSS/SCSS

### Pré-processadores

```javascript
// growing.config.js
module.exports = {
  css: {
    // Pré-processadores
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@growing/core" as *;'
      },
      less: {
        modifyVars: {
          'primary-color': '#1890ff'
        }
      }
    },

    // PostCSS
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')
      ]
    },

    // Módulos CSS
    modules: {
      localsConvention: 'camelCase'
    },

    // Source maps
    devSourcemap: true
  }
};
```

### Design System

```javascript
// growing.config.js
module.exports = {
  designSystem: {
    // Tokens de design
    tokens: {
      colors: {
        primary: '#0066cc',
        secondary: '#666666',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      typography: {
        fontFamily: '"Inter", sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem'
        }
      }
    },

    // Breakpoints responsivos
    breakpoints: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px'
    },

    // Tema padrão
    defaultTheme: 'light',

    // Temas disponíveis
    themes: ['light', 'dark', 'auto']
  }
};
```

## Configurações de Componentes

### Sistema de Componentes

```javascript
// growing.config.js
module.exports = {
  components: {
    // Diretório dos componentes
    dir: 'src/components',

    // Extensões suportadas
    extensions: ['.js', '.ts', '.vue', '.svelte'],

    // Padrão de nomes
    naming: 'kebab-case',

    // Auto-import
    autoImport: true,

    // Lazy loading
    lazy: {
      enabled: true,
      threshold: 100
    },

    // Cache de componentes
    cache: {
      enabled: true,
      maxAge: 3600000 // 1 hora
    }
  }
};
```

### Web Components

```javascript
// growing.config.js
module.exports = {
  webComponents: {
    // Polyfills
    polyfills: {
      customElements: true,
      shadowDom: true,
      template: true
    },

    // Custom elements
    customElements: {
      // Prefixo para tags
      prefix: 'g-',

      // Modo shadow DOM
      shadowMode: 'open',

      // CSS scoping
      cssScope: 'isolated'
    },

    // Templates
    templates: {
      // Diretório de templates
      dir: 'src/templates',

      // Engine de template
      engine: 'handlebars',

      // Cache
      cache: true
    }
  }
};
```

## Configurações de Assets

### Imagens e Mídia

```javascript
// growing.config.js
module.exports = {
  assets: {
    // Diretório de assets
    dir: 'src/assets',

    // Otimizações de imagem
    images: {
      // Formatos suportados
      formats: ['jpg', 'png', 'webp', 'avif'],

      // Qualidade
      quality: 80,

      // Compressão
      compression: {
        enabled: true,
        level: 6
      },

      // Responsive images
      responsive: {
        enabled: true,
        sizes: [320, 640, 1024, 1920]
      }
    },

    // Fontes
    fonts: {
      // Diretório de fontes
      dir: 'src/assets/fonts',

      // Formatos
      formats: ['woff2', 'woff', 'ttf'],

      // Preload
      preload: ['Inter-Regular.woff2', 'Inter-Bold.woff2']
    },

    // Ícones
    icons: {
      // Sprite SVG
      sprite: {
        enabled: true,
        filename: 'icons.svg'
      },

      // Componentes de ícone
      components: {
        enabled: true,
        prefix: 'Icon'
      }
    }
  }
};
```

### CDN e External Assets

```javascript
// growing.config.js
module.exports = {
  assets: {
    // CDN
    cdn: {
      enabled: true,
      baseUrl: 'https://cdn.example.com',

      // Assets externos
      externals: {
        'jquery': 'https://code.jquery.com/jquery-3.6.0.min.js',
        'bootstrap': 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
      }
    },

    // Cache busting
    cacheBusting: {
      enabled: true,
      strategy: 'hash', // hash | query | none

      // Padrão de hash
      hashPattern: '[name].[hash:8].[ext]'
    }
  }
};
```

## Configurações de Performance

### Otimizações

```javascript
// growing.config.js
module.exports = {
  performance: {
    // Bundle splitting
    splitting: {
      enabled: true,
      strategy: 'dynamic', // dynamic | manual | vendor

      // Chunks manuais
      manualChunks: {
        vendor: ['vue', 'react', 'lodash'],
        ui: ['@growing/ui']
      }
    },

    // Lazy loading
    lazy: {
      enabled: true,
      threshold: 100, // px

      // Intersection Observer
      observer: {
        rootMargin: '50px'
      }
    },

    // Preloading
    preload: {
      enabled: true,
      modules: ['@growing/core', 'src/main.js']
    },

    // Prefetching
    prefetch: {
      enabled: true,
      strategy: 'aggressive' // conservative | aggressive | none
    }
  }
};
```

### Monitoramento

```javascript
// growing.config.js
module.exports = {
  performance: {
    // Web Vitals
    webVitals: {
      enabled: true,
      trackingId: 'GA_MEASUREMENT_ID'
    },

    // Performance monitoring
    monitoring: {
      enabled: true,
      endpoint: '/api/performance',

      // Métricas
      metrics: ['FCP', 'LCP', 'FID', 'CLS', 'TTFB']
    },

    // Bundle analyzer
    analyzer: {
      enabled: false,
      open: false,
      filename: 'bundle-report.html'
    }
  }
};
```

## Configurações de Testes

### Jest

```javascript
// growing.config.js
module.exports = {
  test: {
    // Framework
    framework: 'jest',

    // Configurações Jest
    jest: {
      // Ambiente de teste
      testEnvironment: 'jsdom',

      // Padrões de arquivos
      testMatch: [
        '**/__tests__/**/*.test.js',
        '**/?(*.)+(spec|test).js'
      ],

      // Cobertura
      collectCoverageFrom: [
        'src/**/*.{js,ts,vue}',
        '!src/**/*.d.ts'
      ],

      // Setup files
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

      // Mocks
      moduleNameMapping: {
        '\\.(css|scss)$': 'identity-obj-proxy'
      }
    },

    // Testes E2E
    e2e: {
      enabled: true,
      framework: 'playwright',

      // Configurações Playwright
      playwright: {
        browsers: ['chromium', 'firefox'],
        headless: true
      }
    }
  }
};
```

### Cypress

```javascript
// growing.config.js
module.exports = {
  test: {
    // Framework E2E
    e2e: {
      framework: 'cypress',

      // Configurações Cypress
      cypress: {
        // Arquivos de teste
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

        // Base URL
        baseUrl: 'http://localhost:3000',

        // Viewport padrão
        viewportWidth: 1280,
        viewportHeight: 720,

        // Vídeos
        video: true,
        videoUploadOnPasses: false,

        // Screenshots
        screenshotOnRunFailure: true
      }
    }
  }
};
```

## Configurações de Deploy

### Netlify

```javascript
// growing.config.js
module.exports = {
  deploy: {
    // Plataforma
    platform: 'netlify',

    // Configurações Netlify
    netlify: {
      // Build command
      buildCommand: 'npm run build',

      // Publish directory
      publishDirectory: 'dist',

      // Redirects
      redirects: [
        {
          from: '/old-page',
          to: '/new-page',
          status: 301
        }
      ],

      // Headers
      headers: [
        {
          for: '/*',
          values: {
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
          }
        }
      ],

      // Functions
      functions: {
        directory: 'netlify/functions'
      }
    }
  }
};
```

### Vercel

```javascript
// growing.config.js
module.exports = {
  deploy: {
    // Plataforma
    platform: 'vercel',

    // Configurações Vercel
    vercel: {
      // Build command
      buildCommand: 'npm run build',

      // Output directory
      outputDirectory: 'dist',

      // Functions
      functions: {
        'api/*.js': {
          runtime: 'nodejs16.x'
        }
      },

      // Rewrites
      rewrites: [
        {
          source: '/api/:path*',
          destination: '/api/:path*'
        }
      ],

      // Headers
      headers: [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            }
          ]
        }
      ]
    }
  }
};
```

## Configurações Avançadas

### Plugins

```javascript
// growing.config.js
module.exports = {
  plugins: [
    // Plugin personalizado
    {
      name: 'my-plugin',
      configureServer(server) {
        // Configurar servidor
      },
      configureBuild(build) {
        // Configurar build
      }
    },

    // Plugin de terceiros
    require('@growing/plugin-pwa')({
      manifest: './public/manifest.json'
    }),

    // Plugin condicional
    process.env.NODE_ENV === 'production' && require('@growing/plugin-compress')()
  ].filter(Boolean)
};
```

### Hooks

```javascript
// growing.config.js
module.exports = {
  hooks: {
    // Antes do build
    beforeBuild: async (options) => {
      console.log('Iniciando build...');
      // Pré-processamento
    },

    // Depois do build
    afterBuild: async (result) => {
      console.log('Build concluído!');
      // Pós-processamento
    },

    // Erro no build
    onBuildError: (error) => {
      console.error('Erro no build:', error);
      // Tratamento de erro
    },

    // Servidor iniciado
    onServerStart: (server) => {
      console.log(`Servidor rodando em ${server.url}`);
    },

    // Arquivo alterado
    onFileChange: (filePath) => {
      console.log(`Arquivo alterado: ${filePath}`);
    }
  }
};
```

### Ambiente e Variáveis

```javascript
// growing.config.js
module.exports = (env) => ({
  // Variáveis de ambiente
  env: {
    // Prefixo para variáveis
    prefix: 'GROWING_',

    // Variáveis obrigatórias
    required: ['API_KEY', 'DATABASE_URL'],

    // Valores padrão
    defaults: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  },

  // Configuração baseada no ambiente
  ...(env.NODE_ENV === 'production' ? {
    build: {
      minify: true,
      sourcemap: false
    }
  } : {
    devServer: {
      port: 3000
    }
  })
});
```

### Configuração por Ambiente

```javascript
// growing.config.js
const baseConfig = {
  name: 'my-app'
};

const devConfig = {
  ...baseConfig,
  devServer: {
    port: 3000
  },
  build: {
    sourcemap: true
  }
};

const prodConfig = {
  ...baseConfig,
  build: {
    minify: true,
    sourcemap: false
  },
  deploy: {
    platform: 'netlify'
  }
};

module.exports = (env) => {
  switch (env.NODE_ENV) {
    case 'production':
      return prodConfig;
    case 'staging':
      return { ...prodConfig, deploy: { platform: 'staging' } };
    default:
      return devConfig;
  }
};
```

## Validação de Configuração

### Schema de Validação

```javascript
// growing.config.js
const Joi = require('joi');

const configSchema = Joi.object({
  name: Joi.string().required(),
  version: Joi.string().pattern(/^\d+\.\d+\.\d+$/),
  devServer: Joi.object({
    port: Joi.number().integer().min(1).max(65535),
    host: Joi.string().hostname()
  }),
  build: Joi.object({
    outDir: Joi.string(),
    sourcemap: Joi.boolean()
  })
});

module.exports = {
  // Configuração
  name: 'my-app',
  version: '1.0.0',

  // Validação
  validate: (config) => {
    const { error } = configSchema.validate(config);
    if (error) {
      throw new Error(`Configuração inválida: ${error.details[0].message}`);
    }
  }
};
```

### Debugging de Configuração

```javascript
// growing.config.js
module.exports = {
  // Debug
  debug: {
    enabled: true,
    config: true,    // Mostrar configuração final
    plugins: true,   // Debug de plugins
    build: true      // Debug de build
  },

  // Logging
  logging: {
    level: 'info',   // error | warn | info | debug
    format: 'json',  // json | pretty
    output: 'console' // console | file
  }
};
```

## Exemplos Completos

### Aplicação SPA Simples

```javascript
// growing.config.js
module.exports = {
  name: 'simple-spa',
  version: '1.0.0',

  devServer: {
    port: 3000,
    open: true
  },

  build: {
    outDir: 'dist',
    sourcemap: true
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@growing/core" as *;'
      }
    }
  },

  components: {
    dir: 'src/components',
    autoImport: true
  }
};
```

### Aplicação Enterprise

```javascript
// growing.config.js
module.exports = {
  name: 'enterprise-app',
  version: '2.1.0',

  env: {
    prefix: 'ENTERPRISE_',
    required: ['API_KEY', 'DATABASE_URL']
  },

  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },

  build: {
    outDir: 'dist',
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vuex', 'vue-router'],
          ui: ['@growing/ui']
        }
      }
    }
  },

  performance: {
    splitting: {
      enabled: true,
      strategy: 'dynamic'
    },
    webVitals: {
      enabled: true,
      trackingId: 'GA_MEASUREMENT_ID'
    }
  },

  test: {
    jest: {
      collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/**/*.spec.js'
      ]
    },
    e2e: {
      framework: 'cypress'
    }
  },

  deploy: {
    platform: 'vercel',
    vercel: {
      functions: {
        'api/**/*.js': {
          runtime: 'nodejs16.x'
        }
      }
    }
  }
};
```

Esta configuração abrangente permite personalizar todos os aspectos do sistema Growing para atender às necessidades específicas do seu projeto.