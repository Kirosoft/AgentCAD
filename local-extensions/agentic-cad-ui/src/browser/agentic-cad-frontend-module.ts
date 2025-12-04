import { ContainerModule } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution, KeybindingContribution } from '@theia/core/lib/browser';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { AgenticCadFrontendContribution } from '../agentic-cad-frontend-contribution';

export default new ContainerModule(bind => {
    bind(AgenticCadFrontendContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(AgenticCadFrontendContribution);
    bind(CommandContribution).toService(AgenticCadFrontendContribution);
    bind(MenuContribution).toService(AgenticCadFrontendContribution);
    bind(KeybindingContribution).toService(AgenticCadFrontendContribution);
});
