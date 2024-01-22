import { People } from "../dtos/People";


export interface IRetrievePeopleUseCase {
    execute(): Promise<People[]>;
}
