# Sprout-Driven Documentation

## Visão Geral

Esta pasta contém a documentação completa do sistema **Sprout-Driven** do framework Growing CSS. Cada arquivo `.md` documenta um módulo específico (sprout) com exemplos práticos, configurações e melhores práticas.

## Estrutura da Documentação

```
Sprout-Driven/
├── Index.md           # Arquivo principal de entrada (_index.scss)
├── Structures.md      # Sistema de layout e grids
├── Behaviors.md       # Mixins de comportamento e animações
├── Navigation.md      # Sistema de navegação
├── Textual.md         # Tipografia e estilos de texto
├── Fields.md          # Componentes de formulário
├── Media.md           # Media queries e responsividade
├── Interactions.md    # Estados interativos e feedback
├── Utils.md           # Utilitários e funções helper
└── README.md          # Este arquivo
```

## Propósito

### 🎯 Resolução de Impasse
Esta documentação foi criada para resolver o impasse na construção de **trunks** (componentes compostos) do framework Growing. O problema identificado era a falta de documentação clara e organizada dos módulos de base (sprouts).

### 📚 Base para Desenvolvimento
- **Documentação técnica:** Especificações completas de cada módulo
- **Exemplos práticos:** Código Sass/SCSS pronto para uso
- **Padrões consistentes:** Convenções e melhores práticas
- **Integração clara:** Como combinar sprouts em trunks

## Como Usar Esta Documentação

### 🔍 Navegação por Módulo
1. **Identifique o problema:** Que tipo de funcionalidade você precisa?
2. **Consulte o módulo relevante:** Cada `.md` cobre um domínio específico
3. **Copie os exemplos:** Código pronto para implementação
4. **Adapte para seu contexto:** Customize variáveis e mixins

### 📖 Fluxo de Desenvolvimento
```
Problema identificado
        ↓
Consulta documentação relevante
        ↓
Copia exemplos base
        ↓
Adapta para necessidades específicas
        ↓
Testa integração com outros sprouts
        ↓
Constrói trunk composto
```

## Módulos Disponíveis

### 🏗️ **Structures** (`Structures.md`)
Sistema de layout base incluindo:
- CSS Grid responsivo
- Flexbox utilities
- Sistema de containers
- Espaçamento consistente
- Utilitários de posicionamento

### 🎭 **Behaviors** (`Behaviors.md`)
Comportamentos e animações:
- Estados hover/focus/active
- Transições suaves
- Animações de loading
- Feedback visual
- Estados especiais (disabled, readonly)

### 🧭 **Navigation** (`Navigation.md`)
Sistema de navegação completo:
- Menus dropdown e sidebar
- Breadcrumbs e tabs
- Pagination
- Estados de navegação
- Acessibilidade completa

### 📝 **Textual** (`Textual.md`)
Tipografia avançada:
- Escalas de fonte harmoniosas
- Sistema de line-height
- Letter spacing
- Utilitários de texto
- Experiência de leitura otimizada

### 📋 **Fields** (`Fields.md`)
Componentes de formulário:
- Inputs de diversos tipos
- Estados de validação
- Labels e placeholders
- Grupos de campos
- Acessibilidade WCAG

### 📱 **Media** (`Media.md`)
Responsividade completa:
- Breakpoints inteligentes
- Container queries
- Media queries customizadas
- Suporte a high-DPI
- Mobile-first approach

### 👆 **Interactions** (`Interactions.md`)
Estados interativos:
- Feedback de usuário
- Estados loading/disabled
- Interações touch
- Micro-interações
- Acessibilidade interativa

### 🔧 **Utils** (`Utils.md`)
Utilitários e helpers:
- Funções matemáticas
- Manipulação de cores
- Utilitários de string
- Ferramentas de debug
- Otimizações de performance

## Convenções da Documentação

### 📋 Estrutura Padrão
Cada arquivo `.md` segue uma estrutura consistente:

1. **Visão Geral:** Propósito e funcionalidades principais
2. **Estrutura do Módulo:** Arquivos e organização interna
3. **Uso Básico:** Exemplos simples de implementação
4. **Funcionalidades Detalhadas:** Casos de uso avançados
5. **Integração com Trunks:** Como usar em componentes compostos
6. **Boas Práticas:** Recomendações e padrões
7. **Customização:** Como adaptar para necessidades específicas
8. **Debugging:** Solução de problemas comuns

### 💡 Exemplos de Código
- **Sintaxe Sass/SCSS:** Código pronto para uso
- **Comentários explicativos:** O que cada parte faz
- **Variáveis customizáveis:** Pontos de configuração
- **Casos reais:** Exemplos práticos de implementação

### 🎨 Padrões Visuais
- **Ícones descritivos:** Identificação rápida de seções
- **Código colorizado:** Destaque de sintaxe Sass/SCSS
- **Estrutura hierárquica:** Navegação clara por tópicos
- **Links cruzados:** Referências entre módulos

## Integração com Trunks

### 🧱 Construção de Componentes
Os sprouts documentados aqui são os **blocos de construção** para trunks:

```scss
// Exemplo: Construindo um Card Trunk
.my-card {
  // Base estrutural (Structures)
  @include sprout-structure-container();
  @include sprout-structure-spacing();

  // Estilos tipográficos (Textual)
  @include sprout-textual-body();

  // Comportamentos (Behaviors)
  @include sprout-behavior-hover();
  @include sprout-behavior-focus();

  // Interações (Interactions)
  @include sprout-interaction-states();

  // Responsividade (Media)
  @include sprout-media-responsive();
}
```

### 🔄 Fluxo de Composição
```
Sprouts Individuais
    ↓ (combinados)
Trunk Component
    ↓ (estilizado)
UI Final
```

## Desenvolvimento e Contribuição

### 📝 Atualização da Documentação
- Mantenha exemplos atualizados com mudanças no código
- Adicione novos casos de uso descobertos
- Documente limitações e workarounds
- Inclua exemplos de troubleshooting

### 🧪 Validação
- Teste todos os exemplos em browsers modernos
- Valide acessibilidade com ferramentas automatizadas
- Verifique performance em dispositivos móveis
- Teste integração entre módulos

### 📚 Expansão
- Adicione novos módulos conforme necessário
- Documente padrões descobertos
- Crie guias específicos para casos complexos
- Mantenha glossário de termos técnicos

## Suporte e Recursos

### 🐛 Problemas Comuns
- **Import não funciona:** Verifique ordem de importação no `_index.scss`
- **Mixin não encontrado:** Confirme se está sendo forwardado
- **Estilos não aplicam:** Verifique especificidade CSS
- **Performance ruim:** Use ferramentas de profiling

### 🛠️ Ferramentas Recomendadas
- **VS Code:** Com extensão Sass
- **Chrome DevTools:** Para debugging CSS
- **Sassmeister:** Para testar código isoladamente
- **Contrast checkers:** Para validação de acessibilidade

## Roadmap

### 🎯 Melhorias Planejadas
- [ ] Exemplos interativos online
- [ ] Ferramenta de geração de código
- [ ] Guias visuais para composição de trunks
- [ ] Biblioteca de padrões comuns
- [ ] Sistema de temas dinâmicos

### 📊 Métricas de Sucesso
- Redução no tempo de desenvolvimento de trunks
- Consistência visual aprimorada
- Menos bugs relacionados a CSS
- Melhor experiência de desenvolvedor

---

**Esta documentação é um recurso vivo.** Atualize-a conforme o framework evolui e novos padrões são descobertos. Ela serve como ponte entre os módulos de base (sprouts) e os componentes compostos (trunks), facilitando o desenvolvimento consistente e eficiente do framework Growing CSS.