# Melhores Práticas

Este guia apresenta as melhores práticas para desenvolver com o sistema Growing, garantindo código de qualidade, performance e manutenibilidade.

## Princípios Gerais

### 1. Seguir a Arquitetura Sprout-Trunk-Leaf

```scss
// ✅ BOM: Seguir a arquitetura corretamente
// 1. Criar Sprout (construtor)
.sprout-button-primary {
  @include sprout-button((
    'background': var(--interactive-primary),
    'color': var(--text-on-primary)
  ));
}

// 2. Adaptar no Tree (desenvolvimento)
.main-button {
  @extend .sprout-button-primary;
  font-weight: 600;
}

// 3. Aplicar Leafs (ajustes pontuais)
<button class="main-button leaf-rounded-lg">Botão</button>
```

```scss
// ❌ RUIM: Misturar responsabilidades
.button-custom {
  // Misturando Sprout, Tree e Leaf
  background: var(--interactive-primary);
  color: var(--text-on-primary);
  font-weight: 600;
  border-radius: var(--radius-lg);
}
```

### 2. Manter Separação de Responsabilidades

```javascript
// ✅ BOM: Componente focado em uma responsabilidade
class UserCard extends GrowingComponent {
  render() {
    return `
      <div class="user-card">
        <img src="${this.user.avatar}" alt="${this.user.name}">
        <h3>${this.user.name}</h3>
        <p>${this.user.email}</p>
      </div>
    `;
  }
}
```

```javascript
// ❌ RUIM: Componente fazendo muitas coisas
class UserManager extends GrowingComponent {
  async loadUsers() { /* ... */ }
  renderUserList() { /* ... */ }
  handleUserDelete() { /* ... */ }
  validateUserData() { /* ... */ }
  exportUsers() { /* ... */ }
  // ... muitas responsabilidades
}
```

### 3. Usar Convenções de Nomenclatura Consistentes

```scss
// ✅ BOM: Convenções consistentes
.sprout-button-primary     // Sprouts: sprout-[component]-[variant]
.main-button              // Tree: [context]-[component]
.leaf-bg-primary          // Leafs: leaf-[property]-[value]
```

```scss
// ❌ RUIM: Convenções inconsistentes
.primaryBtn              // Abreviações
.btn_main                // Underscore
.leafPrimaryBg           // camelCase
```

## Boas Práticas de CSS/SCSS

### 1. Organizar Arquivos por Responsabilidade

```
styles/
├── core/           # Configurações base
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── sprouts/        # Construtores
│   ├── _button.scss
│   ├── _card.scss
│   └── _form.scss
├── trees/          # Desenvolvimento
│   ├── _main.scss
│   ├── _dashboard.scss
│   └── _auth.scss
├── leafs/          # Ajustes pontuais
│   ├── _colors.scss
│   ├── _spacing.scss
│   └── _typography.scss
└── main.scss       # Arquivo principal
```

### 2. Usar Variáveis CSS Customizadas

```scss
// ✅ BOM: Usar variáveis CSS
:root {
  --color-primary: #3366cc;
  --color-secondary: #6c757d;
  --space-sm: 8px;
  --space-md: 16px;
  --radius-md: 8px;
}

.button {
  background-color: var(--color-primary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
}
```

```scss
// ❌ RUIM: Valores hardcoded
.button {
  background-color: #3366cc;
  padding: 8px 16px;
  border-radius: 8px;
}
```

### 3. Evitar Seletor Universal

```scss
// ✅ BOM: Seletor específico
.card-content {
  padding: var(--space-md);
}

// ❌ RUIM: Seletor universal
* {
  box-sizing: border-box;
}
```

### 4. Usar BEM ou Convenção Similar

```scss
// ✅ BOM: BEM methodology
.card {
  &__header {
    padding: var(--space-md);

    &--large {
      padding: var(--space-lg);
    }
  }

  &__body {
    padding: var(--space-md);
  }

  &__footer {
    padding: var(--space-md);
    border-top: 1px solid var(--border-light);
  }

  &--featured {
    box-shadow: var(--shadow-lg);
  }
}
```

### 5. Otimizar para Performance

```scss
// ✅ BOM: Propriedades animáveis
.button {
  transition: color 0.2s ease, background-color 0.2s ease;
}

// ❌ RUIM: Todas as propriedades
.button {
  transition: all 0.2s ease;
}
```

## Boas Práticas de JavaScript

### 1. Usar Classes ES6

```javascript
// ✅ BOM: Classe ES6
class Button extends GrowingComponent {
  static get properties() {
    return {
      variant: { type: String, default: 'primary' },
      disabled: { type: Boolean, default: false }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
  }

  handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('button-click'));
    }
  }

  render() {
    return `<button class="trunk-button" ?disabled="${this.disabled}"><slot></slot></button>`;
  }
}
```

### 2. Implementar Lifecycle Methods Corretamente

```javascript
class DataTable extends GrowingComponent {
  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Cleanup
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('data')) {
      this.renderTable();
    }
  }
}
```

### 3. Gerenciar Estado Eficientemente

```javascript
// ✅ BOM: Estado local
class Counter extends GrowingComponent {
  static get properties() {
    return {
      count: { type: Number, default: 0 }
    };
  }

  increment() {
    this.count++;
    this.requestUpdate();
  }
}
```

```javascript
// ✅ BOM: Estado global com store
import { userStore } from '../store/userStore';

class UserProfile extends GrowingComponent {
  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = userStore.subscribe(() => {
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }
}
```

### 4. Tratar Erros Apropriadamente

```javascript
// ✅ BOM: Tratamento de erros
class ApiService extends GrowingComponent {
  async fetchData() {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      this.dispatchEvent(new CustomEvent('error', { detail: error }));
      throw error;
    }
  }
}
```

### 5. Usar Memoização Quando Apropriado

```javascript
import { memoize } from '@growing/utils';

class ExpensiveComponent extends GrowingComponent {
  constructor() {
    super();
    this.expensiveCalculation = memoize(this.expensiveCalculation.bind(this));
  }

  expensiveCalculation(n) {
    // Cálculo custoso
    return n * 2; // Exemplo simplificado
  }
}
```

## Boas Práticas de Componentes

### 1. Criar Componentes Reutilizáveis

```javascript
// ✅ BOM: Componente reutilizável
class IconButton extends GrowingComponent {
  static get properties() {
    return {
      icon: { type: String },
      variant: { type: String, default: 'primary' },
      size: { type: String, default: 'medium' }
    };
  }

  render() {
    return `
      <button class="icon-button icon-button--${this.variant} icon-button--${this.size}">
        <svg class="icon">
          <use href="#icon-${this.icon}"></use>
        </svg>
        <slot></slot>
      </button>
    `;
  }
}

// Uso em diferentes contextos
<app-icon-button icon="edit" variant="secondary">Editar</app-icon-button>
<app-icon-button icon="delete" variant="danger">Excluir</app-icon-button>
```

### 2. Implementar Acessibilidade

```javascript
// ✅ BOM: Component acessível
class Modal extends GrowingComponent {
  static get properties() {
    return {
      open: { type: Boolean, default: false },
      title: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.showModal();
      } else {
        this.hideModal();
      }
    }
  }

  showModal() {
    document.addEventListener('keydown', this.handleKeyDown);
    this.focusTrap = createFocusTrap(this.shadowRoot);
    this.focusTrap.activate();
    this.setAttribute('aria-hidden', 'false');
  }

  hideModal() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.focusTrap) {
      this.focusTrap.deactivate();
    }
    this.setAttribute('aria-hidden', 'true');
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.open = false;
    }
  }

  render() {
    return `
      <div class="modal-overlay" ?hidden="${!this.open}">
        <div class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <header class="modal-header">
            <h2 id="modal-title">${this.title}</h2>
            <button @click="${() => this.open = false}" aria-label="Fechar">
              <svg><use href="#icon-close"></use></svg>
            </button>
          </header>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
```

### 3. Documentar Componentes

```javascript
/**
 * Componente de botão reutilizável
 * @extends GrowingComponent
 *
 * @property {string} variant - Variante visual (primary, secondary, danger)
 * @property {string} size - Tamanho (small, medium, large)
 * @property {boolean} disabled - Se o botão está desabilitado
 * @property {boolean} loading - Se está em estado de carregamento
 *
 * @fires button-click - Disparado quando o botão é clicado
 *
 * @example
 * <app-button variant="primary" @button-click="handleClick">
 *   Clique aqui
 * </app-button>
 */
class Button extends GrowingComponent {
  // ...
}
```

## Boas Práticas de Performance

### 1. Lazy Loading

```javascript
// ✅ BOM: Lazy loading de componentes
const LazyComponent = lazyLoad(() => import('./HeavyComponent'));

class Page extends GrowingComponent {
  render() {
    return `
      <div>
        <app-light-component></app-light-component>
        ${this.showHeavy ? '<lazy-component></lazy-component>' : ''}
      </div>
    `;
  }
}
```

### 2. Virtual Scrolling

```javascript
// ✅ BOM: Virtual scrolling para listas grandes
class VirtualList extends GrowingComponent {
  static get properties() {
    return {
      items: { type: Array },
      itemHeight: { type: Number, default: 50 }
    };
  }

  get visibleItems() {
    const scrollTop = this.scrollTop || 0;
    const start = Math.floor(scrollTop / this.itemHeight);
    const visibleCount = Math.ceil(this.clientHeight / this.itemHeight);

    return {
      items: this.items.slice(start, start + visibleCount),
      offset: start * this.itemHeight
    };
  }

  render() {
    const { items, offset } = this.visibleItems;

    return `
      <div class="virtual-list" style="height: ${this.items.length * this.itemHeight}px">
        <div class="virtual-items" style="transform: translateY(${offset}px)">
          ${items.map(item => `<div class="item">${item}</div>`).join('')}
        </div>
      </div>
    `;
  }
}
```

### 3. Otimização de Re-renders

```javascript
// ✅ BOM: shouldUpdate para controle fino
class OptimizedComponent extends GrowingComponent {
  shouldUpdate(changedProperties) {
    // Só atualizar se propriedades relevantes mudaram
    return changedProperties.has('data') || changedProperties.has('visible');
  }

  update(changedProperties) {
    super.update(changedProperties);

    // Otimizações específicas
    if (changedProperties.has('data')) {
      this.updateData();
    }
  }
}
```

### 4. Code Splitting

```javascript
// ✅ BOM: Code splitting por rotas
const routes = {
  '/': () => import('./pages/Home'),
  '/dashboard': () => import('./pages/Dashboard'),
  '/settings': () => import('./pages/Settings')
};

class Router extends GrowingComponent {
  async loadRoute(path) {
    const pageModule = await routes[path]();
    const pageComponent = pageModule.default;

    this.currentPage = new pageComponent();
    this.requestUpdate();
  }
}
```

## Boas Práticas de Testes

### 1. Testar Comportamentos, Não Implementação

```javascript
// ✅ BOM: Testar comportamento
describe('Button', () => {
  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const button = render('<app-button>Click me</app-button>');

    button.addEventListener('click', onClick);
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
```

```javascript
// ❌ RUIM: Testar implementação
describe('Button', () => {
  it('has correct internal state', () => {
    const button = render('<app-button>Click me</app-button>');

    expect(button._internalState).toBe('ready');
  });
});
```

### 2. Usar Page Objects

```javascript
// ✅ BOM: Page Object para testes complexos
class LoginPage {
  constructor(container) {
    this.container = container;
  }

  get emailInput() {
    return this.container.querySelector('input[type="email"]');
  }

  get passwordInput() {
    return this.container.querySelector('input[type="password"]');
  }

  get submitButton() {
    return this.container.querySelector('button[type="submit"]');
  }

  async login(email, password) {
    fireEvent.change(this.emailInput, { target: { value: email } });
    fireEvent.change(this.passwordInput, { target: { value: { password } } });
    fireEvent.click(this.submitButton);
  }
}

describe('Login', () => {
  it('logs in user', async () => {
    const { container } = render('<app-login></app-login>');
    const page = new LoginPage(container);

    await page.login('user@example.com', 'password');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});
```

### 3. Testes de Acessibilidade

```javascript
// ✅ BOM: Testes de acessibilidade
import { axe } from '@growing/testing';

describe('Button Accessibility', () => {
  it('passes accessibility audit', async () => {
    const { container } = render('<app-button>Click me</app-button>');

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has correct ARIA attributes', () => {
    const { container } = render('<app-button aria-label="Custom action">Click me</app-button>');
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('aria-label', 'Custom action');
  });
});
```

## Boas Práticas de Deploy

### 1. Versionamento Semântico

```json
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "release:patch": "npm version patch && npm publish",
    "release:minor": "npm version minor && npm publish",
    "release:major": "npm version major && npm publish"
  }
}
```

### 2. Changelog Automático

```javascript
// scripts/generate-changelog.js
const { generateChangelog } = require('@growing/changelog');

async function createRelease() {
  const changelog = await generateChangelog({
    from: 'v1.2.2',
    to: 'v1.2.3',
    format: 'markdown'
  });

  console.log(changelog);
}

createRelease();
```

### 3. Health Checks

```javascript
// scripts/health-check.js
const { healthCheck } = require('@growing/deploy');

async function checkHealth() {
  const results = await healthCheck({
    url: 'https://myapp.com',
    checks: [
      'response-time',
      'ssl-certificate',
      'broken-links',
      'performance-metrics'
    ]
  });

  if (!results.healthy) {
    console.error('Health check failed:', results.errors);
    process.exit(1);
  }

  console.log('✅ All health checks passed');
}

checkHealth();
```

## Boas Práticas de Documentação

### 1. README Abrangente

```markdown
# My Component

Um componente reutilizável para [descrição].

## Instalação

```bash
npm install @my-org/my-component
```

## Uso Básico

```javascript
import { MyComponent } from '@my-org/my-component';

<MyComponent
  title="Título"
  onAction={handleAction}
/>
```

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| title | string | - | Título do componente |
| disabled | boolean | false | Se está desabilitado |

## Eventos

| Evento | Descrição |
|--------|-----------|
| action | Disparado quando ação é executada |

## Exemplos

Veja mais exemplos em [`/docs/examples`](./docs/examples)
```

### 2. Documentação de Código

```javascript
/**
 * Calcula o total de uma lista de itens
 * @param {Array<Item>} items - Lista de itens
 * @param {Function} [calculator] - Função customizada de cálculo
 * @returns {number} Total calculado
 *
 * @example
 * const items = [
 *   { price: 10, quantity: 2 },
 *   { price: 5, quantity: 3 }
 * ];
 *
 * calculateTotal(items); // 35
 */
function calculateTotal(items, calculator = defaultCalculator) {
  return items.reduce((total, item) => {
    return total + calculator(item);
  }, 0);
}
```

### 3. Guias de Migração

```markdown
# Guia de Migração v1.x → v2.x

## Mudanças Principais

### ✅ Novas Funcionalidades
- Suporte a TypeScript
- Novo sistema de temas
- Performance melhorada

### ⚠️ Mudanças Quebradoras
- Propriedade `oldProp` removida
- Método `oldMethod()` renomeado para `newMethod()`

### 🔄 Mudanças de Comportamento
- Validação mais rigorosa
- Ordem de renderização alterada

## Migração Passo a Passo

### 1. Atualizar Dependências

```bash
npm install my-lib@^2.0.0
```

### 2. Atualizar Imports

```javascript
// Antes
import { oldMethod } from 'my-lib';

// Depois
import { newMethod } from 'my-lib';
```

### 3. Atualizar Uso

```javascript
// Antes
<MyComponent oldProp="value" />

// Depois
<MyComponent newProp="value" />
```

## Suporte

Para dúvidas sobre migração, consulte:
- [Documentação v2.x](./docs)
- [Issues no GitHub](https://github.com/my-org/my-lib/issues)
```

## Monitoramento e Observabilidade

### 1. Logging Estruturado

```javascript
// ✅ BOM: Logging estruturado
import { createLogger } from '@growing/logger';

const logger = createLogger({
  level: 'info',
  format: 'json',
  transports: ['console', 'file']
});

class UserService {
  async createUser(userData) {
    logger.info('Creating user', {
      userId: userData.id,
      email: userData.email,
      timestamp: new Date().toISOString()
    });

    try {
      const user = await this.api.create(userData);
      logger.info('User created successfully', { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Failed to create user', {
        error: error.message,
        userData,
        stack: error.stack
      });
      throw error;
    }
  }
}
```

### 2. Métricas de Performance

```javascript
// ✅ BOM: Métricas de performance
import { performanceMonitor } from '@growing/monitor';

class DataTable extends GrowingComponent {
  connectedCallback() {
    super.connectedCallback();
    this.startTime = performance.now();
  }

  async loadData() {
    const loadStart = performance.now();

    try {
      const data = await this.api.getData();
      const loadTime = performance.now() - loadStart;

      performanceMonitor.record('data-load-time', loadTime, {
        component: 'DataTable',
        dataSize: data.length
      });

      this.data = data;
    } catch (error) {
      performanceMonitor.record('data-load-error', 1, {
        component: 'DataTable',
        error: error.message
      });
    }
  }

  updated() {
    const renderTime = performance.now() - this.startTime;
    performanceMonitor.record('component-render-time', renderTime, {
      component: 'DataTable'
    });
  }
}
```

### 3. Error Tracking

```javascript
// ✅ BOM: Error tracking
import { errorTracker } from '@growing/error-tracker';

class App extends GrowingComponent {
  constructor() {
    super();

    // Capturar erros não tratados
    window.addEventListener('error', (event) => {
      errorTracker.captureException(event.error, {
        context: {
          component: 'App',
          url: window.location.href,
          userAgent: navigator.userAgent
        }
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      errorTracker.captureException(event.reason, {
        context: {
          type: 'unhandled-promise-rejection',
          component: 'App'
        }
      });
    });
  }

  render() {
    try {
      return this.renderContent();
    } catch (error) {
      errorTracker.captureException(error, {
        context: {
          component: 'App',
          method: 'render'
        }
      });

      return this.renderErrorFallback();
    }
  }
}
```

Seguindo estas melhores práticas, você garantirá que seus projetos Growing sejam mantíveis, performáticos, acessíveis e escaláveis ao longo do tempo.