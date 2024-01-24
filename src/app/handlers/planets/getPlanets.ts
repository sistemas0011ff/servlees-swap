
import { APIGatewayProxyHandler } from 'aws-lambda';
import Container, { IPlanetRegistryServiceToken } from '../../di/iocContainer';
import { IPlanetRegistryService } from '../../../contexts/planets/application/interfaces/IPlanetRegistryService';

export const handler: APIGatewayProxyHandler = async () => {
    try {
        const planetRegistryService = Container.get<IPlanetRegistryService>(IPlanetRegistryServiceToken);
        
        const planets = await planetRegistryService.listPlanets();

        const planetsSafe = planets.map(planet => ({
            ...planet
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(planetsSafe),
        };
    } catch (error) { 
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al obtener los planetas.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
