#!/usr/bin/env python3
"""
🪺 Codessa Nest - Hub de Assets e Integrações

CLI principal do Nest para orquestração de ferramentas e gerenciamento de assets.
Versão básica sem dependências externas para testes iniciais.
"""

import sys
import subprocess
from pathlib import Path

# Configurações
PROJECT_ROOT = Path(__file__).parent.parent
GROW_PATH = PROJECT_ROOT / "Nest" / "Grow" / "grow.js"

def show_help():
    """Mostra ajuda do CLI"""
    print("🪺 Codessa Nest - Hub de Assets e Integrações")
    print()
    print("COMANDOS DISPONÍVEIS:")
    print("  python Nest/cli.py grow <componentes>    - Extrair componentes")
    print("  python Nest/cli.py grow --search <termo> - Buscar componentes")
    print("  python Nest/cli.py grow --validate       - Validar sistema")
    print("  python Nest/cli.py status                - Status do sistema")
    print("  python Nest/cli.py tools                 - Ferramentas disponíveis")
    print("  python Nest/cli.py --help                - Esta ajuda")
    print()
    print("EXEMPLOS:")
    print("  python Nest/cli.py grow header-1 nav-simple")
    print("  python Nest/cli.py grow --search button")
    print("  python Nest/cli.py status")

def show_status():
    """Mostra status do sistema"""
    print("📊 Verificando status do sistema...")

    # Verificar Grow
    grow_status = "✅ Disponível" if GROW_PATH.exists() else "❌ Não encontrado"
    print(f"🌱 Grow: {grow_status}")

    # Verificar outras ferramentas (futuro)
    print("🛠️  Outras ferramentas: Em desenvolvimento")

    # Verificar configurações
    config_dir = PROJECT_ROOT / "Nest" / "Config"
    config_status = "✅ Preparado" if config_dir.exists() else "❌ Não encontrado"
    print(f"⚙️  Configurações: {config_status}")

def show_tools():
    """Mostra ferramentas disponíveis"""
    print("🛠️  Ferramentas do Codessa Nest:")
    print()
    print("🌱 Grow - Universal Component Manager")
    print("   • Gerenciamento de componentes SASS")
    print("   • Extração inteligente de assets")
    print("   • Busca universal por componentes")
    print("   • Status: ✅ Implementado")
    print()

    print("🚧 Em desenvolvimento:")
    print("🖼️  Canvas - Editor Visual")
    print("🔄 Sync - Sincronização com Figma/Storybook")
    print("📊 Dashboard - Analytics e Relatórios")
    print("🤖 AI - Assistente Inteligente")

def execute_grow(args):
    """Executa comando no Grow"""

    # Verificar se Grow existe
    if not GROW_PATH.exists():
        print("❌ Grow não encontrado!")
        print(f"📁 Procurado em: {GROW_PATH}")
        return 1

    # Montar comando Node.js
    cmd = ["node", str(GROW_PATH)]

    if "--validate" in args:
        # Comando de validação
        cmd.append("validate")
        print("✅ Validando sistema Grow...")

    elif "--search" in args:
        # Comando de busca
        try:
            search_index = args.index("--search")
            if search_index + 1 < len(args):
                search_term = args[search_index + 1]
                cmd.extend(["search", search_term])

                # Verificar se há --type
                if "--type" in args:
                    type_index = args.index("--type")
                    if type_index + 1 < len(args):
                        asset_type = args[type_index + 1]
                        cmd.extend(["--type", asset_type])

                print(f"🔍 Buscando: {search_term}")
            else:
                print("❌ Especifique o termo de busca: --search <termo>")
                return 1
        except ValueError:
            print("❌ Uso: --search <termo>")
            return 1

    elif args:
        # Comando de extração
        cmd.append("grow")
        cmd.extend(args)
        print(f"🌱 Extraindo componentes: {', '.join(args)}")

    else:
        # Mostrar ajuda do Grow
        cmd.append("--help")

    try:
        # Executar comando
        print(f"⚡ Executando: {' '.join(cmd)}")
        print()

        result = subprocess.run(cmd, cwd=PROJECT_ROOT)

        if result.returncode == 0:
            print()
            print("✅ Operação concluída com sucesso!")
        else:
            print()
            print("❌ Erro na execução!")

        return result.returncode

    except FileNotFoundError:
        print("❌ Node.js não encontrado! Instale o Node.js para usar o Grow.")
        return 1
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        return 1

def main():
    """Função principal do CLI"""
    print("🪺 Codessa Nest - Hub de Assets e Integrações")
    print(f"📂 Projeto: {PROJECT_ROOT.name}")
    print()

    args = sys.argv[1:]

    if not args or args[0] in ["--help", "-h", "help"]:
        show_help()
        return 0

    command = args[0]

    if command == "grow":
        return execute_grow(args[1:])
    elif command == "status":
        show_status()
        return 0
    elif command == "tools":
        show_tools()
        return 0
    else:
        print(f"❌ Comando desconhecido: {command}")
        print("Use --help para ver comandos disponíveis")
        return 1

if __name__ == '__main__':
    sys.exit(main())