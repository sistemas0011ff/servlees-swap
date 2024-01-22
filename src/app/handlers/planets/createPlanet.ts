import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { PlanetDataSpanishApp } from '../../../contexts/planets/application/dtos/PlanetDataSpanishApp';
import Container, { IPlanetRegistryServiceToken } from '../../di/iocContainer';
import { IPlanetRegistryService } from '../../../contexts/planets/application/interfaces/IPlanetRegistryService';

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ error: 'No se proporcionaron datos.' }) 
            };
        }

        const data = JSON.parse(event.body);
        const planetDataSpanish = new PlanetDataSpanishApp(data);
        const planetRegistryService = Container.get<IPlanetRegistryService>(IPlanetRegistryServiceToken);
        const planet = await planetRegistryService.createPlanet(planetDataSpanish);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Planeta creado con éxito",
                planet: planet 
            }),
        };
    } catch (error) {
        console.error('Error al crear el planeta:', error); 
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al crear el planeta.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};