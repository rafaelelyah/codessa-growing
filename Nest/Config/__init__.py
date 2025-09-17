"""
🪺 Codessa Nest - Configurações

Módulo de configurações globais e personalização do Nest.
"""

import json
import os
from pathlib import Path
from typing import Dict, Any

class NestConfig:
    """Gerenciador de configurações do Nest"""

    def __init__(self, config_file: Path = None):
        self.config_file = config_file or Path(__file__).parent / "nest-config.json"
        self._config = self._load_config()

    def _load_config(self) -> Dict[str, Any]:
        """Carrega configurações do arquivo"""
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                pass

        # Configurações padrão
        return {
            "version": "0.1.0-alpha",
            "project": {
                "name": "Codessa Growing",
                "root": str(Path(__file__).parent.parent.parent)
            },
            "tools": {
                "grow": {
                    "enabled": True,
                    "path": "Nest/Grow/grow.js",
                    "types": ["trunks", "sprouts", "sparks", "harvest", "soils", "seeds", "leafs", "barks"]
                }
            },
            "integrations": {
                "figma": {"enabled": False},
                "storybook": {"enabled": False},
                "github": {"enabled": False}
            },
            "cache": {
                "enabled": True,
                "max_age": 86400  # 24 horas
            }
        }

    def get(self, key: str, default: Any = None) -> Any:
        """Obtém valor de configuração"""
        keys = key.split('.')
        value = self._config

        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default

        return value

    def set(self, key: str, value: Any) -> None:
        """Define valor de configuração"""
        keys = key.split('.')
        config = self._config

        # Navegar até o penúltimo nível
        for k in keys[:-1]:
            if k not in config:
                config[k] = {}
            config = config[k]

        # Definir valor
        config[keys[-1]] = value
        self._save_config()

    def _save_config(self) -> None:
        """Salva configurações no arquivo"""
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(self._config, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"⚠️  Erro ao salvar configuração: {e}")

    def list_all(self) -> Dict[str, Any]:
        """Retorna todas as configurações"""
        return self._config.copy()

# Instância global
config = NestConfig()