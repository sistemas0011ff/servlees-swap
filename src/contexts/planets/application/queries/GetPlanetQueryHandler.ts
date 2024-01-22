// src/application/queries/GetPlanetQueryHandler.ts
import { Service, Inject } from 'typedi';
import { IQueryHandler } from '../../../shared/cqrs/IQueryHandler';
import { GetPlanetQuery } from '../queries/GetPlanetQuery'; 
import { IPlanetApiClient } from '../interfaces/IPlanetApiClient';
import { PlanetDataEnglishApp } from '../dtos/PlanetDataEnglishApp';

@Service()
export class GetPlanetQueryHandler implements IQueryHandler<GetPlanetQuery, PlanetDataEnglishApp[]> {
    constructor(
        private apiClient: IPlanetApiClient
    ) {}

    public async execute(query: GetPlanetQuery): Promise<PlanetDataEnglishApp[]> {
        try {
            const planetEnglish = await this.apiClient.getPlanet(query.planetId);
            console.log("GetPlanetQueryHandler - planet :", planetEnglish);

            // Retorna un array que contiene el planeta recuperado
            return [planetEnglish];
        } catch (error) {
            console.error('Error in GetPlanetQueryHandler:', error);
            throw error;
        }
    }
}
