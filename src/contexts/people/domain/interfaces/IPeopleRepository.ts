import { People } from "../../application/dtos/People";

 
export interface IPeopleRepository {
    save(People: People): Promise<string>;  
    findById(id: number): Promise<People | null>;
    findAll(): Promise<People[]>;
}
