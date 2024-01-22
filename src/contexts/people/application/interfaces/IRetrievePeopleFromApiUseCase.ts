import { PeopleDataSpanishApp } from "../dtos/PeopleDataSpanishApp";

export interface IRetrievePeopleFromApiUseCase {
    /**
     * Recupera los datos de una persona específico desde una API externa.
     * @param id El identificador .
     * @returns Una promesa que se resuelve con los datos .
     */                                 
    execute(id: number): Promise<PeopleDataSpanishApp>; 
}
