# Codessa Grow CLI

## Commands

### Create Project
```bash
node grow/grow.js create <project-name> --type=<type>
```

**Types:**
- `sass` - SCSS-only project
- `vite` - Full web app with Vite + SCSS
- `json` - Data-only project with JSON configs

**Examples:**
```bash
node grow/grow.js create my-app --type=vite
node grow/grow.js create styles --type=sass
node grow/grow.js create config --type=json
```

### Interactive Mode
```bash
node grow/grow.js
```
Follow the prompts to create projects interactively.

### Help
```bash
node grow/grow.js help
```
Show available commands and usage information.

## Project Structures

### SASS Project Structure
```
project-name/
├── foundation/
│   ├── index.scss          # @forward roots, seeds, soil, bark, sprouts, leafs
│   ├── sprouts.scss        # @use 'soil' - Atomic component constructors
│   └── leafs.scss          # @use 'soil' - Molecular component modifiers
├── harvest/
│   ├── img/                # Images
│   ├── audio/              # Audio files
│   ├── video/              # Video files
│   ├── text/               # Text content
│   └── docs/               # Documentation files
├── sparks/
│   └── js files            # JavaScript utilities
├── tree/
│   ├── index.scss          # @forward layout, grid, typography, forms, components, pages, utilities
│   ├── layout.scss         # Main layout components
│   ├── grid.scss           # Responsive grid system
│   ├── typography.scss     # Text styles
│   ├── forms.scss          # Form components
│   ├── components.scss     # Project components
│   ├── pages.scss          # Page specific styles
│   └── utilities.scss      # Project utilities
├── tree.scss               # Main SCSS entry point (@use 'tree')
├── sparks.js               # Main JavaScript file
└── README.md               # Documentation
```

### Vite Project Structure
```
project-name/
├── foundation/
│   ├── index.scss          # @forward roots, seeds, soil, bark, sprouts, leafs
│   ├── sprouts.scss        # @use 'soil' - Atomic component constructors
│   └── leafs.scss          # @use 'soil' - Molecular component modifiers
├── harvest/
│   ├── img/                # Images
│   ├── audio/              # Audio files
│   ├── video/              # Video files
│   ├── text/               # Text content
│   └── docs/               # Documentation files
├── sparks/
│   └── js files            # JavaScript utilities
├── tree/
│   ├── index.scss          # @forward layout, grid, typography, forms, components, pages, utilities
│   ├── layout.scss         # Main layout components
│   ├── grid.scss           # Responsive grid system
│   ├── typography.scss     # Text styles
│   ├── forms.scss          # Form components
│   ├── components.scss     # Project components
│   ├── pages.scss          # Page specific styles
│   └── utilities.scss      # Project utilities
├── tree.scss               # Main SCSS entry point (@use 'tree')
├── sparks.js               # Main JavaScript file
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md               # Documentation
```

### JSON Project Structure
```
project-name/
├── foundation/
│   └── project.json        # Main project configuration
├── harvest/
│   ├── img/                # Images
│   ├── audio/              # Audio files
│   ├── video/              # Video files
│   ├── text/               # Text content
│   └── docs/
│       └── design-tokens.schema.json  # JSON schema for validation
├── sparks/
│   └── config.json         # JavaScript utilities configuration
├── tree/
│   ├── design-tokens.json  # Design tokens
│   └── components.json     # Component definitions
└── README.md               # Documentation
```</content>
<parameter name="filePath">c:\Users\rafae\Documents\MEGA\Codessa\Apps\growing\grow\README.md