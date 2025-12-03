import { ContainerModule } from 'inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { CommandContribution } from '@theia/core/lib/common';
import { AgenticCadFrontendContribution } from '../agentic-cad-frontend-contribution';

export default new ContainerModule(bind => {
    bind(AgenticCadFrontendContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(AgenticCadFrontendContribution);
    bind(CommandContribution).toService(AgenticCadFrontendContribution);
});
