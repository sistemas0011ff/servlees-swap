// src/application/services/PeopleRegistryService.ts
import { Service } from 'typedi';
import { IPeopleRegistryService } from '../interfaces/IPeopleRegistryService';
import { IPeopleCreationUseCase } from '../interfaces/IPeopleCreationUseCase';
import { PeopleDataSpanishApp } from '../dtos/PeopleDataSpanishApp';
import { People } from '../dtos/People'; 
import { IRetrievePeopleFromApiUseCase } from '../interfaces/IRetrievePeopleFromApiUseCase';
import { IRetrievePeopleUseCase } from '../interfaces/IRetrievePeopleUseCase';

@Service()
export class PeopleRegistryService implements IPeopleRegistryService {
    constructor(
        private PeopleCreationUseCase: IPeopleCreationUseCase,
        private retrievePeoplesUseCase: IRetrievePeopleUseCase,
        private retrievePeopleFromApiUseCase: IRetrievePeopleFromApiUseCase  
    ) {}

    async createPeople(data: PeopleDataSpanishApp): Promise<People> {
        return await this.PeopleCreationUseCase.createPeople(data);
    }

    async listPeople(): Promise<People[]> {
        return await this.retrievePeoplesUseCase.execute();
    }
 
    async getPeopleFromApi(PeopleId: number): Promise<PeopleDataSpanishApp> {
        const People = await this.retrievePeopleFromApiUseCase.execute(PeopleId);
        return People;
    }
}
