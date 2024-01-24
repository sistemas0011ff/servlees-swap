import { Planet } from "./Planet";
 
export interface PlanetCreationConfirmation {
    success: boolean;
    responseCode: string;
    message: string;
    planetId?: string;
    planet?: Planet;
}
