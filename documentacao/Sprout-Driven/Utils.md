# Utils

## Sumário
- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura do Módulo](#estrutura-do-módulo)
- [Funções Matemáticas](#funções-matemáticas)
- [Manipulação de Cores](#manipulação-de-cores)
- [Utilitários de String](#utilitários-de-string)
- [Funções de Lista](#funções-de-lista)
- [Ferramentas de Debug](#ferramentas-de-debug)
- [Utilitários CSS](#utilitários-css)
- [Helpers de Performance](#helpers-de-performance)
- [Utilitários de Desenvolvimento](#utilitários-de-desenvolvimento)
- [Integração com Trunks](#integração-com-trunks)
- [Boas Práticas](#boas-práticas)
- [Customização](#customização)
- [Debugging](#debugging)
- [Documentação Técnica dos Sprouts](#documentação-técnica-dos-sprouts)
  - [List Reset](#list-reset)
  - [Debug Helpers](#debug-helpers)
  - [Dependências e Variáveis](#dependências-e-variáveis)
  - [Notas de Uso](#notas-de-uso)
- [Próximos Passos](#próximos-passos)

## Visão Geral

O módulo Utils fornece utilitários gerais e helpers para desenvolvimento CSS, incluindo funções matemáticas, manipulação de cores, utilitários de layout, debugging helpers e ferramentas de desenvolvimento.

## Funcionalidades Principais

### Funções Utilitárias
- **Math functions:** Funções matemáticas avançadas
- **Color manipulation:** Manipulação de cores
- **String utilities:** Utilitários de string
- **List utilities:** Funções para listas

### Helpers de Desenvolvimento
- **Debug utilities:** Ferramentas de debug
- **Print styles:** Estilos para impressão
- **Reset utilities:** Utilitários de reset
- **Performance helpers:** Otimizações de performance

### Utilitários Gerais
- **Layout helpers:** Helpers de layout
- **Animation utilities:** Utilitários de animação
- **Border utilities:** Utilitários de borda
- **Shadow utilities:** Utilitários de sombra

## Estrutura do Módulo

```
utils/
├── _math.scss          # Funções matemáticas
├── _color.scss         # Manipulação de cores
├── _string.scss        # Utilitários de string
├── _list.scss          # Funções de lista
├── _debug.scss         # Ferramentas de debug
├── _performance.scss   # Otimizações de performance
├── _helpers.scss       # Helpers gerais
└── _utilities.scss     # Utilitários CSS
```

## Funções Matemáticas

### Operações Básicas
```scss
// Funções matemáticas
$value: sprout-math-add(10, 5);        // 15
$value: sprout-math-subtract(10, 5);   // 5
$value: sprout-math-multiply(10, 5);   // 50
$value: sprout-math-divide(10, 5);     // 2
```

### Funções Avançadas
```scss
// Funções avançadas
$value: sprout-math-pow(2, 3);         // 8
$value: sprout-math-sqrt(16);          // 4
$value: sprout-math-round(3.7);        // 4
$value: sprout-math-ceil(3.1);         // 4
$value: sprout-math-floor(3.9);        // 3
```

### Utilitários Numéricos
```scss
// Utilitários numéricos
$value: sprout-math-clamp(5, 0, 10);   // 5 (entre 0 e 10)
$value: sprout-math-min(5, 10, 15);    // 5
$value: sprout-math-max(5, 10, 15);    // 15
$value: sprout-math-abs(-5);           // 5
```

## Manipulação de Cores

### Funções de Cor
```scss
// Manipulação básica
$lighter: sprout-color-lighten(#3498db, 20%);
$darker: sprout-color-darken(#3498db, 20%);
$saturated: sprout-color-saturate(#3498db, 20%);
$desaturated: sprout-color-desaturate(#3498db, 20%);
```

### Mistura de Cores
```scss
// Mistura de cores
$mixed: sprout-color-mix(#3498db, #e74c3c, 50%);
$overlay: sprout-color-overlay(#3498db, #e74c3c, 0.3);
```

### Contraste e Acessibilidade
```scss
// Verificação de contraste
$contrast: sprout-color-contrast(#ffffff, #000000);  // 21
$is-accessible: sprout-color-is-accessible(#ffffff, #000000);  // true
```

### Paletas de Cor
```scss
// Geração de paletas
$palette: sprout-color-palette(#3498db, 5);
$complementary: sprout-color-complementary(#3498db);
$triadic: sprout-color-triadic(#3498db);
```

## Utilitários de String

### Manipulação de Strings
```scss
// Funções de string
$upper: sprout-string-uppercase('hello');           // 'HELLO'
$lower: sprout-string-lowercase('HELLO');           // 'hello'
$capitalized: sprout-string-capitalize('hello world'); // 'Hello World'
$slug: sprout-string-slug('Hello World!');          // 'hello-world'
```

### Formatação
```scss
// Formatação de string
$quoted: sprout-string-quote('hello');              // '"hello"'
$unquoted: sprout-string-unquote('"hello"');        // 'hello'
$escaped: sprout-string-escape('hello"world');      // 'hello\"world'
```

### Utilitários de Texto
```scss
// Utilitários de texto
$length: sprout-string-length('hello');             // 5
$contains: sprout-string-contains('hello', 'ell');  // true
$starts-with: sprout-string-starts-with('hello', 'he'); // true
$ends-with: sprout-string-ends-with('hello', 'lo'); // true
```

## Funções de Lista

### Operações com Listas
```scss
// Operações básicas
$length: sprout-list-length((a b c));               // 3
$first: sprout-list-first((a b c));                 // a
$last: sprout-list-last((a b c));                   // c
$rest: sprout-list-rest((a b c));                   // b c
```

### Manipulação Avançada
```scss
// Manipulação avançada
$reversed: sprout-list-reverse((a b c));            // c b a
$unique: sprout-list-unique((a b a c));             // a b c
$flattened: sprout-list-flatten((a (b c) d));       // a b c d
$joined: sprout-list-join((a b c), ', ');           // 'a, b, c'
```

### Busca e Filtros
```scss
// Busca e filtros
$index: sprout-list-index-of((a b c), b);           // 2
$contains: sprout-list-contains((a b c), b);        // true
$filtered: sprout-list-filter((1 2 3 4), $value > 2); // 3 4
$mapped: sprout-list-map((1 2 3), $value * 2);      // 2 4 6
```

## Ferramentas de Debug

### Debug Visual
```scss
// Debug visual
.debug-element {
  @include sprout-debug-outline(red);
  @include sprout-debug-background(rgba(255, 0, 0, 0.1));
}
```

### Debug de Layout
```scss
// Debug de layout
.debug-layout {
  @include sprout-debug-grid();
  @include sprout-debug-spacing();
}
```

### Debug de Performance
```scss
// Debug de performance
.debug-performance {
  @include sprout-debug-paint();
  @include sprout-debug-repaint();
}
```

## Utilitários CSS

### Layout Utilities
```scss
// Utilitários de layout
.clearfix { @include sprout-util-clearfix(); }
.center-block { @include sprout-util-center-block(); }
.center-text { @include sprout-util-center-text(); }
```

### Display Utilities
```scss
// Utilitários de display
.block { @include sprout-util-display(block); }
.inline { @include sprout-util-display(inline); }
.inline-block { @include sprout-util-display(inline-block); }
.flex { @include sprout-util-display(flex); }
.grid { @include sprout-util-display(grid); }
.none { @include sprout-util-display(none); }
```

### Position Utilities
```scss
// Utilitários de position
.relative { @include sprout-util-position(relative); }
.absolute { @include sprout-util-position(absolute); }
.fixed { @include sprout-util-position(fixed); }
.sticky { @include sprout-util-position(sticky); }
```

### Overflow Utilities
```scss
// Utilitários de overflow
.overflow-hidden { @include sprout-util-overflow(hidden); }
.overflow-scroll { @include sprout-util-overflow(scroll); }
.overflow-auto { @include sprout-util-overflow(auto); }
```

## Helpers de Performance

### CSS Containment
```scss
// Containment para performance
.performance-container {
  @include sprout-performance-contain(layout);
  @include sprout-performance-contain(style);
  @include sprout-performance-contain(paint);
}
```

### Will-Change
```scss
// Otimização de animações
.animated-element {
  @include sprout-performance-will-change(transform);
}
```

### GPU Acceleration
```scss
// Aceleração por GPU
.gpu-accelerated {
  @include sprout-performance-gpu();
}
```

## Utilitários de Desenvolvimento

### Print Styles
```scss
// Estilos para impressão
@media print {
  .no-print {
    @include sprout-print-hide();
  }

  .print-only {
    @include sprout-print-show();
  }
}
```

### Reset Utilities
```scss
// Utilitários de reset
.reset-margin { @include sprout-reset-margin(); }
.reset-padding { @include sprout-reset-padding(); }
.reset-list { @include sprout-reset-list(); }
.reset-all { @include sprout-reset-all(); }
```

### Vendor Prefixes
```scss
// Prefixos de vendor
.prefixed-property {
  @include sprout-vendor-prefix(transform, rotate(45deg));
  @include sprout-vendor-prefix(transition, all 0.3s ease);
}
```

## Integração com Trunks

Os utils são aplicados automaticamente pelos componentes:

```scss
// Button com utils
.btn {
  @include trunk-button();

  // Utils incluídos:
  // - Color manipulation
  // - Math functions
  // - Layout helpers
  // - Performance optimizations
}
```

## Boas Práticas

### Uso Eficiente
- Use funções apenas quando necessário
- Evite cálculos complexos em runtime
- Cache valores calculados quando possível
- Minimize uso de debug em produção

### Performance
- Use containment para isolamento
- Otimize animações com will-change
- Minimize repaints e reflows
- Use GPU acceleration apropriadamente

### Desenvolvimento
- Use debug tools durante desenvolvimento
- Remova debug code em produção
- Documente funções customizadas
- Mantenha compatibilidade cross-browser

## Customização

### Funções Customizadas
```scss
// Função customizada
@function my-custom-function($value) {
  @return sprout-math-clamp($value, 0, 100);
}

.my-element {
  width: my-custom-function(150px); // 100px
}
```

### Mixins Customizados
```scss
// Mixin customizado
@mixin my-custom-debug() {
  @include sprout-debug-outline(blue);
  @include sprout-debug-background(rgba(0, 0, 255, 0.1));
}

.debug-custom {
  @include my-custom-debug();
}
```

## Debugging

### Problemas Comuns
- **Funções não funcionam:** Verifique sintaxe Sass
- **Performance ruim:** Use ferramentas de profiling
- **Debug não aparece:** Verifique especificidade CSS
- **Vendor prefixes:** Teste em múltiplos browsers

### Ferramentas de Debug
- Chrome DevTools Performance tab
- Sassmeister para testar funções
- Browser developer tools
- CSS debugging extensions

---

## Documentação Técnica dos Sprouts

Esta seção documenta todos os sprouts (mixins) disponíveis no arquivo `_utils.scss`, com suas funções específicas, parâmetros aceitos e valores esperados.

### Reset Utilities

#### `sprout-list-reset()`
**Função:** Remove estilos padrão de listas (list-style, margin, padding).

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.custom-list {
  @include sprout-list-reset();
}

// Resultado CSS:
// list-style: none;
// margin: 0;
// padding: 0;
```

#### `sprout-button-reset()`
**Função:** Remove todos os estilos padrão de botões para criar uma base limpa.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.custom-button {
  @include sprout-button-reset();
}

// Resultado CSS:
// background: none;
// border: none;
// padding: 0;
// margin: 0;
// font: inherit;
// color: inherit;
// cursor: pointer;
// outline: none;
```

#### `sprout-link-reset()`
**Função:** Remove estilos padrão de links mantendo a cor e decoração herdadas.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.custom-link {
  @include sprout-link-reset();
}

// Resultado CSS:
// color: inherit;
// text-decoration: none;
//
// &:hover,
// &:focus {
//   color: inherit;
//   text-decoration: none;
// }
```

### Visibility Utilities

#### `sprout-hidden()`
**Função:** Esconde completamente o elemento usando display: none.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.hidden-element {
  @include sprout-hidden();
}

// Resultado CSS:
// display: none !important;
```

#### `sprout-visible()`
**Função:** Torna o elemento visível usando display: block.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.visible-element {
  @include sprout-visible();
}

// Resultado CSS:
// display: block !important;
```

#### `sprout-invisible()`
**Função:** Torna o elemento invisível mas mantém o espaço ocupado usando visibility: hidden.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.invisible-element {
  @include sprout-invisible();
}

// Resultado CSS:
// visibility: hidden !important;
```

#### `sprout-visible-all()`
**Função:** Torna o elemento completamente visível usando visibility: visible.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.visible-all-element {
  @include sprout-visible-all();
}

// Resultado CSS:
// visibility: visible !important;
```

### Position Utilities

#### `sprout-relative()`
**Função:** Define position: relative no elemento.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.relative-element {
  @include sprout-relative();
}

// Resultado CSS:
// position: relative !important;
```

#### `sprout-absolute()`
**Função:** Define position: absolute no elemento.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.absolute-element {
  @include sprout-absolute();
}

// Resultado CSS:
// position: absolute !important;
```

### Display Utilities

#### `sprout-block()`
**Função:** Define display: block no elemento.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.block-element {
  @include sprout-block();
}

// Resultado CSS:
// display: block !important;
```

#### `sprout-inline()`
**Função:** Define display: inline no elemento.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.inline-element {
  @include sprout-inline();
}

// Resultado CSS:
// display: inline !important;
```

#### `sprout-inline-block()`
**Função:** Define display: inline-block no elemento.

**Parâmetros:** Nenhum

**Exemplo:**
```scss
.inline-block-element {
  @include sprout-inline-block();
}

// Resultado CSS:
// display: inline-block !important;
```

### Debug Helpers

#### `sprout-debug-outline()`
**Função:** Adiciona um outline colorido para debug visual de elementos.

**Parâmetros:**
- `$color` (String): Cor do outline - valores CSS válidos (padrão: `'red'`)

**Exemplo:**
```scss
.debug-header {
  @include sprout-debug-outline('blue');
}

.debug-sidebar {
  @include sprout-debug-outline('#ff0000');
}

// Resultado CSS:
// outline: var(--border-width-1) solid blue;
// outline: var(--border-width-1) solid #ff0000;
```

#### `sprout-debug-bg()`
**Função:** Adiciona uma cor de fundo para debug visual de elementos.

**Parâmetros:**
- `$color` (String): Cor do background - valores CSS válidos (padrão: `'red'`)

**Exemplo:**
```scss
.debug-section {
  @include sprout-debug-bg('rgba(255, 0, 0, 0.1)');
}

.debug-container {
  @include sprout-debug-bg('#ffff00');
}

// Resultado CSS:
// background-color: rgba(255, 0, 0, 0.1) !important;
// background-color: #ffff00 !important;
```

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--border-width-1`: Largura padrão da borda (usada em `sprout-debug-outline()`)

### Notas de Uso

- **Debug:** Use `sprout-debug-outline()` e `sprout-debug-bg()` apenas durante desenvolvimento
- **Performance:** Remova todos os mixins de debug em produção
- **Consistência:** Use cores consistentes para debug em todo o projeto
- **Limpeza:** Sempre limpe código de debug antes de deploy
- **Resets:** Use os mixins de reset como base para componentes customizados
- **Visibility:** Use `sprout-hidden()` para remover elementos do layout, `sprout-invisible()` para manter o espaço
- **Position:** Estes são utilitários básicos; para posicionamento avançado, use os mixins de `behaviors.scss`

## Próximos Passos

- [ ] Implementar funções CSS custom properties
- [ ] Adicionar suporte a CSS-in-JS integration
- [ ] Criar sistema de theming avançado
- [ ] Otimizar para build tools modernos