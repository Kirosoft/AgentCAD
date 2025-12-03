import { injectable, inject } from 'inversify';
import { CommandContribution, CommandRegistry, MessageService } from '@theia/core';
import { FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser';
import { MiniBrowserOpenHandler } from '@theia/mini-browser/lib/browser/mini-browser-open-handler';
import URI from '@theia/core/lib/common/uri';

export const OpenAgenticLayoutCommand = {
    id: 'agentic-cad.openLayout',
    label: 'AgenticCAD: Open Part Workspace'
};

@injectable()
export class AgenticCadFrontendContribution implements FrontendApplicationContribution, CommandContribution {

    @inject(EditorManager) protected readonly editorManager: EditorManager;
    @inject(MiniBrowserOpenHandler) protected readonly miniBrowserHandler: MiniBrowserOpenHandler;
    @inject(MessageService) protected readonly messageService: MessageService;

    // Register the command (Ctrl+Shift+P -> "AgenticCAD: Open Part Workspace")
    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(OpenAgenticLayoutCommand, {
            execute: () => this.openLayout()
        });
    }

    async onStart(app: FrontendApplication): Promise<void> {
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
            this.messageService.info('Opening OCP Viewer...');
            
            // Open Mini-Browser with the OCP Server
            await this.miniBrowserHandler.open(new URI(ocpUrl), {
                widgetOptions: {
                    area: 'right',  // Force to Right Panel
                    mode: 'split-right'
                }
            });

        } catch (err) {
            console.error(err);
            this.messageService.error('Failed to open AgenticCAD Layout. Is OCP Server running?');
        }
    }
}