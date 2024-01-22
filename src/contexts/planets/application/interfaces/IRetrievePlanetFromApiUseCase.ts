
import { PlanetDataSpanishApp } from '../dtos/PlanetDataSpanishApp';

export interface IRetrievePlanetFromApiUseCase {
    /**
     * Recupera los datos de un planeta específico desde una API externa.
     * @param planetId El identificador del planeta a recuperar.
     * @returns Una promesa que se resuelve con los datos del planeta.
     */
    execute(planetId: number): Promise<PlanetDataSpanishApp>; 
}
