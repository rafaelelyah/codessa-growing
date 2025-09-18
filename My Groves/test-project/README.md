# Example Project - Codessa Growing

Este é um projeto exemplo que demonstra como usar o sistema Codessa Growing com foundation customizada e processamento completo.

## 🔄 Sistema de Processamento

O sistema segue este fluxo:

1. **Terrain** → Fornece base (seeds, soils, foundation, veins)
2. **Foundation** → Customiza (seeds.scss, soil.scss, bark.scss)
3. **Tree** → Usa tudo processado (componentes específicos)

## 📁 Estrutura Atual

```
example-project/
├── index.html          # HTML principal usando componentes da tree
├── src/main.js         # JavaScript do projeto
├── foundation/         # Foundation customizada
│   ├── _index.scss     # Junta tudo + @forward da tree
│   ├── seeds.scss      # Cores e valores customizados
│   ├── soil.scss       # Variáveis CSS customizadas
│   └── bark.scss       # Estilos HTML customizados
├── tree.scss           # Componentes específicos (@forward da foundation)
├── config.json         # Configuração do projeto
├── vite.config.js      # Configuração Vite própria
├── package.json        # Dependências e scripts
└── dist/               # Arquivos de build (gerado)
```

## 🎨 Como Customizar

### 1. Cores (Seeds)
Edite `foundation/seeds.scss`:
```scss
$palette-seeds: (
  brand: (
    standard: (
      1: #FF6B35,    // Cor principal
      2: #FF8559,    // Variações
      3: #FF9E7D
    )
  )
);
```

### 2. Variáveis CSS (Soil)
Edite `foundation/soil.scss`:
```scss
:root {
  --text-xxl: 3.5rem;      // Tipografia maior
  --padding-md: 2rem;      // Espaçamentos maiores
  --section-spacing: 6rem; // Seções mais espaçadas
}
```

### 3. Estilos Base (Bark)
Edite `foundation/bark.scss`:
```scss
body {
  font-family: var(--font-base);
  background: var(--bg-primary);
}
```

### 4. Componentes (Tree)
Edite `tree.scss` para criar novos componentes:
```scss
// Novo componente
.my-component {
  @include sprout-project-card();
  background: var(--color-standard-1);
}
```

## � Como Usar

### Desenvolvimento
```bash
npm run dev      # Servidor de desenvolvimento
```

### Build
```bash
npm run build    # Build para produção
npm run preview  # Preview do build
```

## 🌱 Componentes Disponíveis

O `tree.scss` já inclui componentes prontos:

- **`.header`** - Cabeçalho com gradiente
- **`.card`** - Cards com variants (featured, outline)
- **`.btn`** - Botões com variants (secondary, ghost)
- **`.hero`** - Seção hero responsiva
- **`.feature-grid`** - Grid de features
- **`.project-highlight`** - Destaque de texto
- **`.project-badge`** - Badges customizados

## 📦 Build Independente

Este projeto constrói localmente em `./dist/` e pode ser deployado independentemente.

## 🎯 Benefícios do Sistema

- ✅ **Processamento completo**: Terrain → Foundation → Tree
- ✅ **Encapsulamento**: Foundation "embrulha" a tree
- ✅ **Flexibilidade**: Customize qualquer camada
- ✅ **Manutenibilidade**: Estrutura clara e organizada
- ✅ **Reutilização**: Use em múltiplos projetos

## 📚 Próximos Passos

1. **Explore os componentes** no `index.html`
2. **Customize as cores** no `seeds.scss`
3. **Ajuste as variáveis** no `soil.scss`
4. **Crie novos componentes** na `tree.scss`
5. **Use como template** para novos projetos