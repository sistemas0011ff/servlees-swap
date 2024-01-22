import { Service } from "typedi";
import { IQueryHandler } from "../../../../contexts/shared/cqrs/IQueryHandler"; 
import { Planet } from "../../application/dtos/Planet";
import { PlanetQueryValues } from "../queries/PlanetQueryValues";
import { IRetrievePlanetsUseCase } from "../interfaces/IRetrievePlanetsUseCase";

@Service()
export class RetrievePlanetsUseCase implements IRetrievePlanetsUseCase {

    constructor(
        private planetsQueryHandler: IQueryHandler<PlanetQueryValues, Planet[]>
    ) {}

    async execute(): Promise<Planet[]> {
        const query = new PlanetQueryValues();
        return await this.planetsQueryHandler.execute(query);
    }
}
