# Trunk - Main

O `trunk-main` define a estilização padrão para o conteúdo principal do seu site, geralmente o elemento `<main>`.

## Estrutura HTML

```html
<main class="trunk-main">
  <h1>Título da Página</h1>
  <p>Este é o conteúdo principal da sua página.</p>
</main>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-main {
  @include sprout-container($size: 'lg');
  @include sprout-padding-block($space: 'lg');
}
```
