import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { PeopleData } from '../../../contexts/people/application/dtos/PeopleData';
import Container, { IPeopleRegistryServiceToken } from '../../di/iocContainer';
import { IPeopleRegistryService } from '../../../contexts/people/application/interfaces/IPeopleRegistryService';

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ error: 'No se proporcionaron datos.' }) 
            };
        }

        const data = JSON.parse(event.body);
        const peopleData = new PeopleData(data);
        const peopleRegistryService = Container.get<IPeopleRegistryService>(IPeopleRegistryServiceToken);
        const person = await peopleRegistryService.createPeople(peopleData);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Persona creada con éxito",
                person: person 
            }),
        };
    } catch (error) { 
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al crear la persona.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
