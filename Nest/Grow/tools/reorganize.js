import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const treeFile = path.join(__dirname, 'src', 'terrain', 'trees', '_tree.scss');
console.log('Reorganizando arquivo tree:', treeFile);

if (fs.existsSync(treeFile)) {
  const currentContent = fs.readFileSync(treeFile, 'utf8');
  console.log('✅ Arquivo encontrado! Aplicando nova organização...');

  // Criar nova estrutura organizada
  const organizedContent = `@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TREE — DEVELOPMENT COMPONENTS
// ========================================
// Components organized by type for better maintainability

// ========================================
// 🌱 SPROUTS SECTION (Dependencies & Behaviors)
// ========================================
// Sprouts are placed at the top so they can be used by any trunk below
// This section contains mixins, functions, and utility behaviors

// ========================================
// 🌳 TRUNKS SECTION (Main Components)
// ========================================
// Trunks are the main structural components of your design system
// They can use any sprout from above

// ========================================
// 🍃 LEAFS SECTION (Utilities & Overrides)
// ========================================
// Leafs are placed at the bottom for final styling adjustments
// They can override any trunk or sprout above

`;

  fs.writeFileSync(treeFile, organizedContent, 'utf8');
  console.log('✅ Arquivo reorganizado com nova estrutura de seções!');
  console.log('🌱 Sistema de organização implementado com sucesso!');
} else {
  console.log('❌ Arquivo tree não encontrado');
}