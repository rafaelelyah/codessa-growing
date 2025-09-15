# Trunk - Table

O `trunk-table` define a estilização padrão para o elemento `<table>`, oferecendo variações para diferentes apresentações de dados.

## Estrutura HTML

```html
<table class="trunk-table">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Idade</th>
      <th>Cidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>João</td>
      <td>30</td>
      <td>São Paulo</td>
    </tr>
    <tr>
      <td>Maria</td>
      <td>25</td>
      <td>Rio de Janeiro</td>
    </tr>
  </tbody>
</table>
```

## Uso SCSS

```scss
@use '../soils' as *;

// ========================================
// TRUNK — TABLE
// ========================================
// Define a estilização padrão para tabelas.

.trunk-table {
  // Base styles (lean)
  width: 100%;
  border-collapse: collapse;

  // Default style modifier
  &--default-style {
    border: 1px solid var(--border-muted);
    background-color: var(--bg-muted);

    th,
    td {
      padding: var(--padding-sm);
      border: 1px solid var(--border-muted);
      text-align: left;
      color: var(--text-primary);
    }
  }

  // Apply default style if no other modifiers are present
  &:not([class*="--"]) {
    @extend .trunk-table--default-style;
  }

  // Visual Style Modifiers
  &--striped {
    tbody tr:nth-child(odd) {
      background-color: var(--bg-subtle);
    }
  }

  &--bordered {
    border: 1px solid var(--border-primary);
    th,
    td {
      border: 1px solid var(--border-primary);
    }
  }

  &--responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  &--hover {
    tbody tr:hover {
      background-color: var(--bg-secondary);
    }
  }
}
```

## Variações/Modificadores

### Tabela Básica

Este é o uso padrão do `trunk-table`.

**HTML:**

```html
<table class="trunk-table">
  <thead>
    <tr>
      <th>Produto</th>
      <th>Preço</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item A</td>
      <td>R$ 10,00</td>
    </tr>
  </tbody>
</table>
```

**SCSS (já coberto pelo `_table.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-table` já definida.

### Tabela Zebrada

Aplica um estilo zebrado às linhas da tabela para melhor legibilidade.

**HTML:**

```html
<table class="trunk-table trunk-table--striped">
  <thead>
    <tr>
      <th>Produto</th>
      <th>Preço</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item A</td>
      <td>R$ 10,00</td>
    </tr>
    <tr>
      <td>Item B</td>
      <td>R$ 20,00</td>
    </tr>
  </tbody>
</table>
```

**SCSS (já coberto pelo `_table.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-table--striped` já está definido.

### Tabela com Borda

Aplica bordas mais proeminentes à tabela e suas células.

**HTML:**

```html
<table class="trunk-table trunk-table--bordered">
  <thead>
    <tr>
      <th>Produto</th>
      <th>Preço</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item A</td>
      <td>R$ 10,00</td>
    </tr>
  </tbody>
</table>
```

**SCSS (já coberto pelo `_table.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-table--bordered` já está definido.

### Tabela Responsiva

Permite que a tabela seja rolada horizontalmente em telas menores.

**HTML:**

```html
<div class="trunk-table--responsive">
  <table class="trunk-table">
    <thead>
      <tr>
        <th>Coluna Muito Longa 1</th>
        <th>Coluna Muito Longa 2</th>
        <th>Coluna Muito Longa 3</th>
        <th>Coluna Muito Longa 4</th>
        <th>Coluna Muito Longa 5</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dado 1</td>
        <td>Dado 2</td>
        <td>Dado 3</td>
        <td>Dado 4</td>
        <td>Dado 5</td>
      </tr>
    </tbody>
  </table>
</div>
```

**SCSS (já coberto pelo `_table.scss`):**

Não há SCSS adicional necessário, pois o modificador `trunk-table--responsive` já está definido.
