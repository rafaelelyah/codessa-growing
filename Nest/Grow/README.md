# 🌱 Codessa Grow

**Universal Component Manager for Growing Design System**

> "Grow is not just a tool, it's the heartbeat of Codessa's component ecosystem"

## 📖 Overview

**Grow** is the ultimate component management system that transcends traditional boundaries. Born from the Codessa Growing design system, Grow has evolved into a universal manager capable of handling:

- 🎨 **Trunks**: Structural SCSS components
- 🌿 **Sprouts**: Behaviors and interactions
- ⚡ **Sparks**: JavaScript components
- 🌾 **Harvest**: Assets (images, videos, audio)
- 🪴 **Soils**: Themes and variants
- 🌱 **Seeds**: Design tokens
- 🍃 **Leafs**: CSS utilities
- 🌳 **Barks**: Foundation components

## 🚀 Quick Start

### Installation
```bash
# Grow comes pre-installed with Codessa Growing
cd apps/growing
npm install
```

### Basic Usage
```bash
# Extract components
npm run grow header-1 nav-simple:navbar

# Search across all component types
npm run grow search button

# Search in specific type
npm run grow search header --type=trunks

# Validate system
npm run grow validate

# Clean components
npm run grow clean header-1 --force
```

## 📚 Commands

### Core Commands

| Command | Description | Example |
|---------|-------------|---------|
| `grow` | Extract components from any type | `npm run grow header-1 nav-simple:navbar` |
| `search` | Search components across all types | `npm run grow search button` |
| `clean` | Remove components | `npm run grow clean header-1 --force` |
| `update` | Update existing components | `npm run grow update nav-simple` |
| `validate` | Validate system integrity | `npm run grow validate` |
| `cache` | Manage component cache | `npm run grow cache stats` |
| `sync` | Sync operations with organized structure | `npm run grow sync --list` |
| `repo` | Manage online repositories | `npm run grow repo --add --name=myrepo --url=https://github.com/user/repo` |
| `assets` | Manage downloaded assets | `npm run grow assets --list` |

### Sync & Repository Commands

| Command | Description | Example |
|---------|-------------|---------|
| `sync --init` | Initialize sync system | `npm run grow sync --init` |
| `sync --repository=<name>` | Sync from repository | `npm run grow sync --repository=codessa-registry` |
| `sync --list` | List synced components | `npm run grow sync --list` |
| `repo --add` | Add repository | `npm run grow repo --add --name=myrepo --url=https://github.com/user/repo` |
| `repo --list` | List repositories | `npm run grow repo --list` |
| `assets --list` | List all assets | `npm run grow assets --list` |
| `assets --integrate` | Integrate component | `npm run grow assets --integrate trunk-button --library=trunks` |

### Advanced Usage

#### Component Types
```bash
# Trunks (SCSS Components)
npm run grow header-1 card-basic --type=trunks

# Sprouts (Behaviors)
npm run grow interaction-hover field-validation --type=sprouts

# Sparks (JavaScript)
npm run grow component-modal util-helpers --type=sparks

# Harvest (Assets)
npm run grow image-logo video-background --type=harvest

# Soils (Themes)
npm run grow soil-dark theme-compact --type=soils

# Seeds (Design Tokens)
npm run grow color-primary spacing-large --type=seeds

# Leafs (Utilities)
npm run grow align-center flex-column --type=leafs

# Barks (Foundation)
npm run grow foundation-reset bark-typography --type=barks
```

#### Renaming Components
```bash
# Rename during extraction
npm run grow nav-simple:custom-navbar header-1:main-header

# Multiple renames
npm run grow button-primary:btn-main card-basic:product-card
```

#### Cache Management
```bash
# View cache statistics
npm run grow cache stats

# List all cached mappings
npm run grow cache list

# Clear cache
npm run grow cache clear
```

## 🏗️ Architecture

### Modular Design
```
Grow/
├── grow.js              # Main CLI interface
├── core/
│   ├── local-operations.js    # Local component operations
│   ├── sync-operations.js     # Online sync operations
│   └── unified-config.js      # Unified configuration
├── modules/
│   ├── base.js         # Base classes and utilities
│   ├── trunks.js       # SCSS component manager
│   ├── sprouts.js      # Behavior manager
│   ├── sparks.js       # JavaScript manager
│   ├── harvest.js      # Asset manager
│   ├── soils.js        # Theme manager
│   ├── seeds.js        # Token manager
│   ├── leafs.js        # Utility manager
│   └── barks.js        # Foundation manager
├── grow-sync/          # Organized download directory
│   ├── seeds/          # Design tokens
│   ├── soils/          # Themes
│   ├── leafs/          # Utilities
│   ├── sprouts/        # Behaviors
│   ├── trunks/         # Components
│   ├── trees/          # Templates
│   ├── grooves/        # Multi-file templates
│   └── sparks/         # JavaScript
├── grow-cache.json     # Persistent cache
└── README.md          # This documentation
```

### Intelligent Discovery
Grow uses a 3-tier discovery system:

1. **Static Mappings**: Predefined component-to-file mappings
2. **Cache Learning**: Remembers discovered mappings
3. **Auto-Discovery**: Scans files for components

### Component Flow
```
Source Files → Grow Manager → Extraction → Tree Assembly → Development Ready
```

## 📁 Organized Sync Structure

### Grow-Sync Directory Structure
Grow v4.0 introduces an organized directory structure for better component management:

```
grow-sync/
├── seeds/         # Design tokens (complete downloads)
├── soils/         # Themes & variants (complete downloads)
├── leafs/         # CSS utilities (library expansion)
├── sprouts/       # Behaviors & interactions (library expansion)
├── trunks/        # SCSS components (library expansion)
├── trees/         # Complete templates (template downloads)
├── grooves/       # Multi-file templates (template downloads)
├── sparks/        # JavaScript components (library expansion)
└── harvest/       # Assets (direct placement to src/assets/)
```

### Download Strategies by Type

| Component Type | Strategy | Destination | Purpose |
|----------------|----------|-------------|---------|
| **Seeds** | Complete | `grow-sync/seeds/` | Full token libraries |
| **Soils** | Complete | `grow-sync/soils/` | Complete theme packages |
| **Leafs** | Expand | `grow-sync/leafs/` | Individual utilities |
| **Sprouts** | Expand | `grow-sync/sprouts/` | Individual behaviors |
| **Trunks** | Expand | `grow-sync/trunks/` | Individual components |
| **Trees** | Template | `grow-sync/trees/` | Complete page templates |
| **Grooves** | Template | `grow-sync/grooves/` | Multi-file structures |
| **Sparks** | Expand | `grow-sync/sparks/` | Individual JS components |
| **Harvest** | Direct | `src/assets/` | Assets go to final destination |

### Asset Organization
Harvest assets are automatically placed in appropriate directories:
```
src/assets/
├── images/        # PNG, JPG, GIF, SVG
├── videos/        # MP4, AVI, MOV
├── audio/         # MP3, WAV
├── icons/         # SVG icons
├── fonts/         # WOFF, TTF
└── misc/          # Other assets
```

## 🎯 Features

### ✅ Universal Component Support
- **8 Component Types**: Full spectrum coverage
- **Auto-Detection**: Intelligent type recognition
- **Cross-Type Search**: Search across all component types

### ✅ Smart Caching
- **Persistent Learning**: Remembers component locations
- **Performance Optimized**: Fast subsequent lookups
- **Integrity Validation**: Ensures cache consistency

### ✅ Developer Experience
- **Intuitive CLI**: Simple, powerful commands
- **Rich Feedback**: Clear success/error messages
- **Flexible Renaming**: Extract with custom names
- **Validation Tools**: System health checks

### ✅ Asset Management
- **Multi-Format Support**: Images, videos, audio, text
- **Metadata Extraction**: File info and properties
- **Organized Harvest**: Structured asset directories
- **Direct Placement**: Assets go to final destination automatically

### ✅ Online Synchronization
- **Repository Integration**: GitHub, GitLab, NPM support
- **Organized Downloads**: Components sorted by type
- **Strategy-Based Sync**: Different approaches per component type
- **Asset Pipeline**: Complete download-to-integration workflow

### ✅ Smart Organization
- **Type-Based Folders**: Automatic organization by component type
- **Template Support**: Complete multi-file structures
- **Library Expansion**: Individual component integration
- **Cache Intelligence**: Persistent learned mappings

## 🔧 Configuration

### Custom Configuration
```javascript
import { Grow } from './Grow/grow.js';

const customGrow = new Grow({
  PROJECT_ROOT: '/custom/path',
  CACHE_FILE: '/custom/cache.json',
  // ... other options
});
```

### Environment Variables
```bash
# Custom project root
GROW_PROJECT_ROOT=/path/to/project

# Custom cache location
GROW_CACHE_FILE=/path/to/cache.json
```

## 📊 System Validation

### Tree Validation
```bash
npm run grow validate --tree
```
- ✅ Verifies SCSS imports
- ✅ Counts active components
- ✅ Checks file integrity

### Cache Validation
```bash
npm run grow validate --cache
```
- ✅ Validates mapping integrity
- ✅ Checks file existence
- ✅ Reports statistics

### Full System Check
```bash
npm run grow validate
```
- ✅ Runs all validation checks
- ✅ Comprehensive system health
- ✅ Detailed reporting

## 🌟 Advanced Examples

### Complex Component Extraction
```bash
# Extract multiple types at once
npm run grow \
  header-1:site-header \
  nav-simple:main-nav \
  button-primary:cta-button \
  color-primary:brand-color \
  image-logo:brand-logo

# Search and extract workflow
npm run grow search modal
npm run grow modal-basic:custom-modal
```

### Theme Development
```bash
# Extract theme components
npm run grow soil-dark theme-compact

# Extract design tokens
npm run grow color-primary color-secondary spacing-large

# Combine for complete theme
npm run grow soil-dark color-primary spacing-large typography-base
```

### Asset Pipeline
```bash
# Extract brand assets
npm run grow image-logo:brand-logo image-hero:hero-bg

# Extract media assets
npm run grow video-background:hero-video audio-brand:brand-sound

# Extract documentation
npm run grow text-readme:project-docs
```

## 🔄 Sync & Repository Management

### Initialize Sync System
```bash
# Initialize organized sync structure
npm run grow sync --init

# This creates the grow-sync/ directory with all subfolders
```

### Repository Management
```bash
# Add a new repository
npm run grow repo --add --name=myrepo --url=https://github.com/user/repo

# Add repository with specific type
npm run grow repo --add --name=myrepo --url=https://github.com/user/repo --repo-type=github

# List all repositories
npm run grow repo --list

# Remove repository
npm run grow repo --remove --name=myrepo
```

### Sync Operations
```bash
# Sync from specific repository
npm run grow sync --repository=codessa-registry

# List all synced components (organized by type)
npm run grow sync --list

# Sync and download specific component
npm run grow trunk-button --online
```

### Asset Management
```bash
# List all downloaded assets
npm run grow assets --list

# Copy asset to custom location
npm run grow assets --copy trunk-button --to=src/components/custom/

# Integrate component into library
npm run grow assets --integrate trunk-button --library=trunks

# Clean all downloaded assets
npm run grow assets --clean
```

### Online Component Download
```bash
# Download from online repositories
npm run grow trunk-button --online

# Download with custom repository
npm run grow trunk-button --online --repository=myrepo

# Download multiple components online
npm run grow header-1 nav-simple button-primary --online
```

## 🐛 Troubleshooting

### Common Issues

**Component Not Found**
```bash
# Check available components
npm run grow search <component-prefix>

# Validate system
npm run grow validate
```

**Cache Issues**
```bash
# Clear and rebuild cache
npm run grow cache clear
npm run grow validate --cache
```

**Permission Errors**
```bash
# Ensure write permissions
chmod +w Grow/grow-cache.json
chmod +w src/terrain/trees/_tree.scss
```

### Debug Mode
```bash
# Enable verbose logging
DEBUG=grow npm run grow <command>
```

## 🤝 Contributing

### Development Setup
```bash
# Clone and setup
git clone <repository>
cd apps/growing
npm install

# Run tests
npm test

# Development mode
npm run dev
```

### Adding New Component Types
1. Create new manager in `modules/`
2. Add to `COMPONENT_TYPES` in `base.js`
3. Update main `Grow` class
4. Add CLI support
5. Update documentation

### Code Standards
- ES6+ modules
- Async/await patterns
- Comprehensive error handling
- Clear documentation
- Modular architecture

## 📈 Performance

### Benchmarks
- **Component Extraction**: < 100ms per component
- **System Search**: < 500ms across all types
- **Cache Lookup**: < 10ms
- **Validation**: < 2s full system

### Optimization Features
- **Lazy Loading**: Managers loaded on demand
- **Smart Caching**: Persistent learned mappings
- **Parallel Processing**: Multiple component extraction
- **Memory Efficient**: Minimal memory footprint

## 🎨 Branding

**Grow** represents the living, breathing nature of component development:

- 🌱 **Growth**: Continuous evolution
- 🌿 **Harmony**: Natural component relationships
- 🌳 **Strength**: Robust architecture
- 🌸 **Beauty**: Elegant developer experience

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Rafael Elyah** - Creator of Codessa Growing

## 🙏 Acknowledgments

- Codessa Design System
- Growing Component Architecture
- Open source community
- Nature-inspired design principles

---

**"In the garden of code, Grow helps everything flourish"** 🌱✨