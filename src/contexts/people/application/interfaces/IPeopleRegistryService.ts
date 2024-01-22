import { People } from "../dtos/People";
import { PeopleDataSpanishApp } from "../dtos/PeopleDataSpanishApp";


export interface IPeopleRegistryService {
    createPeople(data: PeopleDataSpanishApp): Promise<People>;
    listPeople(): Promise<People[]>; 
    getPeopleFromApi(planetId: number): Promise<PeopleDataSpanishApp>;
}
  