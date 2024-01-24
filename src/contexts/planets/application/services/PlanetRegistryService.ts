import { Service } from 'typedi';
import { IPlanetRegistryService } from '../interfaces/IPlanetRegistryService';
import { IPlanetCreationUseCase } from '../interfaces/IPlanetCreationUseCase';
import { PlanetDataSpanishApp } from '../dtos/PlanetDataSpanishApp';
import { Planet } from '../dtos/Planet'; 
import { IRetrievePlanetsUseCase } from '../interfaces/IRetrievePlanetsUseCase';
import { IRetrievePlanetFromApiUseCase } from '../interfaces/IRetrievePlanetFromApiUseCase';

@Service()
export class PlanetRegistryService implements IPlanetRegistryService {
    constructor(
        private planetCreationUseCase: IPlanetCreationUseCase,
        private retrievePlanetsUseCase: IRetrievePlanetsUseCase,
        private retrievePlanetFromApiUseCase: IRetrievePlanetFromApiUseCase  
    ) {}

    async createPlanet(data: PlanetDataSpanishApp): Promise<Planet> {
        return await this.planetCreationUseCase.createPlanet(data);
    }

    async listPlanets(): Promise<Planet[]> {
        return await this.retrievePlanetsUseCase.execute();
    }
 
    async getPlanetsFromApi(planetId: number): Promise<PlanetDataSpanishApp> {
        const planet = await this.retrievePlanetFromApiUseCase.execute(planetId); 
        return planet;
    }
}
