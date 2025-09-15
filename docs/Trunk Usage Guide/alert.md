# Trunk - Alert

O `trunk-alert` define a estilização padrão para um componente de alerta, usado para exibir mensagens importantes ao usuário.

## Estrutura HTML

```html
<div class="trunk-alert">
  Esta é uma mensagem de alerta padrão.
</div>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;
@use '../../soils' as *;

.trunk-alert {
  @include sprout-padding-block($space: 'md');
  @include sprout-padding-inline($space: 'lg');
  border-radius: var(--border-radius-md);
  border: var(--border-width-1) solid; // Borda padrão, cor definida pelo estado
  font-size: var(--text-md);
  line-height: var(--leading-base);

  // Estado padrão (info)
  background-color: var(--bg-info);
  color: var(--text-info);
  border-color: var(--border-info);

  // Modificadores de estado
  &--success {
    background-color: var(--bg-success);
    color: var(--text-success);
    border-color: var(--border-success);
  }

  &--error {
    background-color: var(--bg-error);
    color: var(--text-error);
    border-color: var(--border-error);
  }

  &--warning {
    background-color: var(--bg-warning);
    color: var(--text-warning);
    border-color: var(--border-warning);
  }
}
```

## Variações/Modificadores

### Alerta Básico (Info)

Este é o uso padrão do `trunk-alert` para mensagens informativas.

**HTML:**

```html
<div class="trunk-alert">
  Esta é uma mensagem de alerta padrão.
</div>
```

**SCSS (já coberto pelo `_alert.scss`):**

Não há SCSS adicional necessário para esta variação, pois ela utiliza a classe `.trunk-alert` já definida.

### Alertas de Estado

Você pode aplicar diferentes estados ao alerta usando as classes modificadoras.

#### Alerta de Sucesso

**HTML:**

```html
<div class="trunk-alert trunk-alert--success">
  Operação realizada com sucesso!
</div>
```

#### Alerta de Erro

**HTML:**

```html
<div class="trunk-alert trunk-alert--error">
  Ocorreu um erro ao processar sua solicitação.
</div>
```

#### Alerta de Aviso

**HTML:**

```html
<div class="trunk-alert trunk-alert--warning">
  Atenção: Sua sessão irá expirar em breve.
</div>
```

**SCSS (já coberto pelo `_alert.scss`):**

Não há SCSS adicional necessário, pois os modificadores de estado já estão definidos.
