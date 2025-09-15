# Trunk - Nav

O `trunk-nav` define a estilização padrão para elementos de navegação, como menus.

## Estrutura HTML

```html
<nav class="trunk-nav">
  <ul>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</nav>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-nav {
  @include sprout-list-reset; // Remove estilos padrão de lista
  @include sprout-nav-horizontal($gap: 'md'); // Exemplo de navegação horizontal

  a {
    @include sprout-link($decoration: none); // Link sem sublinhado padrão
    font-weight: var(--font-medium);
  }
}
```

## Variações/Modificadores

### Navegação Horizontal Básica

Este é o uso padrão do `trunk-nav` para criar uma lista de links horizontal.

**HTML:**

```html
<nav class="trunk-nav">
  <ul>
    <li><a href="#">Início</a></li>
    <li><a href="#">Sobre</a></li>
    <li><a href="#">Serviços</a></li>
    <li><a href="#">Contato</a></li>
  </ul>
</nav>
```

**SCSS (já coberto pelo `_nav.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-nav` já definida.

### Navegação Vertical

Para uma navegação vertical, você pode aplicar o mixin `sprout-nav-vertical` diretamente na sua lista:

**HTML:**

```html
<nav class="trunk-nav">
  <ul class="nav-vertical">
    <li><a href="#">Item Vertical 1</a></li>
    <li><a href="#">Item Vertical 2</a></li>
  </ul>
</nav>
```

**SCSS:**

```scss
.nav-vertical {
  @include sprout-nav-vertical($gap: 'sm');
}
```