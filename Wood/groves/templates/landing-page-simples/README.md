# Landing Page Simples

Template de landing page moderna e responsiva para Codessa Growing. Perfeito para apresentar seu produto ou serviço de forma elegante e profissional.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Performance Otimizada**: Carregamento rápido e SEO-friendly
- **Customizável**: Fácil personalização de cores, textos e conteúdo
- **Acessibilidade**: Seguindo as melhores práticas de acessibilidade web
- **Interativo**: Animações suaves e transições elegantes
- **SEO Otimizado**: Estrutura semântica e meta tags configuráveis

## 📁 Estrutura do Template

```
landing-page-simples/
├── src/
│   ├── index.html          # Template HTML principal
│   ├── main.js             # JavaScript interativo
│   └── foundation/
│       ├── _index.scss     # Estilos principais
│       ├── seeds/
│       │   └── _index.scss # Customizações de cores
│       ├── soils/
│       │   └── _index.scss # Variáveis CSS
│       └── barks/
│           └── _index.scss # Animações e estilos específicos
├── config.json             # Configuração do template
└── README.md               # Esta documentação
```

## 🎨 Personalização

### Cores
Personalize as cores editando `src/foundation/seeds/_index.scss`:

```scss
// Cores primárias
--color-primary: #FF6B35;
--color-secondary: #F7931E;
--color-accent: #2D3748;

// Cores neutras
--color-text: #1A202C;
--color-background: #FFFFFF;
--color-surface: #F7FAFC;
```

### Conteúdo
Personalize textos editando `config.json` ou diretamente no HTML usando variáveis:

```html
<h1>{{heroTitle}}</h1>
<p>{{heroSubtitle}}</p>
```

### Tipografia
Ajuste fontes e tamanhos em `src/foundation/soils/_index.scss`:

```scss
--font-family-primary: 'Inter', sans-serif;
--font-size-heading: 2.25rem;
--font-size-subheading: 1.5rem;
--font-size-body: 1rem;
```

## 🛠️ Como Usar

### 1. Criar Projeto
```bash
# Usando Codessa CLI (futuro)
codessa create landing-page-simples meu-projeto

# Ou copie manualmente os arquivos
cp -r landing-page-simples ~/projetos/meu-projeto
```

### 2. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 3. Personalizar
Edite os arquivos em `src/foundation/` para customizar cores, tipografia e estilos.

### 4. Desenvolver
```bash
npm run dev
# ou
yarn dev
```

### 5. Build para Produção
```bash
npm run build
# ou
yarn build
```

## 📱 Seções Incluídas

### Hero Section
- Título e subtítulo chamativos
- Call-to-action buttons
- Background com gradiente

### Sobre Section
- Descrição da empresa/solução
- Destaques principais
- Imagens ou ícones ilustrativos

### Serviços Section
- Cards de serviços
- Ícones e descrições
- Layout responsivo

### Contato Section
- Formulário de contato
- Informações de contato
- Validação em tempo real

## 🎯 Funcionalidades JavaScript

- **Smooth Scrolling**: Navegação suave entre seções
- **Form Validation**: Validação de formulários com feedback visual
- **Scroll Animations**: Animações ao rolar a página
- **Responsive Menu**: Menu adaptável para mobile
- **Analytics Ready**: Estrutura para integração com analytics

## 🔧 Configuração Avançada

### Variáveis de Template
O template suporta substituição de variáveis no HTML:

```html
<title>{{siteTitle}}</title>
<meta name="description" content="{{siteDescription}}">
```

### Custom Properties CSS
Variáveis CSS para fácil customização:

```css
:root {
  --color-primary: #FF6B35;
  --spacing-section: 5rem;
  --font-size-heading: 2.25rem;
}
```

### Breakpoints Responsivos
```scss
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
$breakpoint-desktop: 1200px;
```

## 🌟 Exemplos de Uso

### Landing Page de Produto
- Destaque recursos principais
- Call-to-action para trial/demo
- Testimonials e social proof

### Landing Page de Serviço
- Explique benefícios
- Mostre cases de sucesso
- Formulário de contato proeminente

### Landing Page de App
- Screenshots do app
- Funcionalidades principais
- Links para download

## 📊 Performance

- **Lighthouse Score**: 95+ em Performance, Accessibility, Best Practices, SEO
- **Core Web Vitals**: Otimizado para LCP, FID, CLS
- **Bundle Size**: ~50KB gzipped
- **First Paint**: < 1.5s

## 🔒 Compatibilidade

- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Codessa Growing**: v1.0.0+
- **Vite**: v4.0.0+
- **Sass**: v1.60.0+

## 📝 Licença

MIT License - veja LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📞 Suporte

Para suporte, visite nossa documentação ou abra uma issue no repositório.