# Trunk - Form

O `trunk-form` define a estilização padrão para um componente de formulário, incluindo o layout de grupos de campos, labels e inputs básicos.

## Estrutura HTML

```html
<form class="trunk-form">
  <div class="form-group">
    <label for="name" class="form-label">Nome:</label>
    <input type="text" id="name" class="form-input" placeholder="Seu nome" />
  </div>
  <div class="form-group">
    <label for="email" class="form-label">Email:</label>
    <input type="email" id="email" class="form-input" placeholder="seu@email.com" />
  </div>
  <div class="form-group">
    <label for="message" class="form-label">Mensagem:</label>
    <textarea id="message" class="form-textarea" placeholder="Sua mensagem"></textarea>
  </div>
  <button type="submit" class="trunk-button form-button">Enviar</button>
</form>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-form {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md); // Espaçamento entre os grupos de campos

  .form-group {
    @include sprout-field-group($layout: 'stack'); // Layout padrão para grupos de campos
  }

  .form-label {
    @include sprout-field-label(); // Estilo padrão para labels
    margin-bottom: var(--margin-xs); // Espaçamento entre label e input
  }

  .form-input,
  .form-textarea,
  .form-select {
    @include sprout-field-base(); // Estilo base para inputs, textareas e selects
  }

  .form-button {
    @include sprout-button(); // Estilo base para botões de formulário
    align-self: flex-start; // Alinha o botão à esquerda
  }
}
```

## Variações/Modificadores

### Formulário Básico

Este é o uso padrão do `trunk-form` para criar um formulário simples.

**HTML:**

```html
<form class="trunk-form">
  <div class="form-group">
    <label for="basic-name" class="form-label">Nome:</label>
    <input type="text" id="basic-name" class="form-input" placeholder="Seu nome" />
  </div>
  <div class="form-group">
    <label for="basic-email" class="form-label">Email:</label>
    <input type="email" id="basic-email" class="form-input" placeholder="seu@email.com" />
  </div>
  <button type="submit" class="trunk-button form-button">Enviar</button>
</form>
```

**SCSS (já coberto pelo `_form.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza as classes `.trunk-form` e seus elementos internos já definidos.

### Formulário com Labels (Empilhadas e Inline)

Você pode controlar o layout das labels e campos usando o parâmetro `$layout` do `sprout-field-group`.

#### Labels Empilhadas (Padrão)

**HTML:**

```html
<form class="trunk-form">
  <div class="form-group">
    <label for="stacked-name" class="form-label">Nome Completo:</label>
    <input type="text" id="stacked-name" class="form-input" placeholder="Seu nome completo" />
  </div>
  <div class="form-group">
    <label for="stacked-email" class="form-label">Seu Email:</label>
    <input type="email" id="stacked-email" class="form-input" placeholder="email@exemplo.com" />
  </div>
  <button type="submit" class="trunk-button form-button">Enviar</button>
</form>
```

**SCSS (já coberto pelo `_form.scss`):**

O layout empilhado é o padrão do `sprout-field-group`, então não é necessário SCSS adicional.

#### Labels Inline

**HTML:**

```html
<form class="trunk-form">
  <div class="form-group sprout-field-group($layout: 'inline')">
    <label for="inline-name" class="form-label">Nome:</label>
    <input type="text" id="inline-name" class="form-input" placeholder="Seu nome" />
  </div>
  <div class="form-group sprout-field-group($layout: 'inline')">
    <label for="inline-email" class="form-label">Email:</label>
    <input type="email" id="inline-email" class="form-input" placeholder="seu@email.com" />
  </div>
  <button type="submit" class="trunk-button form-button">Enviar</button>
</form>
```

**SCSS (já coberto pelo `_fields.scss`):**

Não há SCSS adicional necessário, pois o `sprout-field-group` já está definido.

### Formulário com Validação (Erro/Sucesso)

Você pode aplicar estados de validação aos campos usando o mixin `sprout-field-state`.

**HTML:**

```html
<form class="trunk-form">
  <div class="form-group">
    <label for="error-input" class="form-label">Campo com Erro:</label>
    <input type="text" id="error-input" class="form-input sprout-field-state(error)" value="Valor inválido" />
  </div>
  <div class="form-group">
    <label for="success-input" class="form-label">Campo com Sucesso:</label>
    <input type="text" id="success-input" class="form-input sprout-field-state(success)" value="Valor válido" />
  </div>
  <button type="submit" class="trunk-button form-button">Enviar</button>
</form>
```

**SCSS (já coberto pelo `_fields.scss`):**

Não há SCSS adicional necessário, pois o `sprout-field-state` já está definido.

### Formulário com Checkboxes e Radio Buttons

Este exemplo demonstra como incluir checkboxes e radio buttons em um formulário.

**HTML:**

```html
<form class="trunk-form">
  <div class="form-group">
    <label class="form-label">Preferências:</label>
    <div>
      <input type="checkbox" id="opt1" name="option" value="opt1" />
      <label for="opt1">Opção 1</label>
    </div>
    <div>
      <input type="checkbox" id="opt2" name="option" value="opt2" />
      <label for="opt2">Opção 2</label>
    </div>
  </div>

  <div class="form-group">
    <label class="form-label">Escolha uma opção:</label>
    <div>
      <input type="radio" id="radio1" name="radio-group" value="radio1" />
      <label for="radio1">Escolha A</label>
    </div>
    <div>
      <input type="radio" id="radio2" name="radio-group" value="radio2" />
      <label for="radio2">Escolha B</label>
    </div>
  </div>
  <button type="submit" class="trunk-button form-button">Enviar</button>
</form>
```

**SCSS (exemplo para estilização básica de checkboxes/radios):**

```scss
/* Estilos básicos para alinhar input e label */
.form-group > div {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  margin-bottom: var(--margin-xs);
}

/* Estilos para o input checkbox/radio */
input[type="checkbox"],
input[type="radio"] {
  /* Reset básico, mas pode ser estendido para customizar a aparência */
  width: 16px; /* Tamanho fixo para o checkbox/radio */
  height: 16px;
  padding: 0;
  margin: 0;
  appearance: none; /* Remove estilo nativo */
  border: var(--border-width-1) solid var(--border-primary);
  border-radius: var(--border-radius-sm); /* Para checkboxes */
  cursor: pointer;
  flex-shrink: 0; /* Evita que o input encolha */
}

input[type="radio"] {
  border-radius: 50%; /* Para radio buttons */
}

/* Estilo quando marcado */
input[type="checkbox"]:checked,
input[type="radio"]:checked {
  background-color: var(--interactive-primary);
  border-color: var(--interactive-primary);
}

/* Estilo para o "check" ou "dot" */
input[type="checkbox"]:checked::before {
  content: '✔'; /* Exemplo de ícone */
  display: block;
  color: var(--text-inverse);
  font-size: var(--text-sm);
  line-height: 1;
  text-align: center;
}

input[type="radio"]:checked::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  background-color: var(--text-inverse);
  border-radius: 50%;
  margin: auto;
}
```
