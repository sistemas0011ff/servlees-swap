import { PeopleDataEnglishApp } from "../dtos/PeopleDataEnglishApp";

 
export interface IPeopleApiClient {
    get(id: number): Promise<PeopleDataEnglishApp>;
}
