# Index

## Visão Geral

O arquivo `_index.scss` é o ponto de entrada principal do sistema Sprout-Driven, responsável por importar e organizar todos os módulos de sprouts em uma estrutura coesa e modular.

## Estrutura de Importação

```scss
// _index.scss
@forward "structures";
@forward "behaviors";
@forward "navigation";
@forward "textual";
@forward "fields";
@forward "media";
@forward "interactions";
@forward "utils";
```

## Função do Index

### 🎯 Organização Modular
- **Importação ordenada:** Sprouts organizados por categoria
- **Forwarding inteligente:** Exposição controlada de funcionalidades
- **Dependências claras:** Ordem de importação baseada em dependências

### 🔧 Manutenibilidade
- **Ponto único de entrada:** Todas as modificações passam pelo index
- **Controle de exposição:** Decide o que é público vs privado
- **Versionamento:** Controle de quais versões são expostas

## Como Usar o Index

### Importação Básica
```scss
// Importando tudo
@use "sprouts" as *;

// Importando específico
@use "sprouts" as sprouts;

// Usando funcionalidades
.element {
  @include sprouts.structures-flex();
  @include sprouts.behaviors-hover();
}
```

### Importação Seletiva
```scss
// Importando apenas o necessário
@use "sprouts/structures";
@use "sprouts/behaviors";

.element {
  @include structures-flex();
  @include behaviors-hover();
}
```

## Arquitetura do Sistema

### Camadas de Abstração
```
Index (Ponto de Entrada)
├── Structures (Layout base)
├── Behaviors (Interações)
├── Navigation (Navegação)
├── Textual (Tipografia)
├── Fields (Formulários)
├── Media (Responsividade)
├── Interactions (Estados)
└── Utils (Utilitários)
```

### Princípios de Design
- **Separação de responsabilidades:** Cada sprout tem propósito claro
- **Composição sobre herança:** Mixins combináveis
- **Configurabilidade:** Variáveis customizáveis
- **Performance:** Apenas o necessário é importado

## Configuração Global

### Variáveis Globais
```scss
// Configurações globais no index
$sprout-enable-responsive: true;
$sprout-enable-animations: true;
$sprout-enable-accessibility: true;
$sprout-prefix: "sprout";
```

### Tema Global
```scss
// Tema aplicado globalmente
:root {
  --sprout-primary-color: #6366f1;
  --sprout-border-radius: 0.375rem;
  --sprout-transition-duration: 0.3s;
}
```

## Boas Práticas

### 📦 Organização de Imports
```scss
// ✅ Bom: Importação organizada
@use "sprouts/structures";
@use "sprouts/behaviors";
@use "sprouts/fields";

// ❌ Ruim: Importação desorganizada
@use "sprouts";
```

### 🎯 Uso Específico
```scss
// ✅ Bom: Importação específica
@use "sprouts/structures" as structures;
.element {
  @include structures-grid();
}

// ❌ Ruim: Namespace genérico
@use "sprouts" as *;
.element {
  @include grid(); // Conflito potencial
}
```

### 🔧 Manutenção
- Mantenha imports em ordem alfabética
- Documente mudanças significativas
- Teste após modificações
- Versione mudanças importantes

## Debugging do Index

### Problemas Comuns
- **Imports circulares:** Verifique dependências entre sprouts
- **Variáveis não encontradas:** Verifique ordem de importação
- **Mixins não encontrados:** Verifique se estão sendo forwardados
- **Conflitos de nomes:** Use namespaces adequados

### Ferramentas de Debug
```scss
// Debug de imports
@debug "Sprouts loaded successfully";

// Verificação de variáveis
@if variable-exists($sprout-primary-color) {
  @debug "Primary color is set";
}
```

## Extensão do Index

### Adicionando Novos Sprouts
```scss
// Adicionando novo sprout
@forward "custom-sprout";

// Verificando se existe
@if file-exists("custom-sprout") {
  @forward "custom-sprout";
}
```

### Configurações Condicionais
```scss
// Imports condicionais
@if $enable-custom-sprouts {
  @forward "custom-sprouts";
}

@if $environment == "development" {
  @forward "debug-sprouts";
}
```

## Performance e Otimização

### Tree Shaking
- Apenas imports utilizados são incluídos no bundle final
- Forwarding inteligente reduz código não utilizado
- Lazy loading para sprouts específicos

### Bundle Analysis
```scss
// Análise de bundle
@debug "Current bundle size";
@debug "Imported sprouts: #{length($imported-sprouts)}";
```

## Próximos Passos

- [ ] Implementar sistema de feature flags
- [ ] Adicionar suporte a temas dinâmicos
- [ ] Criar ferramenta de análise de dependências
- [ ] Otimizar ordem de importação para performance