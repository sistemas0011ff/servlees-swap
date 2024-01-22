import { People } from "../dtos/People";
import { PeopleData } from "../dtos/PeopleData";

export interface IPeopleCreationUseCase {
    createPeople(data: PeopleData): Promise<People>;
  }