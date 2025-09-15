# Trunk - Section

O `trunk-section` define a estilização padrão para seções de conteúdo, geralmente o elemento `<section>`.

## Estrutura HTML

```html
<section class="trunk-section">
  <h2>Título da Seção</h2>
  <p>Conteúdo da seção.</p>
</section>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-section {
  @include sprout-padding-block($space: 'lg');
}
```

## Variações/Modificadores

### Seção Básica

Este é o exemplo mais simples de uma seção de conteúdo, com um título e um parágrafo.

**HTML:**

```html
<section class="trunk-section">
  <h2>Título da Seção</h2>
  <p>Este é o conteúdo de uma seção básica. Ele utiliza o padding padrão definido no `_section.scss`.</p>
</section>
```

**SCSS (já coberto pelo `_section.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-section` já definida.

### Seção com Colunas

Este exemplo demonstra uma seção com conteúdo organizado em múltiplas colunas, que se empilham em telas menores.

**HTML:**

```html
<section class="trunk-section">
  <h2>Seção com Colunas</h2>
  <div class="section-columns">
    <div class="column-item">
      <h3>Coluna 1</h3>
      <p>Conteúdo da primeira coluna.</p>
    </div>
    <div class="column-item">
      <h3>Coluna 2</h3>
      <p>Conteúdo da segunda coluna.</p>
    </div>
    <div class="column-item">
      <h3>Coluna 3</h3>
      <p>Conteúdo da terceira coluna.</p>
    </div>
  </div>
</section>
```

**SCSS (Exemplo de como estilizar as colunas):**

Para estilizar as colunas, você pode usar o mixin `sprout-grid` e `sprout-media-down` para responsividade:

```scss
.section-columns {
  @include sprout-grid($cols: 3, $gap: 'lg'); // 3 colunas em telas maiores

  @include sprout-media-down('md') {
    @include sprout-grid($cols: 1, $gap: 'md'); // 1 coluna em telas menores
  }
}

.column-item {
  border: 1px solid var(--border-muted);
  padding: var(--padding-md);
  border-radius: var(--border-radius-sm);
}
```

### Hero Section

Este exemplo demonstra uma seção de destaque (Hero Section) com um título grande, descrição e um botão de Call to Action.

**HTML:**

```html
<section class="trunk-hero">
  <h1>Título Impactante da Hero Section</h1>
  <p>Uma breve descrição que convida o usuário a explorar mais sobre o conteúdo ou serviço.</p>
  <button class="trunk-button">Saiba Mais</button>
</section>
```

**SCSS (já coberto pelo `_hero.scss` e `_button.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-hero` e `.trunk-button` já definidas.

### Seção com Imagem e Texto

Este exemplo demonstra uma seção com uma imagem de um lado e conteúdo de texto do outro, que se empilham em telas menores.

**HTML:**

```html
<section class="trunk-image-text-section">
  <div class="image-text-content">
    <div class="image-wrapper">
      <img src="/assets/placeholder-image.jpg" alt="Imagem de Exemplo" />
    </div>
    <div class="text-content">
      <h3>Título da Seção</h3>
      <p>Este é o conteúdo de texto ao lado da imagem. Ele descreve o que a imagem representa ou complementa a informação visual.</p>
      <button class="trunk-button">Ver Detalhes</button>
    </div>
  </div>
</section>
```

**SCSS (já coberto pelo `_image_text_section.scss` e `_button.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-image-text-section` e `.trunk-button` já definidas.
