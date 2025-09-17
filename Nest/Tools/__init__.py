"""
🛠️ Codessa Nest - Tools

Módulo para gerenciamento e execução de ferramentas especializadas do Nest.
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from pathlib import Path
import subprocess
import importlib.util

class BaseTool(ABC):
    """Classe base para ferramentas do Nest"""

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description
        self.enabled = True

    @abstractmethod
    def is_available(self) -> bool:
        """Verifica se a ferramenta está disponível"""
        pass

    @abstractmethod
    def execute(self, *args, **kwargs) -> Any:
        """Executa a ferramenta"""
        pass

    def get_info(self) -> Dict[str, Any]:
        """Retorna informações da ferramenta"""
        return {
            "name": self.name,
            "description": self.description,
            "available": self.is_available(),
            "enabled": self.enabled
        }

class GrowTool(BaseTool):
    """Ferramenta Grow - Universal Component Manager"""

    def __init__(self):
        super().__init__(
            name="Grow",
            description="Universal Component Manager para Codessa Growing"
        )
        self.grow_path = Path(__file__).parent.parent / "Grow" / "grow.js"

    def is_available(self) -> bool:
        """Verifica se o Grow está disponível"""
        return self.grow_path.exists()

    def execute(self, command: str, *args, **kwargs) -> subprocess.CompletedProcess:
        """Executa comando no Grow"""
        if not self.is_available():
            raise FileNotFoundError("Grow não encontrado")

        cmd = ["node", str(self.grow_path), command] + list(args)

        # Adicionar opções
        if "type" in kwargs:
            cmd.extend(["--type", kwargs["type"]])

        return subprocess.run(cmd, cwd=Path(__file__).parent.parent.parent, **kwargs)

class ToolManager:
    """Gerenciador de ferramentas do Nest"""

    def __init__(self):
        self.tools: Dict[str, BaseTool] = {}
        self._load_tools()

    def _load_tools(self):
        """Carrega ferramentas disponíveis"""
        self.tools["grow"] = GrowTool()

        # Futuras ferramentas podem ser carregadas dinamicamente
        # self._load_external_tools()

    def get_tool(self, name: str) -> Optional[BaseTool]:
        """Obtém ferramenta por nome"""
        return self.tools.get(name.lower())

    def list_tools(self) -> List[Dict[str, Any]]:
        """Lista todas as ferramentas"""
        return [tool.get_info() for tool in self.tools.values()]

    def execute_tool(self, name: str, *args, **kwargs) -> Any:
        """Executa ferramenta por nome"""
        tool = self.get_tool(name)
        if not tool:
            raise ValueError(f"Ferramenta '{name}' não encontrada")

        if not tool.enabled:
            raise ValueError(f"Ferramenta '{name}' está desabilitada")

        return tool.execute(*args, **kwargs)

# Instância global
tool_manager = ToolManager()