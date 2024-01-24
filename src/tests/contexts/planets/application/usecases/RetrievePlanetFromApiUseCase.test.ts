import { PlanetDataEnglishApp } from "../../../../../contexts/planets/application/dtos/PlanetDataEnglishApp";
import { PlanetDataSpanishApp } from "../../../../../contexts/planets/application/dtos/PlanetDataSpanishApp";
import { GetPlanetQueryHandler } from "../../../../../contexts/planets/application/queries/GetPlanetQueryHandler";
import { RetrievePlanetFromApiUseCase } from "../../../../../contexts/planets/application/usecases/RetrievePlanetFromApiUseCase";

 
jest.mock('../../../../../contexts/planets/application/queries/GetPlanetQueryHandler');

describe('RetrievePlanetFromApiUseCase', () => {
  let retrievePlanetFromApiUseCase: RetrievePlanetFromApiUseCase;
  let mockGetPlanetQueryHandler: jest.Mocked<GetPlanetQueryHandler>;

  beforeEach(() => {
    mockGetPlanetQueryHandler = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<GetPlanetQueryHandler>;
  
    retrievePlanetFromApiUseCase = new RetrievePlanetFromApiUseCase(mockGetPlanetQueryHandler);
  });

  it('should successfully retrieve planet data from the API', async () => {
    const planetId = 1;
    const planetEnglishData = new PlanetDataEnglishApp({
      name: 'Tierra',
      rotation_period: '24',
      orbital_period: '365',
      diameter: '12742',
      climate: 'Templado',
      gravity: '1g',
      terrain: 'Montañoso',
      surface_water: '71',
      population: '7000000000'
    });

    mockGetPlanetQueryHandler.execute.mockResolvedValue([planetEnglishData]);

    const result = await retrievePlanetFromApiUseCase.execute(planetId);

    expect(mockGetPlanetQueryHandler.execute).toHaveBeenCalledWith({ planetId });
    expect(result).toBeInstanceOf(PlanetDataSpanishApp);
    expect(result.nombre).toEqual(planetEnglishData.name); 
  });
 
});
