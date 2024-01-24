import { IPlanetRegistryService } from "../../../../../contexts/planets/application/interfaces/IPlanetRegistryService";

export const mockPlanetRegistryService: jest.Mocked<IPlanetRegistryService> = {
  createPlanet: jest.fn(),
  listPlanets: jest.fn(),
  getPlanetsFromApi: jest.fn(),
};
