# Trunk - Image Text Section

O `trunk-image-text-section` define a estilização padrão para uma seção que apresenta uma imagem e um bloco de texto lado a lado, com layout responsivo que empilha o conteúdo em telas menores.

## Estrutura HTML

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

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-image-text-section {
  @include sprout-padding-block($space: 'lg'); // Padding vertical
  background-color: var(--bg-secondary); // Cor de fundo para a seção

  .image-text-content {
    @include sprout-container($size: 'lg'); // Limita a largura do conteúdo
    display: flex;
    align-items: center;
    gap: var(--gap-lg); // Espaçamento entre imagem e texto

    @include sprout-media-down('md') {
      flex-direction: column; // Empilha em telas menores
      text-align: center;
    }
  }

  .image-wrapper {
    flex: 1; // Ocupa espaço flexível
    img {
      @include sprout-aspect-ratio(16/9); // Exemplo de aspecto de imagem
      object-fit: cover;
      border-radius: var(--border-radius-md);
    }
  }

  .text-content {
    flex: 1; // Ocupa espaço flexível
    h3 {
      @include sprout-heading($size: 'xl', $weight: 'bold');
      margin-bottom: var(--margin-sm);
    }
    p {
      @include sprout-paragraph($size: 'md');
      margin-bottom: var(--margin-md);
    }
    .trunk-button {
      // Estilos para o botão dentro desta seção
    }
  }
}
```

## Variações/Modificadores

Você pode personalizar a seção de imagem e texto alterando as variáveis de `soils` (cores, espaçamentos) ou aplicando `sprouts` adicionais.

Por exemplo, para inverter a ordem da imagem e do texto:

**HTML:**

```html
<section class="trunk-image-text-section">
  <div class="image-text-content image-text-content--reversed">
    <div class="image-wrapper">
      <img src="/assets/placeholder-image.jpg" alt="Imagem de Exemplo" />
    </div>
    <div class="text-content">
      <h3>Título da Seção Invertida</h3>
      <p>Este é o conteúdo de texto com a imagem do lado oposto.</p>
      <button class="trunk-button">Ver Detalhes</button>
    </div>
  </div>
</section>
```

**SCSS:**

```scss
.image-text-content--reversed {
  flex-direction: row-reverse;
  @include sprout-media-down('md') {
    flex-direction: column; // Mantém o empilhamento em telas menores
  }
}
```
