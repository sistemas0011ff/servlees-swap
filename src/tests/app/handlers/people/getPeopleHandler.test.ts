import { APIGatewayProxyEvent, Context, APIGatewayProxyCallback, APIGatewayProxyResult } from 'aws-lambda';
import Container from '../../../../app/di/iocContainer';
import { IPeopleRegistryService } from '../../../../contexts/people/application/interfaces/IPeopleRegistryService';
import { People } from '../../../../contexts/people/application/dtos/People';
import { handler } from '../../../../app/handlers/people/getPeople';

jest.mock('../../../../app/di/iocContainer', () => ({
  get: jest.fn()
}));

const mockContext = {} as Context;
const mockCallback: APIGatewayProxyCallback = jest.fn();

describe('getPeopleHandler', () => {
  let mockPeopleRegistryService: jest.Mocked<IPeopleRegistryService>;

  beforeEach(() => {
    mockPeopleRegistryService = {
      createPeople: jest.fn(),
      listPeople: jest.fn(),
      getPeopleFromApi: jest.fn()
    };

    (Container.get as jest.Mock).mockReturnValue(mockPeopleRegistryService);
  });

  it('debería devolver 200 y una lista de personas en caso de éxito', async () => {
    const mockPeoples = [
      new People({
        id: 1,
        name: 'Juan',
        height: '180',
        mass: '80',
        hair_color: 'negro',
        skin_color: 'moreno',
        eye_color: 'marrón',
        birth_year: '1990',
        gender: 'masculino',
        homeworld_name: 'Tierra',
        created: new Date(),
        edited: new Date()
      }), 
    ];

    mockPeopleRegistryService.listPeople.mockResolvedValue(mockPeoples);

    const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;
    const response = await handler(mockEvent, mockContext, mockCallback) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.length).toBe(mockPeoples.length);
    responseBody.forEach((person: any, index: number) => {
        const expectedPerson = mockPeoples[index];
        expect(person.id).toBe(expectedPerson.id);
        expect(person.name).toBe(expectedPerson.name); 
        if (expectedPerson.created) {
          expect(person.created).toBe(expectedPerson.created.toISOString());
        } else {
          expect(person.created).toBeNull();
        }
        if (expectedPerson.edited) {
          expect(person.edited).toBe(expectedPerson.edited.toISOString());
        } else {
          expect(person.edited).toBeNull();
        }
      });
  });

  it('debería devolver 500 si ocurre un error', async () => {
    const mockError = new Error('Error al obtener los peoples');
    mockPeopleRegistryService.listPeople.mockRejectedValue(mockError);

    const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;
    const response = await handler(mockEvent, mockContext, mockCallback) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({
      error: 'Error interno del servidor al obtener los peoples.',
      errorMessage: mockError.message
    });
  }); 
});
