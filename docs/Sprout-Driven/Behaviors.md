# Behaviors

## Visão Geral

O módulo Behaviors contém mixins para controlar comportamentos dinâmicos dos componentes, incluindo posicionamento, transições, animações e efeitos visuais.

## Funcionalidades Principais

### Posicionamento Avançado
- **Position behaviors:** Controle preciso de posicionamento CSS
- **Sticky positioning:** Elementos que grudam na tela
- **Fixed positioning:** Elementos fixos na viewport
- **Element configurator:** Sistema completo de propriedades CSS

### Transições e Animações
- **CSS transitions:** Transições suaves entre estados
- **Fade animations:** Animações de opacidade
- **Keyframes:** Animações customizadas

### Efeitos Visuais
- **Scale effects:** Transformações de escala
- **Opacity effects:** Controle de transparência
- **Blur effects:** Efeitos de desfoque

## Estrutura do Módulo

```
behaviors.scss
├── Position Behaviors    # Mixins de posicionamento
├── Transitions          # Sistema de transições
├── Animations          # Animações e keyframes
├── Effects             # Efeitos visuais
└── Element Configurator # Configurador avançado
```

## Uso Básico

```scss
// Posicionamento avançado
.modal {
  @include sprout-fixed($position: center);
  @include sprout-transition($props: 'opacity, transform');
}

// Animações
.fade-in-element {
  @include sprout-animation-fade-in($duration: 'slow');
}

// Efeitos
.hover-scale {
  @include sprout-effect-scale($scale: 1.05);
}
```

## Integração com Trunks

Os behaviors são utilizados internamente pelos componentes trunk:

```scss
// Trunk usa behaviors internamente
.nav-sidebar {
  @include sprout-fixed($position: left);    // Behavior
  @include sprout-transition();              // Behavior
  // ... outras funcionalidades
}
```

## Boas Práticas

### Performance
- Use `transform` para animações em vez de propriedades de layout
- Minimize repaints com propriedades eficientes
- Considere `will-change` para animações frequentes

### Acessibilidade
- Respeite `prefers-reduced-motion`
- Garanta foco visível em todos os estados
- Teste interações em diferentes dispositivos

### Consistência
- Use variáveis CSS para durações e timings
- Mantenha padrões consistentes
- Documente comportamentos customizados

## Documentação Técnica dos Sprouts

### Position Behaviors

#### `sprout-position()`
**Função:** Define propriedades de posicionamento CSS de forma flexível.

**Parâmetros:**
- `$position` (String): Tipo de posicionamento - `'static'`, `'relative'`, `'absolute'`, `'fixed'`, `'sticky'` (padrão: `'static'`)
- `$top` (Unit/Null): Valor para `top` (padrão: `null`)
- `$left` (Unit/Null): Valor para `left` (padrão: `null`)
- `$right` (Unit/Null): Valor para `right` (padrão: `null`)
- `$bottom` (Unit/Null): Valor para `bottom` (padrão: `null`)
- `$z-index` (Number/Null): Valor para `z-index` (padrão: `null`)

**Exemplo:**
```scss
.custom-positioned {
  @include sprout-position(
    $position: absolute,
    $top: 10px,
    $left: 20px,
    $z-index: 10
  );
}
```

#### `sprout-sticky()`
**Função:** Aplica posicionamento sticky com valores pré-definidos.

**Parâmetros:**
- `$position` (String): Posição - `'top'`, `'bottom'`, `'left'`, `'right'` (padrão: `'top'`)

**Exemplo:**
```scss
.sticky-header {
  @include sprout-sticky($position: top);
}
```

#### `sprout-fixed()`
**Função:** Aplica posicionamento fixed com valores pré-definidos.

**Parâmetros:**
- `$position` (String): Posição - `'top'`, `'bottom'`, `'left'`, `'right'` (padrão: `'top'`)

**Exemplo:**
```scss
.fixed-nav {
  @include sprout-fixed($position: top);
}
```

### Pre-configured Positioning Sprouts

#### `sprout-fixed-top()`
**Função:** Posicionamento fixed no topo.

**Parâmetros:**
- `$width` (Unit): Largura (padrão: `100%`)
- `$height` (Unit): Altura (padrão: `auto`)
- `$z-index` (Number): Z-index (padrão: `1000`)

#### `sprout-fixed-bottom()`
**Função:** Posicionamento fixed na parte inferior.

**Parâmetros:**
- `$width` (Unit): Largura (padrão: `100%`)
- `$height` (Unit): Altura (padrão: `auto`)
- `$z-index` (Number): Z-index (padrão: `1000`)

#### `sprout-fixed-left()`
**Função:** Posicionamento fixed à esquerda.

**Parâmetros:**
- `$width` (Unit): Largura (padrão: `auto`)
- `$height` (Unit): Altura (padrão: `100vh`)
- `$z-index` (Number): Z-index (padrão: `1000`)

#### `sprout-fixed-right()`
**Função:** Posicionamento fixed à direita.

**Parâmetros:**
- `$width` (Unit): Largura (padrão: `auto`)
- `$height` (Unit): Altura (padrão: `100vh`)
- `$z-index` (Number): Z-index (padrão: `1000`)

#### `sprout-sticky-top()`
**Função:** Posicionamento sticky no topo.

**Parâmetros:**
- `$z-index` (Number): Z-index (padrão: `100`)

#### `sprout-sticky-bottom()`
**Função:** Posicionamento sticky na parte inferior.

**Parâmetros:**
- `$z-index` (Number): Z-index (padrão: `100`)

#### `sprout-floating-center()`
**Função:** Botão flutuante centralizado.

**Parâmetros:**
- `$size` (Unit): Tamanho (padrão: `56px`)
- `$z-index` (Number): Z-index (padrão: `999`)

### Transitions

#### `sprout-transition()`
**Função:** Aplica transições CSS usando variáveis do sistema.

**Parâmetros:**
- `$props` (String): Propriedades para animar (padrão: `'all'`)
- `$duration` (String): Duração - `'fast'`, `'base'`, `'slow'` (padrão: `'base'`)
- `$timing` (String): Função de temporização (padrão: `'smooth'`)

**Exemplo:**
```scss
.interactive-element {
  @include sprout-transition(
    $props: 'background-color, transform',
    $duration: 'fast'
  );
}
```

### Animations

#### `sprout-animation-fade-in()`
**Função:** Animação de fade-in.

**Parâmetros:**
- `$duration` (String): Duração (padrão: `'base'`)

**Exemplo:**
```scss
.fade-in-content {
  @include sprout-animation-fade-in($duration: 'slow');
}
```

#### `sprout-animation-fade-out()`
**Função:** Animação de fade-out.

**Parâmetros:**
- `$duration` (String): Duração (padrão: `'base'`)

**Exemplo:**
```scss
.fade-out-content {
  @include sprout-animation-fade-out($duration: 'fast');
}
```

### Effects

#### `sprout-effect-scale()`
**Função:** Aplica transformação de escala.

**Parâmetros:**
- `$scale` (Number): Fator de escala (padrão: `1.05`)

**Exemplo:**
```scss
.hover-scale {
  @include sprout-effect-scale($scale: 1.1);
}
```

#### `sprout-effect-muted()`
**Função:** Aplica opacidade reduzida.

**Parâmetros:**
- `$opacity` (String): Valor de opacidade (padrão: `'6'`)

**Exemplo:**
```scss
.muted-text {
  @include sprout-effect-muted($opacity: '4');
}
```

#### `sprout-effect-blur()`
**Função:** Aplica efeito de desfoque.

**Parâmetros:**
- `$amount` (Unit): Quantidade de desfoque (padrão: `4px`)

**Exemplo:**
```scss
.blur-background {
  @include sprout-effect-blur($amount: 8px);
}
```

### Element Configurator

#### `sprout-element()`
**Função:** Configurador avançado de propriedades CSS.

**Parâmetros:**
- `$width` (Unit/Null): Largura
- `$height` (Unit/Null): Altura
- `$min-width` (Unit/Null): Largura mínima
- `$min-height` (Unit/Null): Altura mínima
- `$max-width` (Unit/Null): Largura máxima
- `$max-height` (Unit/Null): Altura máxima
- `$position` (String/Null): Posicionamento
- `$top` (Unit/Null): Top
- `$left` (Unit/Null): Left
- `$right` (Unit/Null): Right
- `$bottom` (Unit/Null): Bottom
- `$z-index` (Number/Null): Z-index

**Exemplo:**
```scss
.custom-element {
  @include sprout-element(
    $width: 200px,
    $height: 100px,
    $position: absolute,
    $top: 50%,
    $left: 50%,
    $z-index: 100
  );
}
```

### Keyframes Definidos

#### `sprout-fade-in`
Animação de fade-in de opacidade 0 para 1.

#### `sprout-fade-out`
Animação de fade-out de opacidade 1 para 0.

### Dependências e Variáveis

**Variáveis CSS necessárias:**
- `--z-index-sticky`: Z-index para sticky
- `--z-index-fixed`: Z-index para fixed
- `--duration-fast`: Duração rápida
- `--duration-base`: Duração base
- `--duration-slow`: Duração lenta
- `--timing-smooth`: Timing function suave
- `--opacity-1` até `--opacity-6`: Valores de opacidade

### Notas de Uso

- **Performance:** Use `transform` para animações
- **Acessibilidade:** Respeite `prefers-reduced-motion`
- **Consistência:** Use variáveis do sistema
- **Combinação:** Mixins podem ser combinados livremente

## Documentação Técnica dos Sprouts

Esta seção documenta todos os sprouts (mixins e funções) disponíveis no arquivo `_behaviors.scss`, com suas funções específicas, parâmetros aceitos e valores esperados.

### Position Behaviors

#### `sprout-position()`
**Função:** Define propriedades de posicionamento CSS de forma flexível.

**Parâmetros:**
- `$position` (String): Tipo de posicionamento - `'static'`, `'relative'`, `'absolute'`, `'fixed'`, `'sticky'` (padrão: `'static'`)
- `$top` (Unit/Null): Valor para propriedade `top` (padrão: `null`)
- `$left` (Unit/Null): Valor para propriedade `left` (padrão: `null`)
- `$right` (Unit/Null): Valor para propriedade `right` (padrão: `null`)
- `$bottom` (Unit/Null): Valor para propriedade `bottom` (padrão: `null`)
- `$z-index` (Number/Null): Valor para propriedade `z-index` (padrão: `null`)

**Exemplo:**
```scss
.element {
  @include sprout-position(
    $position: absolute,
    $top: 10px,
    $left: 20px,
    $z-index: 10
  );
}
```

#### `sprout-sticky()`
**Função:** Aplica posicionamento sticky com valores pré-definidos baseados na posição.

**Parâmetros:**
- `$position` (String): Posição do elemento sticky - `'top'`, `'bottom'`, `'left'`, `'right'` (padrão: `'top'`)

**Exemplo:**
```scss
.navbar {
  @include sprout-sticky($position: top);
}
```

#### `sprout-fixed()`
**Função:** Aplica posicionamento fixed com valores pré-definidos baseados na posição.

**Parâmetros:**
- `$position` (String): Posição do elemento fixed - `'top'`, `'bottom'`, `'left'`, `'right'` (padrão: `'top'`)

**Exemplo:**
```scss
.modal {
  @include sprout-fixed($position: center);
}
```

### Transitions

#### `sprout-transition()`
**Função:** Aplica transições CSS usando variáveis CSS customizadas do sistema.

**Parâmetros:**
- `$props` (String): Propriedades CSS para animar - `'all'`, `'opacity'`, `'transform'`, etc. (padrão: `'all'`)
- `$duration` (String): Duração da transição - `'fast'`, `'base'`, `'slow'` (padrão: `'base'`)
- `$timing` (String): Função de temporização - `'smooth'`, `'bounce'`, `'sharp'` (padrão: `'smooth'`)

**Exemplo:**
```scss
.button {
  @include sprout-transition(
    $props: 'background-color, transform',
    $duration: 'fast',
    $timing: 'smooth'
  );
}
```

### Animations

#### `sprout-animation-fade-in()`
**Função:** Aplica animação de fade-in usando keyframes definidos.

**Parâmetros:**
- `$duration` (String): Duração da animação - `'fast'`, `'base'`, `'slow'` (padrão: `'base'`)

**Exemplo:**
```scss
.modal {
  @include sprout-animation-fade-in($duration: 'slow');
}
```

#### `sprout-animation-fade-out()`
**Função:** Aplica animação de fade-out usando keyframes definidos.

**Parâmetros:**
- `$duration` (String): Duração da animação - `'fast'`, `'base'`, `'slow'` (padrão: `'base'`)

**Exemplo:**
```scss
.notification {
  @include sprout-animation-fade-out($duration: 'fast');
}
```

### Effects

#### `sprout-effect-scale()`
**Função:** Aplica transformação de escala ao elemento.

**Parâmetros:**
- `$scale` (Number): Fator de escala - valores entre `0.1` e `2.0` (padrão: `1.05`)

**Exemplo:**
```scss
.card {
  @include sprout-effect-scale($scale: 1.1);
}
```

#### `sprout-effect-muted()`
**Função:** Aplica opacidade reduzida usando variáveis CSS do sistema.

**Parâmetros:**
- `$opacity` (String): Valor de opacidade - `'1'`, `'2'`, `'3'`, `'4'`, `'5'`, `'6'` (padrão: `'6'`)

**Exemplo:**
```scss
.disabled-text {
  @include sprout-effect-muted($opacity: '4');
}
```

#### `sprout-effect-blur()`
**Função:** Aplica efeito de desfoque usando filter CSS.

**Parâmetros:**
- `$amount` (Unit): Quantidade de desfoque - valores em `px` (padrão: `4px`)

**Exemplo:**
```scss
.background-blur {
  @include sprout-effect-blur($amount: 8px);
}
```

### Keyframes Definidos

#### `sprout-fade-in`
**Função:** Keyframe para animação de fade-in.
- **De:** `opacity: 0`
- **Para:** `opacity: 1`

#### `sprout-fade-out`
**Função:** Keyframe para animação de fade-out.
- **De:** `opacity: 1`
- **Para:** `opacity: 0`

### Dependências e Variáveis

Os sprouts deste módulo dependem das seguintes variáveis CSS definidas no sistema:

- `--z-index-sticky`: Z-index para elementos sticky
- `--z-index-fixed`: Z-index para elementos fixed
- `--duration-fast`: Duração rápida (ex: 0.15s)
- `--duration-base`: Duração base (ex: 0.3s)
- `--duration-slow`: Duração lenta (ex: 0.5s)
- `--timing-smooth`: Função de temporização suave
- `--opacity-1` até `--opacity-6`: Valores de opacidade pré-definidos

### Notas de Uso

- **Performance:** Use `will-change` em elementos com animações frequentes
- **Acessibilidade:** Sempre teste com `prefers-reduced-motion`
- **Compatibilidade:** Verifique suporte a propriedades CSS modernas
- **Combinação:** Sprouts podem ser combinados para criar efeitos complexos