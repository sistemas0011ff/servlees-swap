import { ICommandHandler } from "../../../../contexts/shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { CreatePeopleCommand } from "../commands/CreatePeopleCommand";
import { PeopleCreationConfirmation } from "../dtos/PeopleCreationConfirmation";
import { IPeopleRepository } from "../../domain/interfaces/IPeopleRepository";
import { Inject, Service } from 'typedi';
import { People } from "../dtos/People";

@Service()
export class CreatePeopleCommandHandler implements ICommandHandler<CreatePeopleCommand, ICommandResult<boolean, PeopleCreationConfirmation>> {
    constructor(
        private peopleRepository: IPeopleRepository
    ) {}

    async handle(command: CreatePeopleCommand): Promise<ICommandResult<boolean, PeopleCreationConfirmation>> {
        try {
            const peopleData = new People({
                id: command.PeopleData.id,
                name: command.PeopleData.nombre,
                height: command.PeopleData.altura,
                mass: command.PeopleData.masa,
                hair_color: command.PeopleData.colorCabello,
                skin_color: command.PeopleData.colorPiel,
                eye_color: command.PeopleData.colorOjos,
                birth_year: command.PeopleData.anioNacimiento,
                gender: command.PeopleData.genero,
                homeworld_name: command.PeopleData.nombreMundoNatal,
                created: command.PeopleData.creado,
                edited: command.PeopleData.editado
            });

            const peopleId = await this.peopleRepository.save(peopleData);

            return {
                result: true,
                value: {
                    success: true,
                    responseCode: "0",
                    message: "Persona creada con éxito", 
                    planetId: peopleId,
                    people: peopleData
                }
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return {
                result: false,
                value: {
                    success: false,
                    responseCode: "1",
                    message: message, 
                }
            };
        }
    }
}
