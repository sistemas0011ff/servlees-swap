import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mockContext, setupMockContainer } from './utils/testUtils';
import { mockPlanetRegistryService } from './mocks/mockPlanetRegistryService';
import { handler } from '../../../../app/handlers/planets/getPlanetsSWApi';
import { PlanetDataSpanishApp } from '../../../../contexts/planets/application/dtos/PlanetDataSpanishApp';

jest.mock('../../../../app/di/iocContainer', () => ({
  get: jest.fn(),
}));

setupMockContainer();

describe('getPlanetByIdHandler', () => {
  it('should return 400 if no planet ID is provided', async () => {
    const event: APIGatewayProxyEvent = {
      queryStringParameters: null,
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event, mockContext, jest.fn()) as APIGatewayProxyResult | void;

    if (typeof result === 'object' && result !== null) {
      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).error).toBe('Planet ID is required');
    } else {
      fail('Handler did not return a result');
    }
  });

  it('should return 200 and planet details on success', async () => {
    const mockPlanetData = new PlanetDataSpanishApp({
        nombre: 'Tatooine',
        periodoRotacion: 23,
        periodoOrbital: 304,
        diametro: 10465,
        clima: 'árido',
        gravedad: '1 estándar',
        terreno: 'desierto',
        aguaSuperficial: 1,
        poblacion: 200000
      }); 
    mockPlanetRegistryService.getPlanetsFromApi.mockResolvedValue(mockPlanetData);

    const event: APIGatewayProxyEvent = {
      queryStringParameters: { id: '1' },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event, mockContext, jest.fn()) as APIGatewayProxyResult | void;

    if (typeof result === 'object' && result !== null) {
      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.body)).toEqual(mockPlanetData);
    } else {
      fail('Handler did not return a result');
    }
  });

  it('should return 500 if an error occurs', async () => {
    const errorMessage = 'Error retrieving planet';
    mockPlanetRegistryService.getPlanetsFromApi.mockRejectedValue(new Error(errorMessage));

    const event: APIGatewayProxyEvent = {
      queryStringParameters: { id: '1' },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event, mockContext, jest.fn()) as APIGatewayProxyResult | void;

    if (typeof result === 'object' && result !== null) {
      expect(result.statusCode).toBe(500);
      expect(JSON.parse(result.body).error).toBe('Internal server error occurred while retrieving the planet.');
      expect(JSON.parse(result.body).errorMessage).toBe(errorMessage);
    } else {
      fail('Handler did not return a result');
    }
  });
});
