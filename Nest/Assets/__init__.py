"""
📦 Codessa Nest - Assets

Módulo para gerenciamento de assets digitais do sistema.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from pathlib import Path
import os
import hashlib
from datetime import datetime

class BaseAsset(ABC):
    """Classe base para assets"""

    def __init__(self, path: Path, name: str = None):
        self.path = Path(path)
        self.name = name or self.path.name
        self.size = self.path.stat().st_size if self.path.exists() else 0
        self.created = datetime.fromtimestamp(self.path.stat().st_ctime) if self.path.exists() else None
        self.modified = datetime.fromtimestamp(self.path.stat().st_mtime) if self.path.exists() else None

    @abstractmethod
    def get_type(self) -> str:
        """Retorna tipo do asset"""
        pass

    @abstractmethod
    def get_metadata(self) -> Dict[str, Any]:
        """Retorna metadados do asset"""
        pass

    def get_hash(self) -> str:
        """Calcula hash do arquivo"""
        if not self.path.exists():
            return ""

        hash_md5 = hashlib.md5()
        with open(self.path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()

    def exists(self) -> bool:
        """Verifica se o asset existe"""
        return self.path.exists()

class ImageAsset(BaseAsset):
    """Asset de imagem"""

    def get_type(self) -> str:
        return "image"

    def get_metadata(self) -> Dict[str, Any]:
        # TODO: Extrair metadados da imagem (dimensões, formato, etc.)
        return {
            "type": "image",
            "extension": self.path.suffix,
            "size": self.size,
            "path": str(self.path)
        }

class VideoAsset(BaseAsset):
    """Asset de vídeo"""

    def get_type(self) -> str:
        return "video"

    def get_metadata(self) -> Dict[str, Any]:
        return {
            "type": "video",
            "extension": self.path.suffix,
            "size": self.size,
            "path": str(self.path)
        }

class DocumentAsset(BaseAsset):
    """Asset de documento"""

    def get_type(self) -> str:
        return "document"

    def get_metadata(self) -> Dict[str, Any]:
        return {
            "type": "document",
            "extension": self.path.suffix,
            "size": self.size,
            "path": str(self.path)
        }

class AssetManager:
    """Gerenciador de assets do Nest"""

    def __init__(self, assets_dir: Path = None):
        self.assets_dir = assets_dir or Path(__file__).parent / "storage"
        self.assets_dir.mkdir(parents=True, exist_ok=True)
        self.assets: Dict[str, BaseAsset] = {}

    def scan_directory(self, directory: Path = None) -> List[BaseAsset]:
        """Escaneia diretório por assets"""
        scan_dir = directory or self.assets_dir
        assets = []

        if not scan_dir.exists():
            return assets

        for file_path in scan_dir.rglob("*"):
            if file_path.is_file():
                asset = self._create_asset_from_path(file_path)
                if asset:
                    assets.append(asset)

        return assets

    def _create_asset_from_path(self, path: Path) -> Optional[BaseAsset]:
        """Cria asset baseado na extensão do arquivo"""
        extension = path.suffix.lower()

        # Imagens
        if extension in ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']:
            return ImageAsset(path)

        # Vídeos
        elif extension in ['.mp4', '.avi', '.mov', '.wmv', '.flv']:
            return VideoAsset(path)

        # Documentos
        elif extension in ['.pdf', '.doc', '.docx', '.txt', '.md']:
            return DocumentAsset(path)

        return None

    def search_assets(self, query: str, asset_type: str = None) -> List[BaseAsset]:
        """Busca assets por nome ou tipo"""
        all_assets = self.scan_directory()

        results = []
        for asset in all_assets:
            if query.lower() in asset.name.lower():
                if asset_type and asset.get_type() != asset_type:
                    continue
                results.append(asset)

        return results

    def get_asset_stats(self) -> Dict[str, Any]:
        """Retorna estatísticas dos assets"""
        all_assets = self.scan_directory()

        stats = {
            "total": len(all_assets),
            "types": {},
            "total_size": 0
        }

        for asset in all_assets:
            asset_type = asset.get_type()
            stats["types"][asset_type] = stats["types"].get(asset_type, 0) + 1
            stats["total_size"] += asset.size

        return stats

# Instância global
asset_manager = AssetManager()