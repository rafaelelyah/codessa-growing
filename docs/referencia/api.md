# Referência da API

Esta seção contém a documentação das funcionalidades disponíveis no sistema Growing, focando nas ferramentas de desenvolvimento SCSS e Vite.

## Visão Geral

O sistema Growing atualmente oferece:

- **Processamento SCSS**: Através do Vite
- **Arquitetura CSS**: Sprout-Trunk-Leaf
- **Build System**: Vite para desenvolvimento e produção
- **Estrutura de Componentes**: Classes CSS modulares

## API do Vite

### Configuração Básica

```javascript
// vite.config.js
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

### Scripts NPM

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

## API de Componentes SCSS

### Trunks

Componentes CSS finais prontos para uso.

#### Estrutura de um Trunk

```scss
// trunk-button.scss
@use '../sprouts' as *;

.trunk-button {
  @include sprout-button-base;
  @include sprout-button-primary;
  @include sprout-button-medium;

  // Estados
  &:hover {
    @include sprout-button-hover;
  }

  &:disabled {
    @include sprout-button-disabled;
  }
}
```

#### Classes Disponíveis

```scss
// Botões
.trunk-button
.trunk-button--primary
.trunk-button--secondary
.trunk-button--outline

// Tamanhos
.trunk-button--small
.trunk-button--medium
.trunk-button--large

// Estados
.trunk-button--disabled
.trunk-button--loading

// Cards
.trunk-card
.trunk-card--elevated
.trunk-card--outlined

// Formulários
.trunk-input
.trunk-input--error
.trunk-input--success

// Navegação
.trunk-nav
.trunk-nav--horizontal
.trunk-nav--vertical
```

### Sprouts

Construtores de componentes SCSS.

#### Mixins Disponíveis

```scss
// Layout
@include sprout-flex($direction: 'row', $align: 'center', $justify: 'space-between')
@include sprout-grid($columns: 3, $gap: '1rem')
@include sprout-container($max-width: 1200px)

// Tipografia
@include sprout-heading($level: 1, $color: 'primary')
@include sprout-text($size: 'base', $weight: 'normal')

// Espaçamento
@include sprout-spacing('padding', 'md')
@include sprout-spacing('margin', 'lg')

// Cores
@include sprout-color('background', 'primary')
@include sprout-color('text', 'secondary')

// Bordas e Sombras
@include sprout-border('all', 'primary', 1px)
@include sprout-shadow('md')
@include sprout-radius('lg')
```

#### Funções

```scss
// Cores
sprout-color('primary')        // Retorna cor primária
sprout-color('secondary', 'light')  // Retorna variante clara

// Espaçamento
sprout-space('sm')             // Retorna valor de espaço pequeno
sprout-space('md')             // Retorna valor de espaço médio

// Tipografia
sprout-font-size('lg')         // Retorna tamanho de fonte grande
sprout-font-weight('bold')     // Retorna peso de fonte negrito

// Outros
sprout-z-index('modal')        // Retorna z-index para modal
sprout-transition('fast')      // Retorna transição rápida
```

### Leafs

Ajustes pontuais de estilo.

#### Classes Utilitárias

```scss
// Cores
.leaf-text-primary
.leaf-text-secondary
.leaf-bg-primary
.leaf-bg-light

// Espaçamento
.leaf-m-1  // margin: 0.25rem
.leaf-m-2  // margin: 0.5rem
.leaf-p-3  // padding: 0.75rem

// Layout
.leaf-flex
.leaf-block
.leaf-hidden

// Tipografia
.leaf-text-sm
.leaf-text-lg
.leaf-font-bold

// Bordas
.leaf-rounded
.leaf-border
.leaf-shadow
```

## API de Desenvolvimento

### Estrutura de Arquivos

```
src/
├── my-trunks.scss      # Arquivo principal
├── groves/            # Estilos temáticos
├── harvest/           # Componentes específicos
├── sparks/            # Utilitários
└── terrain/           # Arquitetura base
    ├── foundation/
    ├── seeds/
    ├── soils/
    ├── sprouts/
    └── trunks/
```

### Importação de Módulos

```scss
// my-trunks.scss
@use 'terrain/trunks' as *;           // Importa todos os trunks
@use 'terrain/sprouts' as sprouts;    // Importa sprouts com namespace
@use 'terrain/leafs' as leafs;        // Importa leafs com namespace
```

### Desenvolvimento Iterativo

#### Workflow Básico

1. **Configurar**: Iniciar servidor de desenvolvimento
2. **Modificar**: Alterar arquivos SCSS
3. **Visualizar**: Ver mudanças automaticamente
4. **Otimizar**: Usar build para produção

#### Exemplo de Desenvolvimento

```scss
// 1. Importar base
@use 'terrain/trunks' as *;

// 2. Criar componente customizado
.my-button {
  @extend .trunk-button;
  background-color: var(--brand-primary);
  border-radius: var(--radius-lg);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}

// 3. Usar em HTML
<button class="my-button">Botão Customizado</button>
```

## API de Build

### Configurações do Vite

#### Desenvolvimento

```javascript
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',     // Permite acesso externo
    open: true,           // Abre navegador automaticamente
    hmr: true             // Hot Module Replacement
  }
})
```

#### Produção

```javascript
export default defineConfig({
  build: {
    outDir: 'dist',       // Diretório de saída
    sourcemap: true,      // Gera source maps
    minify: 'esbuild',    // Minificação rápida
    target: 'es2015',     // Compatibilidade de browsers
    cssCodeSplit: true    // Divide CSS em chunks
  }
})
```

### Otimizações

#### CSS

```javascript
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Variáveis globais
        additionalData: `@import "src/globals.scss";`
      }
    },

    // Configurações de pós-processamento
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    }
  }
})
```

#### Assets

```javascript
export default defineConfig({
  build: {
    assetsDir: 'assets',     // Diretório para assets
    assetsInlineLimit: 4096, // Inline de assets pequenos
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})
```

## API de Utilitários

### Funções SCSS

#### Matemática

```scss
// Cálculos
sprout-calc(100%, 20px)     // 100% - 20px
sprout-clamp(1rem, 2vw, 2rem)  // clamp(1rem, 2vw, 2rem)

// Unidades
sprout-px-to-rem(16px)      // 1rem (se base = 16px)
sprout-rem-to-px(1rem)      // 16px
```

#### Strings

```scss
// Manipulação
sprout-str-replace('hello world', 'world', 'universe')  // 'hello universe'
sprout-str-upper('hello')     // 'HELLO'
sprout-str-lower('HELLO')     // 'hello'
```

#### Listas

```scss
// Operações
sprout-list-contains((a b c), 'b')  // true
sprout-list-length((a b c))         // 3
sprout-list-nth((a b c), 2)         // b
```

### Debugging

#### Console do Vite

O Vite fornece feedback detalhado:

- Arquivos processados
- Erros de SCSS
- Avisos de otimização
- Tempo de build

#### Source Maps

```javascript
// Habilitar source maps
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

#### DevTools

- **Elements**: Inspecionar estilos aplicados
- **Console**: Ver mensagens de erro
- **Network**: Verificar carregamento de assets
- **Sources**: Debug com source maps

## Limitações Atuais

O sistema Growing atualmente oferece:

- **SCSS Processing**: Processamento avançado de SCSS
- **Component Architecture**: Sistema Sprout-Trunk-Leaf
- **Build System**: Vite com otimizações
- **Utility Classes**: Leafs para ajustes pontuais

**Não inclui:**
- JavaScript Framework
- Web Components
- State Management
- API Client
- Testing Framework

## Próximas Expansões

Conforme o roadmap, futuras versões podem incluir:

- **JavaScript Utilities**: Funções helper
- **Component System**: Web Components
- **State Management**: Store global
- **API Integration**: Cliente HTTP
- **Testing Tools**: Framework de testes

A documentação será atualizada conforme essas funcionalidades forem implementadas.

## Core API

### GrowingComponent

Classe base para todos os componentes Web Components do Growing.

#### Propriedades

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `state` | `Object` | Estado interno do componente |
| `props` | `Object` | Propriedades do componente |
| `shadowRoot` | `ShadowRoot` | Shadow DOM do componente |
| `isConnected` | `boolean` | Se o componente está conectado ao DOM |

#### Métodos

##### Lifecycle Methods

```javascript
connectedCallback(): void
```
Chamado quando o componente é inserido no DOM.

```javascript
disconnectedCallback(): void
```
Chamado quando o componente é removido do DOM.

```javascript
adoptedCallback(): void
```
Chamado quando o componente é movido para um novo documento.

```javascript
attributeChangedCallback(name: string, oldValue: string, newValue: string): void
```
Chamado quando um atributo observado muda.

##### Rendering Methods

```javascript
render(): string
```
Retorna o template HTML do componente.

```javascript
update(): void
```
Atualiza o componente manualmente.

```javascript
requestUpdate(): void
```
Solicita uma atualização do componente.

##### State Management

```javascript
setState(newState: Object): void
```
Atualiza o estado do componente.

```javascript
getState(): Object
```
Retorna o estado atual do componente.

##### Event Handling

```javascript
emit(eventName: string, detail?: any): void
```
Emite um evento customizado.

```javascript
on(eventName: string, handler: Function): void
```
Adiciona um listener de evento.

```javascript
off(eventName: string, handler: Function): void
```
Remove um listener de evento.

#### Exemplo de Uso

```javascript
import { GrowingComponent } from '@growing/core';

class MyComponent extends GrowingComponent {
  static get properties() {
    return {
      title: { type: String, default: 'Título' },
      disabled: { type: Boolean, default: false }
    };
  }

  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Componente conectado!');
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return `
      <div class="my-component">
        <h2>${this.title}</h2>
        <p>Contador: ${this.state.count}</p>
        <button
          @click="${this.increment}"
          ?disabled="${this.disabled}"
        >
          Incrementar
        </button>
      </div>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

### GrowingAPI

Classe para fazer requisições HTTP.

#### Propriedades

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `baseURL` | `string` | URL base para todas as requisições |
| `timeout` | `number` | Timeout em milissegundos |
| `headers` | `Object` | Headers padrão |
| `retries` | `number` | Número de tentativas |

#### Métodos

```javascript
get(url: string, config?: Object): Promise
```
Faz uma requisição GET.

```javascript
post(url: string, data?: any, config?: Object): Promise
```
Faz uma requisição POST.

```javascript
put(url: string, data?: any, config?: Object): Promise
```
Faz uma requisição PUT.

```javascript
patch(url: string, data?: any, config?: Object): Promise
```
Faz uma requisição PATCH.

```javascript
delete(url: string, config?: Object): Promise
```
Faz uma requisição DELETE.

```javascript
request(config: Object): Promise
```
Faz uma requisição customizada.

#### Exemplo de Uso

```javascript
import { GrowingAPI } from '@growing/core';

const api = new GrowingAPI({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer token123'
  }
});

// GET
const users = await api.get('/users');

// POST
const newUser = await api.post('/users', {
  name: 'João',
  email: 'joao@example.com'
});

// Com configuração específica
const result = await api.get('/users', {
  params: { page: 1, limit: 10 },
  headers: { 'Custom-Header': 'value' }
});
```

### GrowingRouter

Sistema de roteamento para SPAs.

#### Propriedades

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `routes` | `Array` | Array de rotas definidas |
| `currentRoute` | `Object` | Rota atual |
| `mode` | `string` | Modo do router ('hash' ou 'history') |

#### Métodos

```javascript
addRoute(route: Object): void
```
Adiciona uma nova rota.

```javascript
navigate(path: string, params?: Object): void
```
Navega para uma rota.

```javascript
back(): void
```
Volta para a rota anterior.

```javascript
forward(): void
```
Avança para a próxima rota.

```javascript
getParams(): Object
```
Retorna os parâmetros da rota atual.

```javascript
getQuery(): Object
```
Retorna os query parameters da rota atual.

#### Exemplo de Uso

```javascript
import { GrowingRouter } from '@growing/core';

const router = new GrowingRouter({
  mode: 'history',
  routes: [
    { path: '/', component: 'home-page' },
    { path: '/users', component: 'users-list' },
    { path: '/users/:id', component: 'user-detail' },
    { path: '/404', component: 'not-found' }
  ]
});

// Navegação
router.navigate('/users/123');

// Com parâmetros
router.navigate('/users', { filter: 'active' });

// Ouvir mudanças de rota
router.on('route-changed', (route) => {
  console.log('Nova rota:', route.path);
});
```

### GrowingStore

Sistema de gerenciamento de estado global.

#### Propriedades

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `state` | `Object` | Estado global da aplicação |
| `getters` | `Object` | Getters computados |
| `mutations` | `Object` | Funções que modificam o estado |
| `actions` | `Object` | Actions assíncronas |

#### Métodos

```javascript
commit(mutationName: string, payload?: any): void
```
Executa uma mutation.

```javascript
dispatch(actionName: string, payload?: any): Promise
```
Executa uma action.

```javascript
subscribe(callback: Function): Function
```
Inscreve um callback para mudanças de estado.

```javascript
getState(): Object
```
Retorna o estado atual.

```javascript
reset(): void
```
Reseta o estado para o inicial.

#### Exemplo de Uso

```javascript
import { GrowingStore } from '@growing/core';

const store = new GrowingStore({
  state: {
    user: null,
    todos: []
  },

  getters: {
    completedTodos: (state) => state.todos.filter(todo => todo.completed),
    userName: (state) => state.user?.name || 'Anônimo'
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    }
  },

  actions: {
    async login({ commit }, credentials) {
      const user = await api.post('/login', credentials);
      commit('SET_USER', user);
    },

    async fetchTodos({ commit }) {
      const todos = await api.get('/todos');
      commit('SET_TODOS', todos);
    }
  }
});

// Uso em componentes
class TodoApp extends GrowingComponent {
  connectedCallback() {
    super.connectedCallback();

    // Inscrever para mudanças
    this.unsubscribe = store.subscribe(() => {
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  async loadTodos() {
    await store.dispatch('fetchTodos');
  }

  render() {
    const todos = store.getters.completedTodos;

    return `
      <div>
        <h1>Todos (${todos.length})</h1>
        <button @click="${this.loadTodos}">Carregar</button>
        ${todos.map(todo => `<div>${todo.title}</div>`).join('')}
      </div>
    `;
  }
}
```

## Componentes

### Trunks

Componentes finais prontos para uso.

#### Button Trunk

```javascript
// trunk-button.js
import { GrowingComponent } from '@growing/core';

class TrunkButton extends GrowingComponent {
  static get properties() {
    return {
      variant: { type: String, default: 'primary' },
      size: { type: String, default: 'medium' },
      disabled: { type: Boolean, default: false },
      loading: { type: Boolean, default: false }
    };
  }

  render() {
    const classes = [
      'trunk-button',
      `trunk-button--${this.variant}`,
      `trunk-button--${this.size}`,
      this.disabled && 'trunk-button--disabled',
      this.loading && 'trunk-button--loading'
    ].filter(Boolean).join(' ');

    return `
      <button class="${classes}" ?disabled="${this.disabled}">
        ${this.loading ? '<loading-spinner></loading-spinner>' : ''}
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('trunk-button', TrunkButton);
```

#### Card Trunk

```javascript
// trunk-card.js
import { GrowingComponent } from '@growing/core';

class TrunkCard extends GrowingComponent {
  static get properties() {
    return {
      title: { type: String },
      subtitle: { type: String },
      image: { type: String },
      interactive: { type: Boolean, default: false }
    };
  }

  render() {
    return `
      <div class="trunk-card ${this.interactive ? 'trunk-card--interactive' : ''}">
        ${this.image ? `<img src="${this.image}" alt="${this.title}" class="trunk-card__image">` : ''}
        <div class="trunk-card__content">
          ${this.title ? `<h3 class="trunk-card__title">${this.title}</h3>` : ''}
          ${this.subtitle ? `<p class="trunk-card__subtitle">${this.subtitle}</p>` : ''}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('trunk-card', TrunkCard);
```

### Sprouts

Construtores de componentes.

#### Button Sprout

```javascript
// sprout-button.js
export function createButtonSprout(options = {}) {
  const {
    baseClass = 'sprout-button',
    variants = ['primary', 'secondary', 'outline'],
    sizes = ['small', 'medium', 'large']
  } = options;

  return {
    class: baseClass,

    variants: variants.reduce((acc, variant) => {
      acc[variant] = `${baseClass}--${variant}`;
      return acc;
    }, {}),

    sizes: sizes.reduce((acc, size) => {
      acc[size] = `${baseClass}--${size}`;
      return acc;
    }, {}),

    states: {
      disabled: `${baseClass}--disabled`,
      loading: `${baseClass}--loading`,
      active: `${baseClass}--active`
    },

    create(props = {}) {
      const {
        variant = 'primary',
        size = 'medium',
        disabled = false,
        loading = false,
        children = ''
      } = props;

      const classes = [
        this.class,
        this.variants[variant],
        this.sizes[size],
        disabled && this.states.disabled,
        loading && this.states.loading
      ].filter(Boolean).join(' ');

      return `
        <button class="${classes}" ${disabled ? 'disabled' : ''}>
          ${loading ? '<loading-spinner></loading-spinner>' : ''}
          ${children}
        </button>
      `;
    }
  };
}
```

#### Form Sprout

```javascript
// sprout-form.js
export function createFormSprout(options = {}) {
  const {
    baseClass = 'sprout-form',
    validation = true,
    asyncValidation = false
  } = options;

  return {
    class: baseClass,

    createField(type, props = {}) {
      const {
        name,
        label,
        placeholder,
        required = false,
        value = '',
        error = ''
      } = props;

      const fieldId = `field-${name}`;
      const classes = [
        `${baseClass}__field`,
        error && `${baseClass}__field--error`
      ].filter(Boolean).join(' ');

      return `
        <div class="${classes}">
          ${label ? `<label for="${fieldId}" class="${baseClass}__label">${label}</label>` : ''}
          <input
            type="${type}"
            id="${fieldId}"
            name="${name}"
            placeholder="${placeholder}"
            value="${value}"
            ${required ? 'required' : ''}
            class="${baseClass}__input"
          >
          ${error ? `<span class="${baseClass}__error">${error}</span>` : ''}
        </div>
      `;
    },

    createForm(fields, props = {}) {
      const { action = '', method = 'post', onSubmit } = props;

      return `
        <form
          action="${action}"
          method="${method}"
          class="${baseClass}"
          @submit="${onSubmit}"
        >
          ${fields.map(field => this.createField(field.type, field)).join('')}
          <button type="submit" class="${baseClass}__submit">Enviar</button>
        </form>
      `;
    }
  };
}
```

### Leafs

Ajustes pontuais de estilo.

#### Color Leafs

```javascript
// leaf-colors.scss
@use 'core/tokens' as tokens;

.leaf-text-primary {
  color: tokens.$color-primary;
}

.leaf-text-secondary {
  color: tokens.$color-secondary;
}

.leaf-text-success {
  color: tokens.$color-success;
}

.leaf-text-warning {
  color: tokens.$color-warning;
}

.leaf-text-error {
  color: tokens.$color-error;
}

.leaf-bg-primary {
  background-color: tokens.$color-primary;
}

.leaf-bg-secondary {
  background-color: tokens.$color-secondary;
}

.leaf-bg-light {
  background-color: tokens.$color-light;
}

.leaf-bg-dark {
  background-color: tokens.$color-dark;
}
```

#### Spacing Leafs

```javascript
// leaf-spacing.scss
@use 'core/tokens' as tokens;

.leaf-m-0 { margin: 0; }
.leaf-m-1 { margin: tokens.$spacing-xs; }
.leaf-m-2 { margin: tokens.$spacing-sm; }
.leaf-m-3 { margin: tokens.$spacing-md; }
.leaf-m-4 { margin: tokens.$spacing-lg; }
.leaf-m-5 { margin: tokens.$spacing-xl; }

.leaf-p-0 { padding: 0; }
.leaf-p-1 { padding: tokens.$spacing-xs; }
.leaf-p-2 { padding: tokens.$spacing-sm; }
.leaf-p-3 { padding: tokens.$spacing-md; }
.leaf-p-4 { padding: tokens.$spacing-lg; }
.leaf-p-5 { padding: tokens.$spacing-xl; }

// Directional spacing
.leaf-mt-1 { margin-top: tokens.$spacing-xs; }
.leaf-mr-1 { margin-right: tokens.$spacing-xs; }
.leaf-mb-1 { margin-bottom: tokens.$spacing-xs; }
.leaf-ml-1 { margin-left: tokens.$spacing-xs; }

.leaf-pt-1 { padding-top: tokens.$spacing-xs; }
.leaf-pr-1 { padding-right: tokens.$spacing-xs; }
.leaf-pb-1 { padding-bottom: tokens.$spacing-xs; }
.leaf-pl-1 { padding-left: tokens.$spacing-xs; }
```

#### Typography Leafs

```javascript
// leaf-typography.scss
@use 'core/tokens' as tokens;

.leaf-text-xs { font-size: tokens.$font-size-xs; }
.leaf-text-sm { font-size: tokens.$font-size-sm; }
.leaf-text-base { font-size: tokens.$font-size-base; }
.leaf-text-lg { font-size: tokens.$font-size-lg; }
.leaf-text-xl { font-size: tokens.$font-size-xl; }

.leaf-font-light { font-weight: tokens.$font-weight-light; }
.leaf-font-normal { font-weight: tokens.$font-weight-normal; }
.leaf-font-medium { font-weight: tokens.$font-weight-medium; }
.leaf-font-bold { font-weight: tokens.$font-weight-bold; }

.leaf-text-left { text-align: left; }
.leaf-text-center { text-align: center; }
.leaf-text-right { text-align: right; }

.leaf-text-uppercase { text-transform: uppercase; }
.leaf-text-lowercase { text-transform: lowercase; }
.leaf-text-capitalize { text-transform: capitalize; }
```

## Utilitários

### Utils

Funções utilitárias gerais.

#### DOM Utils

```javascript
// utils/dom.js
export function $(selector, context = document) {
  return context.querySelector(selector);
}

export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

export function createElement(tag, props = {}, children = []) {
  const element = document.createElement(tag);

  // Set properties
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  // Add children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}

export function addClass(element, className) {
  element.classList.add(className);
}

export function removeClass(element, className) {
  element.classList.remove(className);
}

export function toggleClass(element, className) {
  element.classList.toggle(className);
}

export function hasClass(element, className) {
  return element.classList.contains(className);
}
```

#### String Utils

```javascript
// utils/string.js
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCase(str) {
  return str.replace(/[-_](.)/g, (_, letter) => letter.toUpperCase());
}

export function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function snakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function truncate(str, length = 100, suffix = '...') {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

#### Array Utils

```javascript
// utils/array.js
export function unique(arr) {
  return [...new Set(arr)];
}

export function flatten(arr) {
  return arr.reduce((flat, item) =>
    flat.concat(Array.isArray(item) ? flatten(item) : item), []);
}

export function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
}

export function sortBy(arr, key, order = 'asc') {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (order === 'desc') {
      return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
    }

    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
  });
}
```

### Helpers

Funções auxiliares específicas.

#### Date Helpers

```javascript
// helpers/date.js
export function formatDate(date, format = 'DD/MM/YYYY') {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return d.toLocaleDateString();
  }
}

export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = now - past;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `${minutes}min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days < 7) return `${days}d atrás`;

  return formatDate(date);
}

export function isToday(date) {
  const today = new Date();
  const d = new Date(date);
  return d.toDateString() === today.toDateString();
}

export function isYesterday(date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  return d.toDateString() === yesterday.toDateString();
}
```

#### Form Helpers

```javascript
// helpers/form.js
export function serializeForm(form) {
  const data = new FormData(form);
  const result = {};

  for (let [key, value] of data.entries()) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) return false;

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Calcular primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  if (digit !== parseInt(cpf[9])) return false;

  // Calcular segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  if (digit !== parseInt(cpf[10])) return false;

  return true;
}

export function formatCurrency(value, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);
}
```

### Validators

Funções de validação.

#### Base Validators

```javascript
// validators/base.js
export function required(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value != null;
}

export function minLength(min) {
  return (value) => {
    if (!value) return true;
    return String(value).length >= min;
  };
}

export function maxLength(max) {
  return (value) => {
    if (!value) return true;
    return String(value).length <= max;
  };
}

export function min(min) {
  return (value) => {
    if (!value) return true;
    const num = Number(value);
    return !isNaN(num) && num >= min;
  };
}

export function max(max) {
  return (value) => {
    if (!value) return true;
    const num = Number(value);
    return !isNaN(num) && num <= max;
  };
}

export function pattern(regex) {
  return (value) => {
    if (!value) return true;
    return regex.test(String(value));
  };
}
```

#### Custom Validators

```javascript
// validators/custom.js
export function email(value) {
  if (!value) return true;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

export function url(value) {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function cpf(value) {
  if (!value) return true;

  const cpf = value.replace(/[^\d]/g, '');

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  if (digit !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  if (digit !== parseInt(cpf[10])) return false;

  return true;
}

export function phone(value) {
  if (!value) return true;
  const phone = value.replace(/[^\d]/g, '');
  return phone.length >= 10 && phone.length <= 11;
}

export function cep(value) {
  if (!value) return true;
  const cep = value.replace(/[^\d]/g, '');
  return cep.length === 8;
}
```

## Plugins

### Plugin System

Sistema de plugins do Growing.

#### Plugin Interface

```javascript
// plugin-interface.js
export class GrowingPlugin {
  constructor(options = {}) {
    this.options = options;
    this.name = 'base-plugin';
  }

  // Lifecycle hooks
  beforeInit(app) {}
  afterInit(app) {}
  beforeBuild(config) {}
  afterBuild(result) {}
  beforeServe(server) {}
  afterServe(server) {}

  // Custom methods
  apply(app) {
    this.beforeInit(app);
    // Plugin logic here
    this.afterInit(app);
  }
}
```

#### Plugin Manager

```javascript
// plugin-manager.js
export class PluginManager {
  constructor() {
    this.plugins = [];
  }

  register(plugin) {
    this.plugins.push(plugin);
  }

  unregister(pluginName) {
    this.plugins = this.plugins.filter(p => p.name !== pluginName);
  }

  apply(app) {
    this.plugins.forEach(plugin => {
      plugin.apply(app);
    });
  }

  get(pluginName) {
    return this.plugins.find(p => p.name === pluginName);
  }

  list() {
    return this.plugins.map(p => ({
      name: p.name,
      version: p.version,
      description: p.description
    }));
  }
}
```

### Built-in Plugins

#### PWA Plugin

```javascript
// plugins/pwa.js
import { GrowingPlugin } from '../plugin-system';

export class PWAPlugin extends GrowingPlugin {
  constructor(options = {}) {
    super(options);
    this.name = 'pwa';
    this.version = '1.0.0';
    this.description = 'Progressive Web App support';
  }

  beforeBuild(config) {
    // Add PWA assets to build
    config.build.assets.push({
      from: 'public/manifest.json',
      to: 'manifest.json'
    });

    config.build.assets.push({
      from: 'public/sw.js',
      to: 'sw.js'
    });
  }

  afterBuild(result) {
    // Generate service worker
    this.generateServiceWorker(result.outDir);
  }

  generateServiceWorker(outDir) {
    const swContent = `
      const CACHE_NAME = 'growing-pwa-v1';
      const urlsToCache = [
        '/',
        '/static/css/main.css',
        '/static/js/main.js',
        '/manifest.json'
      ];

      self.addEventListener('install', (event) => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
        );
      });

      self.addEventListener('fetch', (event) => {
        event.respondWith(
          caches.match(event.request)
            .then((response) => {
              if (response) {
                return response;
              }
              return fetch(event.request);
            }
          )
        );
      });
    `;

    // Write service worker file
    // Implementation depends on build system
  }
}
```

#### Analytics Plugin

```javascript
// plugins/analytics.js
import { GrowingPlugin } from '../plugin-system';

export class AnalyticsPlugin extends GrowingPlugin {
  constructor(options = {}) {
    super(options);
    this.name = 'analytics';
    this.version = '1.0.0';
    this.description = 'Analytics and tracking support';
  }

  afterInit(app) {
    // Initialize analytics
    this.initAnalytics();

    // Track page views
    this.trackPageView();

    // Track user interactions
    this.trackInteractions();
  }

  initAnalytics() {
    // Google Analytics example
    if (this.options.gaTrackingId) {
      // Load GA script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.options.gaTrackingId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', this.options.gaTrackingId);
    }
  }

  trackPageView() {
    // Track initial page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  trackInteractions() {
    // Track button clicks
    document.addEventListener('click', (event) => {
      const button = event.target.closest('button, [role="button"]');
      if (button && window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'engagement',
          event_label: button.textContent || button.getAttribute('aria-label')
        });
      }
    });
  }
}
```

## Eventos

### Lifecycle Events

Eventos do ciclo de vida dos componentes.

#### Component Events

```javascript
// Component lifecycle events
const componentEvents = {
  // Quando componente é criado
  'component-created': (component) => {
    console.log('Componente criado:', component.tagName);
  },

  // Quando componente é conectado ao DOM
  'component-connected': (component) => {
    console.log('Componente conectado:', component.tagName);
  },

  // Quando componente é desconectado do DOM
  'component-disconnected': (component) => {
    console.log('Componente desconectado:', component.tagName);
  },

  // Quando componente é adotado por outro documento
  'component-adopted': (component) => {
    console.log('Componente adotado:', component.tagName);
  },

  // Quando propriedades do componente mudam
  'component-props-changed': (component, changedProps) => {
    console.log('Propriedades mudaram:', changedProps);
  },

  // Quando estado do componente muda
  'component-state-changed': (component, newState, oldState) => {
    console.log('Estado mudou:', { newState, oldState });
  }
};
```

#### Application Events

```javascript
// Application lifecycle events
const appEvents = {
  // Quando aplicação inicia
  'app-init': (app) => {
    console.log('Aplicação iniciando...');
  },

  // Quando aplicação está pronta
  'app-ready': (app) => {
    console.log('Aplicação pronta!');
  },

  // Quando aplicação é destruída
  'app-destroy': (app) => {
    console.log('Aplicação destruída');
  },

  // Quando rota muda
  'route-changed': (route) => {
    console.log('Rota mudou:', route.path);
  },

  // Quando erro ocorre
  'error-occurred': (error) => {
    console.error('Erro:', error);
  }
};
```

### Custom Events

Eventos customizados do sistema.

#### Form Events

```javascript
// Form events
class FormComponent extends GrowingComponent {
  submitForm(event) {
    event.preventDefault();

    // Emit success event
    this.emit('form-submit', {
      data: this.serializeForm(),
      timestamp: Date.now()
    });
  }

  validateField(fieldName, value) {
    const isValid = this.validate(value);

    // Emit validation event
    this.emit('field-validated', {
      field: fieldName,
      value,
      isValid,
      errors: isValid ? [] : this.getErrors(value)
    });

    return isValid;
  }

  onValidationSuccess(event) {
    console.log('Campo válido:', event.detail);
  }

  onValidationError(event) {
    console.log('Campo inválido:', event.detail);
  }

  connectedCallback() {
    super.connectedCallback();

    // Listen to validation events
    this.on('field-validated', (event) => {
      if (event.detail.isValid) {
        this.onValidationSuccess(event);
      } else {
        this.onValidationError(event);
      }
    });
  }
}
```

#### Data Events

```javascript
// Data loading events
class DataComponent extends GrowingComponent {
  async loadData() {
    // Emit loading start event
    this.emit('data-loading', { source: 'api' });

    try {
      const data = await this.fetchData();

      // Emit success event
      this.emit('data-loaded', {
        data,
        count: data.length,
        timestamp: Date.now()
      });

    } catch (error) {
      // Emit error event
      this.emit('data-error', {
        error: error.message,
        source: 'api',
        timestamp: Date.now()
      });
    }
  }

  onDataLoaded(event) {
    console.log('Dados carregados:', event.detail.count, 'itens');
    this.requestUpdate();
  }

  onDataError(event) {
    console.error('Erro ao carregar dados:', event.detail.error);
    this.showError(event.detail.error);
  }

  connectedCallback() {
    super.connectedCallback();

    // Listen to data events
    this.on('data-loaded', this.onDataLoaded.bind(this));
    this.on('data-error', this.onDataError.bind(this));
  }
}
```

## Tipos

### Type Definitions

Definições de tipos TypeScript.

#### Core Types

```typescript
// types/core.ts
export interface GrowingComponent {
  state: Record<string, any>;
  props: Record<string, any>;
  shadowRoot: ShadowRoot | null;
  isConnected: boolean;

  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
  render(): string;
  update(): void;
  requestUpdate(): void;
  setState(newState: Partial<Record<string, any>>): void;
  getState(): Record<string, any>;
  emit(eventName: string, detail?: any): void;
  on(eventName: string, handler: Function): void;
  off(eventName: string, handler: Function): void;
}

export interface ComponentConfig {
  properties?: Record<string, PropertyConfig>;
  observedAttributes?: string[];
  shadowMode?: 'open' | 'closed';
  cssScope?: 'isolated' | 'global';
}

export interface PropertyConfig {
  type: StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor | ArrayConstructor;
  default?: any;
  reflect?: boolean;
  attribute?: string;
}
```

#### API Types

```typescript
// types/api.ts
export interface APIConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
  withCredentials?: boolean;
}

export interface APIResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: APIRequestConfig;
}

export interface APIRequestConfig extends APIConfig {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, any>;
  data?: any;
}

export interface APIError {
  message: string;
  status?: number;
  response?: APIResponse;
  config: APIRequestConfig;
}
```

#### Router Types

```typescript
// types/router.ts
export interface Route {
  path: string;
  component?: string;
  redirect?: string;
  children?: Route[];
  meta?: Record<string, any>;
  beforeEnter?: RouteGuard;
  beforeLeave?: RouteGuard;
}

export interface RouteGuard {
  (to: RouteLocation, from: RouteLocation): boolean | Promise<boolean>;
}

export interface RouteLocation {
  path: string;
  params: Record<string, string>;
  query: Record<string, string>;
  hash: string;
  meta?: Record<string, any>;
}

export interface RouterConfig {
  mode?: 'hash' | 'history';
  routes: Route[];
  base?: string;
  scrollBehavior?: ScrollBehavior;
}

export interface RouterInstance {
  currentRoute: RouteLocation;
  push(path: string, params?: Record<string, any>): void;
  replace(path: string, params?: Record<string, any>): void;
  back(): void;
  forward(): void;
  go(delta: number): void;
  on(event: string, handler: Function): void;
  off(event: string, handler: Function): void;
}
```

### Interfaces

Interfaces principais do sistema.

#### Component Interface

```typescript
// interfaces/component.ts
export interface IComponent {
  readonly tagName: string;
  readonly isConnected: boolean;

  connectedCallback(): void;
  disconnectedCallback(): void;
  adoptedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;

  render(): string | TemplateResult;
  update(): void;
  requestUpdate(): void;

  setState(state: Record<string, any>): void;
  getState(): Record<string, any>;

  emit(eventName: string, detail?: any): boolean;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

export interface IStatefulComponent extends IComponent {
  state: Record<string, any>;
  setState(state: Partial<Record<string, any>>): void;
  subscribe(callback: (state: Record<string, any>) => void): () => void;
}

export interface IPropsComponent extends IComponent {
  props: Record<string, any>;
  setProps(props: Partial<Record<string, any>>): void;
}
```

#### Plugin Interface

```typescript
// interfaces/plugin.ts
export interface IPlugin {
  readonly name: string;
  readonly version: string;
  readonly description?: string;

  apply(app: IApplication): void;
  destroy?(): void;
}

export interface IPluginManager {
  register(plugin: IPlugin): void;
  unregister(name: string): void;
  get(name: string): IPlugin | undefined;
  list(): IPlugin[];
  apply(app: IApplication): void;
}

export interface IApplication {
  readonly version: string;
  readonly config: Record<string, any>;

  use(plugin: IPlugin): IApplication;
  mount(element?: Element): void;
  unmount(): void;
  destroy(): void;
}
```

#### Store Interface

```typescript
// interfaces/store.ts
export interface IStore<S = any> {
  readonly state: S;

  commit(mutation: string, payload?: any): void;
  dispatch(action: string, payload?: any): Promise<any>;
  subscribe(callback: (mutation: string, state: S) => void): () => void;
  replaceState(state: S): void;
  reset(): void;
}

export interface IStoreConfig<S = any> {
  state: S;
  getters?: Record<string, (state: S, getters: any) => any>;
  mutations?: Record<string, (state: S, payload?: any) => void>;
  actions?: Record<string, (context: IActionContext<S>, payload?: any) => any>;
  modules?: Record<string, IStoreConfig>;
}

export interface IActionContext<S = any> {
  state: S;
  getters: Record<string, any>;
  commit: (mutation: string, payload?: any) => void;
  dispatch: (action: string, payload?: any) => Promise<any>;
}
```

Esta documentação da API fornece uma visão completa das funcionalidades disponíveis no sistema Growing, incluindo classes, métodos, propriedades, eventos e tipos. Use esta referência como guia para desenvolver aplicações e componentes com o framework.