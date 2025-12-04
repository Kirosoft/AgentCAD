import { injectable, inject } from '@theia/core/shared/inversify';
import { CommandContribution, CommandRegistry, MessageService, MenuContribution, MenuModelRegistry } from '@theia/core';
import { FrontendApplicationContribution, FrontendApplication, KeybindingContribution, KeybindingRegistry, CommonMenus } from '@theia/core/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser';
import { MiniBrowserOpenHandler } from '@theia/mini-browser/lib/browser/mini-browser-open-handler';
import URI from '@theia/core/lib/common/uri';

export const OpenAgenticLayoutCommand = {
    id: 'agentic-cad.openLayout',
    label: 'AgentCAD: Viewer'
};

@injectable()
export class AgenticCadFrontendContribution implements FrontendApplicationContribution, CommandContribution, MenuContribution, KeybindingContribution {

    @inject(EditorManager) protected readonly editorManager: EditorManager;
    @inject(MiniBrowserOpenHandler) protected readonly miniBrowserHandler: MiniBrowserOpenHandler;
    @inject(MessageService) protected readonly messageService: MessageService;

    // Register the command (Ctrl+Shift+P -> "AgenticCAD: Open 3D Viewer")
    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(OpenAgenticLayoutCommand, {
            execute: () => this.openLayout()
        });
    }

    // Add keyboard shortcut: Ctrl+Shift+V
    registerKeybindings(registry: KeybindingRegistry): void {
        registry.registerKeybinding({
            command: OpenAgenticLayoutCommand.id,
            keybinding: 'ctrlcmd+shift+v'
        });
    }

    // Add menu item under View menu
    registerMenus(registry: MenuModelRegistry): void {
        registry.registerMenuAction(CommonMenus.VIEW_VIEWS, {
            commandId: OpenAgenticLayoutCommand.id,
            label: 'AgentCAD Viewer',
            order: '0'
        });
    }

    async onStart(app: FrontendApplication): Promise<void> {
        console.info('[AgentCAD BUILD MARKER 5] agentic-cad-frontend-contribution.js loaded');
        // Optional: Trigger layout automatically if a specific file exists
    }

    async openLayout(): Promise<void> {
        // 1. Define the OCP Server URL (Default build123d/ocp viewer port)
        const ocpUrl = 'http://127.0.0.1:32323';

        try {
            // 2. Open Files (Simulated for current workspace)
            // In a real scenario, you'd get the 'active' folder URI
            // const uri = new URI('file:///path/to/project/src/parts/chassis');
            
            // For now, we just open the 3D Viewer on the side
            this.messageService.info('Opening AgentCAD Viewer...');
            
            // Open Mini-Browser with the OCP Server
            // Build a safe URI via components to avoid parsing issues
            const safeUri = URI.fromComponents({ scheme: 'http', authority: '127.0.0.1:32323', path: '/', query: '', fragment: '' });
            await this.miniBrowserHandler.open(safeUri, {
                widgetOptions: {
                    area: 'right',  // Force to Right Panel
                    mode: 'split-right'
                }
            });

        } catch (err) {
            console.error(err);
            this.messageService.error('Failed to open AgentCAD Layout. Is OCP Server running?');
        }
    }
}