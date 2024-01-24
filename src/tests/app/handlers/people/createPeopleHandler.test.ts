import { APIGatewayProxyEvent, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { IPeopleRegistryService } from '../../../../contexts/people/application/interfaces/IPeopleRegistryService';
import Container from '../../../../app/di/iocContainer';
import { handler } from '../../../../app/handlers/people/createPeople';
import { PeopleDataSpanishApp } from '../../../../contexts/people/application/dtos/PeopleDataSpanishApp';
import { People } from '../../../../contexts/people/application/dtos/People';
 
jest.mock('../../../../app/di/iocContainer', () => ({
  get: jest.fn()
}));
 
const mockContext = {} as Context;

describe('handler', () => {
  let mockPeopleRegistryService: jest.Mocked<IPeopleRegistryService>;

  beforeEach(() => {
    mockPeopleRegistryService = {
      createPeople: jest.fn(),
      listPeople: jest.fn(),
      getPeopleFromApi: jest.fn()
    };

    (Container.get as jest.Mock).mockReturnValue(mockPeopleRegistryService);
  });

  it('debería devolver 400 si no se proporciona cuerpo en el evento', async () => {
    const event = { body: null } as unknown as APIGatewayProxyEvent;
    const callback: APIGatewayProxyCallback = jest.fn();

    const response = await handler(event, mockContext, callback);
    expect(response?.statusCode).toBe(400);
    expect(JSON.parse(response?.body || '')).toEqual({ error: 'No se proporcionaron datos.' });
  });

  it('debería crear una persona y devolver 200 en caso de éxito', async () => {
    const mockPersonData = new PeopleDataSpanishApp({
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
  
    const mockPerson = new People({
      id: mockPersonData.id,
      name: mockPersonData.nombre,
      height: mockPersonData.altura,
      mass: mockPersonData.masa,
      hair_color: mockPersonData.colorCabello,
      skin_color: mockPersonData.colorPiel,
      eye_color: mockPersonData.colorOjos,
      birth_year: mockPersonData.anioNacimiento,
      gender: mockPersonData.genero,
      homeworld_name: mockPersonData.nombreMundoNatal,
      created: mockPersonData.creado,
      edited: mockPersonData.editado
    });
    
    mockPeopleRegistryService.createPeople.mockResolvedValue(mockPerson);
  
    const event = { 
      body: JSON.stringify(mockPersonData)
    } as unknown as APIGatewayProxyEvent;
    const callback: APIGatewayProxyCallback = jest.fn();
  
    const response = await handler(event, mockContext, callback);
  
    expect(response?.statusCode).toBe(200);
    const responseBody = JSON.parse(response?.body || '');
  
    expect(responseBody.message).toEqual("Persona creada con éxito");
    expect(responseBody.person.birth_year).toEqual(mockPerson.birth_year); 
    expect(responseBody.person.created).toEqual(mockPerson.created ? mockPerson.created.toISOString() : null);
    expect(responseBody.person.edited).toEqual(mockPerson.edited ? mockPerson.edited.toISOString() : null);
 
  });
  
 
});
