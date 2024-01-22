import { Service } from "typedi";
import { IQueryHandler } from "../../../../contexts/shared/cqrs/IQueryHandler"; 
import { People } from "../../application/dtos/People";
import { PeopleQueryValues } from "../queries/PeopleQueryValues"; 
import { IRetrievePeopleUseCase } from "../interfaces/IRetrievePeopleUseCase";

@Service()
export class RetrievePeoplesUseCase implements IRetrievePeopleUseCase {

    constructor(
        private PeoplesQueryHandler: IQueryHandler<PeopleQueryValues, People[]>
    ) {}

    async execute(): Promise<People[]> {
        const query = new PeopleQueryValues();
        return await this.PeoplesQueryHandler.execute(query);
    }
}
