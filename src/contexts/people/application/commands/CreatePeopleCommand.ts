import { PeopleData } from "../dtos/PeopleData";
import { ICommand } from "../../../../contexts/shared/cqrs/ICommand";

export class CreatePeopleCommand implements ICommand {
    constructor(public readonly PeopleData: PeopleData) {}

    validate(): void | Promise<void> {
        if (!this.PeopleData.nombre ) {
            throw new Error("Datos del Peoplea incompletos o inválidos.");
        }
    }
}
