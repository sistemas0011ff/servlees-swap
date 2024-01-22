import { Planet } from "../dtos/Planet";
import { PlanetData } from "../dtos/PlanetData";

export interface IPlanetCreationUseCase {
    createPlanet(data: PlanetData): Promise<Planet>;
  }