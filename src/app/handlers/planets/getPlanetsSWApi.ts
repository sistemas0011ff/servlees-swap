import { APIGatewayProxyHandler } from 'aws-lambda';
import Container, { IPlanetRegistryServiceToken } from '../../di/iocContainer';
import { IPlanetRegistryService } from '../../../contexts/planets/application/interfaces/IPlanetRegistryService';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const planetRegistryService = Container.get<IPlanetRegistryService>(IPlanetRegistryServiceToken);

        const planetId = event.queryStringParameters?.id;

        if (!planetId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Planet ID is required' }),
            };
        }
        const planet = await planetRegistryService.getPlanetsFromApi(parseInt(planetId));

        return {
            statusCode: 200,
            body: JSON.stringify(planet),
        };
    } catch (error) {
        console.error('Error retrieving the planet:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal server error occurred while retrieving the planet.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
