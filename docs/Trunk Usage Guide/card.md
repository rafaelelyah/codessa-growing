# Trunk - Card

O `trunk-card` define a estilização padrão para um componente de card, ideal para exibir blocos de conteúdo de forma organizada.

## Estrutura HTML

```html
<div class="trunk-card">
  <h3>Título do Card</h3>
  <p>Este é o conteúdo do card. Pode ser um texto, uma imagem, ou outros elementos.</p>
</div>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-card {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--elevation-2);
  /* Removendo padding direto aqui para aplicar nos sub-elementos */
  /* @include sprout-padding-block($space: 'md'); */
  /* @include sprout-padding-inline($space: 'md'); */

  display: flex;
  flex-direction: column; /* Para que header, content e footer se empilhem */

  .card-header {
    @include sprout-padding-block($space: 'sm');
    @include sprout-padding-inline($space: 'md');
    border-bottom: var(--border-width-1) solid var(--border-muted);
    background-color: var(--bg-subtle); /* Um pouco mais escuro */
    border-top-left-radius: var(--border-radius-md);
    border-top-right-radius: var(--border-radius-md);

    h3 {
      @include sprout-heading($size: 'md', $weight: 'bold');
      margin-bottom: 0; /* Remove margem padrão do heading */
    }
  }

  .card-content {
    flex-grow: 1; /* Conteúdo principal ocupa o espaço restante */
    @include sprout-padding-block($space: 'md');
    @include sprout-padding-inline($space: 'md');

    h3 {
      @include sprout-heading($size: 'md', $weight: 'bold');
      margin-bottom: var(--margin-sm);
    }

    p {
      @include sprout-paragraph($size: 'sm');
    }
  }

  .card-footer {
    @include sprout-padding-block($space: 'sm');
    @include sprout-padding-inline($space: 'md');
    border-top: var(--border-width-1) solid var(--border-muted);
    background-color: var(--bg-subtle); /* Um pouco mais escuro */
    border-bottom-left-radius: var(--border-radius-md);
    border-bottom-right-radius: var(--border-radius-md);
  }
}
```

## Variações/Modificadores

### Card Básico

Este é o uso padrão do `trunk-card` para exibir um título e um parágrafo.

**HTML:**

```html
<div class="trunk-card">
  <h3>Título do Card</h3>
  <p>Este é o conteúdo do card. Pode ser um texto, uma imagem, ou outros elementos.</p>
</div>
```

**SCSS (já coberto pelo `_card.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-card` já definida.

### Card com Imagem

Este exemplo demonstra um card com uma imagem no topo, seguida por título e texto.

**HTML:**

```html
<div class="trunk-card">
  <img src="/assets/placeholder-card-image.jpg" alt="Imagem do Card" class="card-image" />
  <div class="card-content">
    <h3>Título do Card com Imagem</h3>
    <p>Este card apresenta uma imagem relevante ao conteúdo, tornando-o mais visualmente atraente.</p>
  </div>
</div>
```

**SCSS (Exemplo de como estilizar a imagem dentro do card):**

```scss
.trunk-card {
  /* ... estilos existentes ... */
  .card-image {
    width: 100%;
    height: 180px; /* Altura fixa para exemplo */
    object-fit: cover;
    border-top-left-radius: var(--border-radius-md);
    border-top-right-radius: var(--border-radius-md);
    margin-bottom: var(--margin-md); /* Espaçamento entre imagem e conteúdo */
  }
  .card-content {
    /* Pode ser usado para agrupar o texto e aplicar padding interno */
    padding-top: 0; /* Remove padding superior se a imagem já tiver */
    padding-bottom: 0; /* Remove padding inferior se o botão tiver */
  }
}
```

### Card com Botão CTA

Este exemplo demonstra um card com um título, texto e um botão de Call to Action na parte inferior.

**HTML:**

```html
<div class="trunk-card">
  <h3>Título do Card com CTA</h3>
  <p>Este card inclui um botão para uma ação específica, como "Saiba Mais" ou "Comprar".</p>
  <button class="trunk-button">Ação do Card</button>
</div>
```

**SCSS (já coberto pelos `trunks` existentes):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-card` e `.trunk-button` já definidas. O `_card.scss` já define o espaçamento para o parágrafo, então o botão se posicionará corretamente.

### Card com Cabeçalho e Rodapé

Este exemplo demonstra um card com áreas distintas de cabeçalho, conteúdo principal e rodapé.

**HTML:**

```html
<div class="trunk-card">
  <div class="card-header">
    <h3>Título do Cabeçalho do Card</h3>
  </div>
  <div class="card-content">
    <p>Este é o conteúdo principal do card, que pode incluir texto, imagens ou outros elementos.</p>
  </div>
  <div class="card-footer">
    <small>Informações adicionais no rodapé.</small>
  </div>
</div>
```

**SCSS (já coberto pelo `_card.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-card`, `.card-header`, `.card-content` e `.card-footer` já definidas.