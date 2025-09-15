# Trunk - Search

O `trunk-search` define a estilização padrão para um componente de barra de busca, que geralmente inclui um campo de entrada e um botão.

## Estrutura HTML

```html
<div class="trunk-search">
  <input type="search" class="trunk-search-input" placeholder="Buscar..." />
  <button class="trunk-search-button">Buscar</button>
</div>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-search {
  display: flex;
  align-items: center;
  gap: var(--gap-sm); // Espaçamento entre o input e o botão

  .trunk-search-input {
    @include sprout-field-base(); // Estilo base para o input
    // Adicione estilos específicos para o input de busca aqui, se necessário
  }

  .trunk-search-button {
    @include sprout-button(); // Estilo base para o botão
    // Adicione estilos específicos para o botão de busca aqui, se necessário
  }
}
```

## Variações/Modificadores

Você pode aplicar modificadores de tamanho ou estado aos elementos internos (`trunk-search-input`, `trunk-search-button`) usando os `sprouts` apropriados.

Por exemplo, para um campo de busca maior:

**HTML:**

```html
<div class="trunk-search">
  <input type="search" class="trunk-search-input sprout-field-size(lg)" placeholder="Buscar..." />
  <button class="trunk-search-button">Buscar</button>
</div>
```

**SCSS (exemplo):**

```scss
// Não é necessário SCSS adicional se você usar os sprouts diretamente no HTML
// ou se o sprout-field-size já for aplicado na classe .trunk-search-input
```
