import { Planet } from "../dtos/Planet";
import { PlanetDataSpanishApp } from "../dtos/PlanetDataSpanishApp";

export interface IPlanetRegistryService {
    createPlanet(data: PlanetDataSpanishApp): Promise<Planet>;
    listPlanets(): Promise<Planet[]>; 
    getPlanetsFromApi(planetId: number): Promise<PlanetDataSpanishApp>;
}
  