import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../../../app/handlers/planets/createPlanet';
import { mockContext, setupMockContainer } from './utils/testUtils';
import { mockPlanetRegistryService } from './mocks/mockPlanetRegistryService';
import { fakePlanetData } from './data/planetTestData';
import { testCreatePlanetSuccess, testCreatePlanetFailure } from './utils/testFunctions';
import { Planet } from '../../../../contexts/planets/application/dtos/Planet';

jest.mock('../../../../app/di/iocContainer', () => ({
  get: jest.fn(),
}));

setupMockContainer();

describe('createPlanetHandler', () => {
  it('should return 400 if no body is provided', async () => {
    const event = { body: null } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, mockContext, jest.fn()) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(JSON.stringify({ error: 'No se proporcionaron datos.' }));
  });

  it('should create a planet and return 200 on success', async () => {
    const result = await testCreatePlanetSuccess();

    expect(mockPlanetRegistryService.createPlanet).toHaveBeenCalledWith(new Planet(fakePlanetData));
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ message: "Planeta creado con éxito", planet: new Planet(fakePlanetData) });
  });

  it('should return 500 if an error occurs', async () => {
    const errorMessage = 'Internal Server Error';
    const result = await testCreatePlanetFailure(errorMessage);

    expect(mockPlanetRegistryService.createPlanet).toHaveBeenCalledWith(fakePlanetData);
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).error).toBe('Error interno del servidor al crear el planeta.');
    expect(JSON.parse(result.body).errorMessage).toBe(errorMessage);
  });
});
