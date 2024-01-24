import { People } from "../../../../../contexts/people/application/dtos/People";
import { PeopleDataSpanishApp } from "../../../../../contexts/people/application/dtos/PeopleDataSpanishApp";
import { IPeopleCreationUseCase } from "../../../../../contexts/people/application/interfaces/IPeopleCreationUseCase";
import { IRetrievePeopleFromApiUseCase } from "../../../../../contexts/people/application/interfaces/IRetrievePeopleFromApiUseCase";
import { IRetrievePeopleUseCase } from "../../../../../contexts/people/application/interfaces/IRetrievePeopleUseCase";
import { PeopleRegistryService } from "../../../../../contexts/people/application/services/PeopleRegistryService";

jest.mock('../../../../../contexts/people/application/interfaces/IPeopleCreationUseCase');
jest.mock('../../../../../contexts/people/application/interfaces/IRetrievePeopleUseCase');
jest.mock('../../../../../contexts/people/application/interfaces/IRetrievePeopleFromApiUseCase');
 
describe('PeopleRegistryService', () => {
  let service: PeopleRegistryService;
  let mockPeopleCreationUseCase: jest.Mocked<IPeopleCreationUseCase>;
  let mockRetrievePeoplesUseCase: jest.Mocked<IRetrievePeopleUseCase>;
  let mockRetrievePeopleFromApiUseCase: jest.Mocked<IRetrievePeopleFromApiUseCase>;

  beforeEach(() => {
    mockPeopleCreationUseCase = {
      createPeople: jest.fn()
    } as jest.Mocked<IPeopleCreationUseCase>;
    mockRetrievePeoplesUseCase = {
      execute: jest.fn()
    } as jest.Mocked<IRetrievePeopleUseCase>;
    mockRetrievePeopleFromApiUseCase = {
      execute: jest.fn()
    } as jest.Mocked<IRetrievePeopleFromApiUseCase>;

    service = new PeopleRegistryService(
      mockPeopleCreationUseCase,
      mockRetrievePeoplesUseCase,
      mockRetrievePeopleFromApiUseCase
    );
  });

  it('should create a person correctly', async () => {
    const peopleData = new PeopleDataSpanishApp({
      id: 2,
      nombre: 'Ana Smith',
      altura: '165',
      masa: '60',
      colorCabello: 'moreno',
      colorPiel: 'blanca',
      colorOjos: 'azules',
      anioNacimiento: '1985',
      genero: 'femenino',
      nombreMundoNatal: 'Marte',
      creado: new Date('2024-01-24T00:00:00Z'),
      editado: new Date('2024-01-24T00:00:00Z')
    });
    const expectedPeople = new People({
      id: 2,
      name: 'Ana Smith',
      height: '165',
      mass: '60',
      hair_color: 'moreno',
      skin_color: 'blanca',
      eye_color: 'azules',
      birth_year: '1985',
      gender: 'femenino',
      homeworld_name: 'Marte',
      created: new Date('2024-01-24T00:00:00Z'),
      edited: new Date('2024-01-24T00:00:00Z')
    });
    mockPeopleCreationUseCase.createPeople.mockResolvedValue(expectedPeople);

    const result = await service.createPeople(peopleData);

    expect(mockPeopleCreationUseCase.createPeople).toHaveBeenCalledWith(peopleData);
    expect(result).toEqual(expectedPeople);
  });

  it('should list people correctly', async () => {
    const mockPeoples = [
      new People({
        id: 1,
        name: 'Juan Pérez',
        height: '170',
        mass: '70',
        hair_color: 'negro',
        skin_color: 'moreno',
        eye_color: 'marrón',
        birth_year: '1990',
        gender: 'masculino',
        homeworld_name: 'Tierra',
        created: new Date('2024-01-23T00:00:00Z'),
        edited: new Date('2024-01-23T00:00:00Z')
      }),
      // ...otros objetos People
    ];
    mockRetrievePeoplesUseCase.execute.mockResolvedValue(mockPeoples);

    const result = await service.listPeople();

    expect(mockRetrievePeoplesUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(mockPeoples);
  });

  it('should retrieve person data from API correctly', async () => {
    const peopleId = 1;
    const expectedPeopleDataFromApi = new PeopleDataSpanishApp({
      id: 1,
      nombre: 'Juan Pérez',
      altura: '170',
      masa: '70',
      colorCabello: 'negro',
      colorPiel: 'moreno',
      colorOjos: 'marrón',
      anioNacimiento: '1990',
      genero: 'masculino',
      nombreMundoNatal: 'Tierra',
      creado: new Date('2024-01-23T00:00:00Z'),
      editado: new Date('2024-01-23T00:00:00Z')
    });
    mockRetrievePeopleFromApiUseCase.execute.mockResolvedValue(expectedPeopleDataFromApi);

    const result = await service.getPeopleFromApi(peopleId);

    expect(mockRetrievePeopleFromApiUseCase.execute).toHaveBeenCalledWith(peopleId);
    expect(result).toEqual(expectedPeopleDataFromApi);
  });
});
