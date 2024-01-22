import { APIGatewayProxyHandler } from 'aws-lambda';
import Container, { IPeopleRegistryServiceToken } from '../../di/iocContainer';
import { IPeopleRegistryService } from '../../../contexts/people/application/interfaces/IPeopleRegistryService';
 
export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const PeopleRegistryService = Container.get<IPeopleRegistryService>(IPeopleRegistryServiceToken);

        const PeopleId = event.queryStringParameters?.id;

        if (!PeopleId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'People ID is required' }),
            };
        }
        const People = await PeopleRegistryService.getPeopleFromApi(parseInt(PeopleId));
console.log("cxx :: ", People);
        return {
            statusCode: 200,
            body: JSON.stringify(People),
        };
    } catch (error) {
        console.error('Error retrieving the People:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal server error occurred while retrieving the People.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
