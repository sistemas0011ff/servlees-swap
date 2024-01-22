import { Planet } from "./Planet";

// asumiendo una estructura similar a GQConfirmation
export interface PlanetCreationConfirmation {
    success: boolean;
    responseCode: string;
    message: string;
    planetId?: string;
    planet?: Planet;
}
