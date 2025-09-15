# Trunk - Modal

O `trunk-modal` define a estilização padrão para um componente de modal/diálogo, usado para exibir conteúdo em uma sobreposição que exige a atenção do usuário.

## Estrutura HTML

```html
<div class="trunk-modal" style="display: flex;"> <!-- display:flex para visualização, normalmente controlado por JS -->
  <div class="trunk-modal-dialog">
    <button class="modal-close-button">&times;</button>
    <h3>Título do Modal</h3>
    <p>Este é o conteúdo principal do modal. Pode ser um texto, um formulário, ou outros elementos.</p>
  </div>
</div>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, var(--opacity-overlay)); // Fundo escuro com opacidade
  z-index: var(--z-modal); // Garante que o modal esteja acima de outros elementos

  @include sprout-flex($justify: 'center', $align: 'center'); // Centraliza o diálogo

  .trunk-modal-dialog {
    background-color: var(--bg-primary);
    border-radius: var(--border-radius-md);
    box-shadow: var(--elevation-5); // Sombra mais proeminente
    max-width: 500px; // Largura máxima padrão
    width: 90%; // Ocupa 90% da largura em telas menores
    position: relative; // Para posicionar o botão de fechar

    @include sprout-padding-block($space: 'lg');
    @include sprout-padding-inline($space: 'lg');

    .modal-close-button {
      position: absolute;
      top: var(--padding-sm);
      right: var(--padding-sm);
      background: none;
      border: none;
      font-size: var(--text-xl);
      cursor: pointer;
      color: var(--text-muted);
      line-height: 1;
      padding: var(--padding-xs); // Pequeno padding para área de clique
      border-radius: var(--border-radius-sm);

      &:hover {
        color: var(--text-primary);
      }
    }

    h3 {
      @include sprout-heading($size: 'lg', $weight: 'bold');
      margin-bottom: var(--margin-md);
    }

    p {
      @include sprout-paragraph($size: 'md');
      margin-bottom: var(--margin-lg);
    }
  }
}
```

## Variações/Modificadores

### Modal Básico

Este é o uso padrão do `trunk-modal` para exibir um título e um parágrafo. A visibilidade do modal é geralmente controlada por JavaScript.

**HTML:**

```html
<div class="trunk-modal" style="display: flex;">
  <div class="trunk-modal-dialog">
    <button class="modal-close-button">&times;</button>
    <h3>Título do Modal Básico</h3>
    <p>Este é o conteúdo principal do modal. Ele pode ser usado para mensagens simples ou para carregar conteúdo dinâmico.</p>
  </div>
</div>
```

**SCSS (já coberto pelo `_modal.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-modal` e `.trunk-modal-dialog` já definidas.

### Modal com Cabeçalho e Rodapé

Este exemplo demonstra um modal com áreas distintas de cabeçalho, conteúdo principal e rodapé.

**HTML:**

```html
<div class="trunk-modal" style="display: flex;">
  <div class="trunk-modal-dialog">
    <div class="modal-header">
      <h3>Título do Modal com Cabeçalho</h3>
      <button class="modal-close-button">&times;</button>
    </div>
    <div class="modal-content">
      <p>Este é o conteúdo principal do modal. Pode ser um formulário, uma imagem, ou informações detalhadas.</p>
    </div>
    <div class="modal-footer">
      <button class="trunk-button">Confirmar</button>
      <button class="trunk-button" style="background-color: var(--bg-muted); color: var(--text-primary);">Cancelar</button>
    </div>
  </div>
</div>
```

**SCSS (já coberto pelo `_modal.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-modal`, `.modal-header`, `.modal-content` e `.modal-footer` já definidas.

### Modal de Confirmação

Este exemplo demonstra um modal simples para solicitar uma confirmação do usuário, geralmente com uma pergunta e botões de "Confirmar" e "Cancelar".

**HTML:**

```html
<div class="trunk-modal" style="display: flex;">
  <div class="trunk-modal-dialog">
    <div class="modal-content">
      <h3>Tem certeza que deseja continuar?</h3>
      <p>Esta ação não poderá ser desfeita.</p>
    </div>
    <div class="modal-footer">
      <button class="trunk-button">Confirmar</button>
      <button class="trunk-button" style="background-color: var(--bg-muted); color: var(--text-primary);">Cancelar</button>
    </div>
  </div>
</div>
```

**SCSS (já coberto pelo `_modal.scss` e `_button.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-modal`, `.modal-content`, `.modal-footer` e `.trunk-button` já definidas.
