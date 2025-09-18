# Sistema My Groves

O **My Groves** é o sistema de projetos independentes do Codessa Growing, permitindo criar e gerenciar múltiplos projetos com builds simultâneos e identidades visuais próprias.

## Visão Geral

O My Groves revoluciona o desenvolvimento ao permitir que você:

- **Crie projetos independentes** com builds simultâneos
- **Personalize identidades visuais** por projeto
- **Compartilhe um core comum** entre todos os projetos
- **Escale facilmente** adicionando novos projetos
- **Mantenha isolamento** entre projetos sem conflitos

## Arquitetura do Sistema

### Estrutura Hierárquica

```
Codessa Growing/
├── Wood/                    # Core compartilhado
│   ├── soils/             # Utilitários base
│   ├── sprouts/           # Construtores
│   ├── trunks/            # Componentes
│   └── leafs/             # Ajustes pontuais
└── My Groves/             # Projetos independentes
    ├── project-alpha/     # Projeto A (porta 3001)
    │   ├── tree.scss      # Ponto de entrada
    │   ├── foundation/    # Identidade visual
    │   ├── index.html     # Interface
    │   └── vite.config.js # Configuração
    └── project-beta/      # Projeto B (porta 3002)
        ├── tree.scss      # Ponto de entrada
        ├── foundation/    # Identidade visual
        ├── index.html     # Interface
        └── vite.config.js # Configuração
```

### Relacionamento com a Arquitetura Principal

```
Seeds → Soils → Sprouts → Trunks → Tree
   ↑      ↑        ↑        ↑      ↑
Tokens  Core    Ferramentas Componentes Projetos
Brutos Compartilhado    Comuns    Finais Independentes
```

## Benefícios do My Groves

### Para Desenvolvedores

- **Desenvolvimento Paralelo**: Múltiplos projetos simultaneamente
- **Isolamento Total**: Sem conflitos entre projetos
- **Reutilização**: Core compartilhado entre projetos
- **Flexibilidade**: Personalização por projeto
- **Rapidez**: Builds independentes e rápidos

### Para Projetos

- **Identidade Própria**: Cada projeto com sua paleta
- **Escalabilidade**: Fácil adicionar novos projetos
- **Manutenibilidade**: Core centralizado
- **Performance**: Builds otimizados por projeto
- **Consistência**: Arquitetura compartilhada

### Para Equipes

- **Paralelização**: Múltiplos desenvolvedores em projetos diferentes
- **Padronização**: Mesma arquitetura em todos os projetos
- **Colaboração**: Compartilhamento de componentes
- **Deploy Independente**: Cada projeto pode ser deployado separadamente

## Como Funciona

### 1. Core Compartilhado

Todos os projetos My Groves compartilham o mesmo core:

```scss
// src/soils/index.scss - Core compartilhado
@use '../seeds' as seeds;

// Utilitários base disponíveis para todos os projetos
@mixin spacing-standard {
  padding: seeds.$spacing-md;
  margin-bottom: seeds.$spacing-lg;
}

@mixin interactive-states {
  &:hover { opacity: 0.8; }
  &:active { transform: scale(0.98); }
}
```

### 2. Projetos Independentes

Cada projeto tem sua própria identidade:

```scss
// My Groves/meu-projeto/tree.scss
@use './foundation' as project;

// Importa core compartilhado
@include soils.spacing-standard;

// Usa paleta própria do projeto
.my-button {
  background-color: palette.$primary;
  color: palette.$on-primary;
  @include soils.interactive-states();
}
```

### 3. Builds Simultâneos

Projetos rodam independentemente:

```bash
# Terminal 1
cd My\ Groves/project-alpha && npm run dev
# Resultado: http://localhost:3001

# Terminal 2
cd My\ Groves/project-beta && npm run dev
# Resultado: http://localhost:3002
```

## Criando um Novo Projeto

### Método 1: Copiando um Projeto Existente

```bash
# Criar novo projeto baseado em um existente
cp -r My\ Groves/example-project My\ Groves/meu-novo-projeto
cd My\ Groves/meu-novo-projeto

# Personalizar a paleta
edit foundation/palette.scss

# Executar
npm run dev
```

### Método 2: Criando do Zero

```bash
# Criar estrutura básica
mkdir -p My\ Groves/meu-projeto/foundation

# Criar arquivos essenciais
touch My\ Groves/meu-projeto/tree.scss
touch My\ Groves/meu-projeto/foundation/palette.scss
touch My\ Groves/meu-projeto/index.html
touch My\ Groves/meu-projeto/vite.config.js
```

## Estrutura de um Projeto My Groves

### tree.scss - Ponto de Entrada

```scss
// My Groves/meu-projeto/tree.scss
@use '../../src/soils' as soils;
@use '../../src/sprouts' as sprouts;
@use '../../src/trunks' as trunks;
@use '../../src/leafs' as leafs;
@use 'foundation/palette' as palette;

// Reset e base
@include soils.reset();

// Componentes personalizados do projeto
.my-header {
  @extend %trunk-header;
  background-color: palette.$primary;
  color: palette.$on-primary;
}

.my-button {
  @include sprouts.button-base();
  background-color: palette.$secondary;
  color: palette.$on-secondary;
}

// Páginas específicas
.page-home {
  @include soils.layout-grid();
  background-color: palette.$background;
}

.page-about {
  @include soils.layout-flex();
  background-color: palette.$surface;
}
```

### foundation/palette.scss - Identidade Visual

```scss
// My Groves/meu-projeto/foundation/palette.scss

// Cores primárias
$primary: #1976d2;
$on-primary: #ffffff;

// Cores secundárias
$secondary: #dc004e;
$on-secondary: #ffffff;

// Superfícies
$background: #fafafa;
$on-background: #212121;
$surface: #ffffff;
$on-surface: #212121;

// Estados
$error: #d32f2f;
$on-error: #ffffff;
$warning: #f57c00;
$on-warning: #000000;
$success: #388e3c;
$on-success: #ffffff;

// Bordas e raios
$border-radius: 8px;
$border-color: #e0e0e0;
```

### index.html - Interface

```html
<!-- My Groves/meu-projeto/index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Projeto - My Groves</title>
  <link rel="stylesheet" href="tree.scss">
</head>
<body>
  <header class="my-header">
    <h1>Meu Projeto</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">Sobre</a>
    </nav>
  </header>

  <main class="page-home">
    <section class="hero">
      <h2>Bem-vindo ao Meu Projeto</h2>
      <p>Desenvolvido com Codessa Growing</p>
      <button class="my-button">Saiba Mais</button>
    </section>
  </main>

  <script src="main.js"></script>
</body>
</html>
```

### vite.config.js - Configuração

```javascript
// My Groves/meu-projeto/vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  server: {
    port: 3003, // Porta específica do projeto
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "../../src/seeds" as seeds;'
      }
    }
  }
});
```

## Exemplos Práticos

### Projeto Corporativo Completo

```scss
// My Groves/corp-site/tree.scss
@use '../../src/soils' as soils;
@use '../../src/sprouts' as sprouts;
@use '../../src/trunks' as trunks;
@use 'foundation/palette' as palette;

// Layout base
@include soils.reset();
@include soils.typography-base();

// Header corporativo
.corp-header {
  @extend %trunk-header;
  background: linear-gradient(135deg, palette.$primary, palette.$primary-variant);
  color: palette.$on-primary;
  padding: soils.$spacing-xl;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  .logo {
    font-size: 1.8rem;
    font-weight: 700;
  }

  nav {
    display: flex;
    gap: soils.$spacing-lg;

    a {
      color: palette.$on-primary;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

// Botão CTA corporativo
.cta-button {
  @include sprouts.button-base();
  background-color: palette.$secondary;
  color: palette.$on-secondary;
  padding: soils.$spacing-md soils.$spacing-xl;
  border-radius: palette.$border-radius;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(palette.$secondary, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(palette.$secondary, 0.4);
  }
}

// Card de serviço
.service-card {
  @include sprouts.card-structure();
  background-color: palette.$surface;
  border: 1px solid palette.$border-color;
  border-radius: palette.$border-radius;
  padding: soils.$spacing-xl;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .icon {
    width: 60px;
    height: 60px;
    background-color: palette.$primary;
    border-radius: 50%;
    margin: 0 auto soils.$spacing-md;
    display: flex;
    align-items: center;
    justify-content: center;
    color: palette.$on-primary;
    font-size: 1.5rem;
  }

  h3 {
    color: palette.$on-surface;
    margin-bottom: soils.$spacing-md;
  }

  p {
    color: palette.$on-surface-variant;
    line-height: 1.6;
  }
}
```

```html
<!-- My Groves/corp-site/index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Empresa XYZ - Soluções Corporativas</title>
  <link rel="stylesheet" href="tree.scss">
</head>
<body>
  <header class="corp-header">
    <div class="container">
      <div class="logo">Empresa XYZ</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#servicos">Serviços</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Inovação e Excelência</h1>
        <p>Soluções corporativas de ponta para seu negócio</p>
        <button class="cta-button">Saiba Mais</button>
      </div>
    </section>

    <section class="services">
      <div class="container">
        <h2>Nossos Serviços</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="icon">🚀</div>
            <h3>Consultoria</h3>
            <p>Consultoria especializada para otimizar seus processos</p>
          </div>
          <div class="service-card">
            <div class="icon">💡</div>
            <h3>Inovação</h3>
            <p>Soluções inovadoras para desafios modernos</p>
          </div>
          <div class="service-card">
            <div class="icon">🎯</div>
            <h3>Estratégia</h3>
            <p>Planejamento estratégico para crescimento sustentável</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
```

### E-commerce Moderno

```scss
// My Groves/ecommerce/tree.scss
@use '../../src/soils' as soils;
@use '../../src/sprouts' as sprouts;
@use 'foundation/palette' as palette;

// Layout e-commerce
.ecommerce-layout {
  @include soils.layout-grid();
  min-height: 100vh;
  background-color: palette.$background;
}

// Header com navegação e carrinho
.ecommerce-header {
  background-color: palette.$surface;
  padding: soils.$spacing-md;
  border-bottom: 1px solid palette.$border-color;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: palette.$primary;
  }

  .nav-links {
    display: flex;
    gap: soils.$spacing-lg;

    a {
      color: palette.$on-surface;
      text-decoration: none;
      font-weight: 500;
    }
  }

  .cart-icon {
    position: relative;

    &::after {
      content: '3'; // Número de itens
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: palette.$error;
      color: palette.$on-error;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// Card de produto
.product-card {
  @include sprouts.card-structure();
  background-color: palette.$surface;
  border-radius: palette.$border-radius;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .product-image {
    width: 100%;
    height: 200px;
    background-color: palette.$surface-variant;
    display: flex;
    align-items: center;
    justify-content: center;
    color: palette.$on-surface-variant;
    font-size: 3rem;
  }

  .product-info {
    padding: soils.$spacing-md;

    h3 {
      color: palette.$on-surface;
      margin-bottom: soils.$spacing-sm;
      font-size: 1.1rem;
    }

    .price {
      color: palette.$primary;
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: soils.$spacing-md;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: soils.$spacing-xs;
      margin-bottom: soils.$spacing-md;

      .stars {
        color: #ffd700;
      }

      .reviews {
        color: palette.$on-surface-variant;
        font-size: 0.9rem;
      }
    }
  }

  .add-to-cart-btn {
    @include sprouts.button-base();
    background-color: palette.$primary;
    color: palette.$on-primary;
    width: 100%;
    padding: soils.$spacing-md;
    border: none;
    font-weight: 600;

    &:hover {
      background-color: palette.$primary-variant;
    }
  }
}

// Grid de produtos
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: soils.$spacing-lg;
  padding: soils.$spacing-xl;
}
```

### Blog/Personal Branding

```scss
// My Groves/blog/tree.scss
@use '../../src/soils' as soils;
@use '../../src/sprouts' as sprouts;
@use 'foundation/palette' as palette;

// Layout de blog
.blog-layout {
  @include soils.layout-flex();
  min-height: 100vh;
  background-color: palette.$background;
}

// Header com navegação
.blog-header {
  background-color: palette.$surface;
  padding: soils.$spacing-lg 0;
  border-bottom: 1px solid palette.$border-color;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 soils.$spacing-lg;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blog-title {
    font-size: 2rem;
    font-weight: 700;
    color: palette.$primary;
    text-decoration: none;
  }

  .blog-nav {
    display: flex;
    gap: soils.$spacing-lg;

    a {
      color: palette.$on-surface;
      text-decoration: none;
      font-weight: 500;
      padding: soils.$spacing-sm soils.$spacing-md;
      border-radius: palette.$border-radius;

      &:hover {
        background-color: palette.$surface-variant;
      }
    }
  }
}

// Card de artigo
.article-card {
  @include sprouts.card-structure();
  background-color: palette.$surface;
  border-radius: palette.$border-radius;
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
  }

  .article-image {
    width: 100%;
    height: 200px;
    background-color: palette.$primary;
    display: flex;
    align-items: center;
    justify-content: center;
    color: palette.$on-primary;
    font-size: 3rem;
  }

  .article-content {
    padding: soils.$spacing-lg;

    .article-meta {
      display: flex;
      gap: soils.$spacing-md;
      margin-bottom: soils.$spacing-md;
      font-size: 0.9rem;
      color: palette.$on-surface-variant;

      .category {
        background-color: palette.$secondary;
        color: palette.$on-secondary;
        padding: 2px soils.$spacing-sm;
        border-radius: palette.$border-radius-sm;
        font-size: 0.8rem;
        text-transform: uppercase;
      }
    }

    h2 {
      color: palette.$on-surface;
      margin-bottom: soils.$spacing-md;
      font-size: 1.3rem;

      a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: palette.$primary;
        }
      }
    }

    .article-excerpt {
      color: palette.$on-surface-variant;
      line-height: 1.6;
      margin-bottom: soils.$spacing-md;
    }

    .read-more {
      color: palette.$primary;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// Grid de artigos
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: soils.$spacing-xl;
  padding: soils.$spacing-xl;
  max-width: 1200px;
  margin: 0 auto;
}
```

## Gerenciamento de Projetos

### Comandos Úteis

```bash
# Listar todos os projetos
ls My\ Groves/

# Ver status de um projeto
cd My\ Groves/meu-projeto && npm run dev

# Build de um projeto específico
cd My\ Groves/meu-projeto && npm run build

# Limpar builds
cd My\ Groves/meu-projeto && rm -rf dist/

# Executar múltiplos projetos
# Terminal 1: cd My\ Groves/project1 && npm run dev
# Terminal 2: cd My\ Groves/project2 && npm run dev
```

### Organização Recomendada

```
My Groves/
├── _templates/          # Templates para novos projetos
├── client-projects/     # Projetos de clientes
│   ├── client-a/
│   ├── client-b/
│   └── client-c/
├── internal-tools/      # Ferramentas internas
│   ├── dashboard/
│   └── admin-panel/
├── experiments/         # Projetos experimentais
│   ├── prototype-x/
│   └── concept-y/
└── archives/           # Projetos arquivados
```

## Boas Práticas

### Estrutura de Arquivos

- **Mantenha consistência**: Use a mesma estrutura em todos os projetos
- **Documente customizações**: Comente suas modificações específicas
- **Versione suas mudanças**: Use Git para controle de versão
- **Nomeie claramente**: Use nomes descritivos para projetos

### Desenvolvimento

- **Comece pelo core**: Use componentes do core sempre que possível
- **Personalize no tree**: Faça customizações no arquivo tree.scss
- **Mantenha isolamento**: Evite modificar arquivos do core
- **Teste builds**: Sempre teste o build antes de deploy

### Performance

- **Otimize assets**: Use compressão e minificação
- **Lazy loading**: Carregue componentes sob demanda
- **Cache eficiente**: Configure cache apropriado
- **Monitoramento**: Acompanhe performance dos projetos

## Troubleshooting

### Problemas Comuns

#### Porta Já em Uso

```bash
# Verificar portas em uso
netstat -tulpn | grep :300

# Mudar porta no vite.config.js
server: {
  port: 3004, // Nova porta
}
```

#### Conflito de Dependências

```bash
# Limpar cache do projeto
cd My\ Groves/meu-projeto
rm -rf node_modules package-lock.json
npm install
```

#### Erro de Import

```scss
// Verificar caminhos
@use '../../src/soils' as soils; // Caminho relativo correto
@use 'foundation/palette' as palette; // Caminho local
```

### Debug

```bash
# Ver logs detalhados
cd My\ Groves/meu-projeto
npm run dev -- --debug

# Verificar arquivos gerados
ls -la dist/
```

## Casos de Uso

### Agência Digital

- **Cliente A**: Site institucional (azul corporativo)
- **Cliente B**: E-commerce (verde moderno)
- **Cliente C**: Blog (tons quentes)
- **Cliente D**: Dashboard (cinza profissional)

### Produto SaaS

- **Landing Page**: Conversão otimizada
- **Dashboard**: Interface funcional
- **Admin Panel**: Gerenciamento avançado
- **API Docs**: Documentação técnica

### Sistema Empresarial

- **Portal RH**: Recursos humanos
- **Sistema Financeiro**: Gestão financeira
- **Dashboard Executivo**: Business intelligence
- **Portal do Colaborador**: Intranet

## Próximos Passos

### Expansão Planejada

1. **CLI Automatizado**: Comando `growing create-project`
2. **Templates**: Templates pré-configurados por tipo
3. **Themes**: Sistema de temas compartilhados
4. **Components**: Biblioteca de componentes comuns
5. **Deploy**: Sistema de deploy automatizado

### Integração com Tecnologias

- **Next.js**: SSR e SSG
- **Vue.js**: Componentes reativos
- **React**: Interfaces dinâmicas
- **Angular**: Aplicações enterprise

## Conclusão

O My Groves transforma o desenvolvimento web ao permitir:

- **Paralelização máxima** do desenvolvimento
- **Flexibilidade total** na criação de projetos
- **Consistência arquitetural** em todos os projetos
- **Escalabilidade infinita** conforme o crescimento

Com o My Groves, você pode gerenciar uma carteira completa de projetos mantendo eficiência, consistência e qualidade em todos eles.

---

**🎯 Dica**: Comece criando seu primeiro projeto My Groves baseado no `example-project` e explore todas as possibilidades do sistema!</content>
<parameter name="filePath">c:\Users\rafae\Documents\MEGA\Codessa\Apps\growing\docs\arquitetura\my-groves.md