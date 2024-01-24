import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { mockContext, setupMockContainer } from './utils/testUtils';
import { mockPlanetRegistryService } from './mocks/mockPlanetRegistryService';
import { Planet } from '../../../../contexts/planets/application/dtos/Planet';
import { handler } from '../../../../app/handlers/planets/getPlanets';
import { mockPlanetsData } from './data/planetTestData';
 
jest.mock('../../../../app/di/iocContainer', () => ({
  get: jest.fn(),
}));

setupMockContainer();
 
describe('getPlanetsHandler', () => {
  it('should return 200 and a list of planets on success', async () => {
    const mockPlanets = mockPlanetsData;
    mockPlanetRegistryService.listPlanets.mockResolvedValue(mockPlanets);

    const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent; // Mock vacío del evento
    const result = await handler(mockEvent, mockContext, jest.fn()) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockPlanets.map(planet => ({
      ...planet
    })));
  });

  it('should return 500 if an error occurs', async () => {
    const errorMessage = 'Internal Server Error';
    mockPlanetRegistryService.listPlanets.mockRejectedValue(new Error(errorMessage));

    const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent; // Mock vacío del evento
    const result = await handler(mockEvent, mockContext, jest.fn()) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).error).toBe('Error interno del servidor al obtener los planetas.');
    expect(JSON.parse(result.body).errorMessage).toBe(errorMessage);
  });
});
