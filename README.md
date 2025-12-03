# AgentCAD

Minimal Python project scaffold for AgentCAD.

Setup
-----

1. Create virtual environment:

```powershell
python -m venv .venv
```

2. Activate (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

For cmd.exe:

```cmd
.venv\Scripts\activate.bat
```

For Git Bash / WSL:

```bash
source .venv/bin/activate
```

VS Code workspace interpreter
-----------------------------

To use the workspace virtual environment in VS Code automatically:

1. Open the Command Palette (Ctrl+Shift+P) and choose `Python: Select Interpreter`.
2. Pick the interpreter at `.venv\Scripts\python.exe` (the workspace setting already points to it).
3. New integrated terminals will activate the environment if `python.terminal.activateEnvironment` is enabled.


3. Install dependencies:

```powershell
pip install -r requirements.txt
```

Run
---

```powershell
python -m src.main
```
