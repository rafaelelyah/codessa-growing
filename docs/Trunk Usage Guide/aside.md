# Trunk - Aside

O `trunk-aside` define a estilização padrão para o elemento `<aside>`, geralmente usado para barras laterais ou conteúdo complementar.

## Estrutura HTML

```html
<aside class="trunk-aside">
  <h3>Conteúdo Lateral</h3>
  <p>Este é um exemplo de conteúdo dentro de um aside.</p>
</aside>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-aside {
  @include sprout-padding-block($space: 'md');
  @include sprout-padding-inline($space: 'md');
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-md);
}
```
