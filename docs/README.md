# Documentação Growing

Bem-vindo à documentação completa do sistema Growing! Este é um framework CSS modular para desenvolvimento de interfaces modernas, focado em produtividade, performance e manutenibilidade.

## Visão Geral

O Growing é um sistema de design e desenvolvimento que utiliza uma arquitetura em camadas para criar interfaces consistentes e reutilizáveis:

- **Seeds** → **Soils** → **Sprouts** → **Trunks** → **Tree**
- Sprouts constroem Trunks, Trunks são componentes finais
- Leafs são ajustes pontuais de estilo
- Desenvolvimento direto no Tree (sem my-tree intermediário)

## Estrutura da Documentação

### [Primeiros Passos](./primeiros-passos.md)
- Introdução ao sistema
- Instalação e configuração inicial
- Primeiro projeto
- Conceitos fundamentais

### [Arquitetura](./arquitetura/)
- [Visão Geral](./arquitetura/visao-geral.md) - Arquitetura completa do sistema
- [Foundation](./arquitetura/foundation.md) - Base e princípios
- [Seeds](./arquitetura/seeds.md) - Sistema de tokens
- [Soils](./arquitetura/soils.md) - Camada de variáveis
- [Sprouts](./arquitetura/sprouts.md) - Construtores de componentes
- [Trunks](./arquitetura/trunks.md) - Componentes finais
- [Leafs](./arquitetura/leafs.md) - Ajustes pontuais

### [Componentes](./componentes/)
- [Trees](./componentes/trees.md) - Ambiente de desenvolvimento
- [Guias de Uso](./componentes/guias-uso/)

### [Ferramentas](./ferramentas/)
- [Grow Manager](./ferramentas/grow-manager.md) - Gerenciamento de componentes
- [Comandos CLI](./ferramentas/comandos-cli.md) - Interface de linha de comando
- [Utilitários](./ferramentas/utilitarios.md) - Ferramentas auxiliares

### [Guias Práticos](./guias/)
- [Instalação](./guias/instalacao.md) - Como instalar e configurar
- [Desenvolvimento](./guias/desenvolvimento.md) - Fluxo de desenvolvimento
- [Melhores Práticas](./guias/melhores-praticas.md) - Padrões e convenções

### [Referência](./referencia/)
- [API](./referencia/api.md) - Documentação técnica completa
- [Configuração](./referencia/configuracao.md) - Todas as opções de configuração
- [Solução de Problemas](./referencia/solucao-problemas.md) - Debugging e troubleshooting

## Como Usar Hoje

### Instalação e Configuração
```bash
# Clone o repositório
git clone https://github.com/rafaelelyah/codessa-growing.git
cd codessa-growing

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Estrutura Atual do Projeto
```
Growing/
├── src/
│   ├── main.scss          # Arquivo principal SCSS
│   ├── groves/            # Componentes estruturais
│   ├── harvest/           # Sistema de colheita
│   ├── sparks/            # Utilitários e mixins
│   └── terrain/           # Layout e grids
├── Nest/
│   ├── cli.py            # CLI Python para gerenciamento
│   ├── Grow/
│   │   └── grow.js       # Sistema de crescimento
│   └── Tools/            # Ferramentas auxiliares
└── docs/                 # Esta documentação
```

### Comandos Disponíveis
```bash
# Desenvolvimento
npm run dev              # Inicia servidor Vite
npm run build           # Build para produção
npm run preview         # Preview do build

# Sistema Nest (Python)
npm run nest:status     # Status do sistema
npm run nest:grow       # Executar crescimento
npm run nest:tools      # Ferramentas disponíveis

# Sistema Grow (JavaScript)
npm run grow            # Interface de crescimento
npm run grow:help       # Ajuda do sistema Grow
npm run grow:validate   # Validação do sistema
```

## Conceitos Chave

### Camadas do Sistema

1. **Seeds** - Tokens de design (cores, tipografia, espaçamento)
2. **Soils** - Utilitários base e mixins SCSS
3. **Sprouts** - Funções construtoras de componentes
4. **Trunks** - Componentes Web Components finais
5. **Leafs** - Classes utilitárias para ajustes pontuais

### Desenvolvimento no Tree

O Tree é o ambiente onde você desenvolve diretamente usando SCSS:

```scss
// src/main.scss
@use 'soils' as *;

// Seu código personalizado
.my-custom-component {
  @include sprout-button();
  @extend %trunk-header;
}
```

## Ferramentas Disponíveis

### Sistema Nest (Python)
```bash
# Verificar status do sistema
npm run nest:status

# Executar operações de crescimento
npm run nest:grow

# Acessar ferramentas
npm run nest:tools
```

### Sistema Grow (JavaScript)
```bash
# Interface principal
npm run grow

# Ajuda do sistema
npm run grow:help

# Validação
npm run grow:validate
```

## Sistema de Design

### Design Tokens Atuais
```scss
// Cores (seeds/colors.scss)
$color-primary: #0066cc;
$color-secondary: #666666;
$color-success: #28a745;

// Tipografia
$font-family-base: 'Inter', sans-serif;
$font-size-base: 1rem;

// Espaçamento
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
```

### Estrutura SCSS Atual
- **seeds/** - Valores base e tokens
- **soils/** - Variáveis semânticas
- **sprouts/** - Mixins construtores
- **trunks/** - Componentes estruturais
- **leafs/** - Modificadores e utilitários

## Performance

### Otimizações Incluídas
- **Vite** - Build rápido e otimizado
- **PurgeCSS** - Remove CSS não utilizado automaticamente
- **SCSS** - Pré-processamento eficiente
- **Tree Shaking** - Eliminação de código morto

## 🔧 Configuração

### Vite Configuration
```javascript
// vite.config.js
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

## 📱 Suporte

### Navegadores Suportados
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Tecnologias
- **CSS/SCSS** - Estilização principal
- **Vite** - Build tool e dev server
- **Python** - Sistema Nest para gerenciamento
- **Node.js** - Sistema Grow e ferramentas

## Roadmap

Confira nosso [ROADMAP](../../project-docs/ROADMAP.md) para ver as próximas funcionalidades planejadas, incluindo:

- Sistema de temas dark/light
- Expansão da biblioteca de componentes
- Testes automatizados
- Documentação multilíngue
- Sistema de plugins

## Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Desenvolvimento Local
```bash
# Clone e instale
git clone https://github.com/rafaelelyah/codessa.git
cd codessa/Apps/Growing
npm install

# Desenvolvimento
npm run dev

# Build
npm run build
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

## Suporte

- **GitHub Issues:** Para bugs e solicitações
- **Documentação:** Esta documentação completa
- **Comunidade:** Participe das discussões no repositório

---

**Próximos Passos:**
1. Leia os [Primeiros Passos](./primeiros-passos.md)
2. Configure o ambiente seguindo os comandos acima
3. Explore os [Componentes](./componentes/) disponíveis
4. Consulte o [ROADMAP](../../project-docs/ROADMAP.md) para funcionalidades futuras

🎉 **Bem-vindo ao Growing!** Desenvolvendo interfaces modernas nunca foi tão produtivo.