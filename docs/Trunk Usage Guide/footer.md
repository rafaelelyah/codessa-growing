# Trunk - Footer

O `trunk-footer` define a estilização padrão para o rodapé do seu site.

## Estrutura HTML

```html
<footer class="trunk-footer">
  <p>&copy; 2023 Codessa Growing. Todos os direitos reservados.</p>
</footer>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-footer {
  @include sprout-container($size: 'full');
  @include sprout-padding-block($space: 'lg');
  margin-top: var(--margin-lg);
  border-top: var(--border-width-1) solid var(--border-primary);

  // Adiciona comportamento flex para organizar o conteúdo interno
  @include sprout-flex($justify: 'between', $align: 'center');

  // Estilos responsivos para empilhar em telas menores
  @include sprout-media-down('md') {
    @include sprout-flex($direction: 'column', $align: 'center', $gap: 'md');
    text-align: center;
  }
}
```

## Variações/Modificadores

### Footer Básico

Este é o exemplo mais simples de um rodapé, contendo apenas informações de copyright.

**HTML:**

```html
<footer class="trunk-footer">
  <p>&copy; 2023 Codessa Growing. Todos os direitos reservados.</p>
</footer>
```

**SCSS (já coberto pelo `_footer.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-footer` já definida.

### Footer com Navegação

Este exemplo demonstra um rodapé com uma seção de navegação, ideal para links de utilidade ou mapa do site.

**HTML:**

```html
<footer class="trunk-footer">
  <p>&copy; 2023 Codessa Growing. Todos os direitos reservados.</p>
  <nav class="trunk-nav">
    <ul>
      <li><a href="#">Sobre Nós</a></li>
      <li><a href="#">Serviços</a></li>
      <li><a href="#">Contato</a></li>
      <li><a href="#">Política de Privacidade</a></li>
    </ul>
  </nav>
</footer>
```

**SCSS (já coberto pelos `trunks` existentes):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-footer` e `.trunk-nav` já definidas. O `_footer.scss` já inclui o comportamento flexível para organizar os elementos internos.

### Footer com Links Sociais

Este exemplo demonstra um rodapé com links para redes sociais.

**HTML:**

```html
<footer class="trunk-footer">
  <p>&copy; 2023 Codessa Growing. Todos os direitos reservados.</p>
  <div class="trunk-social-links">
    <ul>
      <li><a href="#">Facebook</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">LinkedIn</a></li>
    </ul>
  </div>
</footer>
```

**SCSS (já coberto pelos `trunks` existentes):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-footer` e `.trunk-social-links` já definidas. O `_footer.scss` já inclui o comportamento flexível para organizar os elementos internos.

### Footer Multi-colunas

Este exemplo demonstra um rodapé com múltiplas colunas de conteúdo, como navegação, informações de contato e links sociais.

**HTML:**

```html
<footer class="trunk-footer">
  <p>&copy; 2023 Codessa Growing. Todos os direitos reservados.</p>
  <div class="footer-columns">
    <div class="footer-column">
      <h4>Navegação</h4>
      <nav class="trunk-nav">
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Produtos</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </nav>
    </div>
    <div class="footer-column">
      <h4>Contato</h4>
      <p>Email: contato@codessa.com</p>
      <p>Telefone: (XX) XXXX-XXXX</p>
    </div>
    <div class="footer-column">
      <h4>Siga-nos</h4>
      <div class="trunk-social-links">
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
```

**SCSS (Exemplo de como estilizar as colunas):**

Para estilizar as colunas, você pode usar o mixin `sprout-grid` e `sprout-media-down` para responsividade:

```scss
.footer-columns {
  @include sprout-grid($cols: 3, $gap: 'lg'); // 3 colunas em telas maiores
  width: 100%; // Ocupa a largura total disponível

  @include sprout-media-down('md') {
    @include sprout-grid($cols: 1, $gap: 'md'); // 1 coluna em telas menores
  }
}

.footer-column h4 {
  margin-bottom: var(--margin-sm);
  color: var(--text-primary);
}
```
