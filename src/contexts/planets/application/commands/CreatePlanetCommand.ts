import { PlanetData } from "../dtos/PlanetData";
import { ICommand } from "../../../../contexts/shared/cqrs/ICommand";

export class CreatePlanetCommand implements ICommand {
    constructor(public readonly planetData: PlanetData) {}

    validate(): void | Promise<void> {
        if (!this.planetData.nombre || !this.planetData.periodoRotacion) {
            throw new Error("Datos del planeta incompletos o inválidos.");
        }
    }
}
