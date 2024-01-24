import Container from "../../../../../app/di/iocContainer";
import { CreatePlanetCommand } from "../../../../../contexts/planets/application/commands/CreatePlanetCommand";
import { CreatePlanetCommandHandler } from "../../../../../contexts/planets/application/commands/CreatePlanetCommandHandler";
import { Planet } from "../../../../../contexts/planets/application/dtos/Planet";
import { PlanetCreationConfirmation } from "../../../../../contexts/planets/application/dtos/PlanetCreationConfirmation";
import { PlanetCreationUseCase } from "../../../../../contexts/planets/application/usecases/PlanetCreationUseCase";
import { ICommandResult } from "../../../../../contexts/shared/cqrs/ICommandResult";

jest.mock('../../../../../contexts/planets/application/commands/CreatePlanetCommandHandler');

describe('PlanetCreationUseCase', () => {
  let planetCreationUseCase: PlanetCreationUseCase;
  let mockCreatePlanetCommandHandler: jest.Mocked<CreatePlanetCommandHandler>;

  beforeEach(() => {
    // Crear un mock del CreatePlanetCommandHandler
    const mockHandler = {
      handle: jest.fn().mockImplementation((command: CreatePlanetCommand) => {
        const planetData = command.planetData;
        const expectedPlanet = new Planet(planetData);

        const commandResult: ICommandResult<boolean, PlanetCreationConfirmation> = {
          result: true,
          value: {
            success: true,
            responseCode: '0',
            message: 'Planet Created Successfully',
            planetId: '123',
            planet: expectedPlanet,
          },
        };

        return Promise.resolve(commandResult);
      }),
    };

    // Registrar el mock en el contenedor de Typedi
    Container.set(CreatePlanetCommandHandler, mockHandler);

    // Ahora obtén el mock del contenedor
    mockCreatePlanetCommandHandler = Container.get(CreatePlanetCommandHandler) as jest.Mocked<CreatePlanetCommandHandler>;
    planetCreationUseCase = new PlanetCreationUseCase(mockCreatePlanetCommandHandler);
  });

  it('should successfully create a planet', async () => {
    const planetData = {
      nombre: 'Tierra',
      periodoRotacion: 24,
      periodoOrbital: 365,
      diametro: 12742,
      clima: 'Templado',
      gravedad: '1g',
      terreno: 'Montañoso',
      aguaSuperficial: 71,
      poblacion: 7000000000
    };

    const expectedPlanet = new Planet(planetData);

    const commandResult: ICommandResult<boolean, PlanetCreationConfirmation> = {
      result: true,
      value: {
        success: true,
        responseCode: '0',
        message: 'Planet Created Successfully',
        planetId: '123',
        planet: expectedPlanet,
      },
    };

    mockCreatePlanetCommandHandler.handle.mockResolvedValue(commandResult);

    const result = await planetCreationUseCase.createPlanet(planetData);

    expect(mockCreatePlanetCommandHandler.handle).toHaveBeenCalledWith(new CreatePlanetCommand(planetData));
    expect(result).toEqual(expectedPlanet);
  });
});
