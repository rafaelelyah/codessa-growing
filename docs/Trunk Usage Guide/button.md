# Trunk - Button

O `trunk-button` define a estilização padrão para um componente de botão interativo.

## Estrutura HTML

```html
<button class="trunk-button">Clique Aqui</button>
```

## Uso SCSS

```scss
@use '../../sprouts' as *;

.trunk-button {
  @include sprout-button(); // Estilo base para o botão
  // Adicione estilos específicos para o botão aqui, se necessário
}
```

## Variações/Modificadores

Você pode aplicar modificadores de tamanho, cor ou estado aos botões usando os `sprouts` apropriados ou classes adicionais.

Por exemplo, para um botão com cor de destaque ou tamanho diferente:

**HTML:**

```html
<button class="trunk-button sprout-button($bg: var(--interactive-secondary))">Botão Secundário</button>
<button class="trunk-button sprout-button($font-size: var(--text-lg))">Botão Grande</button>
```

**SCSS (exemplo):**

```scss
// Não é necessário SCSS adicional se você usar os sprouts diretamente no HTML
// ou se o sprout-button já for aplicado na classe .trunk-button
```
