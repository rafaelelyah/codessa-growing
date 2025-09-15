# Trunk - Social Links

O `trunk-social-links` define a estilização padrão para um grupo de links de redes sociais, geralmente apresentados como ícones ou texto.

## Estrutura HTML

```html
<div class="trunk-social-links">
  <ul>
    <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
    <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
    <li><a href="https://linkedin.com" target="_blank">LinkedIn</a></li>
  </ul>
</div>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-social-links {
  @include sprout-list-reset;
  @include sprout-nav-horizontal($gap: 'sm'); // Links sociais horizontalmente

  a {
    @include sprout-link($decoration: none); // Links sem sublinhado
    font-size: var(--text-lg); // Exemplo: tamanho maior para ícones
    color: var(--text-secondary); // Exemplo: cor secundária
    &:hover {
      color: var(--interactive-primary); // Exemplo: cor de destaque no hover
    }
  }
}
```

## Variações/Modificadores

Você pode personalizar a aparência dos links sociais alterando os parâmetros do `sprout-link` ou adicionando estilos específicos.

Por exemplo, para links sociais com uma cor diferente:

**HTML:**

```html
<div class="trunk-social-links">
  <ul>
    <li><a href="#" style="color: var(--color-context-2);">Facebook</a></li>
    <li><a href="#" style="color: var(--color-context-4);">Twitter</a></li>
  </ul>
</div>
```

**SCSS (exemplo):**

```scss
// Se você quiser um estilo global para todos os links sociais de uma cor específica
.trunk-social-links a {
  color: var(--text-primary);
}
```
