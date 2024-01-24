import { Planet } from "../../../../../contexts/planets/application/dtos/Planet";
import { PlanetDataSpanishApp } from "../../../../../contexts/planets/application/dtos/PlanetDataSpanishApp";
import { IPlanetCreationUseCase } from "../../../../../contexts/planets/application/interfaces/IPlanetCreationUseCase";
import { IRetrievePlanetFromApiUseCase } from "../../../../../contexts/planets/application/interfaces/IRetrievePlanetFromApiUseCase";
import { IRetrievePlanetsUseCase } from "../../../../../contexts/planets/application/interfaces/IRetrievePlanetsUseCase";
import { PlanetRegistryService } from "../../../../../contexts/planets/application/services/PlanetRegistryService";

 
 
jest.mock('../../../../../contexts/planets/application/interfaces/IPlanetCreationUseCase');
jest.mock('../../../../../contexts/planets/application/interfaces/IRetrievePlanetsUseCase');
jest.mock('../../../../../contexts/planets/application/interfaces/IRetrievePlanetFromApiUseCase');
 
describe('PlanetRegistryService', () => {
  let service: PlanetRegistryService;
  let mockPlanetCreationUseCase: jest.Mocked<IPlanetCreationUseCase>;
  let mockRetrievePlanetsUseCase: jest.Mocked<IRetrievePlanetsUseCase>;
  let mockRetrievePlanetFromApiUseCase: jest.Mocked<IRetrievePlanetFromApiUseCase>;

  beforeEach(() => {
    mockPlanetCreationUseCase = {
      createPlanet: jest.fn()
    };
    mockRetrievePlanetsUseCase = {
      execute: jest.fn()
    };
    mockRetrievePlanetFromApiUseCase = {
      execute: jest.fn()
    };

    service = new PlanetRegistryService(
      mockPlanetCreationUseCase,
      mockRetrievePlanetsUseCase,
      mockRetrievePlanetFromApiUseCase
    );
  });

  it('debería crear un planeta correctamente', async () => {
    const planetData = new PlanetDataSpanishApp({
      nombre: 'Tierra',
      periodoRotacion: 24,
      periodoOrbital: 365,
      diametro: 12742,
      clima: 'Templado',
      gravedad: '1g',
      terreno: 'Montañoso',
      aguaSuperficial: 70,
      poblacion: 7000000000
    });
    const expectedPlanet = new Planet({
      nombre: 'Tierra',
      periodoRotacion: 24,
      periodoOrbital: 365,
      diametro: 12742,
      clima: 'Templado',
      gravedad: '1g',
      terreno: 'Montañoso',
      aguaSuperficial: 70,
      poblacion: 7000000000
    });
    mockPlanetCreationUseCase.createPlanet.mockResolvedValue(expectedPlanet);

    const result = await service.createPlanet(planetData);

    expect(mockPlanetCreationUseCase.createPlanet).toHaveBeenCalledWith(planetData);
    expect(result).toEqual(expectedPlanet);
  });

  it('debería listar planetas correctamente', async () => {
    const mockPlanets = [
      new Planet({
        nombre: 'Tierra',
      periodoRotacion: 24,
      periodoOrbital: 365,
      diametro: 12742,
      clima: 'Templado',
      gravedad: '1g',
      terreno: 'Montañoso',
      aguaSuperficial: 70,
      poblacion: 7000000000
      }),
      new Planet({
        nombre: 'Júpiter',
        periodoRotacion: 24,
      periodoOrbital: 365,
      diametro: 12742,
      clima: 'Templado',
      gravedad: '1g',
      terreno: 'Montañoso',
      aguaSuperficial: 70,
      poblacion: 7000000000
      })
    ];
    mockRetrievePlanetsUseCase.execute.mockResolvedValue(mockPlanets);

    const result = await service.listPlanets();

    expect(mockRetrievePlanetsUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(mockPlanets);
  });

  it('debería obtener datos de un planeta desde la API correctamente', async () => {
    const planetId = 1;
    const expectedPlanetData = new PlanetDataSpanishApp({
        nombre: 'Tierra',
        periodoRotacion: 24,
        periodoOrbital: 365,
        diametro: 12742,
        clima: 'Templado',
        gravedad: '1g',
        terreno: 'Montañoso',
        aguaSuperficial: 70,
        poblacion: 7000000000
    });
    mockRetrievePlanetFromApiUseCase.execute.mockResolvedValue(expectedPlanetData);

    const result = await service.getPlanetsFromApi(planetId);

    expect(mockRetrievePlanetFromApiUseCase.execute).toHaveBeenCalledWith(planetId);
    expect(result).toEqual(expectedPlanetData);
  });
 
});
