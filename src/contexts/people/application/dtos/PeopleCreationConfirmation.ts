import { People } from "./People";
 
export interface PeopleCreationConfirmation {
    success: boolean;
    responseCode: string;
    message: string;
    planetId?: string;
    people?: People;
}
