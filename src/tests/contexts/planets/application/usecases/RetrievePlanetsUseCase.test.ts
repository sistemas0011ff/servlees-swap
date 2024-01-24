// src/tests/contexts/planets/application/usecases/RetrievePlanetsUseCase.test.ts

import { RetrievePlanetsUseCase } from '../../../../../contexts/planets/application/usecases/RetrievePlanetsUseCase';
import { IQueryHandler } from '../../../../../contexts/shared/cqrs/IQueryHandler';
import { PlanetQueryValues } from '../../../../../contexts/planets/application/queries/PlanetQueryValues';
import { Planet } from '../../../../../contexts/planets/application/dtos/Planet';

// Asegúrate de que la ruta relativa al módulo que estás simulando sea correcta
jest.mock('../../../../../contexts/planets/application/queries/GetPlanetQueryHandler', () => {
  return {
    GetPlanetQueryHandler: jest.fn().mockImplementation(() => {
      return { execute: jest.fn() };
    })
  };
});

describe('RetrievePlanetsUseCase', () => {
  let retrievePlanetsUseCase: RetrievePlanetsUseCase;
  let mockPlanetQueryHandler: jest.Mocked<IQueryHandler<PlanetQueryValues, Planet[]>>;

  beforeEach(() => {
    mockPlanetQueryHandler = new (require('../../../../../contexts/planets/application/queries/GetPlanetQueryHandler').GetPlanetQueryHandler)();

    retrievePlanetsUseCase = new RetrievePlanetsUseCase(mockPlanetQueryHandler);
  });

  it('should successfully retrieve a list of planets', async () => {
    const mockPlanets = [
      new Planet({
        nombre: 'Tierra',
        periodoRotacion: 24,
        periodoOrbital: 365,
        diametro: 12742,
        clima: 'Templado',
        gravedad: '1g',
        terreno: 'Montañoso',
        aguaSuperficial: 71,
        poblacion: 7000000000
      }),
      new Planet({
        nombre: 'Marte',
        periodoRotacion: 25,
        periodoOrbital: 687,
        diametro: 6792,
        clima: 'Árido',
        gravedad: '0.38g',
        terreno: 'Desierto',
        aguaSuperficial: 0,
        poblacion: 0
      }),
      // Puedes agregar más planetas de prueba aquí si es necesario
    ];

    mockPlanetQueryHandler.execute.mockResolvedValue(mockPlanets);

    const result = await retrievePlanetsUseCase.execute();

    expect(mockPlanetQueryHandler.execute).toHaveBeenCalledWith(new PlanetQueryValues());
    expect(result).toEqual(mockPlanets);
    expect(result.length).toBe(mockPlanets.length);
  });

  // Aquí puedes agregar más pruebas para otros casos, como errores en la ejecución
});
