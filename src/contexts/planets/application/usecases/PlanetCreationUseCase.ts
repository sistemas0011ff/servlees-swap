import { Service, Token } from "typedi";
import { ICommandHandler } from "../../../../contexts/shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../../contexts/shared/cqrs/ICommandResult";
import { PlanetData } from '../dtos/PlanetData';
import { PlanetCreationConfirmation } from '../dtos/PlanetCreationConfirmation';
import { IPlanetCreationUseCase } from '../interfaces/IPlanetCreationUseCase';
import { CreatePlanetCommand } from '../commands/CreatePlanetCommand';
import { Planet } from "../dtos/Planet";

const IPlanetCreationUseCaseToken = new Token<IPlanetCreationUseCase>();

@Service(IPlanetCreationUseCaseToken)
export class PlanetCreationUseCase implements IPlanetCreationUseCase {

    constructor(
        private commandHandler: ICommandHandler<CreatePlanetCommand, ICommandResult<boolean, PlanetCreationConfirmation>>
    ) {}

    async createPlanet(data: PlanetData): Promise<Planet> {
        console.log("ingreso al caso de uso");
        const command = new CreatePlanetCommand(data); 
        const commandResult = await this.commandHandler.handle(command);

        if (!commandResult.result || !commandResult.value.planet) {
            throw new Error(commandResult.value.message || "Error al crear el planeta");
        }
        return commandResult.value.planet;
    }
}
