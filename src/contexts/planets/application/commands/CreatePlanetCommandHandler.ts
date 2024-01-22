import { ICommandHandler } from "../../../../contexts/shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { CreatePlanetCommand } from "../commands/CreatePlanetCommand";
import { PlanetCreationConfirmation } from "../dtos/PlanetCreationConfirmation";
import { IPlanetRepository } from "../../domain/interfaces/IPlanetRepository";
import { Inject, Service } from 'typedi';
import { Planet } from "../dtos/Planet";

@Service()
export class CreatePlanetCommandHandler implements ICommandHandler<CreatePlanetCommand, ICommandResult<boolean, PlanetCreationConfirmation>> {
    constructor(
        private planetRepository: IPlanetRepository
    ) {}

    async handle(command: CreatePlanetCommand): Promise<ICommandResult<boolean, PlanetCreationConfirmation>> {
        try {
            console.log("Dentro del handler!");
            const planetData = new Planet({ ...command.planetData });
            const planetId = await this.planetRepository.save(planetData);

            return {
                result: true,
                value: {
                    success: true,
                    responseCode: "0",
                    message: "Planet Created Successfully",
                    planetId: planetId,
                    planet: planetData // Incluir el objeto planeta
                }
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            console.error("Error in CreatePlanetCommandHandler.handle(): ", message);
            return {
                result: false,
                value: {
                    success: false,
                    responseCode: "1",
                    message: message,
                    planetId: ""
                }
            };
        }
    }
}
