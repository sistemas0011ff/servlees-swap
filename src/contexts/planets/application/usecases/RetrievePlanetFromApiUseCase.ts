import { Service, Inject } from "typedi";
import { PlanetDataEnglishApp } from "../dtos/PlanetDataEnglishApp"; 
import { IQueryHandler } from "../../../shared/cqrs/IQueryHandler";
import { GetPlanetQuery } from "../queries/GetPlanetQuery";
import { IRetrievePlanetFromApiUseCase } from "../interfaces/IRetrievePlanetFromApiUseCase";
import { PlanetDataSpanishApp } from "../dtos/PlanetDataSpanishApp";

@Service()
export class RetrievePlanetFromApiUseCase implements IRetrievePlanetFromApiUseCase {
    constructor(
        private planetsQueryHandler: IQueryHandler<GetPlanetQuery, PlanetDataEnglishApp[]>
    ) {}

    async execute(planetId: number): Promise<PlanetDataSpanishApp> {
        try {
            const query: GetPlanetQuery = { planetId };
            const [planetEnglish] = await this.planetsQueryHandler.execute(query);

            // Mapeo de PlanetDataEnglishApp a PlanetDataSpanishApp
            return new PlanetDataSpanishApp({
                nombre: planetEnglish.name,
                periodoRotacion: planetEnglish.rotation_period,
                periodoOrbital: planetEnglish.orbital_period,
                diametro: planetEnglish.diameter,
                clima: planetEnglish.climate,
                gravedad: planetEnglish.gravity,
                terreno: planetEnglish.terrain,
                aguaSuperficial: planetEnglish.surface_water,
                poblacion: planetEnglish.population,
            });
        } catch (error) {
            console.error('Error in RetrievePlanetFromApiUseCase:', error);
            throw error;
        }
    }
}
