 
import { APIGatewayProxyEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';
import Container from '../../../../app/di/iocContainer';
import { IPeopleRegistryService } from '../../../../contexts/people/application/interfaces/IPeopleRegistryService';
import { PeopleDataSpanishApp } from '../../../../contexts/people/application/dtos/PeopleDataSpanishApp';
import { handler } from '../../../../app/handlers/people/getPeopleSWApi';

jest.mock('../../../../app/di/iocContainer', () => ({
  get: jest.fn()
}));

describe('getPeopleByIdHandler', () => {
  let mockPeopleRegistryService: jest.Mocked<IPeopleRegistryService>;

  beforeEach(() => {
    mockPeopleRegistryService = {
      createPeople: jest.fn(),
      listPeople: jest.fn(),
      getPeopleFromApi: jest.fn()
    };

    (Container.get as jest.Mock).mockReturnValue(mockPeopleRegistryService);
  });
 
  const mockContext: Context = { 
  } as unknown as Context;
  const mockCallback: Callback = jest.fn();

  it('debería devolver 400 si no se proporciona ID de People', async () => {
    const mockEvent: APIGatewayProxyEvent = {
      queryStringParameters: null
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(mockEvent, mockContext, mockCallback) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({ error: 'People ID is required' });
  });

  it('debería devolver 200 y los detalles de People en caso de éxito', async () => {
    const mockPeopleData = new PeopleDataSpanishApp({
      id: 1,
      nombre: 'Juan',
      altura: '180',
      masa: '80',
      colorCabello: 'negro',
      colorPiel: 'moreno',
      colorOjos: 'marrón',
      anioNacimiento: '1990',
      genero: 'masculino',
      nombreMundoNatal: 'Tierra',
      creado: new Date(),
      editado: new Date()
    });

    const expectedPeople = {
      id: mockPeopleData.id,
      nombre: mockPeopleData.nombre,
      altura: mockPeopleData.altura,
      masa: mockPeopleData.masa,
      colorCabello: mockPeopleData.colorCabello,
      colorPiel: mockPeopleData.colorPiel,
      colorOjos: mockPeopleData.colorOjos,
      anioNacimiento: mockPeopleData.anioNacimiento,
      genero: mockPeopleData.genero,
      nombreMundoNatal: mockPeopleData.nombreMundoNatal,
      creado: mockPeopleData.creado?.toISOString() ?? null,  
    editado: mockPeopleData.editado?.toISOString() ?? null   
    };
 

    mockPeopleRegistryService.getPeopleFromApi.mockResolvedValue(mockPeopleData);

    const mockEvent: APIGatewayProxyEvent = {
      queryStringParameters: { id: '1' }
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(mockEvent, mockContext, mockCallback) as APIGatewayProxyResult;
    const person = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(person).toEqual({
      id: mockPeopleData.id,
      nombre: mockPeopleData.nombre,
      altura: mockPeopleData.altura,
      masa: mockPeopleData.masa,
      colorCabello: mockPeopleData.colorCabello,
      colorPiel: mockPeopleData.colorPiel,
      colorOjos: mockPeopleData.colorOjos,
      anioNacimiento: mockPeopleData.anioNacimiento,
      genero: mockPeopleData.genero,
      nombreMundoNatal: mockPeopleData.nombreMundoNatal,
      creado: mockPeopleData.creado?.toISOString() ?? null,
      editado: mockPeopleData.editado?.toISOString() ?? null
    });

    if (mockPeopleData.creado) {
        expect(person.creado).toBe(mockPeopleData.creado.toISOString());
      } else {
        expect(person.creado).toBeNull();
      }
      if (mockPeopleData.editado) {
        expect(person.editado).toBe(mockPeopleData.editado.toISOString());
      } else {
        expect(person.editado).toBeNull();
      }
  });

  it('debería devolver 500 si ocurre un error', async () => {
    const errorMessage = 'Error retrieving People';
    mockPeopleRegistryService.getPeopleFromApi.mockRejectedValue(new Error(errorMessage));

    const mockEvent: APIGatewayProxyEvent = {
      queryStringParameters: { id: '1' }
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(mockEvent, mockContext, mockCallback) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      error: 'Internal server error occurred while retrieving the People.',
      errorMessage
    });
  });

  // Aquí puedes agregar más casos de prueba según sea necesario...
});
