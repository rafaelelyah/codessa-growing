"""
🪺 Codessa Nest - Hub de Assets e Integrações

O hub central do ecossistema Codessa para gerenciamento de assets,
integrações e ferramentas especializadas.
"""

__version__ = "0.1.0-alpha"
__author__ = "Rafael Elyah"

# Configurações globais
PROJECT_ROOT = None
CONFIG_DIR = None

def init_project_paths():
    """Inicializa caminhos do projeto"""
    import os
    from pathlib import Path

    global PROJECT_ROOT, CONFIG_DIR

    # Caminho da raiz do projeto (onde está o package.json)
    current_path = Path(__file__).parent.parent
    PROJECT_ROOT = current_path

    # Diretório de configuração
    CONFIG_DIR = current_path / "Nest" / "Config"

    # Criar diretório de configuração se não existir
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)

# Inicializar caminhos na importação
init_project_paths()