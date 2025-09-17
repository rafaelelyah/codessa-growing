# Utilitários e Ferramentas

O sistema Growing oferece ferramentas básicas para desenvolvimento com SCSS e otimização de CSS através do Vite.

## Visão Geral

Atualmente, o foco está em fornecer uma base sólida para desenvolvimento de estilos SCSS com ferramentas modernas de build e desenvolvimento.

## Ferramentas de Desenvolvimento

### Vite

Vite é a ferramenta principal para desenvolvimento e build.

#### Scripts NPM Disponíveis

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### Funcionalidades

- **Hot Reload**: Atualização automática de mudanças em SCSS
- **SCSS Processing**: Processamento nativo de arquivos SCSS
- **Build Otimizado**: Minificação e otimização para produção
- **Source Maps**: Debug de CSS original durante desenvolvimento

### Desenvolvimento com SCSS

#### Estrutura Recomendada

```
src/
├── my-trunks.scss      # Arquivo principal de estilos
├── groves/            # Estilos temáticos
├── harvest/           # Componentes específicos
└── sparks/            # Utilitários e mixins
```

#### Exemplo de Organização

```scss
// src/my-trunks.scss
@use 'terrain/trunks' as *;

// Importar estilos organizados
@use 'groves/buttons';
@use 'groves/forms';
@use 'harvest/header';
@use 'harvest/footer';
```

## Utilitários SCSS

### Mixins Disponíveis

O sistema Growing oferece diversos mixins através da arquitetura Sprout-Trunk-Leaf:

#### Mixins de Layout

```scss
// Layout responsivo
@include sprout-flex;
@include sprout-grid;

// Containers
@include sprout-container;
@include sprout-center;
```

#### Mixins de Componentes

```scss
// Botões
@include sprout-button-primary;
@include sprout-button-secondary;

// Formulários
@include sprout-input;
@include sprout-form-group;
```

#### Mixins Utilitários

```scss
// Espaçamento
@include sprout-spacing;

// Cores
@include sprout-color-primary;
@include sprout-color-secondary;

// Tipografia
@include sprout-heading;
@include sprout-text;
```

### Funções SCSS

#### Funções de Cor

```scss
// Cores do sistema
color: sprout-color('primary');
background: sprout-color('secondary');

// Tons de cor
color: sprout-color('primary', 'light');
color: sprout-color('primary', 'dark');
```

#### Funções de Espaçamento

```scss
// Espaçamentos padronizados
padding: sprout-space('sm');    // 8px
padding: sprout-space('md');    // 16px
padding: sprout-space('lg');    // 24px
padding: sprout-space('xl');    // 32px
```

#### Funções de Tipografia

```scss
// Tamanhos de fonte
font-size: sprout-font-size('sm');   // 14px
font-size: sprout-font-size('base'); // 16px
font-size: sprout-font-size('lg');   // 18px

// Pesos de fonte
font-weight: sprout-font-weight('normal');  // 400
font-weight: sprout-font-weight('bold');    // 700
```

## Utilitários CSS

### Classes Utilitárias

O sistema oferece classes CSS utilitárias através dos Trunks:

#### Classes de Layout

```html
<!-- Flexbox -->
<div class="trunk-flex trunk-justify-center trunk-items-center">
  <div>Item centralizado</div>
</div>

<!-- Grid -->
<div class="trunk-grid trunk-grid-cols-3 trunk-gap-md">
  <div>Coluna 1</div>
  <div>Coluna 2</div>
  <div>Coluna 3</div>
</div>
```

#### Classes de Espaçamento

```html
<!-- Margens -->
<div class="trunk-m-md">Margem média</div>
<div class="trunk-mt-lg">Margem superior grande</div>
<div class="trunk-mx-auto">Margem horizontal automática</div>

<!-- Paddings -->
<div class="trunk-p-sm">Padding pequeno</div>
<div class="trunk-py-md">Padding vertical médio</div>
```

#### Classes de Cor

```html
<!-- Cores de fundo -->
<div class="trunk-bg-primary">Fundo primário</div>
<div class="trunk-bg-secondary">Fundo secundário</div>

<!-- Cores de texto -->
<span class="trunk-text-primary">Texto primário</span>
<span class="trunk-text-muted">Texto muted</span>
```

#### Classes de Tipografia

```html
<!-- Tamanhos -->
<h1 class="trunk-text-xl">Título grande</h1>
<p class="trunk-text-base">Texto normal</p>
<small class="trunk-text-sm">Texto pequeno</small>

<!-- Pesos -->
<span class="trunk-font-normal">Normal</span>
<span class="trunk-font-bold">Negrito</span>
```

## Desenvolvimento Iterativo

### Workflow Básico

1. **Configuração**: Iniciar servidor de desenvolvimento
2. **Desenvolvimento**: Modificar arquivos SCSS
3. **Visualização**: Ver mudanças automaticamente
4. **Otimização**: Usar mixins e utilitários disponíveis
5. **Build**: Gerar versão otimizada para produção

### Exemplo Prático

```scss
// 1. Importar sistema
@use 'terrain/trunks' as *;

// 2. Criar componente customizado
.my-card {
  @extend .trunk-card;
  @include sprout-shadow-md;

  // Customizações
  border-radius: sprout-radius('lg');
  background: sprout-color('surface');
}

// 3. Usar classes utilitárias
.my-section {
  @extend .trunk-section;
  @extend .trunk-py-xl;
  @extend .trunk-bg-light;
}
```

## Otimização e Performance

### Técnicas de Otimização

#### CSS Minificado

O Vite automaticamente minifica CSS em produção:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'esbuild',
    cssMinify: true
  }
})
```

#### Remoção de Código Não Usado

O Vite remove CSS não utilizado através de tree shaking.

#### Compressão

```javascript
// Para compressão adicional
export default defineConfig({
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/css/[name]-[hash][extname]'
      }
    }
  }
})
```

## Debugging

### Ferramentas de Debug

#### DevTools do Navegador

- Inspecionar elementos e estilos aplicados
- Ver cascata de CSS
- Debug de media queries

#### Source Maps

```javascript
// Habilitar source maps
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

#### Console do Vite

O Vite fornece feedback detalhado sobre:
- Arquivos processados
- Erros de SCSS
- Avisos de otimização

## Integração com VS Code

### Extensões Úteis

- **SCSS IntelliSense**: Autocompletar para SCSS
- **Prettier**: Formatação automática
- **Stylelint**: Linting de CSS/SCSS

### Configurações

```json
// .vscode/settings.json
{
  "scss.validate": true,
  "scss.format.enabled": true,
  "editor.formatOnSave": true,
  "css.validate": false
}
```

## Limitações Atuais

O sistema Growing atualmente oferece:

- **Processamento SCSS**: Com Vite
- **Mixins e Funções**: Através da arquitetura
- **Classes Utilitárias**: Para desenvolvimento rápido
- **Build Otimizado**: Para produção

**Não inclui:**
- Bibliotecas JavaScript utilitárias
- Sistema de testes automatizados
- Ferramentas avançadas de análise
- Plugins complexos de build

## Futuras Expansões

Conforme o roadmap, futuras versões podem incluir:

- **Utilitários JavaScript**: Funções helper
- **Sistema de Testes**: Para estilos e componentes
- **Ferramentas de Análise**: Performance e cobertura
- **Plugins Avançados**: Para otimização específica

A documentação será atualizada conforme essas funcionalidades forem implementadas.

## Utilitários de Desenvolvimento

### growing-utils

Biblioteca principal de utilitários.

```bash
# Instalar
npm install @growing/utils

# Importar
import { debounce, throttle, formatDate } from '@growing/utils';
```

#### Funções de Controle de Fluxo

```javascript
import { debounce, throttle, memoize } from '@growing/utils';

// Debounce para busca
const searchDebounced = debounce((query) => {
  console.log('Searching:', query);
}, 300);

// Throttle para scroll
const handleScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

// Memoização de função custosa
const expensiveCalculation = memoize((n) => {
  // Cálculo complexo
  return n * 2;
});
```

#### Utilitários de Data/Hora

```javascript
import { formatDate, timeAgo, isValidDate } from '@growing/utils';

// Formatação de data
const formatted = formatDate(new Date(), 'DD/MM/YYYY');
// Resultado: "25/12/2023"

// Tempo relativo
const relative = timeAgo(new Date(Date.now() - 3600000));
// Resultado: "1 hora atrás"

// Validação de data
const isValid = isValidDate('2023-12-25');
// Resultado: true
```

#### Utilitários de String

```javascript
import { capitalize, camelCase, kebabCase, truncate } from '@growing/utils';

// Capitalização
const capitalized = capitalize('hello world');
// Resultado: "Hello world"

// Conversões de case
const camel = camelCase('hello-world');
// Resultado: "helloWorld"

const kebab = kebabCase('HelloWorld');
// Resultado: "hello-world"

// Truncamento
const truncated = truncate('Esta é uma string muito longa', 20);
// Resultado: "Esta é uma string..."
```

#### Utilitários de Array

```javascript
import { unique, chunk, shuffle, sortBy } from '@growing/utils';

// Remover duplicatas
const uniqueArray = unique([1, 2, 2, 3, 3, 3]);
// Resultado: [1, 2, 3]

// Dividir em grupos
const chunks = chunk([1, 2, 3, 4, 5], 2);
// Resultado: [[1, 2], [3, 4], [5]]

// Embaralhar
const shuffled = shuffle([1, 2, 3, 4, 5]);
// Resultado: [3, 1, 5, 2, 4] (aleatório)

// Ordenar por propriedade
const sorted = sortBy(
  [{ name: 'João', age: 25 }, { name: 'Ana', age: 20 }],
  'age'
);
// Resultado: [{ name: 'Ana', age: 20 }, { name: 'João', age: 25 }]
```

### growing-colors

Utilitários para manipulação de cores.

```bash
npm install @growing/colors
```

```javascript
import { lighten, darken, mix, toHex, toRgb } from '@growing/colors';

// Clarear cor
const lighter = lighten('#3366cc', 0.2);
// Resultado: "#5c85e6"

// Escurecer cor
const darker = darken('#3366cc', 0.2);
// Resultado: "#254a99"

// Misturar cores
const mixed = mix('#ff0000', '#0000ff', 0.5);
// Resultado: "#800080"

// Converter formatos
const hex = toHex('rgb(255, 0, 0)');
// Resultado: "#ff0000"

const rgb = toRgb('#ff0000');
// Resultado: { r: 255, g: 0, b: 0 }
```

### growing-responsive

Utilitários para design responsivo.

```bash
npm install @growing/responsive
```

```javascript
import { breakpoint, mediaQuery, container } from '@growing/responsive';

// Definir breakpoints
const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px'
};

// Criar media queries
const mq = mediaQuery(breakpoints);

// Usar em componentes
const styles = `
  .container {
    ${container(1200)}
  }

  .hidden-mobile {
    ${mq.down('md')} {
      display: none;
    }
  }

  .visible-desktop {
    ${mq.up('lg')} {
      display: block;
    }
  }
`;
```

## Utilitários de Performance

### growing-performance

Ferramentas para otimização de performance.

```bash
npm install @growing/performance
```

```javascript
import { lazyLoad, preload, measurePerformance } from '@growing/performance';

// Lazy loading de componentes
const LazyComponent = lazyLoad(() => import('./HeavyComponent'));

// Preload de recursos
preload('/api/data', 'fetch');
preload('/image.jpg', 'image');

// Medição de performance
const measure = measurePerformance('component-render');
measure.start();

// ... código do componente

measure.end();
console.log('Tempo de renderização:', measure.duration);
```

### growing-bundle

Utilitários para análise e otimização de bundles.

```bash
npm install @growing/bundle
```

```javascript
import { analyzeBundle, optimizeBundle } from '@growing/bundle';

// Analisar bundle
const analysis = await analyzeBundle('./dist/bundle.js');
console.log('Tamanho:', analysis.size);
console.log('Dependências:', analysis.dependencies);

// Otimizar bundle
const optimized = await optimizeBundle('./dist/bundle.js', {
  minify: true,
  compress: true,
  treeShake: true
});
```

## Utilitários de Teste

### growing-testing

Utilitários para facilitar testes.

```bash
npm install --save-dev @growing/testing
```

```javascript
import { render, fireEvent, waitFor } from '@growing/testing';
import { Button } from './Button';

// Teste de componente
test('Button handles click', async () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Click me</Button>
  );

  fireEvent.click(getByText('Click me'));
  expect(handleClick).toHaveBeenCalled();
});

// Teste assíncrono
test('Async operation', async () => {
  const { getByText } = render(<AsyncComponent />);

  await waitFor(() => {
    expect(getByText('Loaded')).toBeInTheDocument();
  });
});
```

### growing-mocks

Mocks para testes.

```bash
npm install --save-dev @growing/mocks
```

```javascript
import { mockAPI, mockStorage, mockDate } from '@growing/mocks';

// Mock de API
const apiMock = mockAPI('/api/users', {
  GET: [{ id: 1, name: 'João' }],
  POST: { success: true }
});

// Mock de localStorage
const storageMock = mockStorage({
  'user-preferences': JSON.stringify({ theme: 'dark' })
});

// Mock de Date
const dateMock = mockDate('2023-12-25T10:00:00Z');
```

## Utilitários de Build

### growing-build-utils

Utilitários para processos de build.

```bash
npm install --save-dev @growing/build-utils
```

```javascript
import { copyFiles, minifyCSS, generateManifest } from '@growing/build-utils';

// Copiar arquivos
await copyFiles('src/assets/**/*', 'dist/assets/');

// Minificar CSS
const minified = await minifyCSS('.button { color: red; }');
// Resultado: ".button{color:red}"

// Gerar manifest
const manifest = await generateManifest('./dist', {
  includeHash: true,
  basePath: '/assets/'
});
```

### growing-svg

Utilitários para manipulação de SVG.

```bash
npm install --save-dev @growing/svg
```

```javascript
import { optimizeSVG, spriteSVG, inlineSVG } from '@growing/svg';

// Otimizar SVG
const optimized = await optimizeSVG('<svg>...</svg>');
// Remove atributos desnecessários, otimiza paths, etc.

// Criar sprite
const sprite = await spriteSVG(['icon1.svg', 'icon2.svg']);
// Resultado: <svg><symbol id="icon1">...</symbol>...</svg>

// Inline SVG
const inline = inlineSVG('icon.svg', { class: 'icon' });
// Resultado: <svg class="icon">...</svg>
```

## Utilitários de Desenvolvimento Web

### growing-dom

Utilitários para manipulação do DOM.

```bash
npm install @growing/dom
```

```javascript
import { query, on, off, ready } from '@growing/dom';

// Seleção de elementos melhorada
const buttons = query('.button');
const firstButton = query('.button', container);

// Eventos simplificados
on(button, 'click', handleClick);
on(document, 'scroll', throttle(handleScroll, 100));

// Remover eventos
off(button, 'click', handleClick);

// DOM ready
ready(() => {
  console.log('DOM está pronto');
});
```

### growing-storage

Utilitários para armazenamento local.

```bash
npm install @growing/storage
```

```javascript
import { localStorage, sessionStorage, cookieStorage } from '@growing/storage';

// Armazenamento local com tipagem
await localStorage.set('user', { id: 1, name: 'João' });
const user = await localStorage.get('user');

// Com expiração
await localStorage.set('token', 'abc123', { expires: '1h' });

// Armazenamento de sessão
await sessionStorage.set('temp-data', data);

// Cookies
await cookieStorage.set('preferences', 'dark-mode', {
  expires: 30, // dias
  secure: true,
  httpOnly: true
});
```

### growing-validation

Utilitários de validação.

```bash
npm install @growing/validation
```

```javascript
import { validate, rules } from '@growing/validation';

// Validação de email
const isValidEmail = validate('user@example.com', rules.email);

// Validação customizada
const schema = {
  name: [rules.required, rules.minLength(2)],
  email: [rules.required, rules.email],
  age: [rules.required, rules.min(18)]
};

const result = validate(formData, schema);
if (!result.valid) {
  console.log('Erros:', result.errors);
}

// Regras customizadas
const customRule = (value) => {
  if (value !== 'especial') {
    return 'Deve ser "especial"';
  }
  return true;
};
```

## Utilitários de Design System

### growing-tokens

Utilitários para design tokens.

```bash
npm install @growing/tokens
```

```javascript
import { createTokens, useTokens, transformTokens } from '@growing/tokens';

// Criar sistema de tokens
const tokens = createTokens({
  colors: {
    primary: '#3366cc',
    secondary: '#6c757d'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
});

// Usar tokens em componentes
const styles = useTokens(tokens, {
  button: {
    backgroundColor: 'colors.primary',
    padding: 'spacing.md'
  }
});

// Transformar para diferentes plataformas
const cssTokens = transformTokens(tokens, 'css');
const scssTokens = transformTokens(tokens, 'scss');
const jsTokens = transformTokens(tokens, 'js');
```

### growing-themes

Utilitários para gerenciamento de temas.

```bash
npm install @growing/themes
```

```javascript
import { createTheme, applyTheme, toggleTheme } from '@growing/themes';

// Criar tema
const lightTheme = createTheme({
  name: 'light',
  colors: {
    background: '#ffffff',
    text: '#333333'
  }
});

const darkTheme = createTheme({
  name: 'dark',
  colors: {
    background: '#1a1a1a',
    text: '#ffffff'
  }
});

// Aplicar tema
applyTheme(lightTheme);

// Alternar entre temas
toggleTheme([lightTheme, darkTheme]);

// Tema baseado no sistema
const systemTheme = createTheme({
  name: 'system',
  colors: {
    background: 'var(--system-background)',
    text: 'var(--system-text)'
  }
});
```

## Utilitários de Acessibilidade

### growing-a11y

Utilitários para acessibilidade.

```bash
npm install @growing/a11y
```

```javascript
import { focusTrap, announce, skipLinks } from '@growing/a11y';

// Focus trap para modais
const modal = document.querySelector('.modal');
const trap = focusTrap(modal);

// Anúncios para screen readers
announce('Item adicionado ao carrinho', 'polite');

// Links de pulo
skipLinks([
  { text: 'Pular para conteúdo principal', target: '#main' },
  { text: 'Pular para navegação', target: '#nav' }
]);
```

## Scripts de Utilitários

### growing-scripts

Scripts automatizados para tarefas comuns.

```bash
npm install --save-dev @growing/scripts
```

```json
// package.json
{
  "scripts": {
    "format": "growing-scripts format",
    "lint:css": "growing-scripts lint-css",
    "optimize-images": "growing-scripts optimize-images",
    "generate-icons": "growing-scripts generate-icons",
    "bump-version": "growing-scripts bump-version"
  }
}
```

#### Comandos Disponíveis

```bash
# Formatação de código
growing-scripts format

# Lint de CSS
growing-scripts lint-css --fix

# Otimização de imagens
growing-scripts optimize-images src/images/ --output dist/images/

# Geração de sprites de ícones
growing-scripts generate-icons src/icons/ --output dist/icons.svg

# Bump de versão
growing-scripts bump-version patch
growing-scripts bump-version minor
growing-scripts bump-version major
```

## Integração com Ferramentas

### Webpack Plugin

```javascript
// webpack.config.js
const { GrowingWebpackPlugin } = require('@growing/webpack-plugin');

module.exports = {
  plugins: [
    new GrowingWebpackPlugin({
      optimize: true,
      analyze: process.env.ANALYZE === 'true'
    })
  ]
};
```

### Vite Plugin

```javascript
// vite.config.js
import { growing } from '@growing/vite-plugin';

export default {
  plugins: [
    growing({
      theme: 'auto',
      optimizeDeps: true
    })
  ]
};
```

### ESLint Plugin

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['@growing/eslint-plugin'],
  extends: ['plugin:@growing/recommended'],
  rules: {
    '@growing/no-unused-classes': 'error',
    '@growing/prefer-design-tokens': 'warn'
  }
};
```

Os utilitários do Growing fornecem ferramentas poderosas para acelerar o desenvolvimento, otimizar performance e manter a qualidade do código, integrando-se perfeitamente ao fluxo de trabalho do sistema.