import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'; 
import { mockContext } from './testUtils';
import { fakePlanetData } from '../data/planetTestData'; 
import { mockPlanetRegistryService } from '../mocks/mockPlanetRegistryService';
import { Planet } from '../../../../../contexts/planets/application/dtos/Planet';
import { handler } from '../../../../../app/handlers/planets/createPlanet';

export async function testCreatePlanetSuccess() {
  const fakePlanet = new Planet(fakePlanetData);
  mockPlanetRegistryService.createPlanet.mockResolvedValueOnce(fakePlanet);

  const event = {
    body: JSON.stringify(fakePlanetData),
  } as unknown as APIGatewayProxyEvent;

  return await handler(event, mockContext, jest.fn()) as APIGatewayProxyResult;
}

export async function testCreatePlanetFailure(errorMessage: string) {
  const error = new Error(errorMessage);
  mockPlanetRegistryService.createPlanet.mockRejectedValueOnce(error);

  const event = {
    body: JSON.stringify(fakePlanetData),
  } as unknown as APIGatewayProxyEvent;

  return await handler(event, mockContext, jest.fn()) as APIGatewayProxyResult;
}

 