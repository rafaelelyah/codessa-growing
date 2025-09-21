# Codessa Growing — Leafs

Este documento descreve as **Leafs**, a camada de **customização visual final** no Codessa Growing. As Leafs são os **modificadores visuais** que aplicam o toque final nos componentes, permitindo personalizações específicas sem alterar a estrutura funcional dos Trunks.

---

## Índice

- [O que são Leafs?](#o-que-são-leafs)
- [Filosofia Leaf Touch](#filosofia-leaf-touch)
- [Como as Leafs se Relacionam com o Sistema](#como-as-leafs-se-relacionam-com-o-sistema)
- [Estrutura das Leafs](#estrutura-das-leafs)
- [Padrões de Nomenclatura](#padrões-de-nomenclatura)
- [Exemplos Práticos](#exemplos-práticos)
- [Boas Práticas](#boas-práticas)

---

## O que são Leafs?

As Leafs são a **camada de personalização visual** que permite modificar cores, tamanhos, estados e efeitos visuais dos componentes sem alterar sua estrutura funcional. Elas representam o "gran finale" do sistema, aplicando customizações específicas que dão identidade única a cada implementação.

Ao contrário dos Trunks (que definem estrutura) e Sprouts (que definem comportamento), as Leafs focam exclusivamente na **aparência visual** e podem ser aplicadas em qualquer componente do sistema. Elas são os **modificadores** que cuidam dos detalhes, dos pequenos ajustes e das modificações que fazem toda a diferença na experiência visual final.

## Filosofia Leaf Touch

A filosofia **Leaf Touch** orienta a aplicação do toque final nos componentes do Codessa Growing:

*   **Toque Final:** As Leafs aplicam o **acabamento visual** que dá personalidade e refinamento aos componentes
*   **Detalhes que Importam:** Cuidam dos pequenos ajustes que fazem a diferença na experiência visual
*   **Modificadores Especiais:** São os modificadores que refinam cores, tamanhos, efeitos e estados
*   **Composição Aditiva:** Múltiplas Leafs podem ser combinadas para criar efeitos visuais complexos
*   **Separação de Responsabilidades:** Estrutura (Trunks) vs Aparência (Leafs) vs Comportamento (Sprouts)
*   **Reutilização Máxima:** Uma Leaf pode ser aplicada a qualquer componente compatível
*   **Manutenibilidade:** Customizações ficam isoladas e não afetam a estrutura base

## Como as Leafs se Relacionam com o Sistema

```
Seeds → Soils → Sprouts → Trunks → Leafs
     ↑           ↑         ↑        ↑       ↑
  Valores    Variáveis   Mixins   Componentes  Customizações
  Base       Semânticas  Funcionais  Estruturais   Visuais
```

As Leafs são a **camada final** que customiza a aparência dos componentes já estruturados pelos Trunks. Elas aplicam o **toque final** que transforma componentes funcionais em elementos visualmente refinados e únicos.

## Estrutura das Leafs

As Leafs são organizadas em arquivos específicos dentro da pasta `src/terrain/leafs/`:

```
leafs/
├── _colors.scss      # Modificadores de cor
├── _sizes.scss       # Modificadores de tamanho
├── _effects.scss     # Sombras, bordas, efeitos
├── _states.scss      # Estados especiais (hover, focus, etc.)
├── _themes.scss      # Temas completos
└── _index.scss       # Ponto de entrada
```

### Cores (`_colors.scss`)
```scss
// Cores de fundo
.leaf-bg-primary { background-color: var(--interactive-primary) !important; }
.leaf-bg-secondary { background-color: var(--interactive-secondary) !important; }
.leaf-bg-success { background-color: var(--feedback-success) !important; }
.leaf-bg-warning { background-color: var(--feedback-warning) !important; }
.leaf-bg-error { background-color: var(--feedback-error) !important; }

// Cores de texto
.leaf-text-primary { color: var(--text-primary) !important; }
.leaf-text-secondary { color: var(--text-secondary) !important; }
.leaf-text-muted { color: var(--text-muted) !important; }

// Bordas
.leaf-border-primary { border-color: var(--interactive-primary) !important; }
.leaf-border-secondary { border-color: var(--interactive-secondary) !important; }
```

### Tamanhos (`_sizes.scss`)
```scss
// Tamanhos de fonte
.leaf-text-xs { font-size: var(--text-xs) !important; }
.leaf-text-sm { font-size: var(--text-sm) !important; }
.leaf-text-lg { font-size: var(--text-lg) !important; }
.leaf-text-xl { font-size: var(--text-xl) !important; }

// Espaçamentos
.leaf-spacing-xs { padding: var(--gap-xs) !important; }
.leaf-spacing-sm { padding: var(--gap-sm) !important; }
.leaf-spacing-lg { padding: var(--gap-lg) !important; }

// Larguras
.leaf-width-sm { width: var(--container-sm) !important; }
.leaf-width-md { width: var(--container-md) !important; }
.leaf-width-full { width: var(--container-full) !important; }
```

### Efeitos (`_effects.scss`)
```scss
// Sombras
.leaf-shadow-sm { box-shadow: var(--shadow-sm) !important; }
.leaf-shadow-md { box-shadow: var(--shadow-md) !important; }
.leaf-shadow-lg { box-shadow: var(--shadow-lg) !important; }

// Bordas
.leaf-rounded-sm { border-radius: var(--radius-sm) !important; }
.leaf-rounded-md { border-radius: var(--radius-md) !important; }
.leaf-rounded-full { border-radius: var(--radius-full) !important; }

// Efeitos especiais
.leaf-glow { box-shadow: 0 0 20px var(--interactive-primary) !important; }
.leaf-outline { outline: 2px solid var(--interactive-primary) !important; }
```

### Estados (`_states.scss`)
```scss
// Estados permanentes
.leaf-hover-lift { transform: translateY(-2px); transition: transform 0.2s ease; }
.leaf-hover-glow { transition: box-shadow 0.2s ease; }
.leaf-hover-glow:hover { box-shadow: 0 0 20px var(--interactive-primary); }

// Estados de foco
.leaf-focus-ring { outline: 2px solid var(--focus-ring); outline-offset: 2px; }

// Estados especiais
.leaf-loading { opacity: 0.7; pointer-events: none; }
.leaf-disabled { opacity: 0.5; pointer-events: none; }
.leaf-hidden { display: none !important; }
```

## Padrões de Nomenclatura

As Leafs seguem um padrão de nomenclatura consistente:

```
.leaf-{categoria}-{valor}
```

**Categorias principais:**
- `bg-*` - Background colors
- `text-*` - Text colors
- `border-*` - Border colors
- `shadow-*` - Box shadows
- `rounded-*` - Border radius
- `text-*` - Font sizes
- `spacing-*` - Paddings/margins
- `width-*` - Widths
- `height-*` - Heights

**Exemplos:**
```scss
.leaf-bg-primary      // Fundo primário
.leaf-text-secondary  // Texto secundário
.leaf-shadow-lg       // Sombra grande
.leaf-rounded-full    // Bordas totalmente arredondadas
.leaf-text-xl         // Texto extra grande
.leaf-spacing-lg      // Espaçamento grande
```

## Exemplos Práticos

### Customizando um Botão
```html
<!-- Botão base do Trunk -->
<button class="trunk-button">Botão</button>

<!-- Com customizações visuais -->
<button class="trunk-button leaf-bg-primary leaf-text-on-primary leaf-shadow-md leaf-rounded-md">
  Botão Customizado
</button>
```

### Customizando um Card
```html
<!-- Card base -->
<div class="trunk-card">
  <h3>Título</h3>
  <p>Conteúdo</p>
</div>

<!-- Card customizado -->
<div class="trunk-card leaf-bg-secondary leaf-text-primary leaf-shadow-lg leaf-rounded-lg leaf-spacing-lg">
  <h3 class="leaf-text-xl">Título Grande</h3>
  <p class="leaf-text-secondary">Conteúdo com texto secundário</p>
</div>
```

### Estados Interativos
```html
<!-- Elemento com estados especiais -->
<div class="trunk-card leaf-hover-lift leaf-focus-ring">
  <p>Este card levanta no hover e tem foco acessível</p>
</div>
```

## Boas Práticas

### ✅ Faça
- Use `!important` para garantir que as Leafs sobrescrevam os estilos base
- Combine múltiplas Leafs no mesmo elemento
- Use variáveis CSS (`var(--*)`) para manter consistência
- Documente suas Leafs customizadas
- Teste combinações de Leafs em diferentes componentes
- Use Leafs como modificadores para refinar detalhes visuais

### ❌ Não Faça
- Não use Leafs para alterar estrutura (display, position, flexbox)
- Não crie Leafs que conflitem entre si
- Não use valores hardcoded (sempre use variáveis)
- Não modifique os arquivos base do sistema
- Não use Leafs para lógica JavaScript
- Não use Leafs para mudanças estruturais - elas são apenas modificadores visuais

### 💡 Dicas
- **Ordem importa:** Aplique Leafs após os Trunks no HTML
- **Teste combinações:** Verifique como as Leafs interagem
- **Documentação:** Mantenha registro das suas Leafs customizadas
- **Performance:** Use apenas as Leafs necessárias
- **Acessibilidade:** Considere contraste e foco nas suas customizações
- **Detalhes fazem diferença:** As Leafs cuidam dos pequenos ajustes que refinam a experiência

---

As Leafs representam a **flexibilidade máxima** do Codessa Growing, permitindo que cada implementação tenha sua identidade visual única enquanto mantém a consistência estrutural do sistema. Elas são os **modificadores** que cuidam dos detalhes, dos pequenos ajustes e das modificações que fazem toda a diferença na experiência visual final.