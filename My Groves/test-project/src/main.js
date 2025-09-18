// ========================================
// Example Project - JavaScript Principal
// ========================================

// Importa biblioteca JS do terrain (sparks)
import '../../../Wood/terrain/sparks/main.js';

// Código específico do projeto
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Example Project loaded with Codessa Growing!');

  // Exemplo de uso dos componentes
  const app = document.getElementById('app');

  // Adiciona conteúdo dinâmico
  const content = document.createElement('div');
  content.innerHTML = `
    <div class="project-header">
      <h2>Projeto Exemplo</h2>
      <p>Usando Codessa Growing com foundation customizada</p>
    </div>
    <div class="project-card">
      <h3>Recursos Disponíveis:</h3>
      <ul>
        <li>✅ Seeds customizados (cores da marca)</li>
        <li>✅ Soils específicos (tema do projeto)</li>
        <li>✅ Barks próprios (estilos customizados)</li>
        <li>✅ Acesso às bibliotecas do terrain</li>
      </ul>
    </div>
  `;

  app.appendChild(content);
});