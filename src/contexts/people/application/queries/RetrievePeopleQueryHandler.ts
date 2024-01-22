
import { Service, Inject } from "typedi";
import { IQueryHandler } from "../../../../contexts/shared/cqrs/IQueryHandler";
import { PeopleQueryValues } from "./PeopleQueryValues"; 
import { People } from "../dtos/People";
import { IPeopleRepository } from "../../domain/interfaces/IPeopleRepository";

@Service()
export class RetrievePeoplesQueryHandler implements IQueryHandler<PeopleQueryValues, People[]> {
    constructor( 
        private PeopleRepository: IPeopleRepository
    ) { }

    async execute(query: PeopleQueryValues): Promise<People[]> {
        const Peoples = await this.PeopleRepository.findAll();
        return Peoples ?? [];  
    }
}
