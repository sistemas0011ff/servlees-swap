import { Planet } from "../dtos/Planet";


export interface IRetrievePlanetsUseCase {
    execute(): Promise<Planet[]>;
}
