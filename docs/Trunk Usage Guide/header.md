# Trunk - Header

O `trunk-header` define a estilização padrão para o cabeçalho do seu site, incluindo alinhamento de conteúdo e espaçamento.

## Estrutura HTML

```html
<header class="trunk-header">
  <a href="/" class="trunk-logo">Seu Logo</a>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
    </ul>
  </nav>
</header>
```

## Uso SCSS

O `trunk-header` utiliza os `sprouts` para sua construção.

```scss
@use '../../sprouts' as *; // Importa todos os sprouts

.trunk-header {
  @include sprout-container($size: 'full');
  @include sprout-flex($justify: 'between', $align: 'center');
  @include sprout-padding-block($space: 'md');
  border-bottom: var(--border-width-1) solid var(--border-primary);
}
```

## Variações/Modificadores

### Header Básico (Logo + Navegação Primária)

Este é o exemplo mais simples de um cabeçalho, contendo apenas um logo e uma navegação principal.

**HTML:**

```html
<header class="trunk-header">
  <a href="/" class="trunk-logo">Seu Logo</a>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Sobre</a></li>
    </ul>
  </nav>
</header>
```

**SCSS (já coberto pelo `_header.scss` e `_nav.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-header`, `.trunk-logo` e `.trunk-nav` já definidas.

### Header com Navegação de Utilidade

Este exemplo demonstra um cabeçalho com uma navegação principal e uma navegação secundária (de utilidade), como links de login ou carrinho.

**HTML:**

```html
<header class="trunk-header">
  <a href="/" class="trunk-logo">Seu Logo</a>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Sobre</a></li>
    </ul>
  </nav>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Login</a></li>
      <li><a href="#">Carrinho</a></li>
    </ul>
  </nav>
</header>
```

**SCSS (já coberto pelos `trunks` existentes):**

Para este layout, o `trunk-header` já aplica `display: flex` e `justify-content: between`. Se você tiver três elementos diretos (Logo, Nav Principal, Nav Utilidade), o `justify-content: between` irá espaçá-los. Se precisar de um layout mais complexo (ex: Logo à esquerda, duas Navs à direita), você pode aninhar `div`s e aplicar `sprout-flex` a elas.

### Header com Busca

Este exemplo demonstra um cabeçalho com uma barra de busca integrada.

**HTML:**

```html
<header class="trunk-header">
  <a href="/" class="trunk-logo">Seu Logo</a>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Sobre</a></li>
    </ul>
  </nav>
  <div class="trunk-search">
    <input type="search" class="trunk-search-input" placeholder="Buscar..." />
    <button class="trunk-search-button">Buscar</button>
  </div>
</header>
```

**SCSS (já coberto pelos `trunks` existentes):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-header`, `.trunk-logo`, `.trunk-nav` e `.trunk-search` já definidas.

### Header com Call to Action (CTA)

Este exemplo demonstra um cabeçalho com um botão de Call to Action.

**HTML:**

```html
<header class="trunk-header">
  <a href="/" class="trunk-logo">Seu Logo</a>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Sobre</a></li>
    </ul>
  </nav>
  <button class="trunk-button">Ação!</button>
</header>
```

**SCSS (já coberto pelos `trunks` existentes):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-header`, `.trunk-logo`, `.trunk-nav` e `.trunk-button` já definidas.

### Header Responsivo/Empilhado

Este exemplo demonstra como o cabeçalho se adapta a telas menores, empilhando seus elementos verticalmente.

**HTML:**

```html
<header class="trunk-header">
  <a href="/" class="trunk-logo">Seu Logo</a>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Sobre</a></li>
    </ul>
  </nav>
  <button class="trunk-button">Ação!</button>
</header>
```

**SCSS (já coberto pelos `_header.scss` e `_nav.scss`):**

Os estilos responsivos são aplicados diretamente nos arquivos `_header.scss` e `_nav.scss` usando `sprout-media-down`. Não é necessário SCSS adicional aqui.

### Header com Navegação à Esquerda e à Direita

Este exemplo demonstra um cabeçalho mais complexo, com múltiplos blocos de conteúdo.

**HTML:**

```html
<header class="trunk-header">
  <div class="header-left">
    <a href="/" class="trunk-logo">Codessa</a>
    <nav class="trunk-nav">
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Sobre</a></li>
      </ul>
    </nav>
  </div>

  <div class="header-right">
    <nav class="trunk-nav">
      <ul>
        <li><a href="#">Docs</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
    </nav>
    <form role="search">
      <input type="search" placeholder="Buscar..." />
    </form>
  </div>
</header>
```

**SCSS (Exemplo de como estilizar `header-left` e `header-right`):**

Para estilizar os blocos `header-left` e `header-right`, você pode criar classes específicas ou usar mixins `sprout-flex` diretamente no seu SCSS:

```scss
.header-left,
.header-right {
  @include sprout-flex($align: 'center', $gap: 'md'); // Exemplo de alinhamento e espaçamento
}
```