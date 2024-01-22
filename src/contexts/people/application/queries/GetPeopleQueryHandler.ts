import { Service } from 'typedi';
import { IQueryHandler } from '../../../shared/cqrs/IQueryHandler';
import { GetPeopleQuery } from '../queries/GetPeopleQuery';  
import { PeopleDataEnglishApp } from '../dtos/PeopleDataEnglishApp';
import { IPeopleApiClient } from '../interfaces/IPeopleApiClient';

@Service()
export class GetPeopleQueryHandler implements IQueryHandler<GetPeopleQuery, PeopleDataEnglishApp[]> {
    constructor(
        private apiClient: IPeopleApiClient
    ) {}

    public async execute(query: GetPeopleQuery): Promise<PeopleDataEnglishApp[]> {
        try {
            const PeopleEnglish = await this.apiClient.get(query.id); 
 
            return [PeopleEnglish];
        } catch (error) { 
            throw error;
        }
    }
}
