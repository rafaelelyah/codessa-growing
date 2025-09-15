# Trunk - Logo

O `trunk-logo` define a estilização padrão para o componente de logo, geralmente um link de texto ou um contêiner para uma imagem de logo.

## Estrutura HTML

```html
<a href="/" class="trunk-logo">Seu Logo</a>
<!-- Ou para uma imagem -->
<a href="/" class="trunk-logo">
  <img src="/assets/logo.svg" alt="Seu Logo" />
</a>
```

## Uso SCSS

```scss
@use '../../soils' as *;

.trunk-logo {
  display: inline-block;
  font-family: var(--font-base);
  font-weight: var(--font-bold);
  font-size: var(--text-lg);
  color: var(--text-primary);
  text-decoration: none;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}
```

## Variações/Modificadores

Atualmente, o `trunk-logo` não possui modificadores específicos, mas pode ser combinado com outros `sprouts` ou estilos para ajustar seu tamanho ou aparência.

Por exemplo, para um logo menor:

**HTML:**

```html
<a href="/" class="trunk-logo logo--sm">Seu Logo</a>
```

**SCSS:**

```scss
.logo--sm {
  font-size: var(--text-md);
}
```
