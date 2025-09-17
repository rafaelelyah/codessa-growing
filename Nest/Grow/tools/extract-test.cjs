const fs = require('fs');

function extractScssComponent(content, componentName) {
  const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  const lines = cleanContent.split('\n');
  let inComponent = false;
  let braceCount = 0;
  let componentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if this line starts a component - usando ^ para início de linha
    if (!inComponent && line.match(new RegExp('^\\.' + componentName + '\\s*\\{'))) {
      inComponent = true;
      componentLines = [line];
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      continue;
    }

    if (inComponent) {
      // Se encontramos uma nova classe CSS (outra linha que começa com .), paramos
      if (line.match(/^\./) && !line.includes(componentName)) {
        break;
      }

      componentLines.push(line);
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      if (braceCount === 0) {
        break;
      }
    }
  }

  return componentLines.length > 0 ? componentLines.join('\n').trim() : null;
}

const content = fs.readFileSync('src/terrain/leafs/aligns.scss', 'utf8');
const result = extractScssComponent(content, 'leaf-flex');
console.log('=== EXTRAÇÃO DE leaf-flex ===');
console.log(result);
console.log('=== FIM DA EXTRAÇÃO ===');