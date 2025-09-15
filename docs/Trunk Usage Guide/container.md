# Trunk - Container

O `trunk-container` define a largura máxima para o conteúdo, centralizando-o na página. O `trunk-container--fluid` permite que o container ocupe toda a largura disponível.

## Estrutura HTML

```html
<div class="trunk-container">
  <!-- Conteúdo centralizado com largura limitada -->
</div>

<div class="trunk-container--fluid">
  <!-- Conteúdo que ocupa 100% da largura -->
</div>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-container {
  @include sprout-container($size: 'lg');
}

.trunk-container--fluid {
  @include sprout-container($size: 'full');
}
```
