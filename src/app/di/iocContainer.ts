import { Container, Token } from 'typedi'; 
import { PrismaClient } from '@prisma/client';
import { IPlanetRepository } from '../../contexts/planets/domain/interfaces/IPlanetRepository';
import { IPlanetRegistryService } from '../../contexts/planets/application/interfaces/IPlanetRegistryService';
import { IPlanetCreationUseCase } from '../../contexts/planets/application/interfaces/IPlanetCreationUseCase';
import { PlanetCreationUseCase } from '../../contexts/planets/application/usecases/PlanetCreationUseCase';
import { PlanetRegistryService } from '../../contexts/planets/application/services/PlanetRegistryService';
import { CreatePlanetCommandHandler } from '../../contexts/planets/application/commands/CreatePlanetCommandHandler';
import { RetrievePlanetsUseCase } from '../../contexts/planets/application/usecases/RetrievePlanetsUseCase';
import { RetrievePlanetsQueryHandler } from '../../contexts/planets/application/queries/RetrievePlanetsQueryHandler';
import { PlanetRepository } from '../../contexts/planets/infraestructure/repositories/PlanetRepository';
import { IRetrievePlanetsUseCase } from '../../contexts/planets/application/interfaces/IRetrievePlanetsUseCase';
import { IPlanetApiClient } from '../../contexts/planets/application/interfaces/IPlanetApiClient';
import { PlanetApiClient } from '../../contexts/planets/infraestructure/api/externalServices/PlanetApiClient';
import { GetPlanetQueryHandler } from '../../contexts/planets/application/queries/GetPlanetQueryHandler';
import { IRetrievePlanetFromApiUseCase } from '../../contexts/planets/application/interfaces/IRetrievePlanetFromApiUseCase';
import { RetrievePlanetFromApiUseCase } from '../../contexts/planets/application/usecases/RetrievePlanetFromApiUseCase';


// Importaciones para People
import { IPeopleRepository } from '../../contexts/people/domain/interfaces/IPeopleRepository';
import { IPeopleRegistryService } from '../../contexts/people/application/interfaces/IPeopleRegistryService';
import { IPeopleCreationUseCase } from '../../contexts/people/application/interfaces/IPeopleCreationUseCase';
import { PeopleRegistryService } from '../../contexts/people/application/services/PeopleRegistryService';
import { CreatePeopleCommandHandler } from '../../contexts/people/application/commands/CreatePeopleCommandHandler';
import { IRetrievePeopleUseCase } from '../../contexts/people/application/interfaces/IRetrievePeopleUseCase';
import { IPeopleApiClient } from '../../contexts/people/application/interfaces/IPeopleApiClient';
import { PeopleApiClient } from '../../contexts/people/infraestructure/api/externalServices/PeopleApiClient';
import { GetPeopleQueryHandler } from '../../contexts/people/application/queries/GetPeopleQueryHandler';
import { IRetrievePeopleFromApiUseCase } from '../../contexts/people/application/interfaces/IRetrievePeopleFromApiUseCase';
import { PeopleRepository } from '../../contexts/people/infraestructure/repositories/PlanetRepository';
import { PeopleCreationUseCase } from '../../contexts/people/application/usecases/PlanetCreationUseCase';
import { RetrievePeoplesQueryHandler } from '../../contexts/people/application/queries/RetrievePeopleQueryHandler';
import { RetrievePeoplesUseCase } from '../../contexts/people/application/usecases/RetrievePlanetsUseCase';
import { RetrievePeopleFromApiUseCase } from '../../contexts/people/application/usecases/RetrievePlanetFromApiUseCase';


// Tokens
export const PrismaClientToken = new Token<PrismaClient>('PrismaClient');
export const PlanetRepositoryToken = new Token<IPlanetRepository>('PlanetRepository');
export const CreatePlanetCommandHandlerToken = new Token<CreatePlanetCommandHandler>('CreatePlanetCommandHandler');
export const IPlanetRegistryServiceToken = new Token<IPlanetRegistryService>('IPlanetRegistryService');
export const IPlanetCreationUseCaseToken = new Token<IPlanetCreationUseCase>('IPlanetCreationUseCase');
export const RetrievePlanetsQueryHandlerToken = new Token<RetrievePlanetsQueryHandler>('RetrievePlanetsQueryHandler');
export const RetrievePlanetsUseCaseToken = new Token<IRetrievePlanetsUseCase>('RetrievePlanetsUseCase');
export const PlanetApiClientToken = new Token<IPlanetApiClient>('IPlanetApiClient');
export const GetPlanetQueryHandlerToken = new Token<GetPlanetQueryHandler>('GetPlanetQueryHandler');
export const RetrievePlanetFromApiUseCaseToken = new Token<IRetrievePlanetFromApiUseCase>('RetrievePlanetFromApiUseCase');

// Instanciación y registro de componentes 
const prismaClient = new PrismaClient();
Container.set(PrismaClientToken, prismaClient);
const swapiBaseUrl = process.env.SWAPI_BASE_URL || "";
Container.set(PlanetApiClientToken, new PlanetApiClient(swapiBaseUrl));

Container.set(PlanetRepositoryToken, new PlanetRepository(prismaClient));
Container.set(CreatePlanetCommandHandlerToken, new CreatePlanetCommandHandler(Container.get(PlanetRepositoryToken)));
Container.set(IPlanetCreationUseCaseToken, new PlanetCreationUseCase(Container.get(CreatePlanetCommandHandlerToken)));
Container.set(RetrievePlanetsQueryHandlerToken, new RetrievePlanetsQueryHandler(Container.get(PlanetRepositoryToken)));
Container.set(RetrievePlanetsUseCaseToken, new RetrievePlanetsUseCase(Container.get(RetrievePlanetsQueryHandlerToken)));

Container.set(GetPlanetQueryHandlerToken, new GetPlanetQueryHandler(
    Container.get(PlanetApiClientToken)
));

Container.set(RetrievePlanetFromApiUseCaseToken, new RetrievePlanetFromApiUseCase(
    Container.get(GetPlanetQueryHandlerToken)
));

Container.set(IPlanetRegistryServiceToken, new PlanetRegistryService(
    Container.get(IPlanetCreationUseCaseToken),
    Container.get(RetrievePlanetsUseCaseToken),
    Container.get(RetrievePlanetFromApiUseCaseToken)
));


// Tokens para People
export const PeopleRepositoryToken = new Token<IPeopleRepository>('PeopleRepository');
export const CreatePeopleCommandHandlerToken = new Token<CreatePeopleCommandHandler>('CreatePeopleCommandHandler');
export const IPeopleRegistryServiceToken = new Token<IPeopleRegistryService>('IPeopleRegistryService');
export const IPeopleCreationUseCaseToken = new Token<IPeopleCreationUseCase>('IPeopleCreationUseCase');
export const RetrievePeopleUseCaseToken = new Token<IRetrievePeopleUseCase>('RetrievePeopleUseCase');
export const PeopleApiClientToken = new Token<IPeopleApiClient>('IPeopleApiClient');
export const GetPeopleQueryHandlerToken = new Token<GetPeopleQueryHandler>('GetPeopleQueryHandler');
export const RetrievePeopleFromApiUseCaseToken = new Token<IRetrievePeopleFromApiUseCase>('RetrievePeopleFromApiUseCase');
export const RetrievePeopleQueryHandlerToken = new Token<RetrievePeoplesQueryHandler>('RetrievePeopleQueryHandler');

// Instanciación y registro de componentes para People
Container.set(PeopleApiClientToken, new PeopleApiClient(swapiBaseUrl));

Container.set(PeopleRepositoryToken, new PeopleRepository(prismaClient));
Container.set(CreatePeopleCommandHandlerToken, new CreatePeopleCommandHandler(Container.get(PeopleRepositoryToken)));
Container.set(IPeopleCreationUseCaseToken, new PeopleCreationUseCase(Container.get(CreatePeopleCommandHandlerToken)));
Container.set(RetrievePeopleQueryHandlerToken, new RetrievePeoplesQueryHandler(Container.get(PeopleRepositoryToken)));
Container.set(RetrievePeopleUseCaseToken, new RetrievePeoplesUseCase(Container.get(RetrievePeopleQueryHandlerToken)));

Container.set(GetPeopleQueryHandlerToken, new GetPeopleQueryHandler(
    Container.get(PeopleApiClientToken)
));

Container.set(RetrievePeopleFromApiUseCaseToken, new RetrievePeopleFromApiUseCase(
    Container.get(GetPeopleQueryHandlerToken)
));

Container.set(IPeopleRegistryServiceToken, new PeopleRegistryService(
    Container.get(IPeopleCreationUseCaseToken),
    Container.get(RetrievePeopleUseCaseToken),
    Container.get(RetrievePeopleFromApiUseCaseToken)
));


export default Container;
