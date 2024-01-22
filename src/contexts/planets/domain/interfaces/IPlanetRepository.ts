import { Planet } from "../../application/dtos/Planet";

 
export interface IPlanetRepository {
    save(planet: Planet): Promise<string>;  
    findById(id: number): Promise<Planet | null>;
    findAll(): Promise<Planet[]>;
}
