// RetrievePlanetsQueryHandler.ts

import { Service, Inject } from "typedi";
import { IQueryHandler } from "../../../../contexts/shared/cqrs/IQueryHandler";
import { PlanetQueryValues } from "./PlanetQueryValues";
import { IPlanetRepository } from "../../domain/interfaces/IPlanetRepository";
import { Planet } from "../dtos/Planet";

@Service()
export class RetrievePlanetsQueryHandler implements IQueryHandler<PlanetQueryValues, Planet[]> {
    constructor( 
        private planetRepository: IPlanetRepository
    ) { }

    async execute(query: PlanetQueryValues): Promise<Planet[]> {
        const planets = await this.planetRepository.findAll();
        return planets ?? []; // Devuelve un arreglo vacío si no se encuentran planetas
    }
}
