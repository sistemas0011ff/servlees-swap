import { Service, Token } from "typedi";
import { ICommandHandler } from "../../../../contexts/shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../../contexts/shared/cqrs/ICommandResult";
import { PeopleData } from '../dtos/PeopleData';
import { PeopleCreationConfirmation } from '../dtos/PeopleCreationConfirmation';
import { IPeopleCreationUseCase } from '../interfaces/IPeopleCreationUseCase'; 
import { People } from "../dtos/People";
import { CreatePeopleCommand } from "../commands/CreatePeopleCommand";

const IPeopleCreationUseCaseToken = new Token<IPeopleCreationUseCase>();

@Service(IPeopleCreationUseCaseToken)
export class PeopleCreationUseCase implements IPeopleCreationUseCase {

    constructor(
        private commandHandler: ICommandHandler<CreatePeopleCommand, ICommandResult<boolean, PeopleCreationConfirmation>>
    ) {}

    async createPeople(data: PeopleData): Promise<People> {
        console.log("ingreso al caso de uso");
        const command = new CreatePeopleCommand(data); 
        const commandResult = await this.commandHandler.handle(command);

        if (!commandResult.result || !commandResult.value.people) {
            throw new Error(commandResult.value.message || "Error al crear el Peoplea");
        }
        return commandResult.value.people;
    }
}
