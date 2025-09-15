# Trunk - Hero

O `trunk-hero` define a estilização padrão para uma seção de destaque (Hero Section), ideal para a parte superior de páginas, com conteúdo impactante e um Call to Action.

## Estrutura HTML

```html
<section class="trunk-hero">
  <h1>Título Impactante da Hero Section</h1>
  <p>Uma breve descrição que convida o usuário a explorar mais sobre o conteúdo ou serviço.</p>
  <button class="trunk-button">Saiba Mais</button>
</section>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-hero {
  @include sprout-container($size: 'full'); // Ocupa toda a largura
  @include sprout-padding-block($space: 'xxl'); // Padding vertical generoso
  background-color: var(--bg-brand); // Cor de fundo de destaque
  color: var(--text-inverse); // Cor do texto para contraste
  text-align: center; // Centraliza o texto

  // Alinhamento vertical do conteúdo
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    @include sprout-heading($size: 'xxl', $weight: 'bold'); // Título grande
    margin-bottom: var(--margin-md);
  }

  p {
    @include sprout-paragraph($size: 'lg'); // Parágrafo maior
    max-width: 800px; // Limita a largura do parágrafo
    margin-bottom: var(--margin-lg);
  }

  .trunk-button {
    // Estilos específicos para o botão dentro do hero, se necessário
    // Ex: @include sprout-button($bg: var(--interactive-secondary));
  }
}
```

## Variações/Modificadores

Você pode personalizar a Hero Section alterando as variáveis de `soils` (cores, espaçamentos) ou aplicando `sprouts` adicionais.

Por exemplo, para uma Hero Section com uma imagem de fundo:

**HTML:**

```html
<section class="trunk-hero hero--with-background-image">
  <h1>Título Impactante</h1>
  <p>Descrição com imagem de fundo.</p>
  <button class="trunk-button">Ação!</button>
</section>
```

**SCSS:**

```scss
.hero--with-background-image {
  background-image: url('/assets/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  /* Adicione um overlay para melhor legibilidade do texto */
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  /* Garanta que o texto esteja acima do overlay */
  h1, p, .trunk-button {
    position: relative;
    z-index: 1;
  }
}
```
