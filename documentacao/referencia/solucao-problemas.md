# Solução de Problemas

Este guia ajuda a identificar e resolver problemas comuns no desenvolvimento com o sistema Growing.

## Problemas de Instalação

### Erro: "Cannot find module '@growing/core'"

**Sintomas:**
- Erro de módulo não encontrado
- Falha na compilação/build

**Soluções:**

1. **Verificar instalação:**
```bash
# Verificar se o pacote está instalado
npm list @growing/core

# Se não estiver instalado
npm install @growing/core
```

2. **Limpar cache do npm:**
```bash
# Limpar cache
npm cache clean --force

# Remover node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

3. **Verificar versão do Node.js:**
```bash
# Growing requer Node.js 16+
node --version

# Se versão antiga, atualizar
nvm install 18
nvm use 18
```

### Erro: "Permission denied" durante instalação

**Sintomas:**
- Erro de permissão ao instalar pacotes
- Falha ao criar diretórios

**Soluções:**

1. **Usar sudo (Linux/Mac):**
```bash
sudo npm install -g @growing/cli
```

2. **Instalar localmente:**
```bash
# Instalar localmente ao invés de global
npm install @growing/cli --save-dev

# Usar npx
npx growing --version
```

3. **Corrigir permissões (Linux/Mac):**
```bash
# Alterar proprietário do diretório npm
sudo chown -R $(whoami) ~/.npm

# Ou alterar permissões
sudo chmod -R 755 ~/.npm
```

## Problemas de Build

### Erro: "SassError: Undefined variable"

**Sintomas:**
- Erro de variável SCSS não definida
- Falha na compilação de estilos

**Soluções:**

1. **Verificar imports:**
```scss
// ✅ CORRETO: Importar core primeiro
@use '@growing/core' as *;

// ❌ ERRADO: Usar variável sem importar
.button {
  color: $color-primary; // Erro: variável não definida
}
```

2. **Verificar ordem de imports:**
```scss
// main.scss - Ordem correta
@use 'core/variables';
@use 'core/mixins';
@use 'sprouts/button';
@use 'trees/main';
```

3. **Verificar namespaces:**
```scss
// ✅ CORRETO: Usar namespace
@use 'core/variables' as vars;

.button {
  color: vars.$color-primary;
}

// ❌ ERRADO: Sem namespace
.button {
  color: $color-primary; // Erro se não importado globalmente
}
```

### Erro: "Module not found" em JavaScript

**Sintomas:**
- Erro de módulo não encontrado
- Falha na compilação JavaScript

**Soluções:**

1. **Verificar imports:**
```javascript
// ✅ CORRETO
import { GrowingComponent } from '@growing/core';

// ❌ ERRADO
import { GrowingComponent } from 'growing-core'; // Sem @
```

2. **Verificar resolução de módulos:**
```javascript
// Verificar package.json
{
  "dependencies": {
    "@growing/core": "^2.0.0"
  }
}
```

3. **Limpar e reinstalar:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Problemas de Componentes

### Componente não renderiza

**Sintomas:**
- Componente aparece como tag HTML simples
- Estilos não aplicados
- JavaScript não executa

**Soluções:**

1. **Verificar definição do componente:**
```javascript
// ✅ CORRETO
class MyButton extends GrowingComponent {
  // ...
}
customElements.define('my-button', MyButton);

// ❌ ERRADO: Sem customElements.define
class MyButton extends GrowingComponent {
  // ...
}
// Componente não registrado
```

2. **Verificar nome da tag:**
```html
<!-- ✅ CORRETO -->
<my-button>Click me</my-button>

<!-- ❌ ERRADO -->
<MyButton>Click me</MyButton> <!-- React style, não Web Components -->
```

3. **Verificar ordem de carregamento:**
```html
<!-- ✅ CORRETO: Script antes do uso -->
<script src="components/MyButton.js"></script>
<my-button>Click me</my-button>

<!-- ❌ ERRADO: Uso antes do script -->
<my-button>Click me</my-button>
<script src="components/MyButton.js"></script>
```

### Propriedades não atualizam

**Sintomas:**
- Mudanças em propriedades não refletem na UI
- Componente não re-renderiza

**Soluções:**

1. **Usar requestUpdate():**
```javascript
// ✅ CORRETO
class Counter extends GrowingComponent {
  increment() {
    this.count++;
    this.requestUpdate(); // Importante!
  }
}

// ❌ ERRADO: Sem requestUpdate
class Counter extends GrowingComponent {
  increment() {
    this.count++;
    // Componente não atualiza
  }
}
```

2. **Verificar tipos de propriedades:**
```javascript
// ✅ CORRETO
static get properties() {
  return {
    count: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false }
  };
}

// ❌ ERRADO: Tipos incorretos
static get properties() {
  return {
    count: { type: String, default: 0 }, // Number como String
    disabled: { type: String, default: false } // Boolean como String
  };
}
```

### Eventos não funcionam

**Sintomas:**
- Eventos de clique não disparam
- Listeners não são chamados

**Soluções:**

1. **Verificar sintaxe de eventos:**
```javascript
// ✅ CORRETO
render() {
  return `
    <button @click="${this.handleClick}">Click me</button>
  `;
}

// ❌ ERRADO: Sintaxe incorreta
render() {
  return `
    <button onclick="${this.handleClick}">Click me</button>
  `;
}
```

2. **Verificar binding de métodos:**
```javascript
// ✅ CORRETO
class MyComponent extends GrowingComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }
}

// ❌ ERRADO: Sem binding
class MyComponent extends GrowingComponent {
  handleClick() {
    // this pode ser undefined
  }
}
```

## Problemas de Estilos

### Estilos não aplicam

**Sintomas:**
- Componentes sem estilos
- CSS não carrega

**Soluções:**

1. **Verificar ordem de carregamento:**
```html
<!-- ✅ CORRETO -->
<link rel="stylesheet" href="styles/main.css">
<script src="components/MyButton.js"></script>

<!-- ❌ ERRADO -->
<script src="components/MyButton.js"></script>
<link rel="stylesheet" href="styles/main.css">
```

2. **Verificar especificidade CSS:**
```scss
// ✅ CORRETO: Especificidade adequada
.my-button {
  background: blue;
}

// ❌ ERRADO: Conflito de especificidade
button.my-button {
  background: red !important; // Evitar !important
}
```

3. **Verificar Shadow DOM:**
```scss
// Para componentes com Shadow DOM
:host {
  display: inline-block;
}

:host(.disabled) {
  opacity: 0.5;
}
```

### Problemas de responsividade

**Sintomas:**
- Layout quebra em dispositivos móveis
- Media queries não funcionam

**Soluções:**

1. **Verificar meta viewport:**
```html
<!-- ✅ CORRETO -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- ❌ ERRADO -->
<meta name="viewport" content="width=1024"> <!-- Fixed width -->
```

2. **Usar unidades relativas:**
```scss
// ✅ CORRETO
.container {
  width: 100%;
  max-width: 1200px;
  padding: 1rem; // rem ao invés de px
}

// ❌ ERRADO
.container {
  width: 1200px; // Fixed width
  padding: 16px; // px pode não escalar bem
}
```

3. **Verificar breakpoints:**
```scss
// ✅ CORRETO
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
}

// ❌ ERRADO
@media (max-width: 768px) { /* Sem unidade */
  .container {
    padding: 0.5rem;
  }
}
```

## Problemas de Performance

### Aplicação lenta

**Sintomas:**
- Carregamento lento
- Interface travando
- Alto uso de CPU/memória

**Soluções:**

1. **Implementar lazy loading:**
```javascript
// ✅ CORRETO
const LazyComponent = lazyLoad(() => import('./HeavyComponent'));

class App extends GrowingComponent {
  render() {
    return `
      <div>
        <light-component></light-component>
        ${this.showHeavy ? '<lazy-component></lazy-component>' : ''}
      </div>
    `;
  }
}
```

2. **Otimizar re-renders:**
```javascript
// ✅ CORRETO
class OptimizedComponent extends GrowingComponent {
  shouldUpdate(changedProperties) {
    return changedProperties.has('importantProp');
  }
}
```

3. **Usar virtual scrolling:**
```javascript
// Para listas grandes
class VirtualList extends GrowingComponent {
  get visibleItems() {
    const start = Math.floor(this.scrollTop / this.itemHeight);
    return this.items.slice(start, start + this.visibleCount);
  }
}
```

### Bundle muito grande

**Sintomas:**
- Tempo de carregamento longo
- Bundle > 1MB

**Soluções:**

1. **Code splitting:**
```javascript
// ✅ CORRETO
const routes = {
  '/dashboard': () => import('./pages/Dashboard'),
  '/settings': () => import('./pages/Settings')
};
```

2. **Tree shaking:**
```javascript
// ✅ CORRETO: Import específico
import { debounce } from '@growing/utils';

// ❌ ERRADO: Import tudo
import * as utils from '@growing/utils';
```

3. **Otimizar assets:**
```bash
# Comprimir imagens
growing assets optimize

# Gerar sprites
growing assets sprite
```

## Problemas de Acessibilidade

### Contraste insuficiente

**Sintomas:**
- Texto difícil de ler
- Elementos não distinguíveis

**Soluções:**

1. **Verificar contraste:**
```scss
// ✅ CORRETO: Contraste adequado (4.5:1 mínimo)
.button {
  background: #0066cc; // Azul escuro
  color: #ffffff;     // Branco
}

// ❌ ERRADO: Contraste insuficiente
.button {
  background: #99ccff; // Azul claro
  color: #ccccff;     // Azul muito claro
}
```

2. **Usar ferramentas de verificação:**
```bash
# Verificar contraste
npx @growing/accessibility check-contrast

# Verificar WCAG compliance
npx @growing/accessibility audit
```

### Navegação por teclado

**Sintomas:**
- Não consegue navegar com Tab
- Elementos não focáveis

**Soluções:**

1. **Adicionar tabindex apropriado:**
```html
<!-- ✅ CORRETO -->
<button>Click me</button> <!-- Naturalmente focável -->

<!-- Custom element focável -->
<div tabindex="0" role="button">Custom button</div>
```

2. **Gerenciar foco:**
```javascript
class Modal extends GrowingComponent {
  showModal() {
    this.setAttribute('aria-hidden', 'false');
    this.focusTrap = createFocusTrap(this);
    this.focusTrap.activate();
  }

  hideModal() {
    this.setAttribute('aria-hidden', 'true');
    if (this.focusTrap) {
      this.focusTrap.deactivate();
    }
  }
}
```

## Problemas de Estado

### Estado não persiste

**Sintomas:**
- Estado perdido ao recarregar página
- Dados não salvos

**Soluções:**

1. **Usar localStorage/sessionStorage:**
```javascript
// ✅ CORRETO
class App extends GrowingComponent {
  connectedCallback() {
    super.connectedCallback();
    this.loadState();
  }

  saveState() {
    localStorage.setItem('app-state', JSON.stringify(this.state));
  }

  loadState() {
    const saved = localStorage.getItem('app-state');
    if (saved) {
      this.state = JSON.parse(saved);
    }
  }
}
```

2. **Implementar undo/redo:**
```javascript
// ✅ CORRETO
class StateManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  execute(command) {
    command.execute();
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(command);
    this.currentIndex++;
  }

  undo() {
    if (this.currentIndex >= 0) {
      this.history[this.currentIndex].undo();
      this.currentIndex--;
    }
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.history[this.currentIndex].execute();
    }
  }
}
```

## Problemas de API

### Erro de CORS

**Sintomas:**
- Erro "Access-Control-Allow-Origin"
- Falha em requisições

**Soluções:**

1. **Configurar CORS no servidor:**
```javascript
// Express.js
const cors = require('cors');
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

2. **Usar proxy em desenvolvimento:**
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
};
```

### Timeout de requisições

**Sintomas:**
- Requisições demoram muito
- Timeout errors

**Soluções:**

1. **Configurar timeout:**
```javascript
// ✅ CORRETO
const api = new GrowingAPI({
  baseURL: '/api',
  timeout: 10000, // 10 segundos
  retries: 3
});
```

2. **Implementar loading states:**
```javascript
// ✅ CORRETO
class DataLoader extends GrowingComponent {
  async loadData() {
    this.loading = true;
    this.requestUpdate();

    try {
      this.data = await this.api.getData();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  render() {
    if (this.loading) {
      return '<loading-spinner></loading-spinner>';
    }

    if (this.error) {
      return `<error-message>${this.error}</error-message>`;
    }

    return `<data-display data="${this.data}"></data-display>`;
  }
}
```

## Problemas de Testes

### Testes falham inconsistentemente

**Sintomas:**
- Testes passam/Falham aleatoriamente
- Flaky tests

**Soluções:**

1. **Usar waitFor:**
```javascript
// ✅ CORRETO
import { waitFor } from '@growing/testing';

it('shows success message', async () => {
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });
});
```

2. **Limpar estado entre testes:**
```javascript
// ✅ CORRETO
describe('MyComponent', () => {
  beforeEach(() => {
    // Limpar DOM
    document.body.innerHTML = '';

    // Reset mocks
    jest.clearAllMocks();

    // Reset state
    store.reset();
  });
});
```

### Testes de snapshot falham

**Sintomas:**
- Snapshots desatualizados
- Diferenças inesperadas

**Soluções:**

1. **Atualizar snapshots:**
```bash
# Atualizar todos os snapshots
npm run test -- --updateSnapshot

# Atualizar snapshot específico
npm run test -- -u MyComponent.test.js
```

2. **Verificar mudanças intencionais:**
```bash
# Ver diferenças
npm run test -- --verbose
```

## Problemas de Deploy

### Deploy falha

**Sintomas:**
- Erro durante deploy
- Build passa localmente mas falha no CI

**Soluções:**

1. **Verificar variáveis de ambiente:**
```bash
# Verificar se todas as env vars estão definidas
echo $API_KEY
echo $DATABASE_URL
```

2. **Usar mesmo Node.js version:**
```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/setup-node@v3
      with:
        node-version: '18' # Mesmo versão do desenvolvimento
```

3. **Build em ambiente limpo:**
```bash
# Simular CI localmente
rm -rf node_modules
npm ci
npm run build
```

### Aplicação não funciona em produção

**Sintomas:**
- Funciona localmente mas não em produção
- Erros 404, 500

**Soluções:**

1. **Verificar caminhos absolutos:**
```javascript
// ✅ CORRETO
const api = new GrowingAPI({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://api.myapp.com'
    : '/api'
});

// ❌ ERRADO
const api = new GrowingAPI({
  baseURL: 'http://localhost:3001/api' // Hardcoded
});
```

2. **Verificar assets:**
```bash
# Verificar se assets foram gerados
ls -la dist/assets/

# Verificar se paths estão corretos
grep "assets/" dist/index.html
```

## Ferramentas de Debug

### Debug no navegador

```javascript
// Adicionar breakpoints
class MyComponent extends GrowingComponent {
  connectedCallback() {
    super.connectedCallback();
    debugger; // Breakpoint aqui
  }
}
```

### Logging avançado

```javascript
// Logger configurável
import { createLogger } from '@growing/logger';

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: 'json',
  transports: ['console', 'file']
});

// Uso
logger.info('Component mounted', { component: 'MyComponent' });
logger.error('API call failed', { error, endpoint: '/api/data' });
```

### Performance monitoring

```javascript
// Monitor de performance
import { performanceMonitor } from '@growing/performance';

class App extends GrowingComponent {
  connectedCallback() {
    super.connectedCallback();
    performanceMonitor.start('app-init');
  }

  firstUpdated() {
    performanceMonitor.end('app-init');
    console.log('App init time:', performanceMonitor.get('app-init'));
  }
}
```

## Quando Pedir Ajuda

### Coletar informações

Antes de pedir ajuda, colete:

1. **Versões:**
```bash
node --version
npm --version
growing --version
```

2. **Logs de erro:**
```bash
# Executar com debug
DEBUG=* growing dev

# Ou salvar logs
growing dev 2>&1 | tee debug.log
```

3. **Configuração:**
```bash
# Mostrar configuração atual
growing config list

# Verificar arquivos de configuração
cat growing.config.js
cat package.json
```

4. **Ambiente:**
```bash
# Sistema operacional
uname -a

# Memória disponível
free -h

# Espaço em disco
df -h
```

### Canais de suporte

1. **Documentação:** https://growing.dev/docs
2. **Issues no GitHub:** https://github.com/growing/growing/issues
3. **Discord:** https://discord.gg/growing
4. **Forum:** https://forum.growing.dev

### Criar issue efetiva

```markdown
## Título descritivo
Ex: "Erro ao instalar @growing/core no Windows"

## Descrição
- O que você estava tentando fazer
- Comandos executados
- Erro completo (com stack trace)

## Ambiente
- OS: Windows 10
- Node.js: v18.12.0
- NPM: v8.19.2
- Growing CLI: v2.1.0

## Passos para reproduzir
1. npm install -g @growing/cli
2. growing create my-app
3. cd my-app
4. npm install

## Comportamento esperado
Instalação sem erros

## Comportamento atual
Erro: "Cannot find module 'fs'"

## Logs
```
npm ERR! code ENOENT
npm ERR! syscall spawn
npm ERR! path C:\Users\User\AppData\Roaming\npm\node_modules\@growing\cli\bin\growing.js
```
```

Seguindo este guia, você poderá resolver a maioria dos problemas comuns no desenvolvimento com Growing. Lembre-se de sempre verificar primeiro a documentação e os logs de erro antes de pedir ajuda.